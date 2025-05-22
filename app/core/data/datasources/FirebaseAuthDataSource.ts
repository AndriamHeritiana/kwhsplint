import auth from "@react-native-firebase/auth";
import { AuthDataSource } from "./AuthDataSource";
import { User } from "../../domain/entities/User";

export class FirebaseAuthDataSource implements AuthDataSource {
    async signIn(email: string, password: string): Promise<User> {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            return {
                id: user.uid,
                email: user.email || "",
                displayName: user.displayName || undefined,
                photoURL: user.photoURL || undefined,
                createdAt: user.metadata.creationTime || new Date().toISOString(),
                updatedAt: user.metadata.lastSignInTime || undefined,
            };
        } catch (error) {
            // @ts-ignore
            throw new Error(`Erreur de connexion : ${error.message}`);
        }
    }

    async signUp(email: string, password: string, displayName?: string): Promise<User> {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            if (displayName) {
                await user.updateProfile({ displayName });
            }
            return {
                id: user.uid,
                email: user.email || "",
                displayName: user.displayName || undefined,
                photoURL: user.photoURL || undefined,
                createdAt: user.metadata.creationTime || new Date().toISOString(),
                updatedAt: user.metadata.lastSignInTime || undefined,
            };
        } catch (error) {
            // @ts-ignore
            throw new Error(`Erreur d'inscription : ${error.message}`);
        }
    }

    async signOut(): Promise<void> {
        try {
            await auth().signOut();
        } catch (error) {
            // @ts-ignore
            throw new Error(`Erreur de déconnexion : ${error.message}`);
        }
    }

    async getCurrentUser(): Promise<User | null> {
        const user = auth().currentUser;
        if (!user) return null;
        return {
            id: user.uid,
            email: user.email || "",
            displayName: user.displayName || undefined,
            photoURL: user.photoURL || undefined,
            createdAt: user.metadata.creationTime || new Date().toISOString(),
            updatedAt: user.metadata.lastSignInTime || undefined,
        };
    }
}
