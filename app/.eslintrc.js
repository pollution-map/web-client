module.exports = {
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['react', 'only-warn', 'prettier', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        semi: true,
      },
    ],
  },
};
