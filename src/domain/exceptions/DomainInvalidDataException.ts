export class DomainInvalidDataException extends Error{
    constructor(message: string){
        super(message);
        this.name = 'DomainInvalidDataException'
    }
}