import express from "express";
import { getAllUsers, getUserById } from "../controllers/user-profile";


const router = express.Router();
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
export default router;
