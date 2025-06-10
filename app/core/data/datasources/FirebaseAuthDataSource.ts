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
            const { address, latitude, longitude } = userDoc.exists ? userDoc.data() || {} : {};
            console.log('User data from Firestore:', { address, latitude, longitude });
            return {
                id: user.uid,
                email: user.email || '',
                displayName: user.displayName || undefined,
                photoURL: user.photoURL || undefined,
                createdAt: user.metadata.creationTime || new Date().toISOString(),
                updatedAt: user.metadata.lastSignInTime || undefined,
                address: address,
                latitude: latitude,
                longitude: longitude,
            };
        } catch (error: any) {
            throw new Error(`Erreur de connexion : ${error.message}`);
        }
    }

    async signUp(email: string, password: string, latitude: string, longitude: string, displayName?: string): Promise<User> {
        try {

            console.log('lat:', parseFloat(latitude));
            console.log('long:', parseFloat(longitude));

            // Reverse geocode using Nominatim with latitude and longitude coordinates
            const { address } = await reverseGeocode(parseFloat(latitude), parseFloat(longitude));

            // If we reach here, coordinates are valid and geocoding succeeded
            // Now create user in Firebase Authentication
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            try {
                // Update displayName if provided
                if (displayName) {
                    await user.updateProfile({ displayName });
                }

                // Store city and address in Firestore
                await firestore().collection('users').doc(user.uid).set(
                    {
                        address,
                        createdAt: new Date().toISOString(),
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                    },
                    { merge: true }
                );

                return {
                    id: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || undefined,
                    photoURL: user.photoURL || undefined,
                    createdAt: user.metadata.creationTime || new Date().toISOString(),
                    updatedAt: user.metadata.lastSignInTime || undefined,
                    latitude: latitude,
                    longitude: longitude,
                    address,
                };
            } catch (firestoreError: any) {
                // If Firestore fails, delete the created user from Firebase Auth
                await user.delete();
                throw new Error(`Erreur lors de la sauvegarde des données : ${firestoreError.message}`);
            }
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
        const { address, latitude, longitude } = userDoc.exists ? userDoc.data() || {} : {};

        return {
            id: user.uid,
            email: user.email || '',
            displayName: user.displayName || undefined,
            photoURL: user.photoURL || undefined,
            createdAt: user.metadata.creationTime || new Date().toISOString(),
            updatedAt: user.metadata.lastSignInTime || undefined,
            address: address,
            latitude: latitude,
            longitude: longitude,
        };
    }
}
