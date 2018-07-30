module.exports = {
    root: true,
    extends: [
        'plugin:vue/recommended',
        'plugin:jest/recommended'
    ],
    rules: {
        indent: ['error', 2, { MemberExpression: 'off' }],
        semi: ['error', 'always']
    }
};
