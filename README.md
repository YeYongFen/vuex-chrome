# Vuex Chrome Extensions

vuex-chrome-plugin is a vuex plugin that helps you synchronize the different state of page ( background , popup , content and so on ) on chrome extendsion through chtome API. When  you change a value in vuex state by committing a mutation on one of the pages , the vuex state of others pages will be updated immediately.
You can assume that the different pages of chrome ectension share the same vuex state. This vuex plugin will solve all the problem for data synchronization automatically.  


## Installation

```
npm install --save vuex-chrome-plugin 
```

The UMD build is also available on unpkg:
<script src="https://unpkg.com/vuex-chrome-plugin/dist/vuex-chrome-plugin.umd.js"></script>

You can get the library on window.VuexChromePlugin.
## Usage

```
import VuexChromePlugin from 'vuex-chrome-plugin'

const store = new Vuex.Store({
  plugins: [VuexChromePlugin()],
})

```

## How to run the example

```
git clone  https://github.com/yyf1994gggg/vuex-chrome.git

npm install

cd example && npm install 

npm run dev

Drop the folder 'example/dist'  to 'chrome://extensions/'   to install extension

```

![demo](https://github.com/yyf1994gggg/vuex-chrome/blob/master/example/demo.gif)



## Changelog

##### 0.1.0  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  2019/3/25

- First version


