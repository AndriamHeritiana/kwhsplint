import auth from '@react-native-firebase/auth';

export class FirebaseAuthService {
    async signIn(email: string, password: string) {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error: any) {
            throw new Error(`Erreur de connexion : ${error.message}`);
        }
    }

    async signUp(email: string, password: string, displayName?: string) {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            if (displayName) {
                await user.updateProfile({ displayName });
            }
            return user;
        } catch (error: any) {
            throw new Error(`Erreur d'inscription : ${error.message}`);
        }
    }

    async signOut() {
        try {
            await auth().signOut();
        } catch (error: any) {
            throw new Error(`Erreur de déconnexion : ${error.message}`);
        }
    }

    getCurrentUser() {
        return auth().currentUser;
    }
}
