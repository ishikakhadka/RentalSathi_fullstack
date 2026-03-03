# Data Flow Diagram (DFD)

## Level 0 – Context Diagram

A context diagram shows the entire system as a single process and identifies the external entities that interact with it.

```mermaid
flowchart LR
    Landlord(["👤 Landlord"])
    Tenant(["👤 Tenant"])
    Guest(["👤 Guest"])

    subgraph RS["RentalSathi System"]
        direction TB
        P0["💻 RentalSathi Platform"]
    end

    subgraph DB["External Stores"]
        MongoDB[("🗄️ MongoDB")]
    end

    Guest -- "Register / Login request" --> P0
    P0 -- "Auth token + role" --> Guest

    Landlord -- "Login, Add/Edit/Delete Property" --> P0
    P0 -- "Property confirmation, Listings" --> Landlord

    Tenant -- "Login, Browse, Save Property, Chat" --> P0
    P0 -- "Property list, Details, Basket, Chat" --> Tenant

    P0 <--> MongoDB
```

---

## Level 1 – System Decomposition

Level 1 decomposes the platform into its primary functional processes and shows how data flows between them.

```mermaid
flowchart TD
    %% External Entities
    Landlord(["👤 Landlord"])
    Tenant(["👤 Tenant"])
    Guest(["👤 Guest"])

    %% Data Stores
    DS1[("D1: Users")]
    DS2[("D2: Properties")]
    DS3[("D3: Cart")]

    %% Processes
    P1["1.0 User Registration& Login"]
    P2["2.0 PropertyManagement"]
    P3["3.0 PropertyBrowsing &Search"]
    P4["4.0 Cart / BasketManagement"]
    P5["5.0 Real-timeChat"]

    %% Guest → Auth
    Guest -- "Register credentials" --> P1
    Guest -- "Login credentials" --> P1
    P1 -- "Hashed user record" --> DS1
    P1 -- "JWT + role" --> Guest
    P1 -- "JWT + role" --> Landlord
    P1 -- "JWT + role" --> Tenant

    %% Landlord → Property Management
    Landlord -- "Property data (title, price, etc.)" --> P2
    P2 -- "Validated property record" --> DS2
    DS2 -- "Owned property list" --> P2
    P2 -- "Confirmation / error" --> Landlord

    %% Tenant → Browse
    Tenant -- "Pagination params + filters" --> P3
    DS2 -- "All property records" --> P3
    P3 -- "Paginated property list / detail" --> Tenant

    %% Tenant → Cart
    Tenant -- "propertyId (add/remove)" --> P4
    P4 -- "Cart record" --> DS3
    DS3 -- "Saved properties" --> P4
    P4 -- "Basket list / count" --> Tenant
    DS2 -- "Property details (lookup)" --> P4

    %% Real-time Chat
    Tenant -- "Chat message" --> P5
    Landlord -- "Chat message" --> P5
    P5 -- "Broadcast message" --> Tenant
    P5 -- "Broadcast message" --> Landlord
```

---

## Level 2 – User Authentication Process (Expanded)

```mermaid
flowchart TD
    A([Start]) --> B["Receive credentials from client"]
    B --> C{"Request type?"}
    C -- "Register" --> D["Validate schema (Yup)"]
    C -- "Login" --> H["Validate schema (Yup)"]

    D --> E{"Email already exists?"}
    E -- "Yes" --> F["Return 409 User already exists"]
    E -- "No" --> G["Hash password (bcrypt, 10 rounds)"]
    G --> G2["Save user to DB"]
    G2 --> G3["Return 201 Created"]

    H --> I{"User found in DB?"}
    I -- "No" --> J["Return 404 Invalid credentials"]
    I -- "Yes" --> K["Compare plain vs hashed password (bcrypt.compare)"]
    K -- "No match" --> J
    K -- "Match" --> L["Sign JWT (7d expiry)"]
    L --> M["Return 200 token + userDetails"]
```
