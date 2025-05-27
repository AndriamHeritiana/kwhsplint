import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Platform,
    Animated,
    TouchableWithoutFeedback,
    KeyboardTypeOptions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from "@/state/context/styles/colors.ts";

interface FormInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
    onSubmitEditing?: () => void;
    blurOnSubmit?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const FormInput = forwardRef<TextInput, FormInputProps>(({
                                                             label,
                                                             value,
                                                             onChangeText,
                                                             placeholder,
                                                             secureTextEntry = false,
                                                             keyboardType = 'default',
                                                             error,
                                                             onFocus,
                                                             onBlur,
                                                             returnKeyType,
                                                             onSubmitEditing,
                                                             blurOnSubmit,
                                                             autoCapitalize = 'none',
                                                         }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(secureTextEntry);
    const animatedLabelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
    const animatedBorderColor = useRef(new Animated.Value(0)).current;
    const internalRef = useRef<TextInput>(null);

    // Use the forwarded ref or the internal ref
    const inputRef = ref || internalRef;

    // Animate label position based on focus or value
    useEffect(() => {
        Animated.timing(animatedLabelPosition, {
            toValue: (isFocused || value.length > 0) ? 1 : 0,
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

    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) onFocus();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) onBlur();
    };

    const focusInput = () => {
        if ('current' in inputRef && inputRef.current) {
            inputRef.current.focus();
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
        outputRange: [colors.neutral[500], colors.primary[600]],
    });

    const borderColor = animatedBorderColor.interpolate({
        inputRange: [0, 1],
        outputRange: [error ? colors.error[500] : colors.neutral[300], error ? colors.error[500] : colors.primary[500]],
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={focusInput}>
                <View>
                    <Animated.Text
                        style={[
                            styles.label,
                            {
                                top: labelPosition,
                                fontSize: labelSize,
                                color: error ? colors.error[500] : labelColor,
                                backgroundColor: isFocused || value.length > 0 ? colors.neutral[50] : 'transparent',
                                paddingHorizontal: isFocused || value.length > 0 ? 4 : 0,
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
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            value={value}
                            onChangeText={onChangeText}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={isFocused ? placeholder : ''}
                            placeholderTextColor={colors.neutral[400]}
                            secureTextEntry={hidePassword}
                            keyboardType={keyboardType}
                            returnKeyType={returnKeyType}
                            onSubmitEditing={onSubmitEditing}
                            blurOnSubmit={blurOnSubmit}
                            autoCapitalize={autoCapitalize}
                        />
                        {secureTextEntry && (
                            <TouchableWithoutFeedback onPress={() => setHidePassword(!hidePassword)}>
                                <View style={styles.iconContainer}>
                                    {hidePassword ? (
                                        <Icon name="eye-slash" size={20} color={colors.neutral[500]} />
                                    ) : (
                                        <Icon name="eye" size={20} color={colors.neutral[500]} />
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
});

// Add display name for debugging
FormInput.displayName = 'FormInput';

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    inputContainer: {
        height: 56,
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
        left: 12,
        zIndex: 1,
        fontWeight: '500',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: colors.neutral[800],
        paddingVertical: 8,
    },
    iconContainer: {
        padding: 8,
    },
    errorText: {
        marginTop: 4,
        fontSize: 12,
        color: colors.error[500],
        paddingLeft: 4,
    },
});

export default FormInput;
