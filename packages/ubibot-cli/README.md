# ubibot-cli
Command Line Interface for ubibot.

Currently **alpha** code 

## Installation
```bash
npm install ubibot-cli
```

## Usage
This is not a standalone library.
It must be used as a dependency in a 'domain' module such as ubibot-echo:
```javascript
const { startCLI } = require("ubibot-cli");
const configuration = ...
startCLI(configuration);
```
This will result in a command line interface:

