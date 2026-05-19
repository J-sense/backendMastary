import express from "express";
import { UserController } from "./user.controller";

import { userValidationSchema } from "./user.validations";
import { validateRequest } from "../../middlewares/validateRequests";
import { checkAuth } from "../../utils/checkAuth";
import { Role } from "./user.interface";

const router = express.Router();


router.post(
  "/create",
  validateRequest(userValidationSchema),
  UserController.createUser
);
router.get("/all",checkAuth(Role.ADMIN,Role.SUPER_ADMIN), UserController.getAllUsers);
router.patch("/update-user/:id",checkAuth(Role.ADMIN), UserController.updateUser);
const userRoutes = router;
export default userRoutes;
