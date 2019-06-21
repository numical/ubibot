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

The framework's reference implementation of that interface is contained in [@numical/ubibot-engine](./packages/ubibot-engine/README.md).  

You can use this as the base for your own bot.  For those who like the 'monkey see, monkey do' approach, use these projects as references:
* [@numical/echobot](packages/echobot/README.md):  over-engineered echo functionality;
* [@numical/bankbot](packages/bankbot/README.md):  servicing a fictional personal current account.
  
##ubibot ecosystem
This monorepo comprises:
* [@numical/bankbot](packages/bankbot/README.md): example Ubibot implementation;
* [@numical/echobot](packages/echobot/README.md): example Ubibot implementation;
* [@numical/ubibot-tutorial](packages/tutorial/README.md): tutorial introducing Ubibot;
* [@numica/ubibot-cli](packages/ubibot-cli/README.md): a command line runtime for ubibot;
* [@numical/ubibot-engine](./packages/ubibot-engine/README.md): reference implementation;
* [@numical/ubibot-natural](./packages/ubibot-natural/README.md): repackaging of the [natural language library](https://www.npmjs.com/package/natural);
* [@numical/ubibot-rest](packages/ubibot-rest/README.md): a server-side runtime for multi-user Ubibot exposing an [HTTP ReST](https://www.restapitutorial.com/lessons/httpmethods.html) interface;
* [@numical/ubibot-test](packages/ubibot-test/README.md): system testing;
* [@numical/ubibot-util](packages/ubibot-util/README.md): common artifacts used throughout the framework;
* [@numical/ubibot-webapp](packages/ubibot-webapp/README.md): a dev tool to build a hosting web app for an Ubibot implementation;
* [@numical/webbot](packages/webbot/README.md): generic webbot for connecting to any remote Ubibot implementation.

##thanks
Thanks for your interest!

numical
June 2019


