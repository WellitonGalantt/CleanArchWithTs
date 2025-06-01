import { ProductEntity } from "../../domain/entity/Product.entity";
import { ProductGateway } from "../../domain/gateways/Product.gateway";
import { UseCase } from "../use_case";

export type ListUsecaseInputDto = void;
export type ListUsecaseOutputDto = {
    products: {
        id: number;
        name: string;
        price: number;
        quantity: number
    }[];
};

export class ListProductUsecase
    implements UseCase<ListUsecaseInputDto, ListUsecaseOutputDto> {
    private constructor(private readonly productGateway: ProductGateway) { }

    public static create(productGateway: ProductGateway) {
        return new ListProductUsecase(productGateway);
    }

    public async execute(input: void): Promise<ListUsecaseOutputDto> {
        const products = await this.productGateway.list();
        return this.presentOutput(products);
    }

    private presentOutput(products: ProductEntity[]): ListUsecaseOutputDto {
        return { products: products };
    }
}