import { ProductEntity } from "../../domain/entity/Product.entity";
import { ProductGateway } from "../../domain/gateways/Product.gateway";
import { UseCase } from "../use_case.contract";

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
        // console.log(products);
        return this.presentOutput(products);

    }

    private presentOutput(products: ProductEntity[]): ListUsecaseOutputDto {
        const productList = products.map((p: ProductEntity) => {
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: p.quantity
            }
        })
        return { products: productList };
    }
}