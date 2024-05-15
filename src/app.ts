import Fastify from "fastify";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import dbConnect from "./db/mongoose";
import wss from "./sockets/socketServer";
import dotenv from "dotenv";
dotenv.config();

dbConnect;

const fastify = Fastify({ logger: true });

fastify.register(import("@fastify/swagger"));
fastify.register(import("@fastify/swagger-ui"));

fastify.register(authRoutes);
fastify.register(userRoutes);

const start = async () => {
  try {
    wss;
    fastify.listen({ port: 3000 }, (address) => {
      console.log(`Server listening on ${address}`);
    });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
