import { Customer } from "@/model/customer";
import { useSQLiteContext } from "expo-sqlite"

export function CustomerDAO() {
    const database = useSQLiteContext();

    async function create(data: Omit<Customer, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO customer (name, city, district, streetName, streetNumber, complement, reference)"
            + " VALUES ($name, $city, $district, $streetName, $streetNumber, $complement, $reference)"
        )

        try {
            const result = await statement.executeAsync({
                $name: data.name,
                $city: data.city || "",
                $district: data.district || "",
                $streetName: data.streetName || "",
                $streetNumber: data.streetNumber || "",
                $complement: data.complement || "",
                $reference: data.reference || "",
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
            "UPDATE customer SET "
            + " name = $name,"
            + " city = $city,"
            + " district = $district, "
            + " streetName = $streetName,"
            + " streetNumber = $streetNumber, "
            + " complement = $complement,"
            + " reference = $reference"
            + " WHERE id = $id"

        )

        try {
            await statement.executeAsync({
                $id: data.id!,
                $name: data.name,
                $city: data.city || "",
                $district: data.district || "",
                $streetName: data.streetName || "",
                $streetNumber: data.streetNumber || "",
                $complement: data.complement || "",
                $reference: data.reference || "",

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

            const response = await database.getFirstAsync<Customer>(query, [id,]);

            return response
        } catch (error) {
            throw error
        }
    }

    async function searchByName(name: string) {
        try {
            const query = "SELECT * FROM customer WHERE name LIKE ? order by id desc"

            const response = await database.getAllAsync<Customer>(
                query,
                `%${name}%`
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async function existsByName(name: string) {
        type RowExist = {
            row_exists: number
        }
        try {
            const query = " SELECT exists(SELECT 1 FROM customer WHERE name = ? ) as row_exists"

            const response = await database.getFirstAsync<RowExist>(query, [name,]);

            return response?.row_exists

        } catch (error) {
            throw error
        }
    }

    return { create, update, deleteById, findById, searchByName, existsByName }
}