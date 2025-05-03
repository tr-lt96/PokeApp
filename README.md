# PokeApp - Pokémon Team Builder

PokeApp is a full-stack web application designed for Pokémon enthusiasts. It allows users to register/login, search Pokémon from the PokéAPI, create a custom team of up to 6 Pokémon, and analyze their strengths and weaknesses. The app caches Pokémon data to optimize performance and supports authentication and protected routes.

---

## Project Overview

- **What is it?**  
  A full-stack Pokémon Team Builder web app built with Node.js, Express, MongoDB, and Caddy for deployment.

- **What problem does it solve?**  
  It helps users build strategic Pokémon teams and view their overall type advantages and disadvantages.

- **Why is it useful?**  
  Provides quick access to Pokémon data, user-friendly team management, and educational insights into Pokémon type matchups.

- **Key Features:**
  - User registration and JWT-based authentication
  - Secure password hashing and change password flow
  - Team creation, evaluation, and deletion
  - Pokémon search with live cache updates
  - RESTful API design with validations
  - Pokémon type filtering and pagination

---

## Installation Instructions

### Prerequisites:

- Node.js (v16+)
- npm (Node Package Manager)
- MongoDB (local or cloud)
- Caddy (optional for production server)

### Steps:

```bash
# 1. Clone the repository
git clone https://github.com/tr-lt96/PokeApp.git
cd PokeApp

# 2. Install dependencies
npm install

# 3. Create .env or config.js for environment variables
# Example values:
PORT=3000
MONGO_URI=mongodb://localhost:27017/pokeapp
JWT_SECRET=your_jwt_secret
POKE_API_BASE_URL=https://pokeapi.co/api/v2

# 4. Start the backend
npm run dev
```

---

## Caddy Setup for Deployment

If you want to serve the backend securely via Caddy:

1. Install Caddy: Follow the instruction from [Practical 2](https://canvas.qut.edu.au/courses/21188/pages/2-dot-3-practical?module_item_id=1901576).


2. Example `Caddyfile` (for `n11423714.ifn666.com`):

```
n11423714.ifn666.com {
  reverse_proxy localhost:3000
}
```

3. Reload Caddy:
```bash
sudo systemctl reload caddy
```

---

## API Endpoints

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
| POST   | `/api/teams/create`              | Create a new team                     |
| POST   | `/api/teams/:teamId/pokemon`     | Add Pokémon to team                   |
| GET    | `/api/teams/:teamId`             | Get a team by ID                      |
| GET    | `/api/teams/`                    | List all user's teams                 |
| GET    | `/api/teams/:teamId/evaluation`  | Evaluate strengths/weaknesses         |
| DELETE | `/api/teams/:teamId`             | Delete a team                         |


---

## Usage Instructions

1. Register or Login to get a JWT token.
2. Include the JWT token in the `Authorization` header as `Bearer <token>` for all protected endpoints.
3. Start building your Pokémon team and fetch analysis data!

---

## Contributing

We welcome contributions! Here's how:

1. Fork the repo
2. Create a new branch: `git checkout -b feature-name`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push changes: `git push origin feature-name`
5. Submit a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- Caddy (deployment)
- PokeAPI
- JWT for Auth
- bcrypt for password hashing

---

## Future Features

- Admin dashboard
- Social sharing of teams
- Favorite Pokémon persistence

---

## Reporting Issues

Please submit bugs, questions, or suggestions via GitHub [Issues](https://github.com/tr-lt96/PokeApp/issues).

---
