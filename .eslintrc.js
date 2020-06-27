module.exports = {
  root: true,

  env: {
    node: true
  },

  plugins: ['babel'],

  extends: [
    'plugin:babel',
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier'
  ],

  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'babel/camelcase': 1
  },

  overrides: [
    {
      files: [
        '**/*.spec.{j,t}s?(x)'
        //  '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
