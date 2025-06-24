import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

export const UserInfo = ({ photoURL, displayName, email }: { photoURL: string; displayName: string; email: string }) => {
    const handleEditPhoto = () => {
        console.log('Modifier la photo de profil');
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
