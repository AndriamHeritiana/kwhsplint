import { AuthDataSource } from './AuthDataSource';
import { User } from '../../domain/entities/User';
import {GeocodingService} from "@/core/data/services/GeocodingService.ts";
import { FirebaseAuthService } from '@/infrastructure/services/FirebaseAuthService';
import { FirestoreUserRepository } from '@/core/data/repositories/FirestoreUserRepository';
import { UserMapper } from '@/core/utils/UserMapper';

export class FirebaseAuthDataSource implements AuthDataSource {
    private authService: FirebaseAuthService;
    private userRepository: FirestoreUserRepository;
    private geocodingService: GeocodingService;

    constructor(authService: FirebaseAuthService, userRepository: FirestoreUserRepository, geocodingService: GeocodingService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.geocodingService = geocodingService;
    }

    async signIn(email: string, password: string): Promise<User> {
        const authUser = await this.authService.signIn(email, password);
        const firestoreData = await this.userRepository.getUserData(authUser.uid);
        return UserMapper.toDomain(authUser, firestoreData);
    }

    async signUp(email: string, password: string, latitude: string, longitude: string, displayName?: string): Promise<User> {
        try {
            const { address } = await this.geocodingService.reverseGeocode(parseFloat(latitude), parseFloat(longitude));
            const authUser = await this.authService.signUp(email, password, displayName);

            const userData = {
                address,
                latitude: latitude,
                longitude: longitude,
                createdAt: new Date().toISOString(),
            };
            await this.userRepository.saveUserData(authUser.uid, userData);
            return UserMapper.toDomain(authUser, userData);
        } catch (error: any) {
            if (error.message.includes('sauvegarde')) {
                const authUser = await this.authService.getCurrentUser();
                if (authUser) await authUser.delete();
            }
            throw new Error(`Erreur d'inscription : ${error.message}`);
        }
    }

    async signOut(): Promise<void> {
        await this.authService.signOut();
    }

    async getCurrentUser(): Promise<User | null> {
        const authUser = this.authService.getCurrentUser();
        if (!authUser) return null;
        const firestoreData = await this.userRepository.getUserData(authUser.uid);
        return UserMapper.toDomain(authUser, firestoreData);
    }
}
