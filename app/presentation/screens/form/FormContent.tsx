import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useFormikContext } from 'formik';
import { CalculateAmountToPayUseCase } from '@/core/domain/usecases/CalculateAmountToPayUseCase';
import { useCalculateAmountToPay } from '@/presentation/hooks/useCalculateAmountToPay';
import { FormValues } from '@/core/domain/types/FormValues.ts';
import FormInput from '@/presentation/components/ui/FormInput.tsx';
import DateFormInput from '@/presentation/components/ui/DateFormInput.tsx';
import CameraButton from '@/presentation/components/ui/CameraButton.tsx';

const FormContent = () => {
    const { values, errors, touched, setFieldValue, submitForm, isSubmitting } = useFormikContext<FormValues>();
    const calculateAmountToPayUseCase = useMemo(() => new CalculateAmountToPayUseCase(), []);
    const [showPicker, setShowPicker] = useState(false);
    const [showOldPicker, setShowOldPicker] = useState(false);

    // Calculate amount to pay with the personalized hook
    const amountToPay = useCalculateAmountToPay(values, errors, calculateAmountToPayUseCase);

    // Update amountToPay in the form
    useEffect(() => {
        setFieldValue('amountToPay', amountToPay);
    }, [amountToPay, setFieldValue]);

    // Fonction pour gérer le texte reconnu depuis CameraButton
    const handleTextRecognized = (field: keyof FormValues) => (text: string) => {
        // Nettoyer le texte (par exemple, extraire uniquement les chiffres décimaux)
        const cleanedText = text.match(/^\d*\.?\d*$/) ? text : '';
        if (cleanedText) {
            setFieldValue(field, cleanedText);
        }
    };

    return (
        <View style={styles.formContainer}>
            {/* Hidden input for userId */}
            <TextInput
                style={{ display: 'none' }}
                value={values.userId || ''}
                onChangeText={(text) => setFieldValue('userId', text)}
                editable={false}
            />
            {/* Date Sections */}
            <View style={styles.rowSection}>
                <View style={styles.inputGroup}>
                    <DateFormInput
                        label="Old statement"
                        value={values.oldInputDate}
                        onChange={(date) => setFieldValue('oldInputDate', date)}
                        error={(touched.oldInputDate || isSubmitting) ? errors.oldInputDate as string : undefined}
                        onFocus={() => setShowOldPicker(true)}
                        onBlur={() => setShowOldPicker(false)}
                        iconName="calendar-month"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <FormInput
                        label="Old sub-meter"
                        value={values.oldSubMeterValue}
                        onChangeText={(text) => setFieldValue('oldSubMeterValue', text)}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={(touched.oldSubMeterValue || isSubmitting) ? errors.oldSubMeterValue : undefined}
                        iconName="electric-meter"
                    />
                </View>
            </View>
            <View style={styles.section}>
                <DateFormInput
                    label="New statement"
                    value={values.newInputDate}
                    onChange={(date) => setFieldValue('newInputDate', date)}
                    error={(touched.newInputDate || isSubmitting) ? errors.newInputDate as string : undefined}
                    onFocus={() => setShowPicker(true)}
                    onBlur={() => setShowPicker(false)}
                    iconName="calendar-month"
                />
            </View>
            <View style={styles.rowSection}>
                <View style={styles.inputGroup}>
                    <FormInput
                        label="New sub-meter"
                        value={values.newSubMeterValue}
                        onChangeText={(text) => setFieldValue('newSubMeterValue', text)}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={(touched.newSubMeterValue || isSubmitting) ? errors.newSubMeterValue : undefined}
                        iconName="electric-meter"
                    />
                </View>
                <CameraButton
                    label="Scan new meter"
                    onTextRecognized={handleTextRecognized('newSubMeterValue')}
                />
            </View>
            {/* Meter Values Row */}
            <View style={styles.rowSection}>
                <View style={styles.inputGroup}>
                    <FormInput
                        label="Main meter"
                        value={values.mainCounterValue}
                        onChangeText={(text) => setFieldValue('mainCounterValue', text)}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        error={(touched.mainCounterValue || isSubmitting) ? errors.mainCounterValue : undefined}
                        iconName="electric-meter"
                    />
                </View>
                <CameraButton
                    label="Scan main meter"
                    onTextRecognized={handleTextRecognized('mainCounterValue')}
                />
            </View>
            {/* Amount in invoice Section */}
            <View style={styles.section}>
                <FormInput
                    label="Amount in invoice"
                    value={values.amountInvoice}
                    onChangeText={(text) => setFieldValue('amountInvoice', text)}
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    error={(touched.amountInvoice || isSubmitting) ? errors.amountInvoice : undefined}
                    iconName="money"
                />
            </View>
            {/* Residence Section */}
            <View style={styles.section}>
                <FormInput
                    label="Residence"
                    value={values.residence}
                    onChangeText={(text) => setFieldValue('residence', text)}
                    placeholder="Enter residence"
                    keyboardType="default"
                    autoCapitalize="words"
                    error={(touched.residence || isSubmitting) ? errors.residence : undefined}
                    editable={false}
                    iconName="home"
                />
            </View>
            {/* City Section */}
            <View style={styles.section}>
                <FormInput
                    label="City"
                    value={values.city}
                    onChangeText={(text) => setFieldValue('city', text)}
                    placeholder="Enter city"
                    keyboardType="default"
                    autoCapitalize="words"
                    error={(touched.city || isSubmitting) ? errors.city : undefined}
                    editable={false}
                    iconName="location-city"
                />
            </View>
            {/* Amount you have to pay Section */}
            <View style={styles.section}>
                <FormInput
                    label="Amount you have to pay"
                    value={values.amountToPay}
                    onChangeText={() => {}} // Prevent editing
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    error={undefined} // No error for read-only field
                    editable={false}
                    iconName="money"
                />
            </View>
            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
                <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default FormContent;
