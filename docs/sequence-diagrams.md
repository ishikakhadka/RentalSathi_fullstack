# Sequence Diagrams

Sequence diagrams show the time-ordered messaging between actors and system components for the key use cases of RentalSathi.

---

## 1. User Registration

```mermaid
sequenceDiagram
    actor Guest
    participant UI as Next.js Frontend
    participant API as Express API
    participant MW as Yup Validator
    participant DB as MongoDB (users)

    Guest->>UI: Fill registration form (name, email, password, role, etc.)
    UI->>UI: Client-side Yup validation
    UI->>API: POST /user/register { firstName, lastName, email, password, gender, role, address }

    API->>MW: validateReqBody(registerUserSchema)
    alt Validation fails
        MW-->>UI: 400 Bad Request - validation error
        UI-->>Guest: Show error message
    end
    MW->>API: Proceed (validated body)

    API->>DB: findOne({ email })
    alt Email already exists
        DB-->>API: User document found
        API-->>UI: 409 Conflict - User already exists
        UI-->>Guest: Show duplicate error
    end

    DB-->>API: null (email free)
    API->>API: bcrypt.hash(password, 10)
    API->>DB: UserTable.create({ ...newUser, hashedPassword })
    DB-->>API: Saved user document

    API-->>UI: 201 Created - User registered successfully
    UI-->>Guest: Redirect to Login page
```

---

## 2. User Login

```mermaid
sequenceDiagram
    actor User
    participant UI as Next.js Frontend
    participant API as Express API
    participant DB as MongoDB (users)

    User->>UI: Enter email + password
    UI->>API: POST /user/login { email, password }

    API->>API: Yup schema validation
    alt Validation fails
        API-->>UI: 400 Bad Request
    end

    API->>DB: findOne({ email })
    alt User not found
        DB-->>API: null
        API-->>UI: 404 Invalid Credentials
        UI-->>User: Show error
    end

    DB-->>API: User document
    API->>API: bcrypt.compare(plainPassword, hashedPassword)
    alt Password mismatch
        API-->>UI: 404 Invalid Credentials
        UI-->>User: Show error
    end

    API->>API: jwt.sign({ email }, secretKey, { expiresIn: "7d" })
    API-->>UI: 200 OK - accessToken + userDetails

    UI->>UI: Store accessToken and role in localStorage
    UI-->>User: Redirect to role-based dashboard (Landlord or Tenant Home)
```

---

## 3. Landlord – Add Property

```mermaid
sequenceDiagram
    actor Landlord
    participant UI as Next.js Frontend
    participant API as Express API
    participant AuthMW as isLandlord Middleware
    participant ValMW as Yup Validator
    participant DB as MongoDB (properties)

    Landlord->>UI: Fill Add Property form
    UI->>API: POST /properties/add - Bearer token + property fields

    API->>AuthMW: Extract & verify JWT token
    alt No token / invalid token
        AuthMW-->>UI: 401 Unauthorized
        UI-->>Landlord: Redirect to Login
    end
    AuthMW->>AuthMW: Check user.role === "landlord"
    alt Role is not landlord
        AuthMW-->>UI: 401 Unauthorized
    end
    AuthMW->>API: Attach loggedInUserId and call next

    API->>ValMW: validateReqBody(PropertySchema)
    alt Validation fails
        ValMW-->>UI: 400 Bad Request
        UI-->>Landlord: Show validation error
    end

    ValMW->>API: Validated body - call next
    API->>DB: PropertyTable.create({ ...body, landlordId })
    DB-->>API: Saved property document

    API-->>UI: 201 Created - Property listed successfully
    UI-->>Landlord: Show success toast, refresh property list
```

---

## 4. Tenant – Browse Properties (Paginated)

```mermaid
sequenceDiagram
    actor Tenant
    participant UI as Next.js Frontend
    participant RQ as React Query
    participant API as Express API
    participant AuthMW as isTenant Middleware
    participant DB as MongoDB (properties)

    Tenant->>UI: Navigate to Tenant Home
    UI->>RQ: useQuery / useMutation for property list
    RQ->>API: POST /properties/tenant/list - Bearer token + { page, limit }

    API->>AuthMW: Verify JWT, check role === tenant
    alt Unauthorized
        AuthMW-->>RQ: 401 Unauthorized
        RQ-->>UI: Redirect to Login
    end

    API->>DB: PropertyTable.aggregate([$match, $skip, $limit, $project])
    DB-->>API: Property list (projected fields)
    API->>DB: PropertyTable.countDocuments()
    DB-->>API: totalItems

    API-->>RQ: 200 OK - { Properties, totalPages }
    RQ-->>UI: Render property cards
    UI-->>Tenant: Display paginated property grid
```

---

## 5. Tenant – View Property Detail

```mermaid
sequenceDiagram
    actor Tenant
    participant UI as Next.js Frontend
    participant API as Express API
    participant AuthMW as isUser Middleware
    participant DB as MongoDB (properties)

    Tenant->>UI: Click on a property card
    UI->>API: GET /properties/detail/:id - Bearer token

    API->>AuthMW: Verify JWT (any authenticated user)
    alt Unauthorized
        AuthMW-->>UI: 401 Unauthorized
    end

    API->>API: validateMongoIdFromReqParams
    alt Invalid ObjectId
        API-->>UI: 400 Bad Request - Invalid id
    end

    API->>DB: PropertyTable.findOne({ _id: propertyId })
    alt Property not found
        DB-->>API: null
        API-->>UI: 404 Not Found
        UI-->>Tenant: Show "not found" message
    end

    DB-->>API: Full property document
    API-->>UI: 200 OK - { PropertyDetails }
    UI-->>Tenant: Render full property details page
```

---

## 6. Tenant – Add Property to Basket (Cart)

```mermaid
sequenceDiagram
    actor Tenant
    participant UI as Next.js Frontend
    participant API as Express API
    participant AuthMW as isTenant Middleware
    participant DB_P as MongoDB (properties)
    participant DB_C as MongoDB (carts)

    Tenant->>UI: Click "Save" / "Add to Basket"
    UI->>API: POST /cart/property/add - Bearer token + { propertyId }

    API->>AuthMW: Verify JWT, role === tenant
    alt Unauthorized
        AuthMW-->>UI: 401 Unauthorized
    end

    API->>API: mongoose.isValidObjectId(propertyId)
    alt Invalid ID
        API-->>UI: 409 Invalid property ID
    end

    API->>DB_P: PropertyTable.findById(propertyId)
    alt Property not found
        DB_P-->>API: null
        API-->>UI: 404 Property does not exist
    end

    API->>DB_C: CartTable.findOne({ tenantId, propertyId })
    alt Already in cart
        DB_C-->>API: existing cart item
        API-->>UI: 409 Property already in your list
        UI-->>Tenant: Show duplicate warning
    end

    DB_C-->>API: null (not in cart)
    API->>DB_C: CartTable.create({ tenantId, propertyId })
    DB_C-->>API: Saved cart document

    API-->>UI: 200 OK - Property added to your list
    UI-->>Tenant: Update basket badge / count
```

---

## 7. Landlord – Delete Property

```mermaid
sequenceDiagram
    actor Landlord
    participant UI as Next.js Frontend
    participant API as Express API
    participant AuthMW as isLandlord Middleware
    participant OwnerMW as isOwnerOfProperty Middleware
    participant DB as MongoDB (properties)

    Landlord->>UI: Click "Delete" on property card
    UI->>UI: Show confirmation dialog
    Landlord->>UI: Confirm deletion
    UI->>API: DELETE /properties/delete/:id - Bearer token

    API->>AuthMW: Verify JWT, role === landlord
    alt Unauthorized
        AuthMW-->>UI: 401 Unauthorized
    end

    API->>OwnerMW: Check landlordId === req.loggedInUserId
    alt Not owner
        OwnerMW-->>UI: 403 Forbidden - Access denied
        UI-->>Landlord: Show access denied error
    end

    API->>DB: PropertyTable.deleteOne({ _id: propertyId })
    DB-->>API: Deletion confirmed

    API-->>UI: 200 OK - Property deleted
    UI-->>Landlord: Remove card from list, show success toast
```
