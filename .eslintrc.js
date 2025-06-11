module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn', // Change from 'error' to 'warn'
    // Désactive complètement la vérification des types de guillemetss
    'quotes': 'off',
  },
};
