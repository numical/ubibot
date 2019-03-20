# ubibot-config
Centralised configuration for ubibot.

Currently **alpha** code.

## installation
```bash
npm install @numical/ubibot-config
```

## usage
This library provides a single function to create or access a configuration object used by an ubibot implementation.  
### 'setter' mode
Pass arguments to create a configuration object:
* sets default values;
* merges in domain-specific configuration;
* validates the result.  

Typical usage follows this pattern:
```javascript
const { configure } = require("@numical/ubibot-config");
const domainOptions = { ... };
const config = configure(domainOptions);
...
```
The resultant ```config``` object is then used as an argument for any package that instantiates an ubibot instance - generally a channel package such as [@numical/ubibot-cli](../ubibot-cli/README.md). 

### 'getter' mode
If no arguments are passed this simply returns the default or last generated configuration.
```javascript
const { configure } = require("@numical/ubibot-config");
const config = configure();
...
```
The package guards against modification after the getter has been called - see [api](#api) for details.

## api
This module exports a single function:

###```configure([options], [allowModifyAfterGet])```
* creates or returns a previously created configuration object for an ubibot implementation;  
    __arguments__  
        - options (optional Object) : a dictionary to be merged with default configuration; will be validated;  
        - allowModifyAfterGet (optional boolean) : default behaviour is to throw an error if this function is called as a setter after having been called as a getter; set this value to ```true``` to override this;
    __returns__  
    (object) - the created (setter) or previously created (getter) configuration.

