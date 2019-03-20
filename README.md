# ubibot
A friendly little bot for simple use anywhere.

## tl;dr
A modular framework for conversational user interfaces, without any AI.  
This [monorepo](https://gomonorepo.org/) holds core and example domain packages - see [about](#about).   
Currently **alpha** code 

## about
Ubibot is to designd to hold very simple conversations within a strictly limited context;  

Any single ubibot implementation consists of:
* a **domain package** that supplies the context-specific content and logic;
* **core packages** that are libraries of boilerplate fuctionality - these include **channel packages** which provide the client interface to ubibot. 

## entry points
Example domain packages:
* [@numical/echobot](packages/echobot/README.md): the simplest possible ubibot domain;
* [@numical/bankbot](packages/bankbot/README.md): demonstrates a bot for servicing a personal bank account.

## core packages
* [@numical/ubibot-config](packages/ubibot-config/README.md): a library to generate the configuration passed to an ubibot implementation;
* [@numical/ubibot-core](packages/ubibot-core/README.md): the core 'engine' and utility functions or ubibot;
* [@numical/ubibot-test](packages/ubibot-test/README.md): a package to support testing.

## channel packages
* [@numica/ubibot-cli](packages/ubibot-cli/README.md): a command line interface for ubibot; the simplest possible channel package;
* [@numical/ubibot-rest](packages/ubibot-rest/README.md): a channel package for accessing a multi-user implementation of ubibot via a [HTTP ReST](https://www.restapitutorial.com/lessons/httpmethods.html) calls; 


## testing
Ubibot is friendly but serious.  
Testing is a first-class concern for the framework.  
The [@numical/ubibot-test](./packages/ubibot-test/README.md) package details the testing options available.

