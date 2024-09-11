import express from "express";
import { login, logout, register, update } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, update);

export default router;