import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthIsReady, selectUser } from '@/presentation/state/redux/selectors/authSelectors.ts';
import { formatDate } from '@/core/utils/dateUtils.ts';
import { AppDispatch, RootState } from '@/presentation/state/redux/store/store.ts';
import { fetchAmountToPay, initializeDatabase } from '@/presentation/state/redux/store/readingSlice.ts';

// Fonction pour formater le montant avec des séparateurs de milliers
const formatAmount = (amount: number): string => {
    return amount.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }) + ' Ar';
};

const HouseProfileCard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { totalAmountToPay, isDbReady } = useSelector((state: RootState) => state.reading);
    const isAuthReady = useSelector(selectAuthIsReady);
    const user = useSelector(selectUser);
    const displayName = user?.displayName || 'Utilisateur';
    const photoURL = user?.photoURL || 'public/images/default.jpg';
    const today = React.useMemo(() => formatDate(new Date().toISOString()), []);

    useEffect(() => {
        dispatch(initializeDatabase());
    }, [dispatch]);

    useEffect(() => {
        if (isDbReady && isAuthReady && user) {
            dispatch(fetchAmountToPay(user.id));
        }
    }, [isDbReady, isAuthReady, user, dispatch]);

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
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Icon name="calendar" size={14} color="#FFA726" />
                    <Text style={[styles.badgeText, { color: '#FFA726' }]}>{today}</Text>
                </View>
                <View style={styles.footerItem}>
                    <Icon name="dollar" size={14} color="#4A90E2" />
                    <Text style={[styles.badgeText, { color: '#4A90E2' }]}>
                        {formatAmount(totalAmountToPay)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HouseProfileCard;
