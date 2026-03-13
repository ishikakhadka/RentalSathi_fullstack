# Data Flow Diagram (DFD) — Gane and Sarson Notation

**Notation Legend (Gane and Sarson):**

| Mermaid Shape | Symbol Type | Meaning |
|---|---|---|
| `["Name"]` — plain rectangle | **External Entity** | Source or sink of data; exists outside the system boundary |
| `("P#.# \| Name")` — rounded rectangle | **Process** | Transforms or routes data; identified by process number |
| `[["D# \| Name"]]` — double-line rectangle | **Data Store** | Repository where data is held at rest |
| `-->\|"label"\|` — labelled arrow | **Data Flow** | Data in motion between elements |

---

## Level 0 – Context Diagram

Represents the entire RentalSathi platform as a single process (P0.0) and identifies all external entities that supply or receive data. No data stores appear at this level — only the system boundary and its actors.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#222222', 'lineColor': '#222222', 'fontSize': '14px'}}}%%
flowchart LR
    classDef entity  fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000
    classDef process fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000

    Guest["Guest"]:::entity
    Landlord["Landlord"]:::entity
    Tenant["Tenant"]:::entity

    P0("P0.0 | RentalSathi\nPlatform"):::process

    Guest    -->|"register / login credentials"| P0
    P0       -->|"auth token + role"| Guest

    Landlord -->|"login, property data"| P0
    P0       -->|"confirmation, property listings"| Landlord

    Tenant   -->|"login, browse, save, chat"| P0
    P0       -->|"property list, basket, messages"| Tenant
```

---

## Level 1 – System Decomposition

Decomposes the platform into five primary processes and shows the data flows between them, the external entities, and the three data stores.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#222222', 'lineColor': '#222222', 'fontSize': '13px'}}}%%
flowchart TD
    classDef entity  fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000
    classDef process fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000
    classDef store   fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000

    %% ── External Entities ──
    Guest["Guest"]:::entity
    Landlord["Landlord"]:::entity
    Tenant["Tenant"]:::entity

    %% ── Processes ──
    P1("P1.0 | User\nAuthentication"):::process
    P2("P2.0 | Property\nManagement"):::process
    P3("P3.0 | Property\nBrowsing & Search"):::process
    P4("P4.0 | Cart / Basket\nManagement"):::process
    P5("P5.0 | Real-time\nChat"):::process

    %% ── Data Stores ──
    D1[["D1 | Users"]]:::store
    D2[["D2 | Properties"]]:::store
    D3[["D3 | Cart"]]:::store

    %% ── Auth flows ──
    Guest    -->|"register / login credentials"| P1
    P1       -->|"JWT + role"| Guest
    P1       <-->|"read / write user record"| D1
    P1       -->|"JWT + role"| Landlord
    P1       -->|"JWT + role"| Tenant

    %% ── Property Management flows ──
    Landlord -->|"property data (add / edit / delete)"| P2
    P2       <-->|"property records"| D2
    P2       -->|"confirmation / error"| Landlord

    %% ── Browsing flows ──
    Tenant   -->|"page + category filter"| P3
    D2       -->|"property records"| P3
    P3       -->|"paginated list / property detail"| Tenant

    %% ── Cart flows ──
    Tenant   -->|"propertyId (add / remove)"| P4
    P4       <-->|"cart records"| D3
    D2       -->|"property details (lookup)"| P4
    P4       -->|"basket list, count"| Tenant

    %% ── Chat flows ──
    Tenant   -->|"chat message"| P5
    Landlord -->|"chat message"| P5
    P5       -->|"broadcast message"| Tenant
    P5       -->|"broadcast message"| Landlord
```

---

## Level 2 – User Authentication Sub-Process

Expands P1.0 (User Authentication) into its numbered sub-processes, showing both the registration and login paths and their interaction with the Users data store.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ffffff', 'primaryBorderColor': '#222222', 'lineColor': '#222222', 'fontSize': '13px'}}}%%
flowchart TD
    classDef entity  fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000
    classDef process fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000
    classDef store   fill:#ffffff,stroke:#222222,stroke-width:2px,color:#000000

    %% ── External Entity ──
    User["User\n(Guest)"]:::entity

    %% ── Data Store ──
    D1[["D1 | Users"]]:::store

    %% ── Registration Sub-processes ──
    P1_1("P1.1 | Validate\nSchema"):::process
    P1_2("P1.2 | Check Email\nDuplicate"):::process
    P1_3("P1.3 | Hash\nPassword"):::process
    P1_4("P1.4 | Create\nUser Record"):::process

    %% ── Login Sub-processes ──
    P1_5("P1.5 | Find User\nby Email"):::process
    P1_6("P1.6 | Verify\nPassword"):::process
    P1_7("P1.7 | Generate\nJWT Token"):::process

    %% ── Registration Flow ──
    User  -->|"register credentials"| P1_1
    P1_1  -->|"validated data"| P1_2
    P1_2  <-->|"query by email"| D1
    P1_2  -->|"email is unique"| P1_3
    P1_3  -->|"hashed password"| P1_4
    P1_4  -->|"write new user"| D1
    P1_4  -->|"201 Created"| User

    %% ── Login Flow ──
    User  -->|"login credentials"| P1_5
    P1_5  <-->|"fetch user by email"| D1
    P1_5  -->|"hashed password"| P1_6
    P1_6  -->|"password verified"| P1_7
    P1_7  -->|"JWT + userDetails"| User
```
