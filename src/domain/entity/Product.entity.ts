import { DomainInvalidDataException } from "../exceptions/DomainInvalidDataException";

type CreatePropsType = {
    name: string;
    price: number;
    quantity: number;
}

type PropsType = CreatePropsType & {
    readonly id: number | undefined;
}

export class ProductEntity {

    private constructor(private props: PropsType) { }

    //recebe um objeto sem o id pois sera criado com o Banco de dados;
    public static create(data: CreatePropsType): ProductEntity {

        if (data.name.length < 3 || data.name.trim().length <= 3) {
            throw new DomainInvalidDataException('Nome deve ter mais que 3 caracteres!');
        }

        if (data.price <= 0 || !data.price) {
            throw new DomainInvalidDataException('O preco do produto nao pode ser menor ou igual a zero!');
        }

        if (data.quantity <= 0 || !data.quantity) {
            throw new DomainInvalidDataException('O produto deve ter pelo menos 1 quantidade!');
        }

        return new ProductEntity({
            id: undefined,
            ...data
        });
    }

    // Inegrar o id real criado com o banco de dados;
    public reHydrateId(data: PropsType): ProductEntity {
        if (!data.id || data.id <= 0) {
            throw new DomainInvalidDataException('O id nao pode ser menor ou igual a 0!');
        }
        return new ProductEntity(data);
    }

    public get id(): number{
        if(!this.props.id){
            throw new DomainInvalidDataException('Id undefined!')
        }
        return this.props.id;
    }

    public get name(): string {
        return this.props.name;
    }

    public get price(): number {
        return this.props.price;
    }

    public get quantity(): number {
        return this.props.quantity;
    }

    public increaseQuantity(qntdAdd: number): void {
        if (qntdAdd <= 0) {
            throw new DomainInvalidDataException('Increase to reduce invalid!');
        }

        this.props.quantity += qntdAdd;
    }

    public reduceQuantity(qntdReduce: number): void {
        if (qntdReduce <= 0 || qntdReduce > this.props.quantity) {
            throw new DomainInvalidDataException('Amount to reduce invalid!');
        }

        this.props.quantity -= qntdReduce;
    }

    public newPrice(newPrice: number): void {
        if(newPrice <= 0 || newPrice == this.props.price){
            throw new DomainInvalidDataException('New price value is invalid!');
        }

        this.props.price = newPrice;
    }


}