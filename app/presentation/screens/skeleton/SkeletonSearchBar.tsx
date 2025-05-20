import React from 'react';
import { View, StyleSheet } from 'react-native';
import styles from '../../../state/context/styles/styles';

const SkeletonSearchBar: React.FC = () => {
    return (
        <View style={styles.containerSearch}>
            {/* Squelette pour l'icône de recherche */}
            <View style={localStyles.skeletonIcon} />
            {/* Squelette pour la barre de recherche */}
            <View style={localStyles.skeletonSearchBar} />
        </View>
    );
};

const localStyles = StyleSheet.create({
    skeletonIcon: {
        width: 20,
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginRight: 8,
    },
    skeletonSearchBar: {
        flex: 1,
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        marginVertical: 8,
    },
});

export default SkeletonSearchBar;
