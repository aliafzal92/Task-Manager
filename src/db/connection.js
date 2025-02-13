import mongoose from "mongoose";

const connectDb = () => {
  return mongoose.connect(`${process.env.DATABASE_URI}`);
};


export {connectDb}
