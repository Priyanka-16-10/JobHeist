import express from "express";
import isAuthenticated from "../middlewares/isAuth.js";
import { getCompany, getCompanyById, regCompany, updateCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, regCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);

export default router;