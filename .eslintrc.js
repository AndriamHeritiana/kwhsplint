module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn', // Change from 'error' to 'warn'
    // Permet d'utiliser indifféremment les guillemets simples ou doubles
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
  },
};
