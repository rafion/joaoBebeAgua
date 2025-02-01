import { OrderItem } from "@/model/orderItem";
import { useSQLiteContext } from "expo-sqlite"

export function OrderITemDAO() {
    const database = useSQLiteContext();

    async function create(data: Omit<OrderItem, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO order_item (orderId, itemId, `index`,itemName, unitPrice, quantity, price)"
            + "VALUES ($orderId, $itemId, $index, $unitPrice, $quantity, $price)"
        )

        try {
            const result = await statement.executeAsync({
                $orderId: data.orderId!,
                $itemId: data.itemId!,
                $index: data.index!,
                $itemName: data.itemName,
                $unitPrice: data.unitPrice,
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


    async function findById(id: number) {
        try {
            const query = "SELECT * FROM order_item WHERE id = ?"

            const response = await database.getFirstAsync<OrderItem>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }

    async function findAllByOrderId(orderId: number) {
        try {
            const query = "SELECT * FROM order_item WHERE orderId = ? order by `index` asc"

            const response = await database.getAllAsync<OrderItem>(
                query,
                orderId
            )

            return response
        } catch (error) {
            throw error
        }
    }


    return { create, findById, findAllByOrderId }

}
