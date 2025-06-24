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
    /**
     * Récupère la dernière valeur de newInputDate et newSubMeterValue pour un utilisateur donné, basée sur l'ID.
     * @param userId L'identifiant de l'utilisateur
     * @returns Un objet contenant newInputDate et newSubMeterValue, ou null si aucune lecture n'existe
     */
    async getLatestMeterAndDateReading(userId: string): Promise<{ newInputDate: string; newSubMeterValue: number } | null> {
        if (!this.db) throw new Error('Database not initialized');

        const query = `
            SELECT newInputDate, newSubMeterValue
            FROM readings
            WHERE userId = ?
            ORDER BY newInputDate DESC
                LIMIT 1;
    `;
        const params = [userId];
        const [results] = await this.db.executeSql(query, params);
        if (results.rows.length > 0) {
            const row = results.rows.item(0);
            console.log('Row:', row);
            return {
                newInputDate: new Date(row.newInputDate).toISOString(),
                newSubMeterValue: row.newSubMeterValue,
            };
        }
        return null;
    }

    /**
     * Calculate the total electricity consumption of a user
     * Consumption for each reading = Newsubmetervalue - Oldsubmetervalue
     * @param userId User identifier
     * @returns Total consumption in kWh
     */
    async getTotalElectricConsumption(userId: string): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');

        const query = `
            SELECT SUM(newSubMeterValue - oldSubMeterValue) as totalConsumption 
            FROM readings 
            WHERE userId = ?
        `;
        const params = [userId];
        const [results] = await this.db.executeSql(query, params);

        if (results.rows.length > 0) {
            const totalConsumption = results.rows.item(0).totalConsumption;
            return totalConsumption !== null && typeof totalConsumption === 'number' ? totalConsumption : 0.0;
        }
        return 0.0;
    }


    /**
     * Calcule le pourcentage de variation du montant à payer par rapport au mois précédent
     * @param userId L'identifiant de l'utilisateur
     * @returns Le pourcentage de variation (positif = augmentation, négatif = diminution)
     */
    async getAmountToPayPercentageChange(userId: string): Promise<{
        currentMonthAmount: number;
        previousMonthAmount: number;
        percentageChange: number;
        hasData: boolean;
    } | null> {
        if (!this.db) throw new Error('Database not initialized');

        // Option 1: Comparer les 2 dernières lectures individuelles
        const lastTwoReadingsQuery = `
            SELECT amountToPay
            FROM readings
            WHERE userId = ?
            ORDER BY newInputDate DESC, id DESC
                LIMIT 2
        `;

        const [results] = await this.db.executeSql(lastTwoReadingsQuery, [userId]);

        if (results.rows.length < 2) {
            return {
                currentMonthAmount: results.rows.length === 1 ? results.rows.item(0).amountToPay : 0,
                previousMonthAmount: 0,
                percentageChange: 0,
                hasData: false
            };
        }

        const currentAmount = results.rows.item(0).amountToPay;
        const previousAmount = results.rows.item(1).amountToPay;

        let percentageChange = 0;
        if (previousAmount > 0) {
            percentageChange = ((currentAmount - previousAmount) / previousAmount) * 100;
        }

        return {
            currentMonthAmount: currentAmount,
            previousMonthAmount: previousAmount,
            percentageChange: Math.round(percentageChange * 100) / 100,
            hasData: true
        };
    }


    // Si par raport au Total :
    // async getAmountToPayPercentageChange(userId: string): Promise<{
    //     currentMonthAmount: number;
    //     previousMonthAmount: number;
    //     percentageChange: number;
    //     hasData: boolean;
    // } | null> {
    //     if (!this.db) throw new Error('Database not initialized');
    //
    //     // Récupérer les 2 dernières lectures
    //     const lastTwoReadingsQuery = `
    //     SELECT amountToPay
    //     FROM readings
    //     WHERE userId = ?
    //     ORDER BY newInputDate DESC, id DESC
    //     LIMIT 2
    // `;
    //
    //     const [results] = await this.db.executeSql(lastTwoReadingsQuery, [userId]);
    //
    //     if (results.rows.length < 2) {
    //         console.log('Pas assez de lectures:', results.rows.length);
    //         return {
    //             currentMonthAmount: results.rows.length === 1 ? results.rows.item(0).amountToPay : 0,
    //             previousMonthAmount: 0,
    //             percentageChange: 0,
    //             hasData: false
    //         };
    //     }
    //
    //     const currentAmount = results.rows.item(0).amountToPay;
    //     const previousAmount = results.rows.item(1).amountToPay;
    //
    //     // Récupérer la somme totale de tous les amountToPay
    //     const totalAmountQuery = `
    //     SELECT SUM(amountToPay) as totalAmount
    //     FROM readings
    //     WHERE userId = ?
    // `;
    //
    //     const [totalResults] = await this.db.executeSql(totalAmountQuery, [userId]);
    //     const totalAmount = totalResults.rows.item(0).totalAmount || 0;
    //
    //     // Calculer le pourcentage par rapport à la somme totale
    //     let percentageChange = 0;
    //     if (totalAmount > 0) {
    //         // Différence entre la lecture actuelle et précédente
    //         const difference = currentAmount - previousAmount;
    //         // Pourcentage par rapport au total
    //         percentageChange = (difference / totalAmount) * 100;
    //     }
    //
    //     console.log('Comparaison:', {
    //         currentAmount,
    //         previousAmount,
    //         totalAmount,
    //         difference: currentAmount - previousAmount,
    //         percentageChange
    //     });
    //
    //     return {
    //         currentMonthAmount: currentAmount,
    //         previousMonthAmount: previousAmount,
    //         percentageChange: Math.round(percentageChange * 100) / 100,
    //         hasData: true
    //     };
    // }

    async closeDatabase(): Promise<void> {
        if (this.db) {
            await this.db.close();
            this.db = null;
        }
    }
}

