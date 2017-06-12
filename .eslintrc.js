module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    'no-multi-spaces': [
      'error', {
        exceptions: {
          'ImportDeclaration': true
        }
      }
    ],
    'arrow-parens': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
