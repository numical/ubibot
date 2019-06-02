# ubibot
A friendly little bot for simple use anywhere.

[![Build status](https://travis-ci.org/numical/ubibot.svg)](https://travis-ci.org/numical/ubibot)
[![Known Vulnerabilities](https://snyk.io/test/github/numical/ubibot/badge.svg)](https://snyk.io/test/github/numical/ubibot)
## tl;dr
A modular framework for conversational user interfaces, without any AI.  
This [monorepo](https://gomonorepo.org/) holds core and example domain packages - see [about](#about).   
Currently **alpha** code 

## about
Ubibot is to designd to hold very simple conversations within a strictly limited context.  
It is **not** a general purpose, natural language interface.  

Any single ubibot application brings together one or more:
* **domain packages** that supply the context-specific content and logic;
* **channel packages** that supply the runtime and user interface.

These packages are dependent on the **core packages** supplied by this repo.

### sample applications
These are good entry points to understanding the ubibot ecosystem:
* [@numical/echobot](packages/echobot/README.md): the simplest possible ubibot application brining together a domain that echoes user input with a command line interface;
* [@numical/bankbot](packages/bankbot/README.md): a more fully featured bot that services a fictional personal bank account via a variety of user interfaces.
* [@numical/webbot](packages/webbot/README.md): a web-based chat interface for calling any server-based ubibot runtime hosted by [@numical/ubibot-channel-rest](packages/ubibot-channel-rest/README.md).

### domain packages
These are built on top of classes and functions supplied by [@numical/ubibot-core](packages/ubibot-core/README.md).  
Ultimately they export a ```configuration``` object that is passed to a channel package for running.  
Examples provided are:

* [@numical/ubibot-domain-echo](packages/echobot/README.md):  simple echo functionality;
* [@numical/ubibot-domain-bank](packages/bankbot/README.md):  servicing a fictional personal current account.

### channel packages
Provide runtimes and IO for Ubibot:
* [@numica/ubibot-channel-cli](packages/ubibot-channel-cli/README.md): a command line interface for ubibot;
* [@numical/ubibot-channel-rest](packages/ubibot-channel-rest/README.md): a channel package for accessing a multi-user implementation of ubibot via a [HTTP ReST](https://www.restapitutorial.com/lessons/httpmethods.html) calls; 

### core packages
* [@numical/ubibot-core](packages/ubibot-core/README.md): the core 'engine' and utility functions or ubibot;
* [@numical/ubibot-test](packages/ubibot-test/README.md): Ubibot is friendly but serious - testing is a first-class concern for the framework;

### build packages
* [@numical/ubibot-webapp](packages/ubibot-webapp/README.md): a dev tool to build a hosting web app for an Ubibot implementation - see [@numical/webbot](packages/webbot/README.md) for any example of usage


## todos
1. update documentation
1. add clean end to conversations
1. allow config info for start & build scripts
