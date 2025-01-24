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

    constructor(id: number, name: string, city: string, district: string, streetName: string, streetNumber: string, complement: string, reference: string) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.district = district;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.complement = complement;
        this.reference = reference;
    }
}
