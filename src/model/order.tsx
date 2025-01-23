import { Customer } from "./customer";
import { OrderItem } from "./orderItem";

export class Order {
    id?: number;
    customerId?: number | null;
    customerName: string = "";
    status: 'PLACED' | 'CONFIRMED' | 'DISPATCHED' | 'CONCLUDED' | 'CANCELLED' = 'CONFIRMED';
    deliveryDate?: Date = new Date();
    orderAmount: number = 0;
    city?: string = "";
    streetName?: string = "";
    streetNumber?: string = "";
    complement?: string = "";
    reference?: string = "";
    items: OrderItem[] = [];


    constructor(customer: Customer) {
        this.customerId = customer.id;
        this.customerName = (this.customerName == "" ? customer.name : this.customerName);

        this.city = customer.city;
        this.streetName = customer.streetName;
        this.complement = customer.complement;
        this.reference = customer.reference;

    }

    // getFullAddres(): string {
    //     return (this.streetName || "") + ", " + (this.streetNumber || "");

    // }

    addOrderItem(orderItem: OrderItem) {
        orderItem.index = this.items.length + 1;
        orderItem.calcTotalPrice();
        this.items.push(orderItem);
    }

    removeOrderItem(index: number) {
        if (index > -1) {
            this.items.splice(0, index);
        }

    }

    private calcTotal() {
        this.items.forEach(item => item.calcTotalPrice());
        this.orderAmount = this.items
            .map(item => item.price)
            .reduce((acc, price) => acc + price);
    }

    dispatch() {
        this.status = "DISPATCHED";
    }

    conclude() {
        this.status = "CONCLUDED";
    }

    cancel() {
        this.status = "CANCELLED";
    }

    toString() {
        return "ID: " + this.id + ", Cliente: " + this.customerName + ", Total: " + this.orderAmount;
    }

}
