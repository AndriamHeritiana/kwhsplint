import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '@/presentation/state/redux/selectors/authSelectors.ts';
import { useNavigation } from '@react-navigation/native';
import LeafletMap from "@/presentation/screens/map/LeafletMap.tsx";
import { ProfileTabs } from "@/presentation/screens/profil/ProfileTabs.tsx";
import { UserInfo } from "@/presentation/screens/profil/UserInfo.tsx";
import { ProfileHeader } from "@/presentation/screens/profil/ProfileHeader.tsx";
import { getDefaultAvatarSignedUrl } from "@/infrastructure/services/SupabaseService";

const ProfilScreen = () => {
    const navigation = useNavigation();
    const user = useSelector(selectUser);
    const [defaultAvatarUrl, setDefaultAvatarUrl] = useState<string>('https://via.placeholder.com/100');
    // Récupérez l'URL signée au montage du composant
    useEffect(() => {
        const fetchAvatarUrl = async () => {
            const url = await getDefaultAvatarSignedUrl();
            setDefaultAvatarUrl(url);
        };
        fetchAvatarUrl();
    }, []);

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ProfileHeader
                displayName={user?.displayName || 'Utilisateur'}
                onBackPress={handleBackPress} />
            <UserInfo
                photoURL={user?.photoURL || defaultAvatarUrl} // Utilisez l'URL signée ou l'URL de secours
                displayName={user?.displayName || 'Utilisateur'}
                email={user?.email || 'user@kwhsplint.com'}
                userId={user?.id || ''}
            />
            {user?.id && (
                <ProfileTabs userId={user?.id} />
            )}
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
