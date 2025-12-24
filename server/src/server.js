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
// app.use(cors());
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
  res.json({
    message: "Welcome to Notice Management System",
    version: "1.0.0",
    author: "Shakil Ahmed Billal",
    github: "https://github.com/shakil-ahmed-billal/Notice-Management",
    linkedin: "https://www.linkedin.com/in/shakil-ahmed-billal/",
    endpoint:{
      "POST /api/v1/notices": "Create a new notice",
      "GET /api/v1/notices": "Get all notices",
      "GET /api/v1/notices/:id": "Get a notice by id",
      "PUT /api/v1/notices/:id": "Update a notice by id",
    }
  })
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} /n http://localhost:${process.env.PORT}`);
});
