#bankbot
An example Ubibot implementation for servicing a personal bank account.  
This will be an Ubibot rewrite of [an earlier bankbot implementation](https://github.com/numical/bankbot).  
Currently **alpha** code.

##installation
```bash
git clone https://github.com/numical/ubibot.git
cd ubibot/packages/bankbot
```

##usage
__command line__
```bash
npm run cli
```
__web app__
```bash
npm run webapp
```
The premise:  
You are a bank customer who wishes to service their personal current account.  
You are already known and authenticated.

##entry point
This project is an implementation of the core [@numical/ubibot-engine](../ubibot-engine/README.md) for the retail banking domain based on mock data: 
* [```index.js```](./index.js) exports a [```Chat```](../ubibot-engine/lib/engine/Chat.js) instance...
* based on a [```config```](./lib/config.js) that combines....
* [```content```](./lib/content.js) and [```contexts```](./lib/contexts.js) that...
* aggregate and contextualize as set of [```commands``](./lib/commands).

See the [engine tutorial](../ubibot-engine/README.md)  for more.





