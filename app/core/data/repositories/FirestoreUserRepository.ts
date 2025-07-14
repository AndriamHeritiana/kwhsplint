import firestore from '@react-native-firebase/firestore';

export class FirestoreUserRepository {
  async getUserData(
    uid: string,
  ): Promise<{address?: string; latitude?: string; longitude?: string; photoURL?: string}> {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
      // @ts-ignore
      return userDoc.exists ? userDoc.data() || {} : {};
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des données utilisateur : ${error.message}`,
      );
    }
  }

  async saveUserData(
    uid: string,
    data: {
      address: string | undefined;
      latitude: string;
      longitude: string;
      createdAt: string;
      photoURL?: string |'';
    },
  ) {
    try {
      await firestore().collection('users').doc(uid).set(data, {merge: true});
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la sauvegarde des données : ${error.message}`,
      );
    }
  }
    async updatePhotoUrl(uid: string, photoURL: string): Promise<void> {
        try {
            await firestore().collection('users').doc(uid).set(
                { photoURL },
                { merge: true }
            );
        } catch (error: any) {
            throw new Error(`Erreur lors de la mise à jour de la photo : ${error.message}`);
        }
    }
}
