import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import HouseProfileCard from '../screens/houses/HouseProfileCard.tsx';
import SearchBar from './houses/SearchBar.tsx';
import ConsumptionCard from './houses/ConsumptionCard.tsx';
import Layout from '../components/Layout.tsx';
const HomeScreen = () => {

    return (
        <Layout>
        <SafeAreaView>
            {/* Section 1: Carte profil utilisateur */}
            <HouseProfileCard />

            {/* Section 2: Barre de recherche */}
            <SearchBar />

            {/* Section 3: Liste */}
            <ConsumptionCard />
        </SafeAreaView>
        </Layout>
    );
};
export default HomeScreen;
