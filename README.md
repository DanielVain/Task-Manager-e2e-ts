# 📝 TaskManager Full-Stack (TS/ESM)

A robust, type-safe Task Management application built with a focus on professional Git workflows and modern TypeScript standards. This project features a complete Express REST API and a React frontend, synchronized via a feature-branching strategy.

## 🚀 Key Features

- **Full CRUD:** Create, Read, Update (Title & Status), and Delete tasks.
- **Strict Type Safety:** Shared interfaces and strict TypeScript configurations across Client and Server.
- **Modern ESM:** Built using ECMAScript Modules (`NodeNext`) and high-performance Vite tooling.
- **Branch-Based Development:** Developed using 100% Pull Request workflow (no direct commits to `main`).

---

## 🛠️ Tech Stack

### Backend (`/server`)

- **Node.js & Express.js**
- **TypeScript** (Strict mode, `noUncheckedIndexedAccess`)
- **CORS** middleware for secure cross-origin communication.

### Frontend (`/client`)

- **React 18** (Vite-powered)
- **TypeScript**
- **Axios** for API integration.

---

## 🌿 Git Branching Strategy

This project was developed following a strict feature-branching model:

| Branch                | Purpose                                                      |
| :-------------------- | :----------------------------------------------------------- |
| `setup-project`       | Initialized folder structure and `.gitignore`.               |
| `server-setup`        | Configured Express with TS/ESM and base routes.              |
| `server-crud`         | Implemented full RESTful API logic (GET, POST, PUT, DELETE). |
| `client-ui`           | Initialized React-TS skeleton and basic list layout.         |
| `add-task-feature`    | Implemented task creation form and state updates.            |
| `delete-task-feature` | Added task removal logic and UI filtering.                   |
| `edit-task-feature`   | Implemented status toggling and title editing.               |

---

## 🚦 Getting Started

### 1. Prerequisites

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

### 2. Installation

Clone the repository and install dependencies for both sections:

```bash
# Clone
git clone [https://github.com/DanielVain/Task-Manager-e2e-ts.git](https://github.com/DanielVain/Task-Manager-e2e-ts.git)
cd Task-Manager-e2e-ts

# Install Server
cd server
npm install

# Install Client
cd ../client
npm install
```
