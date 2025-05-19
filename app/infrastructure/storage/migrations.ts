// migrations.ts
import SQLite from 'react-native-sqlite-storage';

interface Migration {
    version: number;
    description: string;
    up: (db: SQLite.SQLiteDatabase) => Promise<void>;
}

// Liste des migrations
const migrations: Migration[] = [
    {
        version: 1,
        description: 'Création initiale de la table readings et des index',
        up: async (db: SQLite.SQLiteDatabase) => {
            // Créer la table schema_version pour suivre les migrations
            await db.executeSql(`
        CREATE TABLE IF NOT EXISTS schema_version (
          version INTEGER PRIMARY KEY
        );
      `);

            // Créer la table readings avec les champs pris en charge
            await db.executeSql(`
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
      `);

            // Créer les index pour optimiser les recherches
            const createIndexesQueries = [
                `CREATE INDEX IF NOT EXISTS idx_amountInvoice ON readings(amountInvoice)`,
            ];

            for (const queryIndex of createIndexesQueries) {
                await db.executeSql(queryIndex);
            }
        },
    },
    {
        version: 2,
        description: 'Ajout des colonnes residence et city à la table readings',
        up: async (db: SQLite.SQLiteDatabase) => {
            // Vérifier et ajouter la colonne residence si elle n'existe pas
            const [pragmaResult] = await db.executeSql('PRAGMA table_info(readings);');
            const columns = pragmaResult.rows.raw().map((row: any) => row.name);

            if (!columns.includes('residence')) {
                await db.executeSql("ALTER TABLE readings ADD COLUMN residence TEXT NOT NULL DEFAULT '';");
            }

            if (!columns.includes('city')) {
                await db.executeSql("ALTER TABLE readings ADD COLUMN city TEXT NOT NULL DEFAULT '';");
            }

            // Ajouter des index pour les nouvelles colonnes
            const createIndexesQueries = [
                `CREATE INDEX IF NOT EXISTS idx_residence ON readings(residence)`,
                `CREATE INDEX IF NOT EXISTS idx_city ON readings(city)`,
            ];

            for (const queryIndex of createIndexesQueries) {
                await db.executeSql(queryIndex);
            }
        },
    },
];

// Fonction pour exécuter les migrations
export async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
    try {
        // Vérifier la version actuelle du schéma
        let currentVersion = 0;
        try {
            const [result] = await db.executeSql('SELECT MAX(version) as version FROM schema_version;');
            if (result.rows.length > 0) {
                currentVersion = result.rows.item(0).version || 0;
            }
        } catch (error) {
            // La table schema_version n'existe pas encore, donc version = 0
        }

        // Appliquer les migrations nécessaires
        for (const migration of migrations) {
            if (migration.version > currentVersion) {
                console.log(`Application de la migration ${migration.version}: ${migration.description}`);
                await migration.up(db);
                await db.executeSql('INSERT INTO schema_version (version) VALUES (?);', [migration.version]);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l’exécution des migrations :', error);
        throw error;
    }
}
