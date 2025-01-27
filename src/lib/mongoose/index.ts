import mongoose from "mongoose";

declare global {
  var mongoose: any;
}





const uri = process.env.MONGO_URI ?? "";
if (!uri) {
  throw new Error("MONGO_URI environment variable not defined")
}

const options = {
  dbName: "highway_delite"
};





let cachedConn = global.mongoose;
if (!cachedConn) {
  cachedConn = global.mongoose = { conn: null };
}

const connect = async () => {
  if (cachedConn.conn) {
    return cachedConn.conn;
  }

  try {
    cachedConn.conn = await mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
    return cachedConn.conn;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
};





export { connect };