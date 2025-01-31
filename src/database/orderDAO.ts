import { Order, OrderStatus } from "@/model/order";
import { useSQLiteContext } from "expo-sqlite"
import { OrderITemDAO } from "./orderItemDAO";
import { OrderItem } from "@/model/orderItem";




export function OrderDAO() {
    const database = useSQLiteContext();
    const orderItemDAO = OrderITemDAO();

    async function create(data: Omit<Order, "id">) {

        const statement = await database.prepareAsync(
            "INSERT INTO `order` ("
            + " customerId, customerName, status, orderAmount, city, streetName, complement, reference)"
            + " VALUES ($customerId, $customerName, $status, $orderAmount, $city, $streetName, $complement, $reference)"
        )

        try {
            const result = await statement.executeAsync({
                $customerId: data.customerId!,
                $customerName: data.customerName || "",
                $status: data.status || "",
                $orderAmount: data.orderAmount || 0,
                $city: data.city || "",
                $streetName: data.streetName || "",
                $complement: data.complement || "",
                $reference: data.reference || "",

            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()
            // console.log(result)
            //coloquei o id da order e insira os itens
            data.items.forEach(item => {
                item.orderId = +insertedRowId;
                createItem(item)
            }
            );

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function createItem(data: Omit<OrderItem, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO order_item (orderId, itemId, `index`, itemName, unitPrice, quantity, price)"
            + "VALUES ($orderId, $itemId, $index, $itemName, $unitPrice, $quantity, $price)"
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


    async function update(data: Order) {
        const statement = await database.prepareAsync(
            "UPDATE Order SET "
            + "customerId = $customerId,"
            + "customerName = $customerName,"
            + "status = $status,"
            + "city = $city,"
            + "streetName = $streetName,"
            + "streetNumber = $streetNumber,"
            + "complement = $complement,"
            + "reference = $reference "
            + " WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id!,
                $customer_id: data.customerId!,
                $customer_name: data.customerName || "",
                $status: data.status || "",
                $city: data.city || "",
                $street_name: data.streetName || "",
                $streetNumber: data.streetNumber || "",
                $complement: data.complement || "",
                $reference: data.reference || ""
            })
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function deleteById(orderId: number) {
        try {
            await database.execAsync("DELETE FROM order_item WHERE id = " + orderId);
            await database.execAsync("DELETE FROM order WHERE id = " + orderId);
        } catch (error) {
            throw error
        }
    }

    async function findById(id: number) {
        let order = new Order();
        try {
            const query = "SELECT * FROM order WHERE id = ?"

            const orderResponse = await database.getFirstAsync<Order>(query, [
                id,
            ])

            const orderItens = await orderItemDAO.findAllByOrderId(id);
            order = orderResponse || new Order();
            order.items = orderItens || [];

        } catch (error) {
            throw error
        }
    }

    async function searchByCustomerNameAndStatus(customerName: string, status: OrderStatus) {

        let orders: Order[] = [];

        try {
            const queryOrders = "SELECT * FROM `order` WHERE customerName LIKE ? and status = ? order by id desc"

            const responseOrders = await database.getAllAsync<Order>(
                queryOrders, [`%${customerName}%`, status])


            for (let order of responseOrders) {
                const queryItens = "SELECT * FROM order_item WHERE orderId = ? order by `index` asc"
                const responseItens = await database.getAllAsync<OrderItem>(queryItens, order.id!);
                order.items = responseItens;
                orders.push(order);
            }
            return orders;

        } catch (error) {
            throw error
        }
    }

    async function conclude(orderId: number) {
        try {
            await database.execAsync("UPDATE `order` SET status = 'CONCLUDED' WHERE id = " + orderId);
        } catch (error) {
            throw error
        }
    }

    async function cancel(orderId: number) {
        try {
            await database.execAsync("UPDATE `order` SET status = 'CANCELLED' WHERE id = " + orderId);
        } catch (error) {
            throw error
        }
    }

    return { create, update, deleteById, findById, searchByCustomerNameAndStatus, conclude, cancel }
}