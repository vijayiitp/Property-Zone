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

app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});
