module.exports = {
  extends: 'next',
  rules: {
    '@typescript-eslint/consistent-generic-constructors': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // Desativa a verificação de variáveis não usadas
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
  },
};
