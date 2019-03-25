module.exports = {
  "extends": ["standard", "plugin:vue/recommended"],
  "rules":{
    "no-extra-semi":0,
    "semi": ["error", "always"],
    "no-var": 1,
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "always",
        "imports": "never",
        "exports": "never",
        "functions": "ignore"
    }]
  },
  "plugins": [ "vue"],
  "globals": {
    "chrome": true,
    "es6": true
  },

  "parserOptions":{
    //"parser": "babel-eslint"
  }

}