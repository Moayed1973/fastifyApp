import {
  updateUserHandler,
  deleteUserHandler,
  getUserHandler,
  getAllUsersHandler,
} from "../controllers/userController";
import {
  updateUserSwagger,
  deleteUserSwagger,
  getAllUsersSwagger,
  getUserSwagger,
} from "../swagger";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = async (fastify: any, options: any) => {
  fastify.get("/users", getAllUsersSwagger, getAllUsersHandler);
  fastify.get("/users/:id", getUserSwagger, getUserHandler);
  fastify.put("/users/:id", updateUserSwagger, updateUserHandler);
  fastify.delete("/users/:id", deleteUserSwagger, deleteUserHandler);
};

export default userRoutes;
