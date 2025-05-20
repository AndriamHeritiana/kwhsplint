import React from 'react';
import { View, StyleSheet } from 'react-native';
import styles from '../../../state/context/styles/styles';

const SkeletonCard: React.FC = () => {
    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View style={styles.iconCircle}>
                    <View style={localStyles.skeletonIcon} />
                </View>
                <View style={styles.infoSection}>
                    <View style={[localStyles.skeletonText, { width: '60%', marginBottom: 8 }]} />
                    <View style={[localStyles.skeletonText, { width: '40%' }]} />
                </View>
                <View style={styles.locationBox}>
                    <View style={[localStyles.skeletonText, { width: 30 }]} />
                </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.badgeRow}>
                <View style={[styles.badgeContent, styles.orangeBadge]}>
                    <View style={[localStyles.skeletonText, { width: 80 }]} />
                </View>
                <View style={[styles.badgeContent, styles.blueBadge]}>
                    <View style={[localStyles.skeletonText, { width: 80 }]} />
                </View>
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
    skeletonIcon: {
        width: 20,
        height: 20,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
    skeletonText: {
        height: 14,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
});

export default SkeletonCard;
