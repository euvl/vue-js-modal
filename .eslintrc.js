module.exports = {
  root: true,
  fix: true,
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
        'config': 'build/webpack.base.conf.js'
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
