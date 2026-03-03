# RentalSathi – High-Level System Documentation

## Overview

**RentalSathi** is a full-stack rental property management platform that connects **Landlords** and **Tenants**. Landlords can list, edit, and remove rental properties; Tenants can browse, filter, view property details, and save properties to a personal basket (cart). Real-time chat between users is supported via Socket.IO.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, MUI, React Query |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) + bcrypt |
| Real-time | Socket.IO |
| Validation | Yup |
| Deployment | Vercel (frontend), render/cloud (backend) |

---

## Documentation Index

| Document | Description |
|---|---|
| [Data Flow Diagram (DFD)](./docs/DFD.md) | Level 0 and Level 1 DFDs showing data movement |
| [Database Design](./docs/database-design.md) | MongoDB schema design and entity relationships |
| [Sequence Diagrams](./docs/sequence-diagrams.md) | Step-by-step interaction sequences for key use cases |
| [Flow Diagrams](./docs/flow-diagrams.md) | Process flows for authentication, property management, and cart |

---

## User Roles

| Role | Capabilities |
|---|---|
| **Guest** | View login/register pages only |
| **Landlord** | Add, edit, delete own properties; view own property list |
| **Tenant** | Browse all properties, view property details, manage saved-property basket, chat |

---

## Core Modules

- **User Module** – Registration, login, JWT issuance
- **Properties Module** – CRUD operations for rental listings (role-gated)
- **Cart Module** – Tenant's saved-property basket (add, remove, flush, list, count)
- **Authentication Middleware** – Guards: `isLandlord`, `isTenant`, `isUser`
- **Real-time Module** – Socket.IO for live chat between users
