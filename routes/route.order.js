import { Router } from "express";
import orderCtrl from "../controllers/controller.order.js";

const router = Router();

// Create
router.post("/", orderCtrl.create);

// Read all
router.get("/", orderCtrl.red);

export default router;
