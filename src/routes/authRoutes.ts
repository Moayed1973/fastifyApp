import {
  createUserHandler,
  loginUserHandler,
} from "../controllers/authController";
import { registerSwagger, loginSwagger } from "../swagger";

const authRoutes = async (fastify: any, options: any) => {
  fastify.post("/auth/register", registerSwagger, createUserHandler);
  fastify.post("/auth/login", loginSwagger, loginUserHandler);
};

export default authRoutes;
