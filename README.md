# 🧪 Slooze Frontend Take-Home Challenge

Commodities Management System (Frontend)

## Objective

Design and implement a frontend-only Commodities Management System that demonstrates:

- Authentication
- Role-Based Access Control (RBAC)
- UI-level feature restrictions
- Dashboard & product management flows
- Theme switching (Light/Dark)

This project showcases frontend architecture, clean UI logic, and role-based authorization without a backend.

## Scope

This is a frontend-only challenge implemented with HTML, CSS and JavaScript. Backend APIs are mocked using localStorage.

## Features

- Sign Up & Login (localStorage-based mock auth)
- Role-Based Access Control (Manager vs Store Keeper)
- Manager-only Dashboard with mock summary cards
- Products listing (shared for both roles)
- Theme toggle (Light/Dark) with persistence
- UI-level role restrictions (hide/disable items and protect routes)

## User Roles

1. Manager
2. Store Keeper

## How it works

- Sign Up: stores user (name, email, password, role) in `localStorage`.
- Login: validates against stored user and stores session in `localStorage`.
- Role-based redirect: Manager → Dashboard, Store Keeper → Products.

## Technical details

- Tech: HTML, CSS, JavaScript (Vanilla)
- State: `localStorage` used for user, session, role, and theme preference
- Routing & protection: pages check `localStorage` for role/session and redirect if unauthorized

## How to run

1. Open the project folder in VS Code.
2. Open `Frontend/signup.html` (use Live Server extension for best results).
3. Create an account, then login and verify role-based navigation.

## What I changed/fixed

- Fixed `js/auth.js` to use form-scoped inputs and added basic validation so signup redirects properly to `login.html`.
- Ensured pages load their scripts using correct relative paths.

## Next steps (optional)

- Support multiple users (persist an array of users in `localStorage`).
- Replace alerts with inline UI messages.
- Add product CRUD persisted to `localStorage`.

---

If you want, I can commit these changes and push them to your GitHub repo for you — tell me to `push` and I will run the necessary git commands.
