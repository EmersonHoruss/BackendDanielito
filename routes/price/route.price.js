import { Router } from "express";
import controllerPrice from "../../controllers/price/controller.price.js";

const router = Router();

// Create
router.post("/", controllerPrice.create);

// Read full prices by _idProduct
router.get("/readFullPrices/:_idProduct", controllerPrice.readFullByIdProductH);

// Read all
router.get("/", controllerPrice.red);

export default router;
