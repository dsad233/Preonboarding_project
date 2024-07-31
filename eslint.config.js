import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.node },
  rules : {
    // 기본적인 룰을 추가해줍니다
    "constructor-super": "error",
    "no-const-assign": "error",
    "no-this-before-super": "error",
    "no-undef": "error",
    "no-unreachable": "error",
    "no-unused-vars": "warn",
    "no-use-before-define": "error",
  },
},
  pluginJs.configs.recommended,
];