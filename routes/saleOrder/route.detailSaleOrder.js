import { Router } from "express";
import detailSaleOrder from "../../controllers/saleOrder/controller.detailSaleOrder.js";

const router = Router();

// Create
router.post("/", detailSaleOrder.create);

// Create
router.put("/", detailSaleOrder.update);

// Read all
router.get("/", detailSaleOrder.red);

// Read sale orders by _idSaleOrder
router.get("/readByIdSaleOrder/:_idSaleOrder", detailSaleOrder.redByIdSaleOrder);

export default router;