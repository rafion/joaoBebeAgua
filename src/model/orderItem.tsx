export class OrderItem {
    id?: number;
    orderId?: number;
    itemId: number;
    itemName: string;
    index?: number;
    unitPrice: number;
    quantity: number;
    price: number = 0;

    constructor(itemId: number, itemName: string, unitPrice: number, quantity: number) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        //this.calcTotalPrice();

    }

    calcTotalPrice(): void {
        this.price = (this.unitPrice * this.quantity);
    }

}