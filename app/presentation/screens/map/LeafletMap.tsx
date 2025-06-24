import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from "@/state/context/styles/colors.ts";
import { parseAddress } from '@/core/utils/addressUtils';
interface LeafletMapProps {
    latitude?: string;
    longitude?: string;
    address?: string;
}

const LeafletMap = ({ latitude, longitude, address }: LeafletMapProps) => {
    // Default values if latitude or longitude are undefined
    const defaultLatitude = -18.8792;
    const defaultLongitude = 47.5079;
    const defaultAddress = 'Antananarivo, Madagascar';

    const mapLatitude = latitude ?? defaultLatitude;
    const mapLongitude = longitude ?? defaultLongitude;
    const mapAddress = address ?? defaultAddress;

    // Parse the address to get residence and city
    const { residence, city } = parseAddress(mapAddress);
    const displayAddress = residence && city ? `${residence}, ${city}` : mapAddress;

    const LeafletHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Leaflet in WebView</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            html, body, #map {
                height: 100%;
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            var map = L.map('map').setView([${mapLatitude}, ${mapLongitude}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            L.marker([${mapLatitude}, ${mapLongitude}]).addTo(map)
                .bindPopup('Votre position')
                .openPopup();
        </script>
    </body>
</html>
`;

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.locationTitle}>Adresse : {displayAddress}</Text>
            <WebView
                originWhitelist={['*']}
                source={{ html: LeafletHTML }}
                style={styles.webview}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 16, // Coins arrondis
        height: 300, // Hauteur fixe pour la carte
        marginVertical: 10,
        shadowColor: colors.blue, // Ombre bleue
        borderWidth: 1, // Bordure
        borderColor: colors.blue, // Couleur de bordure
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Pour Android
        padding: 12, // Padding interne
    },
    locationTitle: {
        fontSize: 14,
        fontWeight: '600',
        color:  colors.neutral[800],
        marginBottom: 8,
    },
    webview: {
        flex: 1,
        borderRadius: 4, // Coins arrondis pour la WebView
    },
});

export default LeafletMap;
