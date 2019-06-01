# ubibot-channel-rest
HTTP server exposing ubibot as a ReST service.

Currently **alpha** code 

## installation
```bash
npm install @numical/ubibot-channel-rest
```

## usage
A channel package that instantiates a server providing ReST endpoints for a multi-user implementation of ubibot.  
This is not a standalone library.  
It must be used as a dependency in a 'domain' module such as [@numical/bankbot](../bankbot/README.md):
```javascript
const { startReST } = require("@numical/ubibot-channel-rest");
const { config } = require("an ubibot domain package");

startReST(config);
```
The endpoints are:
* ```GET /health```: simple health check; returns HTTP code 200 is ok;
* ```POST /chat```: starts a new user session with ubibot;
* ```POST /chat/{id}```: continues a user session with ubibot;

## testing
This also offers a test runner for the ReST server:
```javascript
const { testReST } = require("@numical/ubibot-channel-rest");
const { config } = require("an ubibot domain package");

const scriptsDir = path.resolve(...);

testReST("My Domain Tests", config, scriptsDir);

```
See [@numical/ubibot-test](../ubibot-test/README.md) for more on using this test runner.

## api
This module exports 2 functions:

###```startReST(config)```
* instantiates a single-user ubibot and starts a command line interface  
    __arguments__  
        - config (Object) : configuration object created by a domain package; 
    __returns__  
    undefined - but a side effect is a spawned [http.Server](https://nodejs.org/api/http.html#http_class_http_server) process wrapped by [Koa](https://www.npmjs.com/package/koa)


###```testReST(config)```
* instantiates a single-user ubibot and runs a test runner for use with [@numical/ubibot-test](../ubibot-test/README.md)  
    __arguments__  
        - name (String): display name for the test  
        - config (Object) : configuration object created by a domain package;  
        - scriptsDir (String) : the fully resolved path of the scripts directory.
    __returns__  
    undefined
