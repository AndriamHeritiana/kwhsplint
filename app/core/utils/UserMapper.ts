import { User} from "@/core/domain/entities/User.ts";

export class UserMapper {
    static toDomain(authUser: any, firestoreData: { address?: string; latitude?: string; longitude?: string;photoURL?:string }): User {
        return {
            id: authUser.uid,
            email: authUser.email || '',
            displayName: authUser.displayName || undefined,
            createdAt: authUser.metadata.creationTime || new Date().toISOString(),
            updatedAt: authUser.metadata.lastSignInTime || undefined,
            address: firestoreData.address || '',
            latitude: firestoreData.latitude || '',
            longitude: firestoreData.longitude || '',
            photoURL: firestoreData.photoURL || '',
        };
    }
}
