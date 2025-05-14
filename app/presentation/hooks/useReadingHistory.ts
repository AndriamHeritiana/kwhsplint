import { useEffect, useState, useMemo } from 'react';
import { SQLiteService } from '@/infrastructure/storage/SQLiteService';
import { ReadingRepositoryImpl } from '@/core/data/repositories/ReadingRepositoryImpl';
import { GetHistoryUseCase } from '@/core/domain/usecases/GetHistoryUseCase';
import { Reading } from '@/core/domain/entities/Reading';

export const useReadingHistory = () => {
    const sqliteService = useMemo(() => new SQLiteService(), []);
    const readingRepository = useMemo(() => new ReadingRepositoryImpl(sqliteService), [sqliteService]);
    const getHistoryUseCase = useMemo(() => new GetHistoryUseCase(readingRepository), [readingRepository]);

    const [readings, setReadings] = useState<Reading[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDbReady, setIsDbReady] = useState(false);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                await sqliteService.openDatabase();
                setIsDbReady(true);
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de la base de données:', error);
                setLoading(false);
            }
        };

        initializeDatabase();

        return () => {
            sqliteService.closeDatabase();
        };
    }, [sqliteService]);

    useEffect(() => {
        if (!isDbReady) return;

        const fetchReadings = async () => {
            try {
                const data = await getHistoryUseCase.execute();
                setReadings(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des lectures:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReadings();
    }, [isDbReady, getHistoryUseCase]);

    return { readings, loading, isDbReady };
};
