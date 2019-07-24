// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 10,
  },
  // env: {
  //   browser: true,
  // },
  extends: ['@vue/airbnb', 'plugin:vue/essential'],
  // // required to lint *.vue files
  // plugins: [
  //   'html'
  // ],
  // // check if imports actually resolve
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  // },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'warning',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'max-len': 'off',
    'prefer-destructuring': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 0,
    // enforce CLRF linebreaks = 'linebreak-style' : ["error", "unix"]
    // windows linebreaks when not in production environment
    // "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
  },
};
