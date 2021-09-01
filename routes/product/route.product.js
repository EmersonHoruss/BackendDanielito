import { Router } from "express";
import controllerProduct from "../../controllers/product/controller.product.js";

const router = Router();

// Create
router.post("/", controllerProduct.create);

// Read all
router.get("/", controllerProduct.red);

export default router;