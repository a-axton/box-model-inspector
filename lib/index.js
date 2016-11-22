function BoxModelInspector (options) {
  options = options || {};
  this.el = options.el;
  this._className = options.className;
  this._appendTo = options.appendTo;

  if (this.el) {
    this._elComputedStyles = window.getComputedStyle(this.el);
    this.boxModel = this._buildDomNodes();
    this.refresh();
  } else {
    this.boxModel = this._buildDomNodes();
  }
}

// renders all required dom objects and appends to body
// returns a reference object containing all node objects
BoxModelInspector.prototype._buildDomNodes = function () {
  var nodeReferences;

  this._parentElement = document.createElement('div');

  var childElements = '<div class="content"></div>' +
    '<div class="margin">' +
      '<div class="marginTop"></div>' +
      '<div class="marginRight"></div>' +
      '<div class="marginBottom"></div>' +
      '<div class="marginLeft"></div>' +
    '</div>' +
    '<div class="padding">' +
      '<div class="paddingTop"></div>' +
      '<div class="paddingRight"></div>' +
      '<div class="paddingBottom"></div>' +
      '<div class="paddingLeft"></div>' +
    '</div>' +
    '<div class="border">' +
      '<div class="borderTop"></div>' +
      '<div class="borderRight"></div>' +
      '<div class="borderBottom"></div>' +
      '<div class="borderLeft"></div>' +
    '</div>' +
    '<div class="element"></div>';

  this._parentElement.classList.add(this._className || 'box-model');
  this._parentElement.innerHTML = childElements;

  if (this._appendTo) {
    this._appendTo.appendChild(this._parentElement);
  } else {
    document.body.appendChild(this._parentElement);
  }

  nodeReferences = this._buildNodeReferences(this._parentElement.childNodes);
  nodeReferences.wrapper.setAttribute('style', 'position: absolute; pointer-events: none;');
  nodeReferences.content.wrapper.setAttribute('style','position: relative; width: 100%; height: 100%; z-index: 200;');
  nodeReferences.margin.wrapper.setAttribute('style','position: absolute; top: 0; left: 0; z-index: 190;');
  nodeReferences.padding.wrapper.setAttribute('style','position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 195;');
  nodeReferences.border.wrapper.setAttribute('style','position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 195;');
  [nodeReferences.padding, nodeReferences.margin, nodeReferences.border].forEach(function(wrapper) {
    for (var node in wrapper) {
      if (node !== 'wrapper') {
        wrapper[node].setAttribute('style','position: absolute; background-attachment: fixed;');
      }
    }
  });

  return nodeReferences;
};

BoxModelInspector.prototype._buildNodeReferences = function (nodes, parent) {
  var nodeRef = {
    wrapper: this._parentElement
  }

  // loop through dom nodes
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var children = node.childNodes;
    var refEntry;

    if (parent) {
      parent[node.classList[0]] = node;
    } else if (children) {
      refEntry = nodeRef[node.classList[0]] = {};
      refEntry.wrapper = node;
      this._buildNodeReferences(children, refEntry);
    }
  }

  return nodeRef;
};

BoxModelInspector.prototype._calculatePadding = function () {
  var padding = this.boxModel.padding,
    border = this.boxModel.border,
    content = this.boxModel.content,
    styles = this._elComputedStyles,
    elDimensions = this._elDimensions,
    borderLeft = parseFloat(styles.borderLeftWidth),
    borderRight = parseFloat(styles.borderRightWidth),
    borderTop = parseFloat(styles.borderTopWidth),
    borderBottom = parseFloat(styles.borderBottomWidth),
    paddingLeft = parseFloat(styles.paddingLeft),
    paddingRight = parseFloat(styles.paddingRight),
    paddingTop = parseFloat(styles.paddingTop),
    paddingBottom = parseFloat(styles.paddingBottom);

  content.wrapper.style.width = elDimensions.outerWidth - paddingLeft - paddingRight - borderLeft - borderRight + 'px';
  content.wrapper.style.height = elDimensions.outerHeight - paddingTop - paddingBottom - borderTop - borderBottom + 'px';
  content.wrapper.style.left = paddingLeft + borderLeft + 'px';
  content.wrapper.style.top = paddingTop + borderTop + 'px';
  content.wrapper.style['background-position'] = borderLeft + 'px ' + '0px';

  border.wrapper.style.width = elDimensions.outerWidth + 'px';
  border.wrapper.style.height = elDimensions.outerHeight + 'px';
  border.wrapper.style.left = '0px';
  border.wrapper.style.top = '0px';
  border.wrapper.style['background-position'] = borderLeft + 'px ' + '0px';

  padding.wrapper.style.width = elDimensions.outerWidth - borderLeft - borderRight + 'px';
  padding.wrapper.style.height = elDimensions.outerHeight - borderTop - borderBottom + 'px';
  padding.wrapper.style.left = borderLeft + 'px';
  padding.wrapper.style.top = borderTop + 'px';
  padding.wrapper.style['background-position'] = borderLeft + 'px ' + '0px';

  border.borderTop.style.height = borderTop + 'px';
  border.borderTop.style.width = elDimensions.outerWidth + 'px';
  border.borderTop.style.top = '0px';
  border.borderTop.style.left = '0px';

  border.borderRight.style.height = elDimensions.outerHeight - borderTop - borderBottom + 'px';
  border.borderRight.style.width = borderRight + 'px';
  border.borderRight.style.top = borderTop + 'px';
  border.borderRight.style.right = '0px';

  border.borderBottom.style.height = borderBottom + 'px';
  border.borderBottom.style.width = elDimensions.outerWidth + 'px';
  border.borderBottom.style.left = '0px';
  border.borderBottom.style.bottom = '0px';

  border.borderLeft.style.height = elDimensions.outerHeight - borderTop - borderBottom + 'px';
  border.borderLeft.style.width = borderLeft + 'px';
  border.borderLeft.style.top = borderTop + 'px';
  border.borderLeft.style.left = '0px';

  padding.paddingTop.style.height = paddingTop + 'px';
  padding.paddingTop.style.width = elDimensions.outerWidth - borderLeft - borderRight + 'px';
  padding.paddingTop.style.top = '0px';
  padding.paddingTop.style.left = '0px';

  padding.paddingRight.style.height = elDimensions.outerHeight - paddingTop - paddingBottom - borderTop - borderBottom + 'px';
  padding.paddingRight.style.width = paddingRight + 'px';
  padding.paddingRight.style.top = paddingTop + 'px';
  padding.paddingRight.style.right = '0px';

  padding.paddingBottom.style.height = paddingBottom + 'px';
  padding.paddingBottom.style.width = elDimensions.outerWidth - borderLeft - borderRight + 'px';
  padding.paddingBottom.style.bottom = '0px';
  padding.paddingBottom.style.left = '0px';

  padding.paddingLeft.style.height = elDimensions.outerHeight - paddingTop - paddingBottom - borderTop - borderBottom + 'px';
  padding.paddingLeft.style.width = paddingLeft + 'px';
  padding.paddingLeft.style.top = paddingTop + 'px';
  padding.paddingLeft.style.left = '0px';
};

BoxModelInspector.prototype._calculateMargin = function () {
  var margin = this.boxModel.margin,
    styles = this._elComputedStyles,
    elDimensions = this._elDimensions,
    marginLeft = parseFloat(styles.marginLeft),
    marginRight = parseFloat(styles.marginRight),
    marginTop = parseFloat(styles.marginTop),
    marginBottom = parseFloat(styles.marginBottom);

  margin.wrapper.style.width = elDimensions.outerWidth + marginLeft + marginRight + 'px';
  margin.wrapper.style.height = elDimensions.outerHeight + marginTop + marginBottom + 'px';
  margin.wrapper.style.left = (marginLeft * -1) + 'px';
  margin.wrapper.style.top = (marginTop * -1) + 'px';

  margin.marginTop.style.height = marginTop + 'px';
  margin.marginTop.style.width = elDimensions.outerWidth + marginLeft + marginRight + 'px';

  margin.marginRight.style.height = elDimensions.outerHeight + 'px';
  margin.marginRight.style.width = marginRight + 'px';
  margin.marginRight.style.top = marginTop + 'px';
  margin.marginRight.style.right = 0 + 'px';

  margin.marginBottom.style.height = marginBottom + 'px';
  margin.marginBottom.style.width = elDimensions.outerWidth + marginLeft + marginRight + 'px';
  margin.marginBottom.style.bottom = 0 + 'px';

  margin.marginLeft.style.height = elDimensions.outerHeight + 'px';
  margin.marginLeft.style.width = marginLeft + 'px';
  margin.marginLeft.style.top = marginTop + 'px';
};

BoxModelInspector.prototype.setElement = function (el) {
  this.el = el;
  this._elComputedStyles = window.getComputedStyle(el);
  this.refresh();
  return this;
};

BoxModelInspector.prototype.hide = function () {
  this.boxModel.hidden = true;
  this.boxModel.wrapper.style.display = 'none';
  return this;
};

BoxModelInspector.prototype.show = function () {
  this.boxModel.hidden = false;
  this.refresh();
  return this;
};

BoxModelInspector.prototype.refresh = function () {
  if (this.boxModel.hidden) { return; }
  var el = this.el;
  var elDimensions = {
    offset: {
      left: el.offsetLeft,
      top: el.offsetTop
    },
    width: el.clientWidth,
    height: el.clientHeight,
    outerHeight: el.offsetHeight,
    outerWidth: el.offsetWidth
  };

  this._elDimensions = elDimensions;
  this.boxModel.wrapper.style.display = 'block';
  this.boxModel.wrapper.style.left = elDimensions.offset.left + 'px';
  this.boxModel.wrapper.style.top = elDimensions.offset.top + 'px';
  this.boxModel.wrapper.style.height = elDimensions.outerHeight + 'px';
  this.boxModel.wrapper.style.width = elDimensions.outerWidth + 'px';

  this._calculatePadding();
  this._calculateMargin();

  return this;
};

export default BoxModelInspector;
