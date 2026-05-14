
import { authController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequests";
import { loginSchema } from "./auth.validation";
import { Router } from "express";

const router = Router()
router.post("/login",validateRequest(loginSchema),authController.loginController)
const authRoutes= router;
export default authRoutes;