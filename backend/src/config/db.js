import { connect } from "mongoose";

const connectDb = async () => {
  try {
    await connect(`${process.env.MONGO_URL}`, {
      userNewUrlParse: true,
    });
  } catch (error) {
    console.log("Error trying connected database".red.bold);
    process.exit();
  }
};

export default connectDb;
