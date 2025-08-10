# Hospital & Donor Coordination Platform Backend

This is a Node.js (Express.js) backend for a Hospital & Donor Coordination Platform with MongoDB, JWT authentication, role-based access, organ and blood management, notifications, and admin APIs.

## Features
- JWT-based authentication (Donor, Hospital, Verified Source, Admin)
- Email/OTP verification, password reset
- Organ & blood management (alive/deceased, TTL, verification)
- Search/filter by organ/blood type, location, time
- Real-time notifications (Socket.io, Nodemailer)
- Admin panel APIs, statistics
- REST API with Swagger docs

## Getting Started
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Set up your `.env` file (see `.env` for example values)
3. Start MongoDB locally or update `MONGO_URI` for your setup
4. Run the server:
   ```powershell
   npx nodemon server.js
   ```
5. API docs available at [http://localhost:5000/docs](http://localhost:5000/docs)

## Folder Structure
```
server/
  models/
  controllers/
  routes/
  middleware/
  utils/
  config/
  docs/
  seed/
  server.js
  .env
```

## Scripts
- `start` - Run server
- `dev` - Run server with nodemon

## License
MIT
