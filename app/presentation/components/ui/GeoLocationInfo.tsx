import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "@/state/context/styles/colors.ts";
import { typography } from "@/state/context/styles/typography.ts";

interface GeoLocationInfoProps {
    style?: object;
}

const GeoLocationInfo: React.FC<GeoLocationInfoProps> = ({ style }) => {
    const [expanded, setExpanded] = useState(false);
    const animatedHeight = React.useRef(new Animated.Value(0)).current;
    const rotation = React.useRef(new Animated.Value(0)).current;

    const toggleExpand = () => {
        const newValue = !expanded;
        setExpanded(newValue);

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: newValue ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(rotation, {
                toValue: newValue ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const height = animatedHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 160],
    });

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                style={styles.header}
                onPress={toggleExpand}
                activeOpacity={0.7}
            >
                <View style={styles.titleContainer}>
                    <Icon name="question-circle-o" size={18}  color={colors.primary[500]} style={styles.icon} />
                    {/*<HelpCircle size={18} color={colors.primary[500]} style={styles.icon} />*/}
                    <Text style={styles.title}>Why do we need geolocation?</Text>
                </View>
                <Animated.View style={{ transform: [{ rotate }] }}>
                    <Icon name="chevron-down" size={20}  color={colors.primary[500]} />
                    {/*<ChevronDown size={20} color={colors.neutral[500]} />*/}
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={[styles.content, { height }]}>
                <Text style={styles.paragraph}>
                    Latitude and longitude coordinates help us:
                </Text>
                <View style={styles.bulletPoints}>
                    <View style={styles.bulletPoint}>
                        <View style={styles.bullet} />
                        <Text style={styles.bulletText}>Provide location-based services relevant to you</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                        <View style={styles.bullet} />
                        <Text style={styles.bulletText}>Customize experiences based on your geographic region</Text>
                    </View>
                    <View style={styles.bulletPoint}>
                        <View style={styles.bullet} />
                        <Text style={styles.bulletText}>Help with delivering region-specific content</Text>
                    </View>
                </View>
                <Text style={styles.note}>
                    Your coordinates are stored securely and are not shared with third parties.
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.neutral[100],
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    title: {
        ...typography.labelDefault,
        color: colors.neutral[800],
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        overflow: 'hidden',
    },
    paragraph: {
        ...typography.bodySmall,
        color: colors.neutral[700],
        marginBottom: 8,
    },
    bulletPoints: {
        marginBottom: 8,
    },
    bulletPoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary[400],
        marginTop: 7,
        marginRight: 8,
    },
    bulletText: {
        ...typography.bodySmall,
        color: colors.neutral[700],
        flex: 1,
    },
    note: {
        ...typography.bodyXSmall,
        color: colors.neutral[500],
        fontStyle: 'italic',
    },
});

export default GeoLocationInfo;
