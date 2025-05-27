import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthDataSource } from './AuthDataSource';
import { User } from '../../domain/entities/User';

async function reverseGeocode(latitude: number, longitude: number): Promise<{address?: string }> {
    try {
        // Validate latitude and longitude
        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            console.error('Invalid coordinates:', { latitude, longitude });
            return {address: undefined };
        }

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
                headers: {
                    // Replace with a unique User-Agent for your app
                    'User-Agent': 'MyReactNativeApp/1.0 (contact@myapp.com)',
                },
            }
        );

        // Check if response is OK (status 200)
        if (!response.ok) {
            const errorText = await response.text(); // Get raw response for debugging
            console.error(`Nominatim API error: Status ${response.status}, Body: ${errorText}`);
            return { address: undefined };
        }

        const data = await response.json();
        console.log('Nominatim API response:', data);

        // Check for API-specific errors
        if (data.error) {
            console.error('Nominatim API returned an error:', data.error);
            return { address: undefined };
        }

        const city = data.address.city || data.address.town || data.address.village || undefined;
        const address = data.display_name || undefined;

        console.log('Reverse geocoding successful:', { city, address });
        return { address };
    } catch (error: any) {
        console.error('Reverse geocoding failed:', error.message);
        return { address: undefined };
    }
}

export class FirebaseAuthDataSource implements AuthDataSource {
    async signIn(email: string, password: string): Promise<User> {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Fetch city and address from Firestore
            const userDoc = await firestore().collection('users').doc(user.uid).get();
            // @ts-ignore
            const { address } = userDoc.exists ? userDoc.data() || {} : {};

            return {
                id: user.uid,
                email: user.email || '',
                displayName: user.displayName || undefined,
                photoURL: user.photoURL || undefined,
                createdAt: user.metadata.creationTime || new Date().toISOString(),
                updatedAt: user.metadata.lastSignInTime || undefined,
                address,
            };
        } catch (error: any) {
            throw new Error(`Erreur de connexion : ${error.message}`);
        }
    }

    async signUp(email: string, password: string, displayName?: string): Promise<User> {
        try {
            // Use mocked coordinates for testing
            const mockedLatitude = -18.8736393;
            const mockedLongitude = 47.49265;

            // Reverse geocode using Nominatim with mocked coordinates
            const { address } = await reverseGeocode(mockedLatitude, mockedLongitude);

            // Create user in Firebase Authentication
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Update displayName if provided
            if (displayName) {
                await user.updateProfile({ displayName });
            }

            // Store city and address in Firestore
            await firestore().collection('users').doc(user.uid).set(
                { address, createdAt: new Date().toISOString() },
                { merge: true }
            );

            return {
                id: user.uid,
                email: user.email || '',
                displayName: user.displayName || undefined,
                photoURL: user.photoURL || undefined,
                createdAt: user.metadata.creationTime || new Date().toISOString(),
                updatedAt: user.metadata.lastSignInTime || undefined,
                address,
            };
        } catch (error: any) {
            throw new Error(`Erreur d'inscription : ${error.message}`);
        }
    }

    async signOut(): Promise<void> {
        try {
            await auth().signOut();
        } catch (error: any) {
            throw new Error(`Erreur de déconnexion : ${error.message}`);
        }
    }

    async getCurrentUser(): Promise<User | null> {
        const user = auth().currentUser;
        if (!user) return null;

        // Fetch city and address from Firestore
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        // @ts-ignore
        const { address } = userDoc.exists ? userDoc.data() || {} : {};

        return {
            id: user.uid,
            email: user.email || '',
            displayName: user.displayName || undefined,
            photoURL: user.photoURL || undefined,
            createdAt: user.metadata.creationTime || new Date().toISOString(),
            updatedAt: user.metadata.lastSignInTime || undefined,
            address,
        };
    }
}
