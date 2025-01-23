import { Item } from "@/model/item";
import { useSQLiteContext } from "expo-sqlite"

export function ItemDAO() {
    const database = useSQLiteContext();

    async function create(data: Omit<Item, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO item (name, price) VALUES ($name, $price)"
        )

        try {
            const result = await statement.executeAsync({
                $name: data.name,
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



    async function update(data: Item) {
        const statement = await database.prepareAsync(
            "UPDATE item SET name = $name, price = $price WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id!,
                $name: data.name,
                $quantity: data.price,
            })
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function deleteById(id: number) {
        try {
            await database.execAsync("DELETE FROM item WHERE id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function findById(id: number) {
        try {
            const query = "SELECT * FROM item WHERE id = ?"

            const response = await database.getFirstAsync<Item>(query, [
                id,
            ])

            return response
        } catch (error) {
            throw error
        }
    }

    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM item WHERE name LIKE ?"

            const response = await database.getAllAsync<Item>(
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