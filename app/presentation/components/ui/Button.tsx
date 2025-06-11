import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
    disabled: {
        backgroundColor: "#aaa",
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
});

export default Button;
