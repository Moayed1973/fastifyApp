import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  generateAuthToken(): unknown;
  username: string;
  password: string;
  email: string;
  tokens: { token: string }[];
}

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}

interface IUserStatics extends Model<IUser, {}, IUserMethods> {
  findByCredentials(
    username: string,
    password: string
  ): Promise<Partial<IUser>>;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });
  this.tokens.push({ token });
  this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this as IUser;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

const User: IUserStatics = model<IUser, IUserStatics>("User", userSchema);
export default User;
