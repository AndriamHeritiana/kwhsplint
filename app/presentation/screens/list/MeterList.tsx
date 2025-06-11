import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/presentation/state/redux/store/store';
import { initializeDatabase, fetchReadings } from '@/presentation/state/redux/store/readingSlice';
import { formatDate } from '@/core/utils/dateUtils';
import SkeletonCard from'@/presentation/screens/skeleton/SkeletonCard';
import MeterEmptyList from "@/presentation/screens/list/MeterEmptyList.tsx";
interface MeterListProps {
    searchTerm: string; // Nouvelle prop pour le terme de recherche
}
const MeterList: React.FC<MeterListProps> = ({ searchTerm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { historyReadings: readings, loading, isDbReady } = useSelector((state: RootState) => state.reading);

    useEffect(() => {
        dispatch(initializeDatabase());
    }, [dispatch]);

    useEffect(() => {
        if (isDbReady) {
            dispatch(fetchReadings(searchTerm));
        }
    }, [isDbReady, dispatch, searchTerm]);

    if (loading) {
        return (
                <ScrollView style={styles.wrapper}>
                    {[...Array(3)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </ScrollView>
        );
    }

    // Afficher MetterEmptyList si la liste est vide
    if (readings.length === 0) {
        return (
            <ScrollView style={styles.wrapper}>
                <MeterEmptyList />
            </ScrollView>
        );
    }
    return (
        <ScrollView style={styles.wrapper}>
            {readings.map((reading) => (
                <View key={reading.id || Math.random()} style={styles.card}>
                    <View style={styles.topRow}>
                        <View style={styles.iconCircle}>
                            <Icon name="flash" size={20} color="#4A90E2" />
                        </View>
                        <View style={styles.infoSection}>
                            <Text style={styles.placeName}>{reading.city}, {reading.residence}</Text>
                            <Text style={styles.subtitle}>Consumption: {reading.mainCounterValue}</Text>
                        </View>
                        <View style={styles.locationBox}>
                            <Icon name="map-pin" size={14} color="#7D8CA1" />
                            <Text style={styles.locationCount}>{reading.amountToPay}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
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
        </ScrollView>
    );
};

export default MeterList;
