import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';
import { useReadingHistory} from '@/presentation/hooks/useReadingHistory';

const MeterList = () => {
    const { readings, loading } = useReadingHistory();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
    };

    if (loading) {
        return <Text>Chargement...</Text>;
    }

    return (
        <ScrollView style={styles.wrapper}>
            {readings.map((reading: any) => (
                <View key={reading.id || Math.random()} style={styles.card}>
                    <View style={styles.topRow}>
                        <View style={styles.iconCircle}>
                            <Icon name="flash" size={20} color="#4A90E2" />
                        </View>
                        <View style={styles.infoSection}>
                            <Text style={styles.placeName}>Tana, ANOSISOA</Text>
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
