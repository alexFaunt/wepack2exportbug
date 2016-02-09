# Testcase to reproduce 
Having the default export on the same line as a subsequent child export breaks the bundle.
```
// modules/module1.js
export default def; export { MOD_1_CONST }
```
I have encountered this error even when not on line, but this is a much more complicated situation, and this test case makes it much easier to see.
Moving the second export fixes the issue due to automatic semicolon insertion.


## Steps to reproduce
1. npm install
2. webpack
3. open index.html

## Actual result
webpack exports the following for the module modules/module1.js.

```javascript
/* harmony default export */ exports["a"] = def/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return MOD_1_CONST; }});

```

Which causes an error to be thrown at runtime
```
Uncaught SyntaxError: Unexpected identifier
```


## Expected Result
I think the cleanest solution is to maintain the semi-colon after 'def'

```javascript
/* harmony default export */ exports["a"] = def;/* harmony export */ Object.defineProperty(exports, "b", {configurable: false, enumerable: true, get: function() { return MOD_1_CONST; }});

```


## Investigation
I did some digging into how/why this semi colon is removed, but can't find it. A replacement gets pushed into the template and applied later, but I can't follow back why it decides to delete the semi-colon. (see screenshot for the point it gets pushed in);
