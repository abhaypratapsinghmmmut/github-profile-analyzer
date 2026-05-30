import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import githubRoutes
from "./routes/githubRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    "/api/github",
    githubRoutes
);

app.get("/", (req, res) => {
    res.send("GitHub Profile Analyzer API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});