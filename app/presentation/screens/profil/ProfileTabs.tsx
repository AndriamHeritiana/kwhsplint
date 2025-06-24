import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "@/state/context/styles/colors.ts";
import {fetchTotalConsumption, fetchAmountToPayPercentageChange} from "@/presentation/state/redux/store/readingSlice.ts";
import {AppDispatch} from "@/presentation/state/redux/store/store.ts";

interface ProfileTabsProps {
    userId: string;
}

export const ProfileTabs = ({ userId }: ProfileTabsProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [activeTab, setActiveTab] = useState('totalKwh');
    const { totalAmountToPay, totalConsumption, amountToPayPercentageChange } = useSelector((state: any) => state.reading);
    console.log(userId);
    useEffect(() => {
        dispatch(fetchTotalConsumption(userId));
        dispatch(fetchAmountToPayPercentageChange(userId));
    }, [userId, dispatch]);

    const tabs = [
        { id: 'totalKwh', label: 'Consumption', icon: 'tachometer' },
        { id: 'totalPaid', label: 'Paid amount', icon: 'dollar' },
        { id: 'comparison', label: 'Comparison', icon: 'balance-scale' },
    ];

    const renderComparisonContent = () => {
        if (!amountToPayPercentageChange) {
            return (
                <Text style={styles.tabContentText}>
                    Loading comparison data...
                </Text>
            );
        }

        if (!amountToPayPercentageChange.hasData) {
            console.log(amountToPayPercentageChange.hasData);
            return (
                <Text style={styles.tabContentText}>
                    Not enough data for comparison. Add more readings to see monthly comparison.
                </Text>
            );
        }

        const { percentageChange, currentMonthAmount, previousMonthAmount } = amountToPayPercentageChange;

        // Déterminer l'icône et la couleur selon le changement
        let comparisonIcon = 'minus';
        let comparisonColor = colors.neutral[600];
        let comparisonText = '';

        if (percentageChange > 0) {
            comparisonIcon = 'arrow-up';
            comparisonColor = '#E74C3C'; // Rouge pour augmentation
            comparisonText = `+${percentageChange.toFixed(1)}%`;
        } else if (percentageChange < 0) {
            comparisonIcon = 'arrow-down';
            comparisonColor = '#27AE60'; // Vert pour diminution
            comparisonText = `${percentageChange.toFixed(1)}%`;
        } else {
            comparisonIcon = 'minus';
            comparisonColor = colors.neutral[600];
            comparisonText = '0%';
        }

        return (
            <View style={styles.comparisonContent}>
                <View style={styles.comparisonHeader}>
                    <Icon name={comparisonIcon} size={16} color={comparisonColor} />
                    <Text style={[styles.percentageText, { color: comparisonColor }]}>
                        {comparisonText}
                    </Text>
                </View>
                <Text style={styles.tabContentText}>
                    Comparison with the previous month
                </Text>
                <View style={styles.comparisonDetails}>
                    <Text style={styles.detailText}>
                        Current: {currentMonthAmount.toLocaleString('fr-FR')} Ar
                    </Text>
                    <Text style={styles.detailText}>
                        Previous: {previousMonthAmount.toLocaleString('fr-FR')} Ar
                    </Text>
                </View>
            </View>
        );
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'totalKwh':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.chevronContainer}>
                            <Icon name="info-circle" size={18} color="#4A90E2" />
                        </View>
                        <Text style={styles.tabContentText}>
                            Total consumption: {totalConsumption ? `${totalConsumption.toLocaleString('fr-FR')} KWh` : '0 KWh'}
                        </Text>
                    </View>
                );
            case 'totalPaid':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.chevronContainer}>
                            <Icon name="info-circle" size={18} color="#4A90E2" />
                        </View>
                        <Text style={styles.tabContentText}>
                            Total amount paid: {totalAmountToPay ? `${totalAmountToPay.toLocaleString('fr-FR')} Ar` : '0 Ar'}.
                        </Text>
                    </View>
                );
            case 'comparison':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.chevronContainer}>
                            <Icon name="info-circle" size={18} color="#4A90E2" />
                        </View>
                        {renderComparisonContent()}
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tabButton, activeTab === tab.id && styles.activeTabButton]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <Icon
                            name={tab.icon}
                            size={20}
                            color={activeTab === tab.id ? '#4A90E2' : '#666'}
                        />
                        <Text
                            style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.contentContainer}>
                {renderTabContent()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        marginBottom: 20,
    },
    contentContainer: {
        // Supprimé minHeight car plus nécessaire sans interactivité
    },
    tabContent: {
        backgroundColor: colors.primary[50],
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
        position: 'relative',
        borderWidth: 1,
        borderColor: colors.primary[100],
        shadowColor: colors.primary[100],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Pour Android
    },
    tabContentText: {
        fontSize: 14,
        color: colors.neutral[800],
        textAlign: 'center',
    },
    chevronContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 4,
    },
    tabBar: {
        flexGrow: 0,
        marginBottom: 8,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 8,
        backgroundColor: colors.neutral[50],
        borderWidth: 1,
        borderColor: colors.primary[500], // Bordure par défaut
    },
    activeTabButton: {
        backgroundColor: colors.primary[100],
        borderColor: colors.blue, // Bordure pour onglet actif
        borderWidth: 1,
    },
    tabText: {
        fontSize: 11,
        color: colors.neutral[800],
        marginLeft: 6,
    },
    activeTabText: {
        color: colors.primary[500],
        fontWeight: '600',
    },
    // Nouveaux styles pour la comparaison
    comparisonContent: {
        alignItems: 'center',
    },
    comparisonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    percentageText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    comparisonDetails: {
        marginTop: 8,
        alignItems: 'center',
    },
    detailText: {
        fontSize: 12,
        color: colors.neutral[600],
        marginVertical: 2,
    },
});
