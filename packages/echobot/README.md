# echobot
The simplest possible implementaion of Ubibot's natural-language-based [@numical/ubibot-engine](../ubibot-engine/README.md).  
i.e. a completely over-engineered solution to echoing the users' input.  
Currently **alpha** code.

##installation
```bash
git clone https://github.com/numical/ubibot.git
cd ubibot/packages/echobot
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

##entry point
* [```index.js```](./index.js) exports a [```Chat```](../ubibot-engine/lib/engine/Chat.js) instance...
* based on a [```config```](./lib/config.js) that combines....
* [```content```](./lib/content.js) and [```contexts```](./lib/contexts.js) that...
* aggregate and contextualize as set of [```commands``](./lib/commands).

See the [engine tutorial](../ubibot-engine/README.md)  for more.
