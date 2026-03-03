# Flow Diagrams

Flow diagrams describe the step-by-step logic and decision paths within each major process of RentalSathi.

---

## 1. Application-Level Route Flow

Shows how the Next.js App Router directs users based on authentication state and role.

```mermaid
flowchart TD
    A([User opens app]) --> B{Token in\nlocalStorage?}

    B -- "No" --> C["(guest) layout\n/login or /register"]
    B -- "Yes" --> D{Role?}

    D -- "landlord" --> E["LandlordGuard\n(role check)"]
    D -- "tenant" --> F["TenantGuard\n(role check)"]

    E -- "Valid" --> G["(auth)/landlord/home\nLandlord Dashboard"]
    E -- "Invalid / expired" --> H["clear localStorage\nredirect → /login"]

    F -- "Valid" --> I["(auth)/tenant/home\nTenant Dashboard"]
    F -- "Invalid / expired" --> H

    G --> G1["View My Properties"]
    G --> G2["Add Property"]
    G --> G3["Edit Property"]
    G --> G4["Remove Property"]

    I --> I1["Browse Properties"]
    I --> I2["View Property Detail"]
    I --> I3["Manage Basket"]
    I --> I4["Category Filter"]
    I --> I5["Chat with Landlord"]
```

---

## 2. Authentication Flow

```mermaid
flowchart TD
    Start([Start]) --> A["User submits Login form"]
    A --> B["Client-side Yup validation"]
    B --> C{Valid?}
    C -- "No" --> D["Show inline errors"]
    D --> A
    C -- "Yes" --> E["POST /user/login\n{ email, password }"]
    E --> F["API: Find user by email"]
    F --> G{User found?}
    G -- "No" --> H["Return 404\nInvalid Credentials"]
    H --> D
    G -- "Yes" --> I["bcrypt.compare\n(plain vs hash)"]
    I --> J{Passwords\nmatch?}
    J -- "No" --> H
    J -- "Yes" --> K["jwt.sign({ email }, secret, 7d)"]
    K --> L["Return 200 + token + userDetails"]
    L --> M["Store token & role\nin localStorage"]
    M --> N{Role?}
    N -- "landlord" --> O["Navigate to\nLandlord Home"]
    N -- "tenant" --> P["Navigate to\nTenant Home"]
```

---

## 3. Property Listing Flow (Landlord)

```mermaid
flowchart TD
    Start([Landlord clicks\n"Add Property"]) --> A["Navigate to\n/landlord/add-property"]
    A --> B["Fill AddPropertyForm\n(title, location, price,\nrooms, category, description, image)"]
    B --> C["Client Yup validation"]
    C --> D{Valid?}
    D -- "No" --> E["Show field errors"]
    E --> B
    D -- "Yes" --> F["POST /properties/add\nwith Bearer token"]
    F --> G["isLandlord middleware\nverify JWT + role"]
    G --> H{Auth OK?}
    H -- "No" --> I["401 → Redirect Login"]
    H -- "Yes" --> J["Yup server validation"]
    J --> K{Valid?}
    K -- "No" --> L["400 → Show error"]
    K -- "Yes" --> M["PropertyTable.create()\n with landlordId"]
    M --> N["201 Created"]
    N --> O["Show success toast\nNavigate to My Properties"]

    subgraph Edit ["Edit Property Flow"]
        E1["Landlord selects property\nto edit"] --> E2["GET /properties/detail/:id\nPre-fill EditPropertyForm"]
        E2 --> E3["Submit changes\nPUT /properties/update/:id"]
        E3 --> E4["isLandlord + isOwner\nmiddleware"]
        E4 --> E5{Authorized?}
        E5 -- "No" --> E6["403 Forbidden"]
        E5 -- "Yes" --> E7["Update document in DB"]
        E7 --> E8["200 OK → Refresh list"]
    end
```

---

## 4. Tenant Property Browse & Cart Flow

```mermaid
flowchart TD
    Start([Tenant opens\nTenant Home]) --> A["POST /properties/tenant/list\n{ page, limit }"]
    A --> B["isTenant middleware\n(verify JWT + role)"]
    B --> C{Authorised?}
    C -- "No" --> D["401 → Login"]
    C -- "Yes" --> E["MongoDB aggregate\n$match / $skip / $limit / $project"]
    E --> F["Return paginated property list\n+ totalPages"]
    F --> G["Render PropertyCard grid"]

    G --> H{User action?}

    H -- "View Detail" --> I["Click property card\nGET /properties/detail/:id"]
    I --> J["Display full PropertyDetails\n(image, price, rooms, description)"]
    J --> K{Save\nproperty?}
    K -- "Yes" --> L["POST /cart/property/add\n{ propertyId }"]
    L --> M{Already\nsaved?}
    M -- "Yes" --> N["Show 'Already in basket' warning"]
    M -- "No" --> O["CartTable.create()"]
    O --> P["Update basket badge count"]

    H -- "Filter by category" --> Q["Navigate to /tenant/category\n?category=..."]
    Q --> R["Filtered property list"]

    H -- "Next Page" --> A

    H -- "Open Basket" --> S["GET /cart/list\n(aggregate with $lookup)"]
    S --> T["Render saved properties\nwith remove option"]
    T --> U{Remove?}
    U -- "Single" --> V["DELETE /cart/property/delete/:id"]
    U -- "Clear all" --> W["DELETE /cart/flush"]
    V --> T
    W --> X["Empty basket view"]
```

---

## 5. Backend Request Lifecycle Flow

Shows how every API request travels through the middleware stack before reaching the database.

```mermaid
flowchart LR
    Client["Client\n(Next.js)"] -->|"HTTP Request\n+ Bearer Token"| CORS["CORS\nMiddleware"]
    CORS --> JSON["express.json()\nBody Parser"]
    JSON --> Router["Express Router\n(userController /\npropertyController /\ncartController)"]
    Router --> Auth{"Auth\nMiddleware\n(isLandlord /\nisTenant / isUser)"}
    Auth -- "401 Unauthorized" --> Client
    Auth -->|Pass| Validate{"Request Body\nValidation\n(Yup)"}
    Validate -- "400 Bad Request" --> Client
    Validate -->|Pass| Handler["Route Handler\n(async function)"]
    Handler --> Mongoose["Mongoose ODM"]
    Mongoose --> MongoDB[("MongoDB")]
    MongoDB --> Mongoose
    Mongoose --> Handler
    Handler -->|"JSON Response"| Client
```

---

## 6. Real-time Chat Flow

```mermaid
flowchart TD
    A([User opens\nChatPopup]) --> B["socket = io('http://localhost:8080')"]
    B --> C["Socket connection established"]
    C --> D{User sends\nmessage?}
    D -- "Yes" --> E["socket.emit('send-message', { text, from, to })"]
    E --> F["Socket.IO Server\nbroadcasts to room"]
    F --> G["Recipient's socket\nreceives event"]
    G --> H["Update chat UI\nwith new message"]
    H --> D
    D -- "Close chat" --> I["socket.disconnect()"]
```
