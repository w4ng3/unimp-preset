/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  // 小程序全局变量
  globals: {
    uni: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    getApp: true,
    UniApp: true,
    UniHelper: true,
    App: true,
    Page: true,
    Component: true,
    AnyObject: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['/node_modules/*', '/dist/', '/dist*', '/build/', '/*.js', '/src/types/'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: false,
        trailingComma: 'none'
      }
    ],
    'no-control-regex': ['off'],
    'vue/multi-word-component-names': ['off'],
    'vue/no-setup-props-destructure': ['off'],
    'vue/no-deprecated-html-element-is': ['off'],
    'vue/no-v-text-v-html-on-component': ['off'],
    'no-undef': 0,
    // 禁止定义未使用的变量, 忽略_开头的变量
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^on' }]
  }
}
