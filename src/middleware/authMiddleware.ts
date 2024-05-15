import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface CustomRequest extends FastifyRequest {
  user?: any;
  token?: string;
}

interface DecodedToken {
  _id: string;
}

const authMiddleware = async (
  req: CustomRequest,
  reply: FastifyReply,
  done: () => void
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication failed. Token missing.");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as DecodedToken;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Authentication failed. User not found.");
    }

    req.user = user;
    req.token = token;
    done();
  } catch (error) {
    reply.code(401).send({ error: "Authentication failed." });
  }
};

export default authMiddleware;
