import { Router } from "express";
import controllerSize from "../../controllers/product/controller.size.js";

const router = Router();

// Create
router.post("/", controllerSize.create);

// Read all
router.get("/", controllerSize.red);

export default router;
