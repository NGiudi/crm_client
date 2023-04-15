/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	"env": {
		"node": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-prettier/skip-formatting"
	],
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"indent": [
			"tab"
		],
		"linebreak-style": 0,
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
