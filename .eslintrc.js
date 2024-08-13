module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "@react-native",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "react-native/no-inline-styles": "off",
    "import/no-unresolved": "error",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        distinctGroup: true,
        warnOnUnassignedImports: true,
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "react**",
            group: "external",
            position: "before",
          },
          {
            pattern: "api/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "contexts/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "utils/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "styles/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "components/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "navigations/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "screens/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "./**",
            group: "sibling",
            position: "after",
          },
          {
            pattern: "../**",
            group: "parent",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "type"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
  },
  settings: {
    "import/ignore": ["react-native"],
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["src", "node_modules"],
      },
      typescript: {},
    },
  },
};
