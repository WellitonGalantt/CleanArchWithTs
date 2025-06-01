import { ProductEntity } from "../entity/Product.entity";

export interface ProductGateway {
    save(entity: ProductEntity): Promise<ProductEntity>;
    list(): Promise<ProductEntity[]>;
}