import mongoose from "mongoose";

const conn = {
  isConnected: 0,
};

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const connectDB = async () => {
  if (conn.isConnected) return;

  const db = await mongoose.connect(MONGODB_URI);
  console.log("Mongoose is connected. " + db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected.");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error.", err);
});
