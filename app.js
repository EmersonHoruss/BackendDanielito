import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/route.index.js";

import keys from "./keys.js";

const app = express();
const corsOptions = { origin: "http://localhost:4200" };

//settings
app.set("port", process.env.PORT || keys.PORT);

//middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
//ROUTER PRODUCT
app.use("/product/brand", routes.product.brand);
app.use("/product/category", routes.product.category);
app.use("/product/product", routes.product.product);
app.use("/product/size", routes.product.size);

//ROUTER WORKER
app.use("/worker/worker", routes.worker.worker);

//ROUTER HEADQUARTER
app.use("/headquarter/headquarter", routes.headquarter.headquarter);
app.use(
  "/headquarter/productHeadquarter",
  routes.headquarter.productHeadquarter
);

//ROUTER SALE_ORDER
app.use("/saleOrder/client", routes.saleOrder.client);
app.use("/saleOrder/detailSaleOrder", routes.saleOrder.detailSaleOrder);
app.use("/saleOrder/saleOrder", routes.saleOrder.saleOrder);

app.use("/all", routes.all);

export default app;
