import { Router } from "express";
import detailSaleOrder from "../../controllers/saleOrder/controller.detailSaleOrder.js";

const router = Router();

// Create
router.post("/", detailSaleOrder.create);

// Create
router.put("/", detailSaleOrder.update);

// Read sale orders by _idSaleOrder
router.get("/_idSaleOrder", detailSaleOrder.red);

export default router;