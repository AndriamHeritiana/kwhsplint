import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    KeyboardAvoidingView,
    ScrollView, ActivityIndicator
} from 'react-native';
import {Reading} from '@/core/domain/entities/Reading.ts';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalculateAmountToPayUseCase } from '@/core/domain/usecases/CalculateAmountToPayUseCase';
import {useCalculateAmountToPay} from '@/presentation/hooks/useCalculateAmountToPay';
import {FormValues} from '@/core/domain/types/FormValues.ts';
import { useSelector, useDispatch } from 'react-redux';
import { addReading, initializeDatabase } from '@/presentation/state/redux/store/readingSlice';// Importer les actions Redux
import { RootState, AppDispatch } from '@/presentation/state/redux/store/store';
import Toast from 'react-native-toast-message';
import {readingToPlainObject} from '@/core/utils/readingToPlainObject';
import {selectAuthIsReady, selectUser} from "@/presentation/state/redux/selectors/authSelectors.ts";
import { readingFormValidationSchema } from "@/presentation/screens/schema/validationSchema.ts";
const FormContent = () => {
    const { values, errors, setFieldValue, submitForm } = useFormikContext<FormValues>();
    const calculateAmountToPayUseCase = useMemo(() => new CalculateAmountToPayUseCase(), []);
    const [showPicker, setShowPicker] = useState(false);
    const [showOldPicker, setShowOldPicker] = useState(false);
    const user = useSelector(selectUser);
    const isAuthReady = useSelector(selectAuthIsReady);
    // Calculate Amenttopay with the personalized hook
    const amountToPay = useCalculateAmountToPay(values, errors, calculateAmountToPayUseCase);
    // Automatic calculation of Amentopay when the necessary fields change
    // Update Amenttopay in the form
    useEffect(() => {
        setFieldValue('amountToPay', amountToPay);
    }, [amountToPay, setFieldValue]);
    // Userid update in the form when the user is available
    useEffect(() => {
        if (user?.id && isAuthReady) {
            setFieldValue('userId', user.id.toString());
        }
    }, [user?.id, isAuthReady, setFieldValue]);

    return (
        <View style={styles.formContainer}>
            {/* Input hidden pour l'user.id */}
            <TextInput
                style={{ display: 'none' }}
                value={values.userId || ''}
                onChangeText={(text) => setFieldValue('userId', text)}
                editable={false}
            />
            {/* Date Sections */}
            <View style={styles.rowSection}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Old statement:</Text>
                    <TouchableOpacity
                        style={styles.inputField}
                        onPress={() => {
                            setShowOldPicker(true);
                            setFieldValue('oldInputDate', values.oldInputDate, true);
                        }}
                    >
                        <Text style={styles.inputText}>
                            {values.oldInputDate.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    {showOldPicker && (
                        <DateTimePicker
                            value={values.oldInputDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={(event, newInputDate) => {
                                setShowOldPicker(Platform.OS === 'ios');
                                if (newInputDate) {
                                    setFieldValue('oldInputDate', newInputDate, true);
                                }
                            }}
                        />
                    )}
                    {errors.oldInputDate && values.oldInputDate && (
                        <Text style={styles.errorText}>{errors.oldInputDate as string}</Text>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sub-meter value:</Text>
                    <TextInput
                        style={styles.inputField}
                        keyboardType="decimal-pad"
                        value={values.oldSubMeterValue}
                        onChangeText={(text) => setFieldValue('oldSubMeterValue', text)}
                        onBlur={() => setFieldValue('oldSubMeterValue', values.oldSubMeterValue, true)}
                        placeholder="0.00"
                    />
                    {errors.oldSubMeterValue && values.oldSubMeterValue && (
                        <Text style={styles.errorText}>{errors.oldSubMeterValue}</Text>
                    )}
                </View>
            </View>
            <View style={styles.rowSection}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>New statement:</Text>
                    <TouchableOpacity
                        style={styles.inputField}
                        onPress={() => {
                            setShowPicker(true);
                            setFieldValue('newInputDate', values.newInputDate, true);
                        }}
                    >
                        <Text style={styles.inputText}>
                            {values.newInputDate.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={values.newInputDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={(event, newInputDate) => {
                                setShowPicker(Platform.OS === 'ios');
                                if (newInputDate) {
                                    setFieldValue('newInputDate', newInputDate, true);
                                }
                            }}
                        />
                    )}
                    {errors.newInputDate && values.newInputDate && (
                        <Text style={styles.errorText}>{errors.newInputDate as string}</Text>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sub-meter value:</Text>
                    <TextInput
                        style={styles.inputField}
                        keyboardType="decimal-pad"
                        value={values.newSubMeterValue}
                        onChangeText={(text) => setFieldValue('newSubMeterValue', text)}
                        onBlur={() => setFieldValue('newSubMeterValue', values.newSubMeterValue, true)}
                        placeholder="0.00"
                    />
                    {errors.newSubMeterValue && values.newSubMeterValue && (
                        <Text style={styles.errorText}>{errors.newSubMeterValue}</Text>
                    )}
                </View>
            </View>
            {/* Meter Values Row */}
            <View style={styles.section}>
                <Text style={styles.label}>Main meter value:</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="decimal-pad"
                    value={values.mainCounterValue}
                    onChangeText={(text) => setFieldValue('mainCounterValue', text)}
                    onBlur={() => setFieldValue('mainCounterValue', values.mainCounterValue, true)}
                    placeholder="0.00"
                />
                {errors.mainCounterValue && values.mainCounterValue && (
                    <Text style={styles.errorText}>{errors.mainCounterValue}</Text>
                )}
            </View>

            {/* Amount in invoice Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Amount in invoice:</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="decimal-pad"
                    value={values.amountInvoice}
                    onChangeText={(text) => setFieldValue('amountInvoice', text)}
                    onBlur={() => setFieldValue('amountInvoice', values.amountInvoice, true)}
                    placeholder="0.00"
                />
                {errors.amountInvoice && values.amountInvoice && (
                    <Text style={styles.errorText}>{errors.amountInvoice}</Text>
                )}
            </View>

            {/* Residence Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Residence:</Text>
                <TextInput
                    style={styles.inputField}
                    value={values.residence}
                    onChangeText={(text) => setFieldValue('residence', text)}
                    onBlur={() => setFieldValue('residence', values.residence, true)}
                    placeholder="Enter residence"
                />
                {errors.residence && values.residence && (
                    <Text style={styles.errorText}>{errors.residence}</Text>
                )}
            </View>

            {/* City Section */}
            <View style={styles.section}>
                <Text style={styles.label}>City:</Text>
                <TextInput
                    style={styles.inputField}
                    value={values.city}
                    onChangeText={(text) => setFieldValue('city', text)}
                    onBlur={() => setFieldValue('city', values.city, true)}
                    placeholder="Enter city"
                />
                {errors.city && values.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                )}
            </View>

            {/* Amount you have to pay Section */}
            <View style={styles.section}>
                <Text style={styles.label}>Amount you have to pay:</Text>
                <TextInput
                    style={[styles.inputField, { backgroundColor: '#e0e0e0' }]}
                    keyboardType="decimal-pad"
                    value={values.amountToPay}
                    editable={false}
                    placeholder="0.00"
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
                <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const ReadingForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isDbReady } = useSelector((state: RootState) => state.reading);
    // Initial value of the form
    const initialValues: FormValues = {
        userId: '',
        newInputDate: new Date(),
        oldInputDate: new Date(),
        mainCounterValue: '',
        newSubMeterValue: '',
        oldSubMeterValue: '',
        amountInvoice: '',
        amountToPay: '00.0',
        residence: '',
        city: '',
    };
// Initialize the database to the component assembly
    useEffect(() => {
        dispatch(initializeDatabase());
    }, [dispatch]);
    const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        try {
            const reading = new Reading({
                id: null,
                userId: values.userId,
                newInputDate: values.newInputDate.toISOString(), // Convertir Date en string
                oldInputDate: values.oldInputDate.toISOString(), // Convertir Date en string
                mainCounterValue: parseFloat(values.mainCounterValue),
                newSubMeterValue: parseFloat(values.newSubMeterValue),
                oldSubMeterValue: parseFloat(values.oldSubMeterValue),
                amountInvoice: parseFloat(values.amountInvoice),
                amountToPay: parseFloat(values.amountToPay),
                residence: values.residence,
                city: values.city,
            });
            const readingToPlainO = readingToPlainObject(reading);
            await dispatch(addReading(readingToPlainO)).unwrap(); // Dispatch l'action Redux
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'The survey data was successfully saved.',
            });
            resetForm();
        } catch (error) {
            console.error('Error saving reading:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred while saving data.',
            });
        }
    };
// Display a loading indicator if the database is not ready
    if (!isDbReady || loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        );
    }

    // Show an error message if present
    if (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error,
        });
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.title}>Meter Reading Form</Text>
                    <Text style={styles.subtitle}>Please fill all the required fields</Text>
                </View>

                <Formik
                    initialValues={initialValues}
                    validationSchema={readingFormValidationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    <FormContent />
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
        height: 40,
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

export default ReadingForm;
