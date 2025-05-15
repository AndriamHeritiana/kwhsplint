import SQLite from 'react-native-sqlite-storage';
import { Reading } from '@/core/domain/entities/Reading.ts';
SQLite.enablePromise(true);

export class SQLiteService {
    private db: SQLite.SQLiteDatabase | null = null;

    async openDatabase(): Promise<void> {
        try {
            this.db = await SQLite.openDatabase({
                name: 'meter_reading.db',
                location: 'default',
            });
            await this.createTables();
        } catch (error) {
            console.error('Error opening database:', error);
            throw error;
        }
    }

    private async createTables(): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        const query = `
            CREATE TABLE IF NOT EXISTS readings (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    newInputDate TEXT NOT NULL,
                                                    oldInputDate TEXT NOT NULL,
                                                    mainCounterValue REAL NOT NULL,
                                                    newSubMeterValue REAL NOT NULL,
                                                    oldSubMeterValue REAL NOT NULL,
                                                    amountInvoice REAL NOT NULL,
                                                    amountToPay REAL NOT NULL
            );
        `;
        await this.db.executeSql(query);
    }

    async saveReading(reading: Reading): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');
        const query = `
            INSERT INTO readings (
                newInputDate, oldInputDate, mainCounterValue, newSubMeterValue,
                oldSubMeterValue, amountInvoice, amountToPay
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const values = [
            reading.newInputDate,
            reading.oldInputDate,
            reading.mainCounterValue,
            reading.newSubMeterValue,
            reading.oldSubMeterValue,
            reading.amountInvoice,
            reading.amountToPay,
        ];
        await this.db.executeSql(query, values);
    }
    async getAllReadings(): Promise<Omit<Reading, keyof Reading & 'constructor'>[]> {
        if (!this.db) throw new Error('Database not initialized');

        const query = `SELECT * FROM readings;`;
        const [results] = await this.db.executeSql(query);
        const readings = [];

        for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            readings.push({
                id: row.id,
                newInputDate: new Date(row.newInputDate).toISOString(),
                oldInputDate: new Date(row.oldInputDate).toISOString(),
                mainCounterValue: row.mainCounterValue,
                newSubMeterValue: row.newSubMeterValue,
                oldSubMeterValue: row.oldSubMeterValue,
                amountInvoice: row.amountInvoice,
                amountToPay: row.amountToPay,
            });
        }

        return readings;
    }

    async closeDatabase(): Promise<void> {
        if (this.db) {
            await this.db.close();
            this.db = null;
        }
    }
}

