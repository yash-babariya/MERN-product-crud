import "dotenv/config";

export const PORT = process.env.PORT || 5353;
export const mongoDBURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/productDatabase";
