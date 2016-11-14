module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': './webpack.base.config.js'
      }
    }
  },
  'rules': {
    // don't require .vue extension when importing
    'no-new': 0,
    'prefer-template': 0,
    'no-unused-vars': 0,
    'no-console': 0,
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
