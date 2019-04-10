# ubibot-core
Core engine of ubibot framework.

Currently **alpha** code 

## installation
```bash
npm install @numical/ubibot-core
```

## usage
Treat as a library of utility functions:
```javascript
const { respondTo } = require("@numical/ubibot-core");
...
const reponse = respondTo(command);
```

## api
This module exports a single function:

###```respondTo(request, respond)```
* iteratively calls itself whilst ```respond(request)``` results in a function;  
    __arguments__  
        - request (any) : arbitary argument passed to ```respond``` function;  
        - respond (function) : accepts a single argument  
    __returns__  
    (any) - the first non-function response in the iterative chain
