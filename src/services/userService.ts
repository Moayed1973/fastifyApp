import User from "../models/user";
import { IUser } from "../models/user";

//UPDATE
export const updateUser = async (userId: string, newData: Partial<IUser>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newData, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("User not found !");
    }
    return updatedUser;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

//DELETE
export const deleteUser = async (userId: string) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};

//GET USER
export const getUser = async (userId: string) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

//GET ALL USERS
export const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error(`Failed to get all users: ${error.message}`);
  }
};
