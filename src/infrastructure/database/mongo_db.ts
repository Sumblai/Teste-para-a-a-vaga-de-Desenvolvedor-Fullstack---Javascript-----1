import mongoose from "mongoose";

const localUri = "mongodb://localhost:27017/";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.DB_HOST as string,
      {
        dbName: "BulireTeste#1",
      }
    );
    console.log(`Server connected to database ${connection.host}`);
  } catch (error) {
    console.log("Some Error Occurred", error);
    process.exit(1);
  }
};
