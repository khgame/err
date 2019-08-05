# @khgame/err

another node.js error library, which supports error code

## usage

### CError

```typescript
import {CError} from "@khgame/err"
// ...
throw new CError(ERROR_CODE.ValidateError, "Oops") // ERROR_CODE can be enum type of string or number
// ...
```

### CAssert

```typescript
import {CAssert} from "@khgame/err"

const assert = new CAssert({
  fnLog: console.error // optional, log msg will be send to the logger function if given
})
// ...
CAssert.cThrow(ERROR_CODE.ValidateError, "Oops"); // ERROR_CODE can be enum type of string or number
CAssert.cok(true, ERROR_CODE.ValidateError, () => `you can use this string function to avoid string concat.`);
CAssert.cOk(true, ERROR_CODE.ValidateError, () => `you can also insert an existed error.` );
CAssert.cNotNullAndUndefined(undefined, ERROR_CODE.ValidateError, "there are some more APIs");
CAssert.cStrictEqual(1, 2, ERROR_CODE.ValidateError, "this case will go error");
CAssert.cNotStrictEqual("1", 1, ERROR_CODE.ValidateError, "nothing happend");
// ...
```
