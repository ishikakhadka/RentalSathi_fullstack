# Database Design & Architecture

## Overview

RentalSathi uses **MongoDB** (NoSQL document database) managed through the **Mongoose** ODM. There are three primary collections:

| Collection | Purpose |
|---|---|
| `users` | Stores registered landlord and tenant accounts |
| `properties` | Stores rental property listings created by landlords |
| `carts` | Stores the tenant's saved-property basket (wishlist) |

---

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USERS {
        ObjectId _id PK
        string email UK
        string password
        string firstName
        string lastName
        date dob
        string gender
        string role
        string address
    }

    PROPERTIES {
        ObjectId _id PK
        string title
        string location
        number price
        number noOfRooms
        string category
        string image
        string description
        ObjectId landlordId FK
        date createdAt
        date updatedAt
    }

    CARTS {
        ObjectId _id PK
        ObjectId tenantId FK
        ObjectId propertyId FK
    }

    USERS ||--o{ PROPERTIES : "landlord creates"
    USERS ||--o{ CARTS : "tenant saves"
    PROPERTIES ||--o{ CARTS : "saved as"
```

---

## Collection Schemas

### Users Collection

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String email          [required, unique, max:100, lowercase]
        +String password       [required, hashed with bcrypt]
        +String firstName      [required, max:100]
        +String lastName       [required, max:100]
        +Date   dob            [optional, max: now]
        +String gender         [required, enum: male|female|other]
        +String role           [required, enum: tenant|landlord]
        +String address        [required, max:255]
    }
```

**Notes:**
- Password is never stored as plaintext; it is hashed using `bcrypt` with 10 salt rounds.
- `role` drives route-level authorization throughout the backend.
- `email` carries a unique index for fast lookups during authentication.

---

### Properties Collection

```mermaid
classDiagram
    class Property {
        +ObjectId _id
        +String   title        [required, max:255]
        +String   location     [required, max:255]
        +Number   price        [required, min:0]
        +Number   noOfRooms    [required, min:1]
        +String   category     [required, enum: Villa|Apartment|Commercial|Homestay|Flats|Warehouse]
        +String   image        [optional, nullable]
        +String   description  [required, min:10, max:1000]
        +ObjectId landlordId   [ref: User]
        +Date     createdAt    [auto]
        +Date     updatedAt    [auto]
    }
```

**Notes:**
- `landlordId` is a foreign-key reference to `_id` in the **Users** collection.
- Timestamps (`createdAt`, `updatedAt`) are managed automatically by Mongoose.
- Category is a strict enum allowing only: Villa, Apartment, Commercial, Homestay, Flats, Warehouse.

---

### Carts Collection

```mermaid
classDiagram
    class Cart {
        +ObjectId _id
        +ObjectId tenantId    [ref: User, required]
        +ObjectId propertyId  [ref: Property, required]
    }
```

**Notes:**
- The pair `(tenantId, propertyId)` is functionally unique – the application prevents duplicate entries explicitly in the controller.
- `$lookup` aggregation is used to join property details when listing the cart.

---

## Database Architecture

```mermaid
flowchart TD
    subgraph Client["Client Layer"]
        NextJS["Next.js Frontend\n(Vercel)"]
    end

    subgraph API["API Layer"]
        Express["Express.js REST API\n(Node.js – Port 8080)"]
        Auth["JWT Auth Middleware\n(isLandlord / isTenant / isUser)"]
        Validation["Yup Validation\nMiddleware"]
    end

    subgraph ODM["ODM Layer"]
        Mongoose["Mongoose ODM"]
    end

    subgraph DB["Database Layer"]
        MongoDB[("MongoDB Atlas / Local\nDatabase: rentalsathi")]
        ColUsers[("Collection: users")]
        ColProps[("Collection: properties")]
        ColCart[("Collection: carts")]
    end

    NextJS -- "HTTPS REST\nBearer Token" --> Express
    Express --> Auth
    Auth --> Validation
    Validation --> Mongoose
    Mongoose --> MongoDB
    MongoDB --> ColUsers
    MongoDB --> ColProps
    MongoDB --> ColCart
```

---

## Indexes

| Collection | Field | Index Type | Reason |
|---|---|---|---|
| `users` | `email` | Unique | Fast login lookup, prevent duplicates |
| `properties` | `landlordId` | Default (ObjectId) | Filter landlord's own properties |
| `carts` | `tenantId` | Default (ObjectId) | Fetch all basket items for a tenant |

---

## Data Relationships Summary

| Relationship | Type | Implementation |
|---|---|---|
| User → Properties | One-to-Many | `properties.landlordId` references `users._id` |
| User → Cart | One-to-Many | `carts.tenantId` references `users._id` |
| Property → Cart | One-to-Many | `carts.propertyId` references `properties._id` |
| Cart → Property (display) | Lookup join | MongoDB `$lookup` aggregation on `GET /cart/list` |
