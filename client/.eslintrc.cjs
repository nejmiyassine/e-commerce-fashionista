module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    env: {
        browser: true,
        node: true,
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react/prop-types': 0,
        'no-unused-vars': 'error',
        'no-undef': 'error',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
};
