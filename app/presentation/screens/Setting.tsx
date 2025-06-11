import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import {signOut} from "@/presentation/state/redux/slices/authSlice.ts";
import {AppDispatch} from "@/presentation/state/redux/store/store.ts";
import {useDispatch} from "react-redux";
const Setting = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = async () => {
        try {
            await dispatch(signOut()).unwrap();
        }catch (error)
        {
            console.log('logout error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Déconnexion</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#ff4444',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Setting;
