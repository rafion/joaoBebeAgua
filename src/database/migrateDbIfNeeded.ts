import { type SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {

    await db.execAsync(`
        
        CREATE TABLE IF NOT EXISTS item (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL
        );

        --DROP TABLE customer;
        
        CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            city TEXT,
            district TEXT,
            streetName TEXT,
            streetNumber TEXT,
            complement TEXT,
            reference TEXT
        );

       -- DROP TABLE "order";

        CREATE TABLE IF NOT EXISTS "order" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId INTEGER NOT NULL,
            customerName TEXT,
            deliveryDate DATE NOT NULL,
            orderAmount DECIMAL(10,2) NOT NULL,
            city TEXT,
            streetName TEXT,
            streetNumber TEXT,
            complement TEXT,
            reference TEXT
        );

       -- DROP TABLE order_item

        CREATE TABLE IF NOT EXISTS order_item (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            orderId INTEGER NOT NULL,
            itemId INTEGER NOT NULL,
            "index" INTEGER NOT NULL,
            unitPrice DECIMAL(10,2) NOT NULL,
            quantity DECIMAL(10,2) NOT NULL,
            price DECIMAL(10,2) NOT NULL
        );


        `)
}