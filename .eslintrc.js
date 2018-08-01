module.exports = {
    root: true,
    env: {
        "commonjs": true,
        "node": true
    },
    parserOptions: {
        "ecmaVersion": 8
    },
    extends: [
        'plugin:vue/recommended',
        'plugin:jest/recommended'
    ],
    rules: {
        indent: ['error', 2, { MemberExpression: 'off' }],
        semi: ['error', 'always']
    }
};
