# ubibot-webapp-generator
Generates a web app for an Ubibot implementation.  
This is **not** a runtime, but a development tool.  
Currently **alpha** code 

## installation
```bash
npm install -D @numical/ubibot-webapp-generator.
```

## usage
Install as a dev dependency of your ubibot implementation.  
This library the provides two scripts that can be called direct, or more usually, via the ```npm run``` command:

### start
This runs up a dev-mode version of the web app, hosted by [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).  
```start <bot>``` where ```bot``` is the path, relative to the project root, of javascript module that exports an instance of [Chat](../ubibot-core/lib/classes/Chat)    
Example:
```
/lib/webbot.js:
  ...
  export const bot = new Chat(...);
  ...

package.json:
  ...
  "scripts": {
    "start": "start lib/webbot",
  },
  ...
```

### build
This builds the web app using [webpack](https://webpack.js.org/) along with a sample HTML file.  
```build <bot> <output```  
where
* ```bot``` is the path, relative to the project root, of javascript module that exports an instance of [Chat](../ubibot-core/lib/classes/Chat);
* ```output``` is the path, relative to the project root,  to write the built files to.  
Example:
```
/lib/webbot.js:
  ...
  export const bot = new Chat(...);
  ...

package.json:
  ...
  "scripts": {
    "build": "build lib/webbot dist",
  },
  ...
```

