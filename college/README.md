# CampusFind — College Lost & Found Management System 🎓

> **"Lost Today. Found Tomorrow."**

A centralized, production-quality, modern web application designed specifically for colleges and universities to report missing belongings, register found items, verify ownership through a confidential 8-question challenge, and safely conduct in-person physical handovers.

---

## 🎨 1. Design & Visual Identity

CampusFind is designed with a futuristic dark collegiate aesthetic:

| Element | Specification | Hex / Value |
| :--- | :--- | :--- |
| **Theme** | Modern Dark | Sleek, high-contrast, distraction-free |
| **Primary Background** | Deep Obsidian Black | `#080808` |
| **Secondary Background** | Charcoal Elevation | `#111111` |
| **Primary Accent** | Electric Violet | `#8B5CF6` |
| **Secondary Accent** | Soft Lavender | `#A78BFA` |
| **Text** | Pure White & Soft Slate | `#FFFFFF` & `#94A3B8` / `#CBD5E1` |
| **Cards & Panels** | Glassmorphism | `backdrop-blur-md bg-white/[0.03] border border-purple-500/15` |
| **Buttons** | Purple Gradient | `linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)` |
| **Typography** | Modern Sans & Monospace | `Inter` (UI) & `JetBrains Mono` (Report codes) |

---

## ⚡ 2. Instant Launch (Zero Build-Step Required)

The application is completely self-contained and ready to run immediately in any web browser without needing Node.js or npm installed:

### Simply Open in Browser:
1. Navigate to:
   ```
   c:\Users\alrin\Downloads\antigravity\college\index.html
   ```
2. Double-click **`index.html`** or right-click &rarr; **Open with Google Chrome / Microsoft Edge / Firefox**.

---

## 🔐 3. Authentication & Role-Based Access

The system supports two core university roles with an **instant demo switcher** at the top right of the application:

1. **Student Role (Alex Rivera)**:
   - **Email**: `alex.rivera@campus.edu`
   - **Student ID**: `ST-2024-8192`
   - **Department**: Computer Science & Engineering
   - **Capabilities**: Report lost items, register found items, file ownership claims, view personal dashboard, generate printable flyers.

2. **Administrator Role (Chief Marcus Miller)**:
   - **Email**: `chief.miller@campus.edu`
   - **Staff ID**: `STAFF-SEC-01`
   - **Department**: Campus Safety & Police Department
   - **Capabilities**: Full access to Admin Portal, view confidential claim evidence, approve/reject claims, request additional proof, conduct physical handovers, review audit logs.

---

## 📋 4. Key Modules & Features

### A. 🏠 Modern Landing Page
- **Hero Section**:
  - Heading: *"Lost Something on Campus?"*
  - Subheading: *"Your campus community can help bring it back. Report missing belongings, discover found items, and reconnect with what matters."*
  - CTAs: **Report Lost Item** (Rose gradient), **Report Found Item** (Emerald gradient), **Browse Items**.
  - **Live Campus Statistics**: Total reports, items safely returned, active claims, recovery rate.
- **Recently Reported Feed**: Real-time cards showing latest reported items with status badges.
- **How CampusFind Works**: 3-step explanation of confidential reporting, AI matching, and verified custody.
- **Campus Custody Directory**: Working hours, locations, and direct phone extensions for Gate 1 Security, Central Library Desk #2, and Student Union Desk.

### B. 🔍 Browse & Search Catalog
- **Live Search**: Instant keyword matching across titles, brands, categories, descriptions, and reference codes.
- **Category Filter Pills**: Electronics, Student ID & Cards, Keys & Badges, Bags & Backpacks, Bottles & Flasks, Books & Notes, Clothing & Apparel, Valuables & Jewelry.
- **Campus Building Filter**: Central Library, Engineering Hall, Dining Center, Athletics Pavilion, Science Complex, Student Union, Humanities, Shuttles.
- **Status Tabs**: All Items, Lost Items, Found Items in Custody, Reunited.
- **Strict Public Privacy**: Item cards NEVER expose personal phone numbers or confidential identifying marks.

### C. 📝 Report a Lost Item (5-Step Form)
1. **Reporter Info**: Name, `.edu` email, department, contact phone (flagged as private).
2. **Item Identification**: Name, category, brand, color, public description, photo.
3. **Location Details**: Campus building, specific room/pod, area notes.
4. **Timing Information**: Date & time last seen, date & time noticed missing.
5. **Confidential Identifying Marks**: Stored securely; never revealed to public claimants.
- Generates a unique tracking code: `LOST-2026-XXXX`.

### D. 📦 Report a Found Item
1. General item name & category.
2. Found location, building, date, and approximate time found.
3. **Current Possession Status**:
   - *Stored in designated lost-and-found location* (e.g. Gate 1 Locker, Library Desk)
   - *Submitted to college security or administrative office*
   - *With finder (will handover to security upon claim)*
- Generates a unique tracking code: `FND-2026-XXXX`.

### E. 🛡️ Ownership Verification & Claim System (8 Questions)
When a student clicks **"Claim This Item"**, they must answer the 8 mandatory verification questions:
1. *Describe the item's unique physical characteristics.*
2. *What makes this item distinguishable from similar items?*
3. *Where did you last have the item?*
4. *Approximately when did you lose it?*
5. *Approximate time noticed missing.*
6. *What identifying marks, engravings, or accessories does it have?*
7. *Can you provide purchase receipt or supporting document details?*
8. *Do you have any additional evidence of ownership?*
- Plus optional evidence document upload URL.
- Stored as a private claim: `CLM-2026-XXXX`.

### F. 👑 Administrative Dashboard
- **Key Metrics**: Total reports, lost count, found count, pending claims, approved claims, returned count, recovery rate.
- **Claim Review Queue**: Inspect claimant's 8 answers. Actions:
  - **✓ Approve Claim for Handover**
  - **Request Additional Proof** (with custom message)
  - **Reject Claim** (with reason notes)
- **Physical Handover Registry**: When conducting handover, records:
  - Recipient verified Student ID number.
  - Handover location (e.g. Gate 1 Desk).
  - Authorized officer name & timestamp.
  - Automatically updates item status to **RETURNED**.
- **Administrative Audit Trail**: Chronological log of every action taken.

### G. 👤 Student Dashboard
- **My Lost Reports**: Inspect reports, track status, delete reports, generate printable flyers.
- **My Submitted Claims**: Track claim progress (`pending`, `under_review`, `additional_proof_required`, `approved`, `returned`).
- **My Found Reports**: View items turned in and custody assignments.

### H. 🤖 Smart AI Matching Engine
- Automatically correlates active Lost reports with registered Found items.
- Evaluates category match, location building proximity, keyword tokens, and date closeness.
- Generates confidence score (e.g. `92% Match`) with side-by-side comparison.
- **Policy**: Suggestions are algorithmic aids and never constitute automatic claim approval.

### I. 🖨️ Printable Campus Notice Flyer
- One-click generation of an official university 8.5x11 bulletin flyer with item photograph, location, reward, and QR code representation ready for physical pinning.

---

## 🗄️ 5. PostgreSQL Database Architecture (Supabase)

The file `college/supabase_schema.sql` contains the complete production PostgreSQL schema with:
1. `profiles` (UUID, roles: student/admin, status: active/restricted)
2. `categories` (Name, icon, description)
3. `lost_items` (Report code, location, timestamps, confidential unique marks)
4. `found_items` (Report code, location, possession status, custody details)
5. `ownership_claims` (The 8 verification answers, evidence attachments, status)
6. `handover_records` (Handover date, location, verified student ID, admin ID)
7. `notifications` (User alerts, read/unread states)
8. `admin_activity_logs` (Immutable audit trail)
9. **Row Level Security (RLS)**: Enforces that confidential ownership answers and evidence are ONLY viewable by the claimant and authorized admins.

---

## 📁 6. Project File Structure

```
antigravity/college/
├── index.html               # Complete, standalone, production-ready web application
├── README.md                # Comprehensive documentation manual
├── supabase_schema.sql      # Supabase PostgreSQL schema with RLS and triggers
├── .env.example             # Supabase credentials configuration template
└── src/
    ├── types/
    │   └── database.ts      # TypeScript interfaces for all 8 database entities
    └── lib/
        └── supabase.ts      # Supabase client helper
```
