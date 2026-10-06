import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "ils-exam-prep" });
  const db = mongoose.connection.db;
  const res = await db.collection("questions").aggregate([
    { $group: { _id: "$exam", count: { $sum: 1 } } }
  ]).toArray();
  console.log("EXAM_COUNTS:", JSON.stringify(res, null, 2));
  await mongoose.disconnect();
}
run().catch(console.error);
