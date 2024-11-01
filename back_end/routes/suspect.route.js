import express from "express";
import multer from "multer";

import { addSuspect, getSuspects, delSuspect } from "../controllers/suspect.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getSuspects);
router.post("/",upload.single("image"),  addSuspect);
router.delete("/:id", delSuspect);

export default router;