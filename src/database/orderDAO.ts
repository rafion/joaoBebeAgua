import { Order } from "@/model/order";
import { useSQLiteContext } from "expo-sqlite"
import { OrderITemDAO } from "./orderItemDAO";


const orderItemDAO = OrderITemDAO();

export function OrderDAO() {
    const database = useSQLiteContext();

    async function create(data: Omit<Order, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO item (customer_id, customer_name, status, delivery_date, order_amount, city, street_name, complement, reference)"
            + "VALUES ($customer_id, $customer_name, $status, $delivery_date, $order_amount, $city, $street_name, $complement, $reference)"
        )

        try {
            const result = await statement.executeAsync({
                $customer_id: data.customerId!,
                $customer_name: data.customerName,
                $status: data.status,
                $delivery_date: data.deliveryDate.toISOString(),
                $order_amount: data.orderAmount,
                $city: data.city,
                $street_name: data.streetName,
                $complement: data.complement,
                $reference: data.reference,

            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()
            console.log(result)
            //coloquei o id da order e insira os itens
            data.itens.forEach(item => {
                item.orderId = +insertedRowId;
                item.calcTotalPrice();
                orderItemDAO.create(item)
            }
            );


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
            + "customer_id = $customer_id,"
            + "customer_name = $customer_name,"
            + "status = $status,"
            + "city = $city,"
            + "street_name = $street_name,"
            + "streetNumber = $streetNumber,"
            + "complement = $complement,"
            + "reference = $reference WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $customer_id: data.customerId!,
                $customer_name: data.customerName,
                $status: data.status,
                $city: data.city,
                $street_name: data.streetName,
                $streetNumber: data.streetNumber,
                $complement: data.complement,
                $reference: data.reference
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
        try {
            const query = "SELECT * FROM order WHERE id = ?"

            const response = await database.getFirstAsync<Order>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }

    async function searchByCustomerName(customerName: string) {
        try {
            const query = "SELECT * FROM order WHERE customer_name LIKE ?"

            const response = await database.getAllAsync<Order>(
                query,
                `%${customerName}%`
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async function conclude(orderId: number) {
        try {
            await database.execAsync("UPDATE Order SET status = 'CONCLUDED' WHERE id = " + orderId);
        } catch (error) {
            throw error
        }
    }

    async function cancel(orderId: number) {
        try {
            await database.execAsync("UPDATE Order SET status = 'CANCELLED' WHERE id = " + orderId);
        } catch (error) {
            throw error
        }
    }

    return { create, update, deleteById, findById, searchByCustomerName, conclude, cancel }
}