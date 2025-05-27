import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../state/redux/slices/authSlice";
import { selectAuthLoading, selectAuthError } from "../state/redux/selectors/authSelectors";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { AppDispatch } from "@/presentation/state/redux/store/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, "SignIn">;

const SignInScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const navigation = useNavigation<SignInScreenNavigationProp>();

    const handleSignIn = async () => {
        try {
            await dispatch(signIn({ email, password })).unwrap();
        } catch (err: any) {
            console.error("Erreur complète:", err);
            Alert.alert("Erreur", error || `Une erreur est survenue: ${err.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Se connecter</Text>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Input
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Se connecter"
                onPress={handleSignIn}
                disabled={loading}
            />
            <Button
                title="Pas de compte ? S'inscrire"
                onPress={() => navigation.navigate("SignUp")}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default SignInScreen;
