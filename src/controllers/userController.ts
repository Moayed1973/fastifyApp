import { FastifyRequest, FastifyReply } from "fastify";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../services/userService";
import { IUser } from "../models/user";

export const updateUserHandler = async (
  req: FastifyRequest<{ Params: { id: string }; Body: Partial<IUser> }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatedUser = await updateUser(id, newData);
    reply.send(updatedUser);
  } catch (error) {
    reply.status(500).send(error.message);
  }
};

export const deleteUserHandler = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    const deletedUser = await deleteUser(id);
    reply.send({ message: "User deleted Successfully", user });
  } catch (error) {
    reply.status(500).send(error.message);
  }
};

export const getUserHandler = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error.message);
  }
};

export const getAllUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsers();
    reply.send(users);
  } catch (error) {
    reply.status(500).send(error.message);
  }
};
