import { Customer } from "@/model/customer";
import { useSQLiteContext } from "expo-sqlite"

export function CustomerDAO() {
    const database = useSQLiteContext();

    async function create(data: Omit<Customer, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO customer (name) VALUES ($name)"
        )

        try {
            const result = await statement.executeAsync({
                $name: data.name
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }



    async function update(data: Customer) {
        const statement = await database.prepareAsync(
            "UPDATE cuistomer SET name = $name, city = $city WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id!,
                $name: data.name

            })
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function deleteById(id: number) {
        try {
            await database.execAsync("DELETE FROM customer WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function findById(id: number) {
        try {
            const query = "SELECT * FROM customer WHERE id = ?"

            const response = await database.getFirstAsync<Customer>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }

    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM customer WHERE name LIKE ?"

            const response = await database.getAllAsync<Customer>(
                query,
                `%${name}%`
            )

            return response
        } catch (error) {
            throw error
        }
    }

    return { create, update, deleteById, findById, searchByName }
}