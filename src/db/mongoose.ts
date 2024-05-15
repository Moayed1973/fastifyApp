import mongoose from "mongoose";

const mongoUrl = "mongodb://127.0.0.1:27017/fastifyApp";

async function dbConnect() {
  try {
    if (!mongoUrl) {
      throw new Error("MongoDB URL is not defined");
    }

    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
dbConnect().catch(console.error);

export default dbConnect;
