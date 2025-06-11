import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "@/state/context/styles/colors.ts";
import { typography } from "@/state/context/styles/typography.ts";

interface FormHeaderProps {
    title?: string;
    subtitle?: string;
    iconName?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({
                                                   title = "Se connecter",
                                                   subtitle = "Veuillez saisir vos informations ci-dessous",
                                                   iconName = "user"
                                               }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const iconScaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // Animate the header when component mounts
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }),
            Animated.timing(iconScaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
                easing: Easing.elastic(1),
            }),
        ]).start();
    }, [fadeAnim, slideAnim, iconScaleAnim]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: iconScaleAnim }
                        ]
                    }
                ]}
            >
                <Icon name={iconName} size={32} color={colors.white} />
            </Animated.View>

            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                {title}
            </Animated.Text>

            <Animated.Text
                style={[
                    styles.subtitle,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }
                ]}
            >
                {subtitle}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 32,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.primary[500],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: colors.primary[900],
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        ...typography.h3,
        color: colors.neutral[800],
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.bodyDefault,
        color: colors.neutral[500],
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default FormHeader;
