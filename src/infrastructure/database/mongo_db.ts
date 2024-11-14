import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      "mongodb+srv://pedro:diassala@devapi.up2r3fm.mongodb.net/?retryWrites=true&w=majority&appName=DevApi",
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
