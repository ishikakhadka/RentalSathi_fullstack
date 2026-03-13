# Activity Diagrams — UML Notation

UML Activity Diagrams for the five core workflows of RentalSathi.

**Notation (UML Activity Diagram):**

| Symbol | Mermaid Element | Meaning |
|---|---|---|
| Filled circle ● | `[*]` at start | **Initial State** — entry point of the activity |
| Bullseye ◉ | `[*]` at end | **Final State** — termination of the activity |
| Rounded rectangle | Plain state node | **Action State** — an individual step or operation |
| Diamond ◇ | `state id <<choice>>` | **Decision Node** — branch based on guard condition |
| `[condition]` on arrow | `: [guard]` label | **Guard Condition** — transition fires only when true |
| Arrow | `-->` | **Control Flow** — sequence between actions |

---

## 1. User Registration

Covers the full registration flow from form entry through client validation, server schema check, duplicate email detection, bcrypt hashing, and account creation.

```mermaid
stateDiagram-v2
    state "Fill Registration Form" as FillForm
    state "Client-side Yup Validation" as ClientVal
    state "Display Field Errors" as ShowErr
    state "POST /user/register" as PostReg
    state "Server Yup Validation Middleware" as ServerVal
    state "UserTable.findOne(email)" as CheckEmail
    state "bcrypt.hash(password, 10)" as HashPwd
    state "UserTable.create(newUser)" as CreateUser
    state "Return 201 Created" as Done
    state "Return 400 Bad Request" as Err400
    state "Return 409 Conflict" as Err409

    state IsClientValid <<choice>>
    state IsServerValid <<choice>>
    state IsEmailFree   <<choice>>

    [*] --> FillForm
    FillForm   --> ClientVal     : submit
    ClientVal  --> IsClientValid
    IsClientValid --> ShowErr    : [invalid - show field errors]
    ShowErr    --> FillForm
    IsClientValid --> PostReg    : [valid]

    PostReg    --> ServerVal
    ServerVal  --> IsServerValid
    IsServerValid --> Err400     : [schema invalid]
    IsServerValid --> CheckEmail : [schema valid]
    Err400     --> [*]

    CheckEmail --> IsEmailFree
    IsEmailFree --> Err409       : [email already exists]
    IsEmailFree --> HashPwd      : [email is free]
    Err409     --> [*]

    HashPwd    --> CreateUser
    CreateUser --> Done
    Done       --> [*]
```

---

## 2. User Login

Covers the login flow from credential entry through client validation, user lookup, bcrypt comparison, JWT issuance, localStorage persistence, and role-based redirect.

```mermaid
stateDiagram-v2
    state "Fill Login Form (email, password)" as FillForm
    state "Client-side Yup Validation" as ClientVal
    state "Display Form Error" as ShowErr
    state "POST /user/login" as PostLogin
    state "UserTable.findOne(email)" as FindUser
    state "bcrypt.compare(plain, hashed)" as CmpPwd
    state "jwt.sign(email, secretKey, 7d)" as GenToken
    state "Store token + role in localStorage" as StoreToken
    state "Redirect to role-based dashboard" as Redirect
    state "Return 404 - User not found" as ErrNoUser
    state "Return 404 - Password mismatch" as ErrBadPwd

    state IsClientValid <<choice>>
    state IsUserFound   <<choice>>
    state IsPwdMatch    <<choice>>

    [*] --> FillForm
    FillForm   --> ClientVal    : submit
    ClientVal  --> IsClientValid
    IsClientValid --> ShowErr   : [invalid]
    ShowErr    --> FillForm
    IsClientValid --> PostLogin : [valid]

    PostLogin  --> FindUser
    FindUser   --> IsUserFound
    IsUserFound --> ErrNoUser   : [user not found]
    IsUserFound --> CmpPwd      : [user found]
    ErrNoUser  --> [*]

    CmpPwd     --> IsPwdMatch
    IsPwdMatch --> ErrBadPwd    : [no match]
    IsPwdMatch --> GenToken     : [match]
    ErrBadPwd  --> [*]

    GenToken   --> StoreToken
    StoreToken --> Redirect
    Redirect   --> [*]
```

---

## 3. Landlord: Add Property

Covers the property creation flow: client form validation, Bearer-token isLandlord middleware, server PropertySchema validation, database persistence, and React Query cache invalidation.

```mermaid
stateDiagram-v2
    state "Fill AddPropertyForm" as FillForm
    state "Client-side Yup Validation" as ClientVal
    state "Display Form Errors" as ShowErr
    state "POST /properties/add + Bearer token" as PostAdd
    state "isLandlord middleware - jwt.verify()" as AuthMW
    state "validateReqBody(PropertySchema)" as BodyMW
    state "PropertyTable.create(body, landlordId)" as CreateProp
    state "Return 201 Created" as Done
    state "React Query cache invalidated" as Invalidate
    state "Return 401 Unauthorized" as Err401
    state "Return 400 Bad Request" as Err400

    state IsClientValid <<choice>>
    state IsAuthorized  <<choice>>
    state IsBodyValid   <<choice>>

    [*] --> FillForm
    FillForm   --> ClientVal     : submit
    ClientVal  --> IsClientValid
    IsClientValid --> ShowErr    : [invalid]
    ShowErr    --> FillForm
    IsClientValid --> PostAdd    : [valid]

    PostAdd    --> AuthMW
    AuthMW     --> IsAuthorized
    IsAuthorized --> Err401      : [invalid token / role != landlord]
    IsAuthorized --> BodyMW      : [token valid, role = landlord]
    Err401     --> [*]

    BodyMW     --> IsBodyValid
    IsBodyValid --> Err400       : [schema invalid]
    IsBodyValid --> CreateProp   : [schema valid]
    Err400     --> [*]

    CreateProp --> Done
    Done       --> Invalidate
    Invalidate --> [*]
```

---

## 4. Tenant: Add Property to Basket

Illustrates the full middleware chain: isTenant JWT check, Mongo ObjectId validation, property existence check, duplicate cart entry check, and cart insertion.

```mermaid
stateDiagram-v2
    state "Tenant submits POST /cart/property/add + token" as Req
    state "isTenant middleware - jwt.verify()" as AuthMW
    state "Validate propertyId (Mongo ObjectId)" as ValidateId
    state "PropertyTable.findById(propertyId)" as FindProp
    state "CartTable.findOne(tenantId, propertyId)" as CheckDup
    state "CartTable.create(tenantId, propertyId)" as SaveCart
    state "Return 200 OK — Added to basket" as Done
    state "Return 401 Unauthorized" as Err401
    state "Return 400 Bad Request — Invalid propertyId" as Err400
    state "Return 404 Not Found — Property not found" as Err404
    state "Return 409 Conflict — Already in basket" as Err409

    state IsAuth      <<choice>>
    state IsIdValid   <<choice>>
    state IsPropFound <<choice>>
    state IsDuplicate <<choice>>

    [*] --> Req
    Req        --> AuthMW
    AuthMW     --> IsAuth
    IsAuth     --> Err401      : [invalid token / role != tenant]
    IsAuth     --> ValidateId  : [token valid, role = tenant]
    Err401     --> [*]

    ValidateId --> IsIdValid
    IsIdValid  --> Err400      : [not a valid ObjectId]
    IsIdValid  --> FindProp    : [valid ObjectId]
    Err400     --> [*]

    FindProp   --> IsPropFound
    IsPropFound --> Err404     : [property not found]
    IsPropFound --> CheckDup   : [property exists]
    Err404     --> [*]

    CheckDup   --> IsDuplicate
    IsDuplicate --> Err409     : [already saved]
    IsDuplicate --> SaveCart   : [not yet saved]
    Err409     --> [*]

    SaveCart   --> Done
    Done       --> [*]
```

---

## 5. Landlord: Delete Property

Covers the deletion flow: UI confirmation dialog, isLandlord JWT check, Mongo ObjectId validation, isOwnerOfProperty ownership check, and database deletion.

```mermaid
stateDiagram-v2
    state "Landlord clicks Delete on property card" as ClickDelete
    state "Confirmation dialog shown" as Confirm
    state "DELETE /properties/delete/:id + JWT" as DeleteReq
    state "isLandlord middleware - jwt.verify()" as AuthMW
    state "validateMongoIdFromReqParams" as ValidateId
    state "isOwnerOfProperty middleware" as OwnerMW
    state "PropertyTable.findByIdAndDelete(id)" as Delete
    state "Return 200 OK — Deleted" as Done
    state "No action — operation cancelled" as Cancel
    state "Return 401 Unauthorized" as Err401
    state "Return 400 Bad Request — Invalid ID" as Err400
    state "Return 403 Forbidden — Not property owner" as Err403

    state IsConfirmed <<choice>>
    state IsAuth      <<choice>>
    state IsIdValid   <<choice>>
    state IsOwner     <<choice>>

    [*] --> ClickDelete
    ClickDelete --> Confirm
    Confirm    --> IsConfirmed
    IsConfirmed --> Cancel      : [cancelled by user]
    IsConfirmed --> DeleteReq   : [confirmed]
    Cancel     --> [*]

    DeleteReq  --> AuthMW
    AuthMW     --> IsAuth
    IsAuth     --> Err401       : [invalid token / role != landlord]
    IsAuth     --> ValidateId   : [token valid, role = landlord]
    Err401     --> [*]

    ValidateId --> IsIdValid
    IsIdValid  --> Err400       : [not a valid ObjectId]
    IsIdValid  --> OwnerMW      : [valid ObjectId]
    Err400     --> [*]

    OwnerMW    --> IsOwner
    IsOwner    --> Err403       : [landlordId != loggedInUserId]
    IsOwner    --> Delete       : [landlordId = loggedInUserId]
    Err403     --> [*]

    Delete     --> Done
    Done       --> [*]
```
