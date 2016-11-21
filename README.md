## Box Model Inspector
Devtools style dom node inspector. Highlights the CSS box model just like chrome devtools. Draws a box around a given element highlighting width, height, margin, border & padding.

##### Caveats
- Expects box-sizing border-box
- Doesn't work well with fixed position elements. It highlights properly but won't stay in the proper position when scrolling.

### Installation
#### npm
```bash
npm install box-model-inspector --save
```
#### inline
```html
<script type="text/javascript" src="/path/dist/box-model-inspector.js"></script>
```
### Theming
```css
* { box-sizing: border-box; }

/* CONTENT */
.box-model .content {
  background: rgba(109, 238, 245, 0.5);
}

/* MARGIN */
.box-model .margin {}
.box-model .marginTop {}
.box-model .marginRight {}
.box-model .marginBottom {}
.box-model .marginLeft {}
.box-model .margin div {
  background: rgba(251, 176, 91, 0.65);
}

/* PADDING */
.box-model .padding {}
.box-model .paddingTop {}
.box-model .paddingRight {}
.box-model .paddingBottom {}
.box-model .paddingLeft {}
.box-model .padding div {
  background: rgba(139, 234, 127, 0.65);
}

/* BORDER */
.box-model .border {}
.box-model .borderTop {}
.box-model .borderRight {}
.box-model .borderBottom {}
.box-model .borderLeft {}
.box-model .border div {
  background-color: rgba(234, 228, 105, .8);
}
```

### Sample Usage
```js
var BoxModelInspector = require('box-model-inspector');

// all options are optional
var boxModelInspector = new BoxModelInspector({
  // initial element to highlight
  el: document.querySelectorAll('.example')[0],
  // custom class, defaults to 'box-model'
  className: 'box-model',
  // will append to element, uses body as default
  appendTo: document.body
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

### Methods
#### setElement
___
Set new element to highlight
##### Example
```js
var el = document.getElementById('el');
boxModelInspector.setElement(el);
```
#### refresh
___
Refresh current element's box model
##### Example
```js
window.addEventListener('resize', function() {
  boxModelInspector.refresh();
});
```
#### hide
___
Hide it
##### Example
```js
boxModelInspector.hide();
```
#### show
___
Show it
##### Example
```js
boxModelInspector.show();
```

