import mongoose from "mongoose";

const localUri = "mongodb://localhost:27017/";
const webUri =
  "mongodb+srv://pedro:diassala@devapi.up2r3fm.mongodb.net/?retryWrites=true&w=majority&appName=DevApi";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(webUri, {
      dbName: "BulireTeste#1",
    });
    console.log(`Server connected to database ${connection.host}`);
  } catch (error) {
    console.log("Some Error Occurred", error);
    process.exit(1);
  }
};
