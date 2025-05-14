import { useEffect, useMemo } from 'react';
import {SQLiteService} from '@/infrastructure/storage/SQLiteService.ts';
import {ReadingRepositoryImpl} from '@/core/data/repositories/ReadingRepositoryImpl.ts';
import {AddReadingUseCase} from '@/core/domain/usecases/AddReadingUseCase.ts';
export const useReadingRepository = () =>{
    const sqliteService = useMemo(() => new SQLiteService(), []);
    const readingRepository = useMemo(() => new ReadingRepositoryImpl(sqliteService), [sqliteService]);
    const addReadingUseCase = useMemo(() => new AddReadingUseCase(readingRepository), [readingRepository]);
    useEffect(() => {
        sqliteService.openDatabase();
        return () => {
            sqliteService.closeDatabase();
        };
    }, [sqliteService]);
    return { addReadingUseCase };
};
