# bankbot
An example domain package demonstrating a bot for servicing a personal bank account.  
This will be an ubibot rewrite of [an earlier bankbot implementation](https://github.com/numical/bankbot).  
Currently **alpha** code.

## installation
```bash
npm install @numical/bankbot
```

## usage
```bash
npx bankbot
```
The premise:  
You are a bank customer who wishes to service their personal current account.  
You are already known and authenticated.

## entry points
* [bankbot.js](/lib/bankbot.js) provides the runtime using the  [@numical/ubibot-cli](../ubibot-cli/README.md) command line channel;
* [bankbot.test.js](/test/bankbot.test.js) provides automated tests using two channels -  [@numical/ubibot-cli](../ubibot-cli/README.md) and [@numical/ubibot-rest](./packages/ubibot-rest).





