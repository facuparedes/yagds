import { useEffect } from "react";

export default function useScript(scriptCode: () => void) {
  scriptCode &&
    useEffect(() => {
      let script = document.createElement("script");

      /**
       * ? Firstly, is removed everything except the function's body. So 'function() {}' is deleted.
       * ? Also, if "require()" is used inside script code, this is converted to __webpack_require__ and it can't be loaded.
       * ? Because that, it is replaced with __non_webpack_require__
       */
      let scriptToString = scriptCode.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
      scriptToString = scriptToString.replace(/__webpack_require__+.*\([^)]*\);?/, `require("${scriptToString.match(/(?:__webpack_require__+.*\(\/\*\!\s)((?:(?!\*\/)\S.)*)/)[1]}")`);
      script.innerHTML = scriptToString;

      script.async = true;

      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
        script = null;
        scriptToString = null;
      };
    }, []);
}
