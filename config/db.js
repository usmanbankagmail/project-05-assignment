import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = "your_mongodb_connection_string_here"; // 🔹 Replace this line later
const uri = "mongodb+srv://usmanbanka:banka786@cluster0.0htgqhh.mongodb.net/?appName=Cluster0";
let client;

export async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();
      console.log("✅ Connected to MongoDB Atlas successfully!");
    }
    return client.db("productsDB"); // Database name (you can change if needed)
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
}
