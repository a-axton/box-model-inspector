## Box Model Inspector
Devtools style dom node inspector. Draws a box around a given element highlighting width, height, margin and padding.

![alt tag](https://raw.github.com/a-axton/box-model-inspector/master/example/readmegif.gif)

### Installation
#### npm
```bash
npm install box-model-inspector --save
```
#### inline
```html
<script type="text/javascript" src="/path/to/box-model-inspector/index.js"></script>
```
All required static assets are in the /assets directory, make sure to include those.

### Sample Usage
```js
// if using npm, otherwise will be available as global variable
var BoxModelInspector = require('box-model-inspector');

// initialize, options aren't required
var boxModelInspector = new BoxModelInspector({
  // initial element to highlight
  el: document.querySelectorAll('.example')[0],
  // adds custom class to the highlighter
  className: 'selected'
});

// set new element to be highlighted
document.body.addEventListener('mousemove', function(e) {
  boxModelInspector.setElement(e.target);
  e.stopPropagation();
});

// refresh dimensions
window.addEventListener('resize', function() {
  boxModelInspector.refresh();
});
```
