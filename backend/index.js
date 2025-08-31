import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import express from "express";
import userRoute from "./routes/routes.js";
import cors from "cors";
import connectDB from "./utility/connection.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());


console.log("Region:", process.env.AWS_REGION);
console.log("Bucket:", process.env.AWS_BUCKET_NAME);
console.log("Key:", process.env.AWS_ACCESS_KEY_ID ? "Loaded" : "Missing");
console.log("Secret:", process.env.AWS_SECRET_ACCESS_KEY ? "Loaded" : "Missing");

// app.use(
//   cors({
//     origin:true, 
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,  
//   })
// );

app.use(
  cors({
     origin: [
      "http://localhost:5173",  // for local dev
      "http://frontend:5173"    // for inside Docker
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoute);
// app.use("/api/v1/seller", userRoute);

app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});
