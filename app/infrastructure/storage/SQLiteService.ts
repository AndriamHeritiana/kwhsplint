import SQLite from 'react-native-sqlite-storage';
import { Reading } from '@/core/domain/entities/Reading.ts';
import { runMigrations } from './migrations';
SQLite.enablePromise(true);

export class SQLiteService {
    private db: SQLite.SQLiteDatabase | null = null;

    async openDatabase(): Promise<void> {
        try {
            this.db = await SQLite.openDatabase({
                name: 'meter_reading.db',
                location: 'default',
            });
            await runMigrations(this.db); // Utiliser le système de migration
        } catch (error) {
            console.error('Erreur lors de l’ouverture de la base de données :', error);
            throw error;
        }
    }

    async saveReading(reading: Reading): Promise<void> {
        if (!this.db) throw new Error('Base de données non initialisée');
        const query = `
            INSERT INTO readings (
                userId, newInputDate, oldInputDate, mainCounterValue, newSubMeterValue,
                oldSubMeterValue, amountInvoice, amountToPay, residence, city
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const values = [
            reading.userId,
            reading.newInputDate,
            reading.oldInputDate,
            reading.mainCounterValue,
            reading.newSubMeterValue,
            reading.oldSubMeterValue,
            reading.amountInvoice,
            reading.amountToPay,
            reading.residence,
            reading.city,
        ];
        await this.db.executeSql(query, values);
    }
    async getReadings(userId: string, searchTerm?: string, limit?: number ): Promise<Omit<Reading, keyof Reading & 'constructor'>[]> {
        if (!this.db) throw new Error('Database not initialized');

        let query = `SELECT * FROM readings WHERE userId = ?`;
        let params: string[] = [userId];

        if (searchTerm) {
            const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, '');
            query += ` AND (residence LIKE ? OR city LIKE ? OR amountInvoice LIKE ?)`;
            params = [`%${sanitizedSearchTerm}%`, `%${sanitizedSearchTerm}%`, `%${sanitizedSearchTerm}%`];
        }

        query += ` ORDER BY id DESC`;
        if (limit && limit > 0) {
            query += ` LIMIT ?`;
            params.push(limit.toString());
        }

        const [results] = await this.db.executeSql(query, params);
        const readings = [];

        for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            readings.push({
                id: row.id,
                userId: row.userId,
                newInputDate: new Date(row.newInputDate).toISOString(),
                oldInputDate: new Date(row.oldInputDate).toISOString(),
                mainCounterValue: row.mainCounterValue,
                newSubMeterValue: row.newSubMeterValue,
                oldSubMeterValue: row.oldSubMeterValue,
                amountInvoice: row.amountInvoice,
                amountToPay: row.amountToPay,
                residence: row.residence,
                city: row.city,
            });
        }

        return readings;
    }
    async getTotalAmountToPay(userId: string): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');
        const query = `SELECT SUM(amountToPay) as total FROM readings WHERE userId = ?`;
        const params = [userId];
        const [results] = await this.db.executeSql(query, params);
        if (results.rows.length > 0) {
            const total = results.rows.item(0).total;
            return total !== null && typeof total === 'number' ? total : 0.0;
        }
        return 0.0;
    }
    async closeDatabase(): Promise<void> {
        if (this.db) {
            await this.db.close();
            this.db = null;
        }
    }
}

