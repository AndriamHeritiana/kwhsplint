import { ScrollView, View, Text } from 'react-native';
import styles from '../../../state/context/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
const MeterEmptyList = () =>{
    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View style={styles.iconCircle}>
                    <Icon name="exclamation" size={20} color="#4A90E2" />
                </View>
                <View style={[styles.infoSection, {alignItems: 'center', justifyContent: 'center'}]}>
                    <Text>You haven’t added any records yet. </Text>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={[styles.badgeContent, styles.orangeBadge, { alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[styles.badgeText, { color: '#4A90E2' }]}>
                    Start by creating your first one!
                </Text>
            </View>
        </View>
    );
};
export default MeterEmptyList;
