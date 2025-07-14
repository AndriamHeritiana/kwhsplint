import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadProfileImage } from "@/infrastructure/services/SupabaseService";
import Icon from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdatePhoto } from "@/presentation/state/redux/slices/userSlices.ts";
import {AppDispatch, RootState} from "@/presentation/state/redux/store/store.ts";

export const UserInfo = ({ photoURL, displayName, email, userId }: { photoURL: string; displayName: string; email: string; userId:string }) => {

    const { user, loading, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const handleEditPhoto = async () => {
        try {
            // Ouvre la bibliothèque d'images
            const result = await launchImageLibrary({
                mediaType: 'photo',
                maxWidth: 1000,
                maxHeight: 1000,
                quality: 0.7,
            });

            if (result.didCancel || !result.assets || !result.assets[0]) {
                console.log('Sélection d\'image annulée');
                return;
            }
            const file = {
                uri: result.assets[0].uri!,
                name: `profile_${userId}.jpg`,
                type: result.assets[0].type || 'image/jpeg',
            };

            if (userId){
                const newPhotoURL = await uploadProfileImage(userId, file);
                if (newPhotoURL) {
                    console.log('Image téléversée avec succès, nouvelle URL :', newPhotoURL);
                    // setLocalPhotoURL(newPhotoURL); // Mettez à jour l'affichage local
                    await dispatch(getUpdatePhoto(newPhotoURL)).unwrap();
                }
            }
        } catch (error) {
            console.error('Erreur lors de la sélection ou du téléversement de l\'image :', error);
        }
    };

    return (
        <View style={styles.userInfo}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={{ uri: photoURL || 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.editIconContainer} onPress={handleEditPhoto}>
                    <Icon name="pencil" size={16} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#4A90E2',
        marginBottom: 10,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        backgroundColor: '#4A90E2',
        borderRadius: 12,
        padding: 4,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
});
