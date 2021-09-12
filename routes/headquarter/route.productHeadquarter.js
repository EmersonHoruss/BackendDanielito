import { Router } from "express";
import controllerProductHeadquarter from "../../controllers/headquarter/controller.productHeadquarter.js";

const router = Router();

// Create
router.post("/", controllerProductHeadquarter.create);

// Read all
router.get("/", controllerProductHeadquarter.red);

// Read full
router.get("/full/:_idHeadquarter", controllerProductHeadquarter.redFull);

export default router;
