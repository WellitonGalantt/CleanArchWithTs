import { Request, Response } from "express";
import { HttpController } from "../controller.contract";
import { CreatProductUsecase } from "../../../application/use_cases/create_product.usecase";


export class CreateProductController implements HttpController<Request, Response> {

    constructor(private readonly creatProductUsecase: CreatProductUsecase) { }

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const { name, price, quantity } = req.body;

            const output = await this.creatProductUsecase.execute({ name, price, quantity });

            res.status(201).json(output);
            return;
        }
        catch (error: any) {
            res.status(400).json({ message: error.message });
            return
        }
    }
}