import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const ConsumptionCard = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Last recorded</Text>

            <View style={styles.card}>
                {/* Haut de la carte */}
                <View style={styles.topRow}>
                    {/* Icône de gauche */}
                    <View style={styles.iconCircle}>
                        <Icon name="flash" size={20} color="#4A90E2" />
                    </View>

                    {/* Texte principal */}
                    <View style={styles.infoSection}>
                        <Text style={styles.placeName}>Tana, ANOSISOA</Text>
                        <Text style={styles.subtitle}>Consommation</Text>
                    </View>

                    {/* Localisation + chiffre */}
                    <View style={styles.locationBox}>
                        <Icon name="map-pin" size={14} color="#7D8CA1" />
                        <Text style={styles.locationCount}>15</Text>
                    </View>
                </View>

                {/* Ligne de séparation */}
                <View style={styles.separator} />

                {/* Badges de date */}
                <View style={styles.badgeRow}>
                    <View style={[styles.badge, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badge, styles.blueBadge]}>
                        <Icon name="calendar" size={14} color="#4A90E2" />
                        <Text style={[styles.badgeText, { color: '#4A90E2' }]}>Monday, 21 July</Text>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                {/* Haut de la carte */}
                <View style={styles.topRow}>
                    {/* Icône de gauche */}
                    <View style={styles.iconCircle}>
                        <Icon name="flash" size={20} color="#4A90E2" />
                    </View>

                    {/* Texte principal */}
                    <View style={styles.infoSection}>
                        <Text style={styles.placeName}>Tana, ANOSISOA</Text>
                        <Text style={styles.subtitle}>Consommation</Text>
                    </View>

                    {/* Localisation + chiffre */}
                    <View style={styles.locationBox}>
                        <Icon name="map-pin" size={14} color="#7D8CA1" />
                        <Text style={styles.locationCount}>15</Text>
                    </View>
                </View>

                {/* Ligne de séparation */}
                <View style={styles.separator} />

                {/* Badges de date */}
                <View style={styles.badgeRow}>
                    <View style={[styles.badge, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badge, styles.blueBadge]}>
                        <Icon name="calendar" size={14} color="#4A90E2" />
                        <Text style={[styles.badgeText, { color: '#4A90E2' }]}>Monday, 21 July</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 12,
        marginTop: 16,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginBottom: 16,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        backgroundColor: '#E6F0FA',
        padding: 10,
        borderRadius: 25,
        marginRight: 12,
    },
    infoSection: {
        flex: 1,
    },
    placeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 13,
        color: '#7D8CA1',
        marginTop: 2,
    },
    locationBox: {
        alignItems: 'center',
    },
    locationCount: {
        fontSize: 13,
        color: '#7D8CA1',
        marginTop: 2,
    },
    separator: {
        height: 1,
        backgroundColor: '#ECECEC',
        marginVertical: 12,
        opacity: 0.5,
    },
    badgeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    badgeText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '500',
    },
    orangeBadge: {
        backgroundColor: '#FFF3E0',
    },
    blueBadge: {
        backgroundColor: '#E3F2FD',
    },
});

export default ConsumptionCard;
