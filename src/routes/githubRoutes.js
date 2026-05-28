import express from "express";

import {
    analyzeProfile,
    getAllProfiles,
    getSingleProfile
}
from "../controllers/githubController.js";

const router = express.Router();

router.post(
    "/analyze/:username",
    analyzeProfile
);

router.get(
    "/profiles",
    getAllProfiles
);

router.get(
    "/profiles/:username",
    getSingleProfile
);

export default router;