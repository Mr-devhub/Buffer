import express from "express";

const router = express.Router();

import { signup, login, getAllUser  } from '../controllers/user-controller';

router.post("/signup", signup);

router.post("/login", login);

router.get("/", getAllUser);

export default router;