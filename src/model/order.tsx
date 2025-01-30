import { Customer } from "./customer";
import { OrderItem } from "./orderItem";

export class Order {
    id?: number;
    customerId?: number | null;
    customerName: string = "";
    status: OrderStatus = OrderStatus.CONFIRMED;
    deliveryDate?: Date = new Date();
    orderAmount: number = 0;
    city?: string = "";
    streetName?: string = "";
    streetNumber?: string = "";
    complement?: string = "";
    reference?: string = "";
    items: OrderItem[] = [];


    constructor(customer?: Customer) {
        this.customerId = customer?.id;
        this.customerName = (this.customerName == "" ? customer?.name : this.customerName)!;
        this.status = OrderStatus.CONFIRMED;
        this.city = customer?.city;
        this.streetName = customer?.streetName;
        this.complement = customer?.complement;
        this.reference = customer?.reference;
        this.orderAmount = 0;
        this.deliveryDate = new Date();
        this.items = [];

    }

    // getFullAddres(): string {
    //     return (this.streetName || "") + ", " + (this.streetNumber || "");

    // }

    addOrderItem(orderItem: OrderItem) {
        orderItem.index = this.items.length + 1;
        orderItem.calcTotalPrice();
        this.items.push(orderItem);
        this.calcTotalAmount();
    }

    removeOrderItem(index: number) {
        if (index > -1) {
            this.items.splice(0, index);
        }

    }

    calcTotalAmount() {
        this.items.forEach(item => item.calcTotalPrice());
        this.orderAmount = this.items
            .map(item => item.price)
            .reduce((acc, price) => acc + price);
    }

    dispatch() {
        this.status = OrderStatus.DISPATCHED;
    }

    conclude() {
        this.status = OrderStatus.CONCLUDED;
    }

    cancel() {
        this.status = OrderStatus.CANCELLED;
    }

    toString() {
        return "ID: " + this.id + ", Cliente: " + this.customerName + ", Total: " + this.orderAmount;
    }

}

export enum OrderStatus {
    PLACED = "PLACED",
    CONFIRMED = "CONFIRMED",
    DISPATCHED = "DISPATCHED",
    CONCLUDED = "CONCLUDED",
    CANCELLED = "CANCELLED"
}