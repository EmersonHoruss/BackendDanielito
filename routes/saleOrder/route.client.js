import { Router } from "express";
import controllerClient from "../../controllers/saleOrder/controller.client.js";

const router = Router();

// Create
router.post("/", controllerClient.create);

// Read all
router.get("/", controllerClient.red);

export default router;