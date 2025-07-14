import {UserDataSource} from "@/core/data/datasources/UserDataSource.ts";
import {FirebaseAuthService} from "@/infrastructure/services/FirebaseAuthService.ts";
import {FirestoreUserRepository} from "@/core/data/repositories/FirestoreUserRepository.ts";

export class FirebaseUserDataSource implements UserDataSource{
    private authService: FirebaseAuthService; // Pour l'authentification Firebase
    private userRepository: FirestoreUserRepository;
    constructor(authService: FirebaseAuthService, userRepository: FirestoreUserRepository,) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    async updatePhoto(photoURL: string): Promise<void> {
        const authUser = await this.authService.getCurrentUser();
        if (!authUser) throw new Error("Utilisateur non connecté");
        await this.userRepository.updatePhotoUrl(authUser.uid, photoURL);
    }
}
