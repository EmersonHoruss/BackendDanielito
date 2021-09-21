import { Router } from "express";
import controllerPrice from "../../controllers/price/controller.price.js";

const router = Router();

// Create
router.post("/", controllerPrice.create);

// Read full prices by _idProduct
router.get("/readFullPricesByIdProduct/:_idProduct", controllerPrice.readFullPricesByIdProduct);

// Read all
router.get("/", controllerPrice.red);

export default router;
