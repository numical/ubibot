# ubibot-rest
HTTP server exposing ubibot as a ReST service.

Currently **alpha** code 

## installation
```bash
npm install @numical/ubibot-rest
```

## usage
A channel package that instantiates a server providing ReST endpoints for a multi-user implementation of ubibot.  
This is not a standalone library.  
It must be used as a dependency in a 'domain' module such as [@numical/echobot](../echobot/README.md):
```javascript
const { startReST } = require("@numical/ubibot-rest");
const configuration = ...

startReST(configuration);
```
The endpoints are:
* ```GET /health```: simple health check; returns HTTP code 200 is ok;
* ```POST /chat```: starts a new user session with ubibot;
* ```POST /chat/{id}```: continues a user session with ubibot;

## testing
This also offers a test runner for the ReST server:
```javascript
const { testReST } = require("@numical/ubibot-rest");
const config = ...

testReST("My Domain Tests", config);

```
See [@numical/ubibot-test](../ubibot-test/README.md) for more on using this test runner.

## api
This module exports 2 functions:

###```startReST(config)```
* instantiates a single-user ubibot and starts a command line interface  
    __arguments__  
        - config (Object) : configuration object created using [@numical/ubibot-config](../ubibot-config/README.md)  
    __returns__  
    undefined - but a side effect is a spawned [http.Server](https://nodejs.org/api/http.html#http_class_http_server) process wrapped by [Koa](https://www.npmjs.com/package/koa)


###```testReST(config)```
* instantiates a single-user ubibot and runs a test runner for use with [@numical/ubibot-test](../ubibot-test/README.md)  
    __arguments__  
        - name (String): display name for the test  
        - config (Object) : configuration object created using [@numical/ubibot-config](../ubibot-config/README.md)  
    __returns__  
    undefined
