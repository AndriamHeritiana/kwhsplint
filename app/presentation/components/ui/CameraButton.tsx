import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CameraButtonProps {
    label?: string;
}

const CameraButton: React.FC<CameraButtonProps> = ({
                                                       label = "Take Photo",
                                                   }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cameraButton}>
                <Icon name="qr-code-scanner" size={20} color="#3498db" />
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
    },
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 50,
    },
    buttonText: {
        marginLeft: 8,
        color: '#3498db',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default CameraButton;
