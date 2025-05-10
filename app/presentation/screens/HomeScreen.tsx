import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import HouseProfileCard from '../screens/houses/HouseProfileCard.tsx';
import SearchBar from "./houses/SearchBar.tsx";
import ConsumptionCard from "./houses/ConsumptionCard.tsx";

const HomeScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            {/* Section 1: Carte profil utilisateur */}
            <HouseProfileCard />

            {/* Section 2: Barre de recherche */}
            <SearchBar />

            {/* Section 3: Liste */}
            <ConsumptionCard />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    userCard: {
        backgroundColor: '#e0f7fa',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    userName: { fontSize: 18, fontWeight: 'bold' },
    searchBar: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    buttonText: { color: '#fff', textAlign: 'center' },
    list: { flex: 1 },
    listItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    menu: {
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    menuText: { fontSize: 16 },
});

export default HomeScreen;
