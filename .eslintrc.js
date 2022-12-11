module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  plugins: ['vue', 'prettier', 'simple-import-sort'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    // ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    _getHccwpEnv_: 'readonly'
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'never',
          void: 'always',
          component: 'always'
        }
      }
    ],
    'vue/attributes-order': 1,
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: []
      }
    ],
    'vue/require-default-prop': 0,
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-v-for-template-key': 1
  }
}
