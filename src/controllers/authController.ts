import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, loginUser } from "../services/authService";
import { IUser } from "../models/user";

export const createUserHandler = async (
  req: FastifyRequest<{ Body: Partial<IUser> }>,
  reply: FastifyReply
) => {
  try {
    const user = await createUser(req.body);
    reply.header("Content-Type", "application/json").send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const loginUserHandler = async (
  req: FastifyRequest<{ Body: Partial<IUser> }>,
  reply: FastifyReply
) => {
  try {
    const user = await loginUser(req.body);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
};
