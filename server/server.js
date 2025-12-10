import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./config/config.js";
import dbConfig from "./config/database.js";
import authRoute from "./routes/auth.route.js";
import carsRoute from "./routes/car.route.js";
import adsRoute from "./routes/ads.route.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json({ limit: "12mb" }));


app.get("/", (req, res) =>
  res.send("<h1> API is up and running successafully! </h1>")
);

app.use("/api/v1/users", authRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1", adsRoute);


const port = PORT || 7070; 
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});


dbConfig();
