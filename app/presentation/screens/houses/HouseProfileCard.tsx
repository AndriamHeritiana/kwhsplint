import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';

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

export default HouseProfileCard;
