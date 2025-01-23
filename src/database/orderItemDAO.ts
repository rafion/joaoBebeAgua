import { OrderItem } from "@/model/orderItem";
import { useSQLiteContext } from "expo-sqlite"

export function OrderITemDAO() {
    const database = useSQLiteContext();

    async function create(data: Omit<OrderItem, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO item (order_id, item_id, index, unit_price, quantity, price)"
            + "VALUES ($order_id, $item_id, $index, $unit_price, $quantity, $price)"
        )

        try {
            const result = await statement.executeAsync({
                $order_id: data.orderId!,
                $item_id: data.itemId!,
                $index: data.index!,
                $unit_price: data.unitPrice,
                $quantity: data.quantity,
                $price: data.price

            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    return { create }

}
