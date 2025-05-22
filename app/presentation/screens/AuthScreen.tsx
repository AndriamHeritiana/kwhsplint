import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../state/redux/slices/authSlice";
import { selectAuthLoading, selectAuthError } from "../state/redux/selectors/authSelectors";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {AppDispatch} from "@/presentation/state/redux/store/store.ts";

const AuthScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const handleAuth = async () => {
        try {
            if (isSignUp) {
                await dispatch(signUp({ email, password, displayName })).unwrap();
            } else {
                await dispatch(signIn({ email, password })).unwrap();
            }
        } catch (err) {
            console.error("Erreur complète:", err); // Log pour débogage
            // @ts-ignore
            Alert.alert("Erreur", error || `Une erreur est survenue: ${err.message}`)
        }
    };

    return (
        <View style={{ padding: 20 }}>
            {isSignUp && (
                <Input
                    placeholder="Nom"
                    value={displayName}
                    onChangeText={setDisplayName}
                />
            )}
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
                title={isSignUp ? "S'inscrire" : "Se connecter"}
                onPress={handleAuth}
                disabled={loading}
            />
            <Button
                title={isSignUp ? "Passer à la connexion" : "Passer à l'inscription"}
                onPress={() => setIsSignUp(!isSignUp)}
            />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
    );
};

export default AuthScreen;
