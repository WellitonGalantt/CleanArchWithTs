export type PropsType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export class ProductEnttity {

    private props: PropsType;

    private constructor(props: PropsType){
        this.props = props;
    }

    
   
}