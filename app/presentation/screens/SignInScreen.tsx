import React, { useState, useRef } from "react";
import {
    Text,
    Alert,
    StyleSheet,
    TextInput,
    Animated,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../state/redux/slices/authSlice";
import { selectAuthLoading, selectAuthError } from "../state/redux/selectors/authSelectors";
import { AppDispatch } from "@/presentation/state/redux/store/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FormHeader from "@/presentation/components/ui/FormHeader.tsx";
import FormInput from "@/presentation/components/ui/FormInput.tsx";
import FormButton from "@/presentation/components/ui/FormButton.tsx";

type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, "SignIn">;

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const SignInScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const navigation = useNavigation<SignInScreenNavigationProp>();

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Animation for submit button
    const submitAnim = useRef(new Animated.Value(1)).current;

    // Refs for input fields
    const passwordRef = useRef<TextInput>(null);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'email n'est pas valide";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSignIn = async () => {
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
                await dispatch(signIn({
                    email: formData.email,
                    password: formData.password
                })).unwrap();
            } catch (err: any) {
                console.error("Erreur complète:", err);
                Alert.alert("Erreur", error || `Une erreur est survenue: ${err.message}`);
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
            <FormHeader />

            <FormInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                placeholder="Entrez votre email"
                keyboardType="email-address"
                error={errors.email}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
                autoCapitalize="none"
            />

            <FormInput
                label="Mot de passe"
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                placeholder="Entrez votre mot de passe"
                secureTextEntry
                error={errors.password}
                returnKeyType="done"
                ref={passwordRef}
                onSubmitEditing={handleSignIn}
            />

            <Animated.View style={{ transform: [{ scale: submitAnim }] }}>
                <FormButton
                    title="Se connecter"
                    onPress={handleSignIn}
                    loading={isSubmitting}
                    style={styles.submitButton}
                    size="large"
                />
            </Animated.View>

            <FormButton
                title="Pas de compte ? S'inscrire"
                onPress={() => navigation.navigate("SignUp")}
                style={styles.signUpButton}
                size="large"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
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
    submitButton: {
        marginTop: 16,
        width: "100%",
    },
    signUpButton: {
        marginTop: 12,
        width: "100%",
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default SignInScreen;
