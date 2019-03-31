# ubibot-test
A library to support testing of domain packages.

Currently **alpha** code 

## installation
```bash
npm install @numical/ubibot-test
```

## usage
Use this library along with a channel-specific test runner to create 'black-box' tests of your domain.
1. install necessary packages
    ```javascript
    npm install @numical/ubibot-test @numical/ubibot-config @numical/{channel package}
    ```
1. Create a directory containing one or more test script files of the form:
    ```
    bot:aaaaaa
    user:bbbbb
    bot:cccccc
    bot:dddddd
    user:eeeee 
    bot:ffffff
    ```
1. Point the [configuration](../ubibot-config/README.md) ```scriptsDir``` value to this directory;
1. Select a test runner supplied by a channel package such as [ubibot-cli](../ubibot-cli/README.md);
1. Combine in a test module - see [bankbot.test.js](../echobot/test/echo.test.js) for an example.

## the future
Basic conversational user interfaces lend themselves to straightforward 'black box' testing, due to their [repl](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) -style semantics.  
The above [approach](#approach) offers a simple means to assert a script of question/answers.

However 'cleverer' bots may not lend themselves to such simplistic testing.  
More complex channels might offer bot-instigated communications via some form of notification mechanism.  
Trickier, bots may be (or at least appear to be) less deterministic - offering several versions of an answer to a specific question.  
This library will attempt to offer testing mechanisms for such cases. 

