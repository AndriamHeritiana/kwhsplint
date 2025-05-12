import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

// Interface pour typer les valeurs du formulaire
interface FormValues {
    newInputDate: Date;
    oldInputDate: Date;
    mainCounterValue: string;
    subMeterValue: string;
    price: string
}

// Interface pour typer les erreurs du formulaire
interface FormErrors {
    newInputDate?: string;
    oldInputDate?: string;
}

// Schéma de validation
const validationSchema = Yup.object().shape({
    newInputDate: Yup.date()
        .required('Date is required')
        .min(new Date(), 'The date cannot be in the past'),
    oldInputDate: Yup.date().required('Old date is required'),
    mainCounterValue: Yup.number()
        .required('Main counter value is required')
        .positive('Value must be positive')
        .typeError('You must specify a number'),
    subMeterValue: Yup.number()
        .required('subMeter value is required')
        .positive('Value must positive')
        .typeError('You must specify a number'),
    price: Yup.number()
        .required('price value is required')
        .positive('Value must positive')
        .typeError('You must specify a number'),
});

const MeterForm = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [showOldPicker, setShowOldPicker] = useState(false);

    // Valeur initiale du formulaire
    const initialValues: FormValues = {
        newInputDate: new Date(),
        oldInputDate: new Date(),
        mainCounterValue: '',
        subMeterValue: '',
        price: '',
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (values: FormValues) => {
        console.log('Date sélectionnée:', values.newInputDate);
        console.log('Ancienne date:', values.oldInputDate);
        // Traitez la soumission ici
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100} // ajuste selon la hauteur de ton header
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                {/* Titre du formulaire */}
                <View style={styles.header}>
                    <Text style={styles.title}>Meter Reading Form</Text>
                    <Text style={styles.subtitle}>Please fill all the required fields</Text>
                </View>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {(props: FormikProps<FormValues>) => (
                        <View style={styles.formContainer}>
                            {/* Date Sections */}
                            <View style={styles.section}>
                                <Text style={styles.label}>Date of new statement:</Text>
                                <TouchableOpacity
                                    style={styles.inputField}
                                    onPress={() => {
                                        setShowPicker(true);
                                        props.setFieldTouched('newInputDate', true);
                                    }}
                                >
                                    <Text style={styles.inputText}>
                                        {props.values.newInputDate.toLocaleDateString()}
                                    </Text>
                                </TouchableOpacity>
                                {showPicker && (
                                    <DateTimePicker
                                        value={props.values.newInputDate}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                        onChange={(event, newInputDate) => {
                                            setShowPicker(Platform.OS === 'ios');
                                            if (newInputDate) {
                                                props.setFieldValue('newInputDate', newInputDate);
                                                props.setFieldTouched('newInputDate', true);
                                            }
                                        }}
                                    />
                                )}
                                {props.touched.newInputDate && props.errors.newInputDate && (
                                    <Text style={styles.errorText}>{props.errors.newInputDate as string}</Text>
                                )}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.label}>Date of the old statement:</Text>
                                <TouchableOpacity
                                    style={styles.inputField}
                                    onPress={() => {
                                        setShowOldPicker(true);
                                        props.setFieldTouched('oldInputDate', true);
                                    }}
                                >
                                    <Text style={styles.inputText}>
                                        {props.values.oldInputDate.toLocaleDateString()}
                                    </Text>
                                </TouchableOpacity>
                                {showOldPicker && (
                                    <DateTimePicker
                                        value={props.values.oldInputDate}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                        onChange={(event, newInputDate) => {
                                            setShowOldPicker(Platform.OS === 'ios');
                                            if (newInputDate) {
                                                props.setFieldValue('oldInputDate', newInputDate);
                                                props.setFieldTouched('oldInputDate', true);
                                            }
                                        }}
                                    />
                                )}
                                {props.touched.oldInputDate && props.errors.oldInputDate && (
                                    <Text style={styles.errorText}>{props.errors.oldInputDate as string}</Text>
                                )}
                            </View>

                            {/* Meter Values Row */}
                            <View style={styles.rowSection}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Main meter value:</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        keyboardType="decimal-pad"
                                        value={props.values.mainCounterValue}
                                        onChangeText={props.handleChange('mainCounterValue')}
                                        onBlur={props.handleBlur('mainCounterValue')}
                                        placeholder="0.00"
                                    />
                                    {props.touched.mainCounterValue && props.errors.mainCounterValue && (
                                        <Text style={styles.errorText}>{props.errors.mainCounterValue}</Text>
                                    )}
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Sub-meter value:</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        keyboardType="decimal-pad"
                                        value={props.values.subMeterValue}
                                        onChangeText={props.handleChange('subMeterValue')}
                                        onBlur={props.handleBlur('subMeterValue')}
                                        placeholder="0.00"
                                    />
                                    {props.touched.subMeterValue && props.errors.subMeterValue && (
                                        <Text style={styles.errorText}>{props.errors.subMeterValue}</Text>
                                    )}
                                </View>
                            </View>

                            {/* Price Section */}
                            <View style={styles.section}>
                                <Text style={styles.label}>Price:</Text>
                                <TextInput
                                    style={styles.inputField}
                                    keyboardType="decimal-pad"
                                    value={props.values.price}
                                    onChangeText={props.handleChange('price')}
                                    onBlur={props.handleBlur('price')}
                                    placeholder="0.00"
                                />
                                {props.touched.price && props.errors.price && (
                                    <Text style={styles.errorText}>{props.errors.price}</Text>
                                )}
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={() => props.handleSubmit()}
                            >
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 50, // Espace supplémentaire pour le clavier
    },
    submitContainer: {
        marginTop: 30,
        marginBottom: 50, // Espace supplémentaire en bas
    },
    formContainer: {
        flex: 1,
    },
    section: {
        marginBottom: 20,
    },
    rowSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputGroup: {
        width: '48%',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    inputField: {
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 14,
        marginTop: 5,
    },
    submitButton: {
        height: 50,
        backgroundColor: '#3498db',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        marginBottom: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#7f8c8d',
    },
});

export default MeterForm;
