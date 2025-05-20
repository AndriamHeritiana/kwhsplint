import React, {useEffect} from 'react';
import {
    View,
    Text, ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/presentation/state/redux/store/store';
import {initializeDatabase, fetchTwoLastReadings} from '@/presentation/state/redux/store/readingSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';
import { formatDate } from '@/core/utils/dateUtils';
import SkeletonCard from "@/presentation/screens/skeleton/SkeletonCard.tsx";
interface MeterListProps {
    searchTerm: string; // Nouvelle prop pour le terme de recherche
}
const ConsumptionCard: React.FC<MeterListProps> = ({ searchTerm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { homeReadings: readings, loading, isDbReady } = useSelector((state: RootState) => state.reading);

    useEffect(() => {
        dispatch(initializeDatabase());
    }, [dispatch]);

    useEffect(() => {
        if (isDbReady) {
            dispatch(fetchTwoLastReadings(searchTerm));
        }
    }, [isDbReady, dispatch, searchTerm]);

    if (loading) {
        return (
            <ScrollView style={styles.wrapper}>
                {[...Array(2)].map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </ScrollView>
        );
    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Last recorded</Text>
            {readings.map((reading) => (
            <View key={reading.id || Math.random()} style={styles.card}>
                {/* Haut de la carte */}
                <View style={styles.topRow}>
                    {/* Icône de gauche */}
                    <View style={styles.iconCircle}>
                        <Icon name="flash" size={20} color="#4A90E2" />
                    </View>

                    {/* Texte principal */}
                    <View style={styles.infoSection}>
                        <Text style={styles.placeName}>{reading.city}, {reading.residence}</Text>
                        <Text style={styles.subtitle}>Consumption: {reading.mainCounterValue}</Text>
                    </View>

                    {/* Localisation + chiffre */}
                    <View style={styles.locationBox}>
                        <Icon name="map-pin" size={14} color="#7D8CA1" />
                        <Text style={styles.locationCount}>{reading.amountToPay}</Text>
                    </View>
                </View>

                {/* Ligne de séparation */}
                <View style={styles.separator} />

                {/* Badges de date */}
                <View style={styles.badgeRow}>
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>
                            {formatDate(reading.oldInputDate)}
                        </Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
                        <Icon name="calendar" size={14} color="#4A90E2" />
                        <Text style={[styles.badgeText, { color: '#4A90E2' }]}>
                            {formatDate(reading.newInputDate)}
                        </Text>
                    </View>
                </View>
            </View>
            ))}
        </View>
    );
};

export default ConsumptionCard;
