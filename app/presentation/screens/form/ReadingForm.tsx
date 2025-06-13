import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import { Reading } from '@/core/domain/entities/Reading.ts';
import { useSelector, useDispatch } from 'react-redux';
import { addReadingAndUpdateTotal, initializeDatabase } from '@/presentation/state/redux/store/readingSlice';
import { RootState, AppDispatch } from '@/presentation/state/redux/store/store';
import Toast from 'react-native-toast-message';
import { readingToPlainObject } from '@/core/utils/readingToPlainObject';
import { FormValues } from '@/core/domain/types/FormValues.ts';
import { readingFormValidationSchema } from '@/presentation/screens/schema/validationSchema.ts';
import { selectAuthIsReady, selectUser } from '@/presentation/state/redux/selectors/authSelectors.ts';
import {fetchLatestReading} from "@/presentation/state/redux/store/readingSlice.ts";
import FormContent from './FormContent';
import { parseAddress } from '@/core/utils/addressUtils'
const ReadingForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isDbReady, latestReading } = useSelector((state: RootState) => state.reading);
    const user = useSelector(selectUser);
    const isAuthReady = useSelector(selectAuthIsReady);

    // Initialize the database and fetch latest reading on component mount
    useEffect(() => {
        dispatch(initializeDatabase());
        if (isAuthReady && user && !latestReading) {
            dispatch(fetchLatestReading(user.id));
        }
    }, [dispatch, isAuthReady, user, latestReading]);
    const { residence, city } = parseAddress(user?.address);
    // Initial values of the form
    const initialValues: FormValues = {
        userId: user?.id || '',
        newInputDate: new Date(),
        oldInputDate: latestReading ? new Date(latestReading.newInputDate) : new Date(),
        mainCounterValue: '',
        newSubMeterValue: '',
        oldSubMeterValue: latestReading ? latestReading.newSubMeterValue.toString() : '',
        amountInvoice: '',
        amountToPay: '0.00',
        residence: residence,
        city: city,
    };
    const handleSubmit = async (values: FormValues, { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const reading = new Reading({
                id: null,
                userId: values.userId,
                newInputDate: values.newInputDate.toISOString(),
                oldInputDate: values.oldInputDate.toISOString(),
                mainCounterValue: parseFloat(values.mainCounterValue),
                newSubMeterValue: parseFloat(values.newSubMeterValue),
                oldSubMeterValue: parseFloat(values.oldSubMeterValue),
                amountInvoice: parseFloat(values.amountInvoice),
                amountToPay: parseFloat(values.amountToPay),
                residence: values.residence,
                city: values.city,
            });
            const readingToPlainO = readingToPlainObject(reading);
            await dispatch(addReadingAndUpdateTotal(readingToPlainO)).unwrap();
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
        } finally {
            setSubmitting(false);
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
                    key={user?.id || 'no-user'}
                    initialValues={initialValues}
                    validationSchema={readingFormValidationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validateOnMount={false}
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
