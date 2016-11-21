!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.BoxModelInspector=e()}(this,function(){"use strict";function t(t){t=t||{},this.el=t.el,this._className=t.className,this._appendTo=t.appendTo,this.el?(this._elComputedStyles=window.getComputedStyle(this.el),this.boxModel=this._buildDomNodes(),this.refresh()):this.boxModel=this._buildDomNodes()}return t.prototype._buildDomNodes=function(){var t;this._parentElement=document.createElement("div");var e='<div class="content"></div><div class="margin"><div class="marginTop"></div><div class="marginRight"></div><div class="marginBottom"></div><div class="marginLeft"></div></div><div class="padding"><div class="paddingTop"></div><div class="paddingRight"></div><div class="paddingBottom"></div><div class="paddingLeft"></div></div><div class="border"><div class="borderTop"></div><div class="borderRight"></div><div class="borderBottom"></div><div class="borderLeft"></div></div><div class="element"></div>';return this._parentElement.classList.add(this._className||"box-model"),this._parentElement.innerHTML=e,this._appendTo?this._appendTo.appendChild(this._parentElement):document.body.appendChild(this._parentElement),t=this._buildNodeReferences(this._parentElement.childNodes),t.wrapper.setAttribute("style","position: absolute; pointer-events: none;"),t.content.wrapper.setAttribute("style","position: relative; width: 100%; height: 100%; z-index: 200;"),t.margin.wrapper.setAttribute("style","position: absolute; top: 0; left: 0; z-index: 190;"),t.padding.wrapper.setAttribute("style","position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 195;"),t.border.wrapper.setAttribute("style","position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 195;"),[t.padding,t.margin,t.border].forEach(function(t){for(var e in t)"wrapper"!==e&&t[e].setAttribute("style","position: absolute; background-attachment: fixed;")}),t},t.prototype._buildNodeReferences=function(t,e){for(var i={wrapper:this._parentElement},o=0;o<t.length;o++){var p,r=t[o],s=r.childNodes;e?e[r.classList[0]]=r:s&&(p=i[r.classList[0]]={},p.wrapper=r,this._buildNodeReferences(s,p))}return i},t.prototype._calculatePadding=function(){var t=this.boxModel.padding,e=this.boxModel.border,i=this.boxModel.content,o=this._elComputedStyles,p=this._elDimensions,r=parseFloat(o.borderLeftWidth),s=parseFloat(o.borderRightWidth),d=parseFloat(o.borderTopWidth),l=parseFloat(o.borderBottomWidth),a=parseFloat(o.paddingLeft),h=parseFloat(o.paddingRight),n=parseFloat(o.paddingTop),g=parseFloat(o.paddingBottom);i.wrapper.style.width=p.outerWidth-a-h-r-s+"px",i.wrapper.style.height=p.outerHeight-n-g-d-l+"px",i.wrapper.style.left=a+r+"px",i.wrapper.style.top=n+d+"px",i.wrapper.style["background-position"]=r+"px 0px",e.wrapper.style.width=p.outerWidth-a-h+"px",e.wrapper.style.height=p.outerHeight-n-g+"px",e.wrapper.style.left=a+"px",e.wrapper.style.top=n+"px",e.wrapper.style["background-position"]=r+"px 0px",t.wrapper.style.width=p.outerWidth+"px",t.wrapper.style.height=p.outerHeight+"px",t.wrapper.style.left="0px",t.wrapper.style.top="0px",t.wrapper.style["background-position"]=r+"px 0px",e.borderTop.style.height=d+"px",e.borderTop.style.width=p.outerWidth-a-h+"px",e.borderTop.style.top="0px",e.borderTop.style.left="0px",e.borderRight.style.height=p.outerHeight-n-g-d-l+"px",e.borderRight.style.width=s+"px",e.borderRight.style.top=d+"px",e.borderRight.style.right="0px",e.borderBottom.style.height=l+"px",e.borderBottom.style.width=p.outerWidth-a-h+"px",e.borderBottom.style.left="0px",e.borderBottom.style.bottom="0px",e.borderLeft.style.height=p.outerHeight-n-g-d-l+"px",e.borderLeft.style.width=r+"px",e.borderLeft.style.top=d+"px",e.borderLeft.style.left="0px",t.paddingTop.style.height=n+"px",t.paddingTop.style.width=p.outerWidth+"px",t.paddingTop.style.top="0px",t.paddingTop.style.left="0px",t.paddingRight.style.height=p.outerHeight-n-g+"px",t.paddingRight.style.width=h+"px",t.paddingRight.style.top=n+"px",t.paddingRight.style.right="0px",t.paddingBottom.style.height=g+"px",t.paddingBottom.style.width=p.outerWidth+"px",t.paddingBottom.style.bottom="0px",t.paddingBottom.style.left="0px",t.paddingLeft.style.height=p.outerHeight-n-g+"px",t.paddingLeft.style.width=a+"px",t.paddingLeft.style.top=n+"px",t.paddingLeft.style.left="0px"},t.prototype._calculateMargin=function(){var t=this.boxModel.margin,e=this._elComputedStyles,i=this._elDimensions,o=parseFloat(e.marginLeft),p=parseFloat(e.marginRight),r=parseFloat(e.marginTop),s=parseFloat(e.marginBottom);t.wrapper.style.width=i.outerWidth+o+p+"px",t.wrapper.style.height=i.outerHeight+r+s+"px",t.wrapper.style.left=o*-1+"px",t.wrapper.style.top=r*-1+"px",t.marginTop.style.height=r+"px",t.marginTop.style.width=i.outerWidth+o+p+"px",t.marginRight.style.height=i.outerHeight+"px",t.marginRight.style.width=p+"px",t.marginRight.style.top=r+"px",t.marginRight.style.right="0px",t.marginBottom.style.height=s+"px",t.marginBottom.style.width=i.outerWidth+o+p+"px",t.marginBottom.style.bottom="0px",t.marginLeft.style.height=i.outerHeight+"px",t.marginLeft.style.width=o+"px",t.marginLeft.style.top=r+"px"},t.prototype.setElement=function(t){return this.el=t,this._elComputedStyles=window.getComputedStyle(t),this.refresh(),this},t.prototype.hide=function(){return this.boxModel.hidden=!0,this.boxModel.wrapper.style.display="none",this},t.prototype.show=function(){return this.boxModel.hidden=!1,this.refresh(),this},t.prototype.refresh=function(){if(!this.boxModel.hidden){var t=this.el,e={offset:{left:t.offsetLeft,top:t.offsetTop},width:t.clientWidth,height:t.clientHeight,outerHeight:t.offsetHeight,outerWidth:t.offsetWidth};return this._elDimensions=e,this.boxModel.wrapper.style.display="block",this.boxModel.wrapper.style.left=e.offset.left+"px",this.boxModel.wrapper.style.top=e.offset.top+"px",this.boxModel.wrapper.style.height=e.outerHeight+"px",this.boxModel.wrapper.style.width=e.outerWidth+"px",this._calculatePadding(),this._calculateMargin(),this}},t});
