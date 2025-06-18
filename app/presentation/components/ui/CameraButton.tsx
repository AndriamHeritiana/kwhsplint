import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import TextRecognition from '@react-native-ml-kit/text-recognition';

interface CameraButtonProps {
    label?: string;
    onTextRecognized: (text: string) => void; // Callback pour passer le texte reconnu
}

const CameraButton: React.FC<CameraButtonProps> = ({
                                                       label = 'Take Photo',
                                                       onTextRecognized,
                                                   }) => {
    const requestCameraPermission = async () => {
        try {
            const result = await request(
                Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
            );
            return result === 'granted';
        } catch (error) {
            console.error('Erreur de permission caméra :', error);
            return false;
        }
    };

    const openNativeCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) {
            Alert.alert('Erreur', 'Permission d’accès à la caméra refusée.');
            return;
        }

        const options = {
            mediaType: 'photo',
            includeBase64: false,
            saveToPhotos: false,
        };

        // @ts-ignore
        launchCamera(options, async (response) => {
            if (response.didCancel) {
                console.log('Utilisateur a annulé la capture');
                return;
            }
            if (response.errorCode) {
                console.error('Erreur ImagePicker :', response.errorMessage);
                Alert.alert('Erreur', 'Échec de l’ouverture de la caméra.');
                return;
            }

            const image = response.assets?.[0];
            if (image?.uri) {
                try {
                    const result = await TextRecognition.recognize(image.uri);
                    const recognizedText = result.text || '';
                    console.log('recognizedText', recognizedText);
                    if (recognizedText) {
                        onTextRecognized(recognizedText); // Passer le texte reconnu au parent
                    } else {
                        Alert.alert('Erreur', 'Aucun texte détecté.');
                    }
                } catch (error) {
                    console.error('Erreur lors de la reconnaissance de texte :', error);
                    Alert.alert('Erreur', 'Échec de la reconnaissance de texte.');
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cameraButton} onPress={openNativeCamera}>
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
