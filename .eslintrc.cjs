module.exports = {
  extends: [
    'eslint:recommended',
    'alloy',
    'alloy/react',
    'alloy/typescript',
    './.eslintrc-auto-import.json',
    'plugin:prettier/recommended'
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    browser: true
    // node: true
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    // myGlobal: false
    UserAPI: 'readonly',
    ComposeAPI: 'readonly',
    LayoutAPI: 'readonly',
    EmailToolBarAPI: 'readonly',
    EmailSideAPI: 'readonly',
    EmailContentAPI: 'readonly',
    LabelValue: 'readonly',
    SearchCommonParams: 'readonly',
    SuccessResponse: 'readonly',
    React: 'readonly',
    Expand: 'readonly',
    ExpandRecursively: 'readonly',
    NotificationsAPI: 'readonly',
    NodeJS:'readonly'
  },
  rules: {
    // 自定义你的规则
    'max-params': 'off',
    'no-promise-executor-return': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/jsx-no-useless-fragment': 0,
    'react/no-unstable-nested-components': 0,
    semi: [2, 'always'],
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off', // 关闭类型推断
    '@typescript-eslint/no-require-imports': 'off'
  }
};
