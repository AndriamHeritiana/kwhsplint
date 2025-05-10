import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const HouseProfileCard = () => {
    return (
        <TouchableOpacity style={styles.card}>
            {/* Haut de la carte : photo + nom + flèche */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/80' }} // Remplace avec une vraie photo
                    style={styles.houseImage}
                />
                <View style={styles.nameSection}>
                    <Text style={styles.houseName}>Heritiana RA</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#4A90E2" />
            </View>
            <View style={styles.separator} />
            {/* Bas de la carte : date + prix */}
            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Icon name="calendar" size={14} color="#FFA726" />
                    <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                </View>
                <View style={styles.footerItem}>
                    <Icon name="dollar" size={14} color="#4A90E2" />
                    <Text style={[styles.badgeText, { color: '#4A90E2' }]}>12 000,00 Ar</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        paddingVertical: 14, // un peu moins de padding
        paddingHorizontal: 16,
        marginVertical: 10,
        marginHorizontal: 16,
        elevation: 2,
        width: width * 0.92, // réduit légèrement la largeur pour un meilleur rendu
        alignSelf: 'center', // pour centrer la carte si moins large que l'écran
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    houseImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#4A90E2',
        marginRight: 12,
    },
    nameSection: {
        flex: 1,
    },
    houseName: {
        color: '#4A90E2',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingHorizontal: 4,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#4A90E2',
        opacity: 0.3,
        marginVertical: 16,
    },
    badgeText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '500',
    },
});

export default HouseProfileCard;
