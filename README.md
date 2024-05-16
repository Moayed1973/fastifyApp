# fastifyApp

This is a TypeScript backend project built with Fastify, MongoDB, and WebSocket (ws). It provides CRUD functionality for managing users, along with WebSocket support for real-time communication.

## Features

- TypeScript for type-safe development
- Fastify for efficient routing and handling
- MongoDB for data storage
- Fastify Swagger for API endpoint documentation
- WebSocket for real-time communication
- Room functionality for broadcasting messages

## Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Moayed1973/fastifyApp.git

   ```

2. Install dependencies:

   ```bash
   cd backend-project
   npm install
   ```

   ## Configuration

   Ensure you have MongoDB running locally. Modify the .env file if you need to specify a different MongoDB URL

   ```bash
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   ```

   ## Running the Application

   To run the application in development mode:

   ```bash
   npm start
   ```

   This command starts the server using nodemon, which reloads the server automatically when changes are made.

   ## API Documentation

   Once the server is running, you can access the API documentation at
   `http://localhost:3000/documentation`.

   ## User Model

   The project includes a `User` model with the following CRUD functionality:

   - Register: Creates a new user
   - Login: Authenticates a user
   - Delete: Deletes a user
   - Update: Updates a user's information(using PUT, not PATCH)
   - Get One User: Retrieves a single user by ID
   - Get All Users: Retrieves a list of all users

   ### Authentication

   All User Management API endpoints require user authentication using JWT. Include the JWT token in the `Authorization` header for each request.

   ### Authorization

   In addition to authentication, all User Management API endpoints require the user ID to be specifiead in the request parameters.

   ## WebSocket

   The project includes WebSocket functionality with room support for broadcasting messages. Clients can connect to the WebSocket server at `ws://localhost:8080`.

   ## Directory Structure

   ```bash
   fastifyApp/
   ├── src/
   │ ├── controllers/
   │ │ ├── authController.ts
   │ │ └── userController.ts
   │ ├── db/
   │ │ └── mongoose.ts
   │ ├── middleware/
   │ │ └── authMiddleware.ts
   │ ├── models/
   │ │ └── user.ts
   │ ├── routes/
   │ │ ├── authRoutes.ts
   │ │ └── userRoutes.ts
   │ ├── services/
   │ │ ├── authService.ts
   │ │ └── userService.ts
   │ ├── sockets/
   │ │ ├── messageHandler.ts
   │ │ ├── roomHandler.ts
   │ │ └── socketServer.ts
   │ ├── utils/
   │ │ └── chatBot.ts
   │ ├── app.ts
   │ └── swagger.ts
   ├── .env
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   ├── README.md
   ├── tsconfig.json
   ```

   ## License

   This project is under the **MIT License**
