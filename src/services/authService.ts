import User from "../models/user";
import { IUser } from "../models/user";

export const createUser = async (user: Partial<IUser>) => {
  const { username, email, password } = user;
  if (!username || !email || !password) {
    throw new Error("Please Fill in all the required fields");
  }
  const isUser = await User.findOne({ username });
  if (isUser) {
    throw new Error("A user already exists with the same credentials");
  }

  const newUser = new User({ username, email, password });
  await newUser.save();
  const token = await newUser.generateAuthToken();
  return {
    user: newUser,
    token,
  };
};

export const loginUser = async (user: Partial<IUser>) => {
  const { username, password } = user;
  if (!username || !password) {
    throw new Error("Please Fill in all the required fields");
  }
  const isUser = await User.findByCredentials(username, password);
  if (!isUser) {
    return null;
  }

  const existingUser = isUser as IUser;
  const token = await existingUser.generateAuthToken();
  return {
    user: existingUser,
    token,
  };
};
