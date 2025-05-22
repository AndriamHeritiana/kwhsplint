import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: string;
}

const Input: React.FC<InputProps> = ({
                                         placeholder,
                                         value,
                                         onChangeText,
                                         secureTextEntry,
                                         keyboardType,
                                     }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType as any}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
});

export default Input;
