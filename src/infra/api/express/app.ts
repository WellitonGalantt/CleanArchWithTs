import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import productRouter from "./routes/products/product_routes.express";

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(helmet());

app.use(cors());

app.use('/api', productRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.send(error.message);
})

export default app;