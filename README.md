#ubibot
A friendly little bot for simple use anywhere.

[![Build status](https://travis-ci.org/numical/ubibot.svg)](https://travis-ci.org/numical/ubibot)
[![Known Vulnerabilities](https://snyk.io/test/github/numical/ubibot/badge.svg)](https://snyk.io/test/github/numical/ubibot)
##tl;dr
A modular framework for conversational user interfaces, without any AI.  
 
This [monorepo](https://gomonorepo.org/) holds development tools, reference implementations and example packages.

Currently **alpha** code. 

##installation
```$bash
git clone https://github.com/numical/ubibot.git
cd ubibot
npm install
```

##introduction
Ubibot is to designed to hold very simple conversations within a strictly limited context.  
It is **not** a general purpose, natural language interface.  
It can run on both servers and edge devices, such as your phone. 

####core interface
The Ubibot framework is a set of functionality wrapped around a core ```Bot``` interface.  
Were the project written in Typescript (it isn't, it's all plain javascript), this interface would be: 
```typescript
interface Bot {
  hello(): Promise<String>;
  respondTo:(s: String): Promise<String>;
  getState?(): Promise<any>;
}
```

##getting started
The [@numical/ubibot-tutorial](packages/tutorial/README.md) is a good start.  
It introduces the core interface and the libaries available to develop, publish and test implementations of that interface.

The framework's reference implementation of that interface is contained in [```@numical/ubibot-engine```](./packages/ubibot-engine/README.md).  

You can use this as the base for your own bot.  For those who like the 'monkey see, monkey do' approach, use these projects as references:
* [@numical/echobot](packages/echobot/README.md):  over-engineered echo functionality;
* [@numical/bankbot](packages/bankbot/README.md):  servicing a fictional personal current account.
  
##ubibot ecosystem
This monorepo comprises:
* [@numical/bankbot](packages/bankbot/README.md): example Ubibot implementation
* [@numical/echobot](packages/echobot/README.md): example Ubibot implementation
* @numical/ubibot-tutorial  

  
  
The other packages that comprise this monorepo are:
#### channel packages
Provide runtimes and IO for Ubibot:
* [@numica/ubibot-channel-cli](packages/ubibot-channel-cli/README.md): a command line interface for ubibot;
* [@numical/ubibot-channel-rest](packages/ubibot-channel-rest/README.md): a channel package for accessing a multi-user implementation of ubibot via a [HTTP ReST](https://www.restapitutorial.com/lessons/httpmethods.html) calls; 

### core packages
* [@numical/ubibot-core](packages/ubibot-core/README.md): the core 'engine' and utility functions or ubibot;
* [@numical/ubibot-test](packages/ubibot-test/README.md): Ubibot is friendly but serious - testing is a first-class concern for the framework;

### build packages
* [@numical/ubibot-webapp](packages/ubibot-webapp/README.md): a dev tool to build a hosting web app for an Ubibot implementation - see [@numical/webbot](packages/webbot/README.md) for any example of usage


