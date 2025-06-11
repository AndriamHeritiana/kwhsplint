import React, { useState, useRef } from "react";
import { View, TextInput, Alert, StyleSheet, Animated, ScrollView, KeyboardAvoidingView, Platform, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../state/redux/slices/authSlice";
import { selectAuthLoading, selectAuthError } from "../state/redux/selectors/authSelectors";
import { AppDispatch } from "@/presentation/state/redux/store/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FormInput from "@/presentation/components/ui/FormInput.tsx";
import GeoLocationInfo from "@/presentation/components/ui/GeoLocationInfo.tsx";
import FormButton from "@/presentation/components/ui/FormButton.tsx";
import FormHeader from "@/presentation/components/ui/FormHeader.tsx";

type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

interface RegistrationFormProps {
    onFocusChange?: (isFocused: boolean) => void;
}

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, "SignUp">;

interface FormData {
    name: string;
    email: string;
    password: string;
    latitude: string;
    longitude: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    latitude?: string;
    longitude?: string;
}

const SignUpScreen: React.FC<RegistrationFormProps> = ({ onFocusChange }) => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        latitude: "",
        longitude: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Animation for submit button
    const submitAnim = useRef(new Animated.Value(1)).current;

    // Refs for input fields
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const latitudeRef = useRef<TextInput>(null);
    const longitudeRef = useRef<TextInput>(null);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        if (formData.latitude.trim()) {
            const lat = parseFloat(formData.latitude);
            if (isNaN(lat) || lat < -90 || lat > 90) {
                newErrors.latitude = "Latitude must be between -90 and 90";
                isValid = false;
            }
        }

        if (formData.longitude.trim()) {
            const lng = parseFloat(formData.longitude);
            if (isNaN(lng) || lng < -180 || lng > 180) {
                newErrors.longitude = "Longitude must be between -180 and 180";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsSubmitting(true);

            // Animate button
            Animated.sequence([
                Animated.timing(submitAnim, {
                    toValue: 0.8,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(submitAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            try {
                await dispatch(
                    signUp({
                        email: formData.email,
                        password: formData.password,
                        displayName: formData.name,
                        latitude: formData.latitude,
                        longitude: formData.longitude,
                    })
                ).unwrap();
                Alert.alert(
                    "Registration Successful",
                    "Your account has been created successfully!",
                    [{ text: 'OK' }]
                );
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    latitude: "",
                    longitude: "",
                });
            } catch (err: any) {
                Alert.alert("Error", error || `An error occurred: ${err.message}`);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
            <FormHeader
                title="Créer votre compte"
                subtitle="Veuillez remplir vos informations ci-dessous"
                iconName="user-plus"
            />
            <FormInput
                label="Full Name"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder="Enter your full name"
                error={errors.name}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                blurOnSubmit={false}
                autoCapitalize="words"
                onFocus={() => onFocusChange?.(true)}
                onBlur={() => onFocusChange?.(false)}
            />
            <FormInput
                label="Email Address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                placeholder="Enter your email address"
                keyboardType="email-address"
                error={errors.email}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
                ref={emailRef}
                onFocus={() => onFocusChange?.(true)}
                onBlur={() => onFocusChange?.(false)}
            />
            <FormInput
                label="Password"
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                placeholder="Create a password"
                secureTextEntry
                error={errors.password}
                returnKeyType="next"
                onSubmitEditing={() => latitudeRef.current?.focus()}
                blurOnSubmit={false}
                ref={passwordRef}
                onFocus={() => onFocusChange?.(true)}
                onBlur={() => onFocusChange?.(false)}
            />
            <GeoLocationInfo />
            <View style={styles.coordinatesContainer}>
                <View style={styles.coordinateField}>
                    <FormInput
                        label="Latitude"
                        value={formData.latitude}
                        onChangeText={(text) => handleChange("latitude", text)}
                        placeholder="e.g. 40.7128"
                        keyboardType="numeric"
                        error={errors.latitude}
                        returnKeyType="next"
                        onSubmitEditing={() => longitudeRef.current?.focus()}
                        blurOnSubmit={false}
                        ref={latitudeRef}
                        onFocus={() => onFocusChange?.(true)}
                        onBlur={() => onFocusChange?.(false)}
                    />
                </View>
                <View style={styles.coordinateField}>
                    <FormInput
                        label="Longitude"
                        value={formData.longitude}
                        onChangeText={(text) => handleChange("longitude", text)}
                        placeholder="e.g. -74.0060"
                        keyboardType="numeric"
                        error={errors.longitude}
                        returnKeyType="done"
                        ref={longitudeRef}
                        onFocus={() => onFocusChange?.(true)}
                        onBlur={() => onFocusChange?.(false)}
                    />
                </View>
            </View>
            <Animated.View style={{ transform: [{ scale: submitAnim }] }}>
                <FormButton
                    title="Create Account"
                    onPress={handleSubmit}
                    loading={isSubmitting}
                    style={styles.submitButton}
                    size="large"
                />
            </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 24,
    },
    coordinatesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    coordinateField: {
        width: "48%",
    },
    submitButton: {
        marginTop: 16,
        width: "100%",
    },
});

export default SignUpScreen;
