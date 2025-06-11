import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';
import { useSelector } from 'react-redux';
import { selectUser } from "@/presentation/state/redux/selectors/authSelectors.ts";
import { formatDate } from '@/core/utils/dateUtils.ts';
const HouseProfileCard = () => {
    const user = useSelector(selectUser);
    // console.log(user)// Recover the user from Redux
    const displayName = user?.displayName || 'Utilisateur';
    const photoURL = user?.photoURL || 'public/images/default.jpg';
    const today = React.useMemo(() => formatDate(new Date().toISOString()), []);
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/80' }} // Replace with a real photo
                    style={styles.houseImage}
                />
                <View style={styles.nameSection}>
                    <Text style={styles.houseName}>{displayName}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#4A90E2" />
            </View>
            <View style={styles.separator} />
            {/* Bas de la carte : date + prix */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Icon name="calendar" size={14} color="#FFA726" />
                    <Text style={[styles.badgeText, { color: '#FFA726' }]}>{today}</Text>
                </View>
                <View style={styles.footerItem}>
                    <Icon name="dollar" size={14} color="#4A90E2" />
                    <Text style={[styles.badgeText, { color: '#4A90E2' }]}>12 000,00 Ar</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HouseProfileCard;
