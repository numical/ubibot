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
* [echo.js](/lib/echo.js) provides the runtime using the  [@numical/ubibot-channel-cli](../ubibot-channel-cli/README.md) command line channel;
* [echo.test.js](/test/echo.test.js) provides automated tests using two channels -  [@numical/ubibot-channel-cli](../ubibot-channel-cli/README.md) and [@numical/ubibot-channel-rest](./packages/ubibot-channel-rest).

