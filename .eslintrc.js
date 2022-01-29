module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "airbnb",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "airbnb-typescript",
  ],
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import",
    "simple-import-sort",
    "eslint-plugin-react-hooks",
    "jsx-a11y",
    "prettier",
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "ESNext",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "import/imports-first": "error",
    "import/newline-after-import": "error",
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "import/no-named-as-default-member": "off",
    "import/default": "off",
    "no-restricted-properties": [
      2,
      {
        object: "localStorage",
        property: "getItem",
        message: "Please use LocalStorageService.get",
      },
      {
        object: "localStorage",
        property: "setItem",
        message: "Please use LocalStorageService.set",
      },
    ],

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_+$",
        argsIgnorePattern: "^_+$",
      },
    ],

    "class-methods-use-this": "off",
    "no-empty": "error",
    curly: ["error", "all"],
    "newline-before-return": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      {
        blankLine: "always",
        prev: ["function"],
        next: "*",
      },
    ],
    "sort-imports": "off",
    "import/order": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "comma-spacing": "error",
    "object-curly-spacing": ["error", "always"],
    "no-useless-catch": "warn",
    "arrow-body-style": [
      "warn",
      "as-needed",
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    "max-len": [
      "error",
      100,
      4,
      {
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],

    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/boolean-prop-naming": [
      "error",
      {
        rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+",
        propTypeNames: ["bool", "mutuallyExclusiveTrueProps"],
      },
    ],
    "react/destructuring-assignment": "error",
    "react/no-array-index-key": "error",
    "react/no-this-in-sfc": "error",
    "react/no-danger": "error",
    "react/no-children-prop": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        ignoreCase: false,
        noSortAlphabetically: false,
      },
    ],

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          // External packages.
          ["^react", "^@?\\w"],
          // Internal packages.
          ["^src/"],
          // Parent imports.
          ["^\\.\\."],
          // Other relative imports. Put same-folder imports last.
          ["^\\./(?=[^/]*?/)", "^\\."],
          // Style and types imports.
          ["\\.s?css$", "\\.styles", "\\.types"],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
