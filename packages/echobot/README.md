# echobot
The simplest possible ubibot domain.  
Echoes a command line.  
Currently **alpha** code.

## installation
```bash
npm install @numical/echobot
```

## usage
```bash
npx echobot
```

## entry points
* [echo.js](packages/echobot/lib/echo.js) provides the runtime using the  [@numical/ubibot-cli](./packages/ubibot-cli/README.md) command line channel;
* [echo.test.js](packages/echobot/test/echo.test.js) provides automated tests using two channels -  [@numical/ubibot-cli](./packages/ubibot-cli/README.md) and [@numical/ubibot-rest](./packages/ubibot-rest).


