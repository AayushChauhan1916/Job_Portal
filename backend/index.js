import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import databaseConnection from "./helpers/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import companyRouter from "./routes/companyRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from /dist directory
app.use(express.static(resolve(__dirname, "dist")));

// cors option
const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
};

app.use(cors(corsOption));
// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

const port = process.env.PORT || 8080;
databaseConnection()
  .then(() => {
    app.listen(port, () =>
      console.log(`Server started on ${port} and db connected`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
