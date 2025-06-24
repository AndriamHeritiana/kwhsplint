import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
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
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ProfileHeader
                displayName={user?.displayName || 'Utilisateur'}
                onBackPress={handleBackPress} />
            <UserInfo
                photoURL={user?.photoURL || 'public/images/default.jpg'}
                displayName={user?.displayName || 'Utilisateur'}
                email={user?.email || 'user@kwhsplint.com'} />
            {user?.id &&
                <ProfileTabs
                userId={user?.id}
            />}
            <LeafletMap
                latitude={user?.latitude}
                longitude={user?.longitude}
                address={user?.address} />
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
