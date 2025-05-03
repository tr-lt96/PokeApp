# Pokédex Team Builder 🧩

## 📌 Project Overview

**Pokédex Team Builder** is a full-stack web app that allows users to search Pokémon, create custom teams, and analyze type strengths/weaknesses. It integrates with [PokéAPI](https://pokeapi.co/) and provides secure user authentication, cached Pokémon data, and a responsive REST API.

### 🔍 What does it solve?

- Helps Pokémon fans plan battle strategies with real-time data.
- Allows users to save and manage multiple Pokémon teams.
- Provides a structured backend that caches frequently accessed Pokémon data.

### ✨ Key Features

- 🔐 JWT-based authentication (register/login/logout)
- 📦 Search & cache Pokémon info from PokeAPI
- 🧠 Evaluate team strengths and weaknesses using a custom type chart
- 🧙 Pokémon filtering by type, pagination
- 🔧 Change password, view user info and owned teams
- ⚡ Caddy HTTPS-ready reverse proxy configuration

---

## 🛠 Installation Instructions

### ✅ Prerequisites

- Node.js v16+
- npm
- MongoDB (local or cloud)
- (Optional for HTTPS) Caddy v2

---

### 🔧 Backend Setup

1. **Navigate into the project:**

   ```bash
   cd Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment setup:**

   Create a `.env` file:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/pokemonapp
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server:**

   ```bash
   npm start
   ```

   By default, your backend will run on:  
   `http://localhost:3000`

---

## 🌐 Caddy Setup for Localhost or Domain

If you want to serve the backend securely via Caddy:

1. **Install Caddy:**  
   Follow [official Caddy instructions](https://caddyserver.com/docs/install).

2. **Create a Caddyfile** at the root of your project:

   ```caddy
   # For production (domain-based)
   yourdomain.com {
       reverse_proxy localhost:3000
   }

   # For local development (HTTP)
   localhost:80 {
       reverse_proxy localhost:3000
   }
   ```

3. **Run Caddy:**

   ```bash
   sudo caddy run --config ./Caddyfile
   ```

---

## 🚀 Usage Instructions

After login, include the token in your headers:

```
Authorization: Bearer <your-token>
```

### 🧪 Common API Endpoints

| Method | Endpoint                        | Description                           |
|--------|----------------------------------|---------------------------------------|
| POST   | `/api/auth/register`            | Register new user                     |
| POST   | `/api/auth/login`               | Login with username/email             |
| GET    | `/api/auth/userInformation`     | Get user info and their teams         |
| PUT    | `/api/auth/change-password`     | Change current password               |
| POST   | `/api/auth/logout`              | Logout (client clears token)          |
| GET    | `/api/pokemon`                  | Search Pokémon by name                |
| GET    | `/api/pokemon/type/:type`       | Get Pokémon by type (e.g., fire)      |
| GET    | `/api/pokemon/all`              | Paginated list of all Pokémon         |
| POST   | `/api/team/create`              | Create a new team                     |
| POST   | `/api/team/:teamId/pokemon`     | Add Pokémon to team                   |
| GET    | `/api/team/:teamId`             | Get a team by ID                      |
| GET    | `/api/team/`                    | List all user's teams                 |
| GET    | `/api/team/:teamId/evaluation`  | Evaluate strengths/weaknesses         |
| DELETE | `/api/team/:teamId`             | Delete a team                         |

---

## 💻 Contributing

Want to contribute?

1. Clone or unzip the repo
2. Create a new branch:  
   `git checkout -b feature/myFeature`
3. Make your changes
4. Test locally
5. Submit via email or GitHub if needed

**Guidelines:**

- Use consistent formatting (Prettier)
- Write clean, modular code
- Test endpoints before pushing changes

---

## 🧱 Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt
- PokéAPI integration
- Caddy (reverse proxy, HTTPS)
- React (frontend, not covered here)

---

## 🎯 Future Features

- Avatar upload
- Public team sharing
- Rate Pokémon
- Battle simulation

---

## 🐞 Reporting Issues

Having trouble?

1. Make sure MongoDB is running.
2. Check your `.env` file is correct.
3. Check console logs in both backend and frontend.
4. Validate API requests with Postman or Hoppscotch.

Still stuck? Create a structured report:

```text
Endpoint: POST /api/team/create
Payload: { name: "Ash Team" }
Error: 401 Unauthorized
```

---

## 📜 License

This project is distributed for educational use.  
Use it freely, but give credit where due.
