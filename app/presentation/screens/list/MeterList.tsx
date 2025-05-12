import React from 'react';
import {
    ScrollView,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../state/context/styles/styles';
const MeterList = () =>{
    return (
        <ScrollView style={styles.wrapper}>

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
                        <Text style={styles.subtitle}>Consumption: </Text>
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
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
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
                        <Text style={styles.subtitle}>Consumption: </Text>
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
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
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
                        <Text style={styles.subtitle}>Consumption: </Text>
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
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
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
                        <Text style={styles.subtitle}>Consumption: </Text>
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
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
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
                        <Text style={styles.subtitle}>Consumption: </Text>
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
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
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
                        <Text style={styles.subtitle}>Consumption: </Text>
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
                    <View style={[styles.badgeContent, styles.orangeBadge]}>
                        <Icon name="calendar" size={14} color="#FFA726" />
                        <Text style={[styles.badgeText, { color: '#FFA726' }]}>Sunday, 12 June</Text>
                    </View>
                    <View style={[styles.badgeContent, styles.blueBadge]}>
                        <Icon name="calendar" size={14} color="#4A90E2" />
                        <Text style={[styles.badgeText, { color: '#4A90E2' }]}>Monday, 21 July</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
export default MeterList;
