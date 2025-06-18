import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
    Animated,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/state/context/styles/colors.ts';

interface DateFormInputProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    iconName?: string; // Added iconName prop
}

const DateFormInput = forwardRef<never, DateFormInputProps>(
    (
        {
            label,
            value,
            onChange,
            error,
            onFocus,
            onBlur,
            iconName,
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showPicker, setShowPicker] = useState(false);
        const animatedLabelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
        const animatedBorderColor = useRef(new Animated.Value(0)).current;
        const animatedLabelLeft = useRef(new Animated.Value(iconName ? 1 : 0)).current;

        // Animate label position based on focus or value
        useEffect(() => {
            Animated.timing(animatedLabelPosition, {
                toValue: isFocused || value ? 1 : 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }, [isFocused, value, animatedLabelPosition]);

        // Animate border color based on focus
        useEffect(() => {
            Animated.timing(animatedBorderColor, {
                toValue: isFocused ? 1 : 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }, [isFocused, animatedBorderColor]);

        // Animate label left position based on icon presence
        useEffect(() => {
            Animated.timing(animatedLabelLeft, {
                toValue: iconName ? 1 : 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }, [iconName, animatedLabelLeft]);

        const handleFocus = () => {
            setIsFocused(true);
            setShowPicker(true);
            if (onFocus) onFocus();
        };

        const handleBlur = () => {
            setIsFocused(false);
            if (onBlur) onBlur();
        };

        const handleDateChange = (event: any, selectedDate?: Date) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) {
                onChange(selectedDate);
            }
            if (Platform.OS !== 'ios') {
                handleBlur();
            }
        };

        const labelPosition = animatedLabelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -8],
        });

        const labelSize = animatedLabelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        });

        const labelColor = animatedLabelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.neutral[500], colors.primary[70]],
        });

        const labelLeft = animatedLabelLeft.interpolate({
            inputRange: [0, 1],
            outputRange: [12, 40], // Adjust left position for icon
        });

        const borderColor = animatedBorderColor.interpolate({
            inputRange: [0, 1],
            outputRange: [
                error ? colors.error[500] : colors.neutral[300],
                error ? colors.error[500] : colors.primary[70],
            ],
        });

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={handleFocus}>
                    <View>
                        <Animated.Text
                            style={[
                                styles.label,
                                {
                                    top: labelPosition,
                                    fontSize: labelSize,
                                    color: error ? colors.error[500] : labelColor,
                                    left: labelLeft,
                                    backgroundColor: isFocused || value ? colors.neutral[50] : 'transparent',
                                    paddingHorizontal: isFocused || value ? 4 : 0,
                                },
                            ]}
                        >
                            {label}
                        </Animated.Text>
                        <Animated.View
                            style={[
                                styles.inputContainer,
                                {
                                    borderColor: borderColor,
                                    borderWidth: 1,
                                },
                            ]}
                        >
                            {iconName && (
                                <View style={styles.leftIconContainer}>
                                    <Icon name={iconName} size={20} color={colors.primary[70]} />
                                </View>
                            )}
                            <Text style={[styles.inputText, { paddingLeft: iconName ? 8 : 16 }]}>
                                {value.toLocaleDateString()}
                            </Text>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
                {showPicker && (
                    <DateTimePicker
                        value={value}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={handleDateChange}
                    />
                )}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }
);

DateFormInput.displayName = 'DateFormInput';

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
    },
    inputContainer: {
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: colors.neutral[900],
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    label: {
        position: 'absolute',
        zIndex: 1,
        fontWeight: '500',
    },
    inputText: {
        flex: 1,
        fontSize: 12,
        color: colors.neutral[800],
        paddingVertical: 8,
    },
    leftIconContainer: {
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        marginTop: 4,
        fontSize: 11,
        color: colors.error[500],
        paddingLeft: 4,
    },
});

export default DateFormInput;
