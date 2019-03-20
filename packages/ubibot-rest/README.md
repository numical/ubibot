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
* ```POST /conversation```: starts a new user session with ubibot;
* ```POST /conversation/{id}```: continues a user session with ubibot;

## testing
This also offers a test runner for the ReST server:
```javascript
const { testReST } = require("@numical/ubibot-rest");
const { test } = require("@numical/ubibot-test");
const config = ...

test("My Domain Tests", testReST(config));

```
See [@numical/ubibot-test](../ubibot-test/README.md) for more on using this test runner.
