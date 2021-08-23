import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/route.index.js";

import keys from "./keys.js";

const app = express();
const corsOptions = { origin: "http://localhost:4200" };

//settings
app.set('port', process.env.PORT || keys.PORT)

//middleware
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', (req,res)=>{res.send('Api is running correctly')})
// app.use('/order', routes)
let h = "asf"
export default app