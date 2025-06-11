import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    Animated,
    Easing,
} from 'react-native';
import { colors } from "@/state/context/styles/colors.ts";
import { typography } from "@/state/context/styles/typography.ts";

interface FormButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

const FormButton: React.FC<FormButtonProps> = ({
                                                   title,
                                                   onPress,
                                                   variant = 'primary',
                                                   size = 'medium',
                                                   disabled = false,
                                                   loading = false,
                                                   style,
                                                   textStyle,
                                                   icon,
                                               }) => {
    // Button animation on press
    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0.95,
            duration: 100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    // Get button style based on variant
    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryButton;
            case 'secondary':
                return styles.secondaryButton;
            case 'outline':
                return styles.outlineButton;
            default:
                return styles.primaryButton;
        }
    };

    // Get text style based on variant
    const getTextStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryText;
            case 'secondary':
                return styles.secondaryText;
            case 'outline':
                return styles.outlineText;
            default:
                return styles.primaryText;
        }
    };

    // Get button size
    const getButtonSize = () => {
        switch (size) {
            case 'small':
                return styles.smallButton;
            case 'medium':
                return styles.mediumButton;
            case 'large':
                return styles.largeButton;
            default:
                return styles.mediumButton;
        }
    };

    // Get text size
    const getTextSize = () => {
        switch (size) {
            case 'small':
                return typography.buttonSmall;
            case 'medium':
                return typography.buttonDefault;
            case 'large':
                return typography.buttonLarge;
            default:
                return typography.buttonDefault;
        }
    };

    return (
        <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
            <TouchableOpacity
                style={[
                    styles.button,
                    getButtonStyle(),
                    getButtonSize(),
                    disabled && styles.disabledButton,
                    style,
                ]}
                onPress={onPress}
                disabled={disabled || loading}
                activeOpacity={0.8}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={variant === 'outline' ? colors.primary[500] : colors.white}
                    />
                ) : (
                    <>
                        {icon && icon}
                        <Text
                            style={[
                                getTextStyle(),
                                getTextSize(),
                                disabled && styles.disabledText,
                                icon ? { marginLeft: 8 } : undefined,
                                textStyle,
                            ]}
                        >
                            {title}
                        </Text>
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primaryButton: {
        backgroundColor: colors.primary[500],
    },
    secondaryButton: {
        backgroundColor: colors.secondary[500],
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary[500],
    },
    disabledButton: {
        backgroundColor: colors.neutral[200],
        borderColor: colors.neutral[300],
    },
    smallButton: {
        height: 36,
        paddingHorizontal: 16,
    },
    mediumButton: {
        height: 48,
        paddingHorizontal: 24,
    },
    largeButton: {
        height: 56,
        paddingHorizontal: 32,
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.white,
    },
    outlineText: {
        color: colors.primary[500],
    },
    disabledText: {
        color: colors.neutral[500],
    },
});

export default FormButton;
