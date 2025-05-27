import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

// Define the font family based on platform
const fontFamily = Platform.select({
    ios: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
    },
    android: {
        regular: 'Roboto',
        medium: 'Roboto',
        bold: 'Roboto',
    },
    default: {
        regular: 'System',
        medium: 'System',
        bold: 'System',
    },
});

// Typography styles
export const typography = StyleSheet.create({
    // Headings
    h1: {
        fontFamily: fontFamily.bold,
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 38.4, // 120% of font size
        color: colors.neutral[900],
    },
    h2: {
        fontFamily: fontFamily.bold,
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 33.6, // 120% of font size
        color: colors.neutral[900],
    },
    h3: {
        fontFamily: fontFamily.bold,
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 28.8, // 120% of font size
        color: colors.neutral[900],
    },
    h4: {
        fontFamily: fontFamily.medium,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24, // 120% of font size
        color: colors.neutral[900],
    },
    h5: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 21.6, // 120% of font size
        color: colors.neutral[900],
    },
    h6: {
        fontFamily: fontFamily.medium,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19.2, // 120% of font size
        color: colors.neutral[900],
    },

    // Body text
    bodyLarge: {
        fontFamily: fontFamily.regular,
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 27, // 150% of font size
        color: colors.neutral[700],
    },
    bodyDefault: {
        fontFamily: fontFamily.regular,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24, // 150% of font size
        color: colors.neutral[700],
    },
    bodySmall: {
        fontFamily: fontFamily.regular,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21, // 150% of font size
        color: colors.neutral[700],
    },
    bodyXSmall: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18, // 150% of font size
        color: colors.neutral[700],
    },

    // Labels
    labelLarge: {
        fontFamily: fontFamily.medium,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19.2, // 120% of font size
        color: colors.neutral[800],
    },
    labelDefault: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 16.8, // 120% of font size
        color: colors.neutral[800],
    },
    labelSmall: {
        fontFamily: fontFamily.medium,
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 14.4, // 120% of font size
        color: colors.neutral[800],
    },

    // Button text
    buttonLarge: {
        fontFamily: fontFamily.medium,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 21.6, // 120% of font size
        color: colors.white,
    },
    buttonDefault: {
        fontFamily: fontFamily.medium,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 19.2, // 120% of font size
        color: colors.white,
    },
    buttonSmall: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 16.8, // 120% of font size
        color: colors.white,
    },
});
