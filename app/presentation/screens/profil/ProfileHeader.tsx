import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {signOut} from "@/presentation/state/redux/slices/authSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/presentation/state/redux/store/store.ts";

interface ProfileHeaderProps {
    displayName: string;
    onBackPress: () => void;
}

export const ProfileHeader = ({ displayName, onBackPress }: ProfileHeaderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const handleEdit = () => {
        console.log("Modifier le profil");
        setIsMenuVisible(false);
    };

    const handleLogout = async() => {
        try {
            await dispatch(signOut()).unwrap();
        }catch (error)
        {
            console.log('logout error', error);
        }
        setIsMenuVisible(false);
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBackPress}>
                    <Icon name="arrow-left" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{displayName}</Text>
                <TouchableOpacity onPress={toggleMenu}>
                    <Icon name="bars" size={24} color="#4A90E2" />
                </TouchableOpacity>
            </View>
            {isMenuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                        <Icon name="edit" size={20} color="#333" />
                        <Text style={styles.menuText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <Icon name="sign-out" size={20} color="#FF6347" />
                        <Text style={[styles.menuText, { color: "#FF6347" }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    menu: {
        position: 'absolute',
        top: 50,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 16,
    },
});
