import { Request, Response } from "express";
import { HttpController } from "../controller.contract";
import { ListProductUsecase } from "../../../application/use_cases/list_product.usecase";

export class ListProductsController implements HttpController<Request, Response> {

    constructor(private readonly listProductUseCase: ListProductUsecase) { }

    public async handle(req: Request, res: Response): Promise<void> {
        try {

            const listProducts = await this.listProductUseCase.execute();

            res.status(200).json(listProducts);

        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

}