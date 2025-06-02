import { ProductEntity } from "../../domain/entity/Product.entity";
import { ProductGateway } from "../../domain/gateways/Product.gateway";
import { PrismaClient } from "../../generated/prisma";

export class ProductRepositoryPrisma implements ProductGateway {

    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient): ProductRepositoryPrisma {
        return new ProductRepositoryPrisma(prismaClient);
    }


    // Ao salvar ele reotorna um modelo prisma q depois é convertido
    public async save(entity: ProductEntity): Promise<ProductEntity> {
        // Sempre criar um objeto alternativo, nunca usar a entidade diretamente;
        const data = {
            name: entity.name,
            price: entity.price,
            quantity: entity.quantity
        }

        const productCreated = await this.prismaClient.product.create({
            data
        })

        const entityWithId = entity.reHydrateId(productCreated.id);

        return entityWithId;
    }

    public async list(): Promise<ProductEntity[]> {
        const products = await this.prismaClient.product.findMany();
        const productList = products.map((p) => {
            // Criando instancia sem o id
            const entity = ProductEntity.create({
                name: p.name,
                price: p.price,
                quantity: p.quantity
            })

            // Reatribuindo com o id real;
            const entityWithId = entity.reHydrateId(p.id);

            return entityWithId;
        })

        return productList;
    }
}