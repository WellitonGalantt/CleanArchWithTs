import { ProductEntity } from "../../domain/entity/Product.entity";
import { ProductGateway } from "../../domain/gateways/Product.gateway";
import { UseCase } from "../use_case.contract"

export type CreateUseCaseInputDto = {
    name: string;
    price: number;
    quantity: number;
}

export type CreateUseCaseOutputDto = {
    id: number;
}

export class CreatProductUsecase
    implements UseCase<CreateUseCaseInputDto, CreateUseCaseOutputDto>{

    // Contrutor privado que recebe um gateway do banco de dados, que so pode ser setado uma vez só;
    private constructor(private readonly productGateway: ProductGateway) { }

    // Método da classe pai para setar o gateway para todas as instancias;
    public static create(productGateway: ProductGateway): CreatProductUsecase {
        return new CreatProductUsecase(productGateway);
    }

    // Execute é onde o caso de uso acontece, todos os passos para criar um produto.
    public async execute(input: CreateUseCaseInputDto): Promise<CreateUseCaseOutputDto> {
        //cria a entidade sem o id verdadeiro
        const entity = ProductEntity.create(input);
        // Faz a persistencia e retorna a instancia com o id real; 
        const product = await this.productGateway.save(entity);

        return this.presentOutput(product);
    }

    private presentOutput(product: ProductEntity): CreateUseCaseOutputDto {
        const output: CreateUseCaseOutputDto = {
            id: product.id
        }

        return output;
    }
}