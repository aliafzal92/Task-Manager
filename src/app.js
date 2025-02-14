import "dotenv/config";
import "./db/connection.js";
import path from "path";
import { fileURLToPath } from "url";
import { notFound } from "./middlewares/not-found.js";
import { errorHandler } from "./middlewares/error-handler.js";

import { connectDb } from "./db/connection.js";
import express from "express";
import tasks from "./routes/tasks.route.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/api/v1/tasks", tasks);

app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDb();
    console.log("CONNECTED TO DB...");

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
