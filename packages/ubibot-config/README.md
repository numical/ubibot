# ubibot-config
Centralised configuration for ubibot.

Currently **alpha** code.

## installation
```bash
npm install @numical/ubibot-config
```

## usage
This library provides a single factory function to create a configuration object used by an ubibot implementation.  
The factory function accepts domain-specific configuration, merges this with default values, and validates the result.  
Typical usage follows this pattern:
```javascript
const { configure } = require("@numical/ubibot-config");
const domainOptions = { ... };
const config = configure(domainOptions);
...
```
The resultant ```config``` object is then used as an argument for any library that instantiates an ubibot instance.

