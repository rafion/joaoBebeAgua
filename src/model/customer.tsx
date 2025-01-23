export class Customer {
    id?: number;
    name: string = "";
    city?: string = "";
    district?: string = "";
    streetName?: string = "";
    streetNumber?: string = "";
    complement?: string = "";
    reference?: string = "";
    //address: Address = new Address();

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
