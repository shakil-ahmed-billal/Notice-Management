import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import DBconnect from "./config/DBconnect.js";
import { noticeRoutes } from "./modules/notice/notice.routes.js";



const app = express();
dotenv.config();
DBconnect(); 
app.use(morgan("dev"));
app.use(express.json());
// middleware connection
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://pms-tau-ten.vercel.app",
    ],
    credentials: true,
  })
);



// Use the notice routes under /api endpoint
app.use("/api", noticeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
