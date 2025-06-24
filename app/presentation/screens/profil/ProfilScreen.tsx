import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/presentation/state/redux/selectors/authSelectors.ts';
import { useNavigation } from '@react-navigation/native';
import LeafletMap from "@/presentation/screens/map/LeafletMap.tsx";
import { ProfileTabs } from "@/presentation/screens/profil/ProfileTabs.tsx";
import { UserInfo } from "@/presentation/screens/profil/UserInfo.tsx";
import { ProfileHeader } from "@/presentation/screens/profil/ProfileHeader.tsx";

const ProfilScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(selectUser);
    const displayName = user?.displayName || 'Utilisateur';
    const photoURL = user?.photoURL || 'public/images/default.jpg';
    const email = user?.email || 'email@exemple.com';
    const latitude = user?.latitude;
    const longitude = user?.longitude;
    const address = user?.address;

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ProfileHeader displayName={displayName} onBackPress={handleBackPress} />
            <UserInfo photoURL={photoURL} displayName={displayName} email={email} />
            <ProfileTabs />
            <LeafletMap latitude={latitude} longitude={longitude} address={address} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingBottom: 16,
    },
});

export default ProfilScreen;
