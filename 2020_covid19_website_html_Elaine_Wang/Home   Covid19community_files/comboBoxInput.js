define("comboBoxInput",["lodash","santa-components","componentsCore","prop-types","skins","textCommon"],function(e,t,o,r,i,l){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(r,i,function(t){return e[t]}.bind(null,i));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=414)}({0:function(t,o){t.exports=e},2:function(e,o){e.exports=t},25:function(e,t){e.exports=l},3:function(e,t){e.exports=o},4:function(e,t){e.exports=r},414:function(e,t,o){var r,i;r=[o(2),o(0),o(4),o(25),o(5),o(415),o(3)],void 0===(i=function(e,t,o,r,i,l,a){"use strict";var n=r.labelUtils;function d(t){return e.utils.createReactElement("option",{value:t.value,default:t.default,style:t.style,ref:t.ref||t.value,disabled:t.disabled,key:t.key},t.text)}function s(e,o,r,i){var l,a=!1,n=t.map(e,function(e,o){return a=a||e.value===r,d(t.assign({default:e.value===r,key:o},e))});return l=o?t.assign({disabled:!0,default:!a,style:{display:"none"},className:i,ref:"placeholder",key:"placeholder-".concat(o.value)},o,{value:""}):{default:!a,style:{display:"none"},className:i,text:"",value:"",ref:"placeholder",key:"noPlaceholder"},n.unshift(d(l)),n}function c(e){return t.get(e,["compProp","placeholder","value"])}function p(e){return function(e){return e.compData.value===c(e)}(e)?"":e.compData.value}var b=function(t){return e.mixins.validatableMixin.getPublicState(t)};function w(e){return{$validity:e.errorMessage?"invalid":"valid"}}var h={displayName:"ComboBoxInput",mixins:[a.mixins.skinBasedComp,e.mixins.runTimeCompData,r.textScaleMixin,e.mixins.inputFocusMixin,e.mixins.validatableMixin.validatable,e.mixins.compStateMixin(b)],propTypes:{compData:e.santaTypesDefinitions.Component.compData.isRequired,compProp:e.santaTypesDefinitions.Component.compProp.isRequired,componentViewMode:e.santaTypesDefinitions.RenderFlags.componentViewMode,onSelectionChange:o.func,shouldResetComponent:e.santaTypesDefinitions.RenderFlags.shouldResetComponent,errorMessage:o.bool,isMobileView:e.santaTypesDefinitions.isMobileView},statics:{behaviors:t.assign({},e.mixins.inputFocusMixin.INPUT_FOCUS_BEHAVIORS,e.mixins.validatableMixin.VALIDATABLE_BEHAVIORS)},focus:function(){this.refs.collection.focus()},blur:function(){this.refs.collection.blur()},getInitialState:function(){return this.shouldResetComponent=this.props.shouldResetComponent,t.assign(w(this.props),b(),{value:p(this.props),defaultValue:this.props.compData.value,placeholderValue:c(this.props)})},setCustomValidity:function(e){this.refs.collection.setCustomValidity(e)},componentWillReceiveProps:function(e){e.shouldResetComponent&&e.shouldResetComponent!==this.shouldResetComponent&&this.hideValidityIndication();var t=w(e),o=e.compData.value!==this.state.value,r=c(e)!==this.state.placeholderValue;(o||r||this.props.onSelectionChange)&&(t.value=p(e)),this.shouldResetComponent=e.shouldResetComponent,this.setState(t)},onChange:function(e,o){var r=e.target.value;this.updateData({value:r}),this.props.onSelectionChange?(e.type="selectionChanged",e.payload=t.find(this.props.compData.options,{value:r})||{},this.props.onSelectionChange(e,o)):this.setState({value:r||""}),this.handleAction("change",e)},onFocus:function(e){this.handleAction("focus",e)},onBlur:function(e){this.handleAction("blur",e)},getPlaceholderClass:function(){return this.isPlaceholderSelected()?this.classSet({"extended-placeholder-style":!0}):""},getCollectionClassName:function(){var e={};return this.props.compProp.collectionClass&&(e[this.props.compProp.collectionClass]=!0),[this.getPlaceholderClass(),"has-custom-focus",this.classSet(e)].join(" ")},getSkinProperties:function(){var e=this.props,o=e.compProp,r=e.isMobileView,i=e.compData,l=e.compTheme,a={"with-validation-indication":this.shouldShowValidityIndication(),required:n.showRequired(i,o,l)};a["".concat(this.props.compProp.textAlignment,"-direction")]=!0,this.props.compProp.class&&(a[this.props.compProp.class]=!0);var d={};d["padding".concat(t.capitalize(this.props.compProp.textAlignment))]=this.props.compProp.textPadding;var c=this.props.compData.options,p={compId:this.props.id,inputId:"collection"};return t.merge(n.getBaseInputWithLabelSkinProperties({compProp:o,rawFontSyle:this.getFontSize("fntlbl"),isMobileView:r,compData:i,id:p}),{"":{className:this.classSet(a),"data-disabled":!!this.props.compProp.isDisabled,"data-preview":t.isFunction(this.getComponentPreviewState)&&this.getComponentPreviewState()},collection:{disabled:!!t.get(this.props,"compProp.isDisabled"),children:s(c,this.props.compData.placeholder||this.props.compProp.placeholder,this.state.defaultValue,this.classSet({"placeholder-style":!0})),value:this.state.value,required:this.props.compProp.required,onChange:this.onChange,onFocus:this.onFocus,onBlur:this.onBlur,style:t.merge(d,this.getFontSize()),className:this.getCollectionClassName(),"data-preview":t.isFunction(this.getComponentPreviewState)&&this.getComponentPreviewState()},errorMessage:{children:[this.props.errorMessage]}})},measureComponent:function(e,t){var o=this.refs,r=o.icon,i=o.collection,l=o.label,a=r.getBBox().height+16,d=parseInt(t(i).css("line-height"),10)||0,s=2*(parseInt(t(i).css("border-width"),10)||0),c=Math.max(d,a)+s+l.offsetHeight,p=n.measureComponentWithLabel(this.props.compProp,l,this.props.compData,this.props.isMobileView),b=p?Math.max(p,c):Math.max(i.offsetHeight,c);return[{node:e,type:"css",changes:{width:Math.max(e.offsetWidth,i.offsetWidth),minHeight:c,height:b}}]},isPlaceholderSelected:function(){var e=t.get(this.props.compData,"placeholder.value")||t.get(this.props.compProp,"placeholder.value");return function(e,t){return e.value===t}(this.state,e)||function(e,t){return t&&""===e.value}(this.state,e)}};return a.compRegistrar.register("wysiwyg.viewer.components.inputs.ComboBoxInput",h),i.skinsMap.addBatch(l),h}.apply(t,r))||(e.exports=i)},415:function(e,t,o){var r,i,l;"undefined"!=typeof self&&self,i=[],void 0===(l="function"==typeof(r=function(){"use strict";var e={ComboBoxInputSkin:{react:[["label","label",[],{}],["div",null,["_selector-wrapper"],{},["select","collection",[],{}],["div","arrow",[],{},["div",null,["_svg_container"],{},["svg","icon",[],{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 9.2828 4.89817"},["defs",null,[],{}],["title",null,[],{},"arrow&amp;v"],["path",null,["_cls-1"],{d:"M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z"}]]]]]],params:{brwe:"BORDER_SIZES",brde:"BORDER_COLOR_ALPHA",bge:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",shd:"BOX_SHADOW",fnt:"FONT",bg:"BG_COLOR_ALPHA",txt:"TEXT_COLOR",brw:"BORDER_SIZES",brd:"BORDER_COLOR_ALPHA",txt2:"TEXT_COLOR",txt_placeholder:"TEXT_COLOR",brwh:"BORDER_SIZES",brdh:"BORDER_COLOR_ALPHA",bgh:"BG_COLOR_ALPHA",brwf:"BORDER_SIZES",brdf:"BORDER_COLOR_ALPHA",bgf:"BG_COLOR_ALPHA",brdd:"BORDER_COLOR_ALPHA",txtd:"TEXT_COLOR",bgd:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA",fntlbl:"FONT",txtlbl:"TEXT_COLOR",txtlblrq:"COLOR_ALPHA"},paramsDefaults:{brwe:"2px",brde:"#F9F9F9",bge:"color_8",rd:"5px",shd:"0 0 0 rgba(0, 0, 0, 0)",fnt:"font_7",bg:"color_8",txt:"#888888",brw:"2px",brd:"#F9F9F9",txt2:"color_15",txt_placeholder:"#888888",brwh:"2px",brdh:"#F9F9F9",bgh:"color_8",brwf:"2px",brdf:"#F9F9F9",bgf:"color_8",brdd:"#CCCCCC",txtd:"#FFFFFF",bgd:"#CCCCCC",arrowColor:"color_12",fntlbl:"font_8",txtlbl:"color_15",txtlblrq:"transparent"},css:{'%_with-validation-indication select:not([data-preview~="focus"]):invalid':"[brwe]  border-style:solid;border-color:[brde];background-color:[bge];","%":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;","% select":"[rd]  -webkit-appearance:none;-moz-appearance:none;[shd]  [fnt]  background-color:[bg];color:[txt];[brw]  border-style:solid;border-color:[brd];margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;","% select option":"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;","% select%_placeholder-style":"color:[txt2];","% select%_extended-placeholder-style":"color:[txt_placeholder];","% select:-moz-focusring":"color:transparent;text-shadow:0 0 0 #000;","% select::-ms-expand":"display:none;","% select:focus::-ms-value":"background:transparent;",'% select:not(%_mobileCollection):hover,% select:not(%_mobileCollection)[data-preview~="hover"]':"[brwh]  border-style:solid;border-color:[brdh];background-color:[bgh];",'% select:not(%_mobileCollection):focus,% select:not(%_mobileCollection)[data-preview~="focus"]':"[brwf]  border-style:solid;border-color:[brdf];background-color:[bgf];",'% select:not(%_mobileCollection)[data-error="true"],% select:not(%_mobileCollection)[data-preview~="error"]':"[brwe]  border-style:solid;border-color:[brde];background-color:[bge];",'% select:not(%_mobileCollection):disabled,% select:not(%_mobileCollection)[data-disabled="true"],% select:not(%_mobileCollection)[data-preview~="disabled"]':"border-width:2px;border-color:[brdd];color:[txtd];background-color:[bgd];",'% select:not(%_mobileCollection):disabled + %arrow,% select:not(%_mobileCollection)[data-disabled="true"] + %arrow,% select:not(%_mobileCollection)[data-preview~="disabled"] + %arrow':"border-width:2px;border-color:[brdd];color:[txtd];border:none;","%arrow":"position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;","%arrow %_svg_container":"width:12px;","%arrow %_svg_container svg":"height:100%;fill:[arrowColor];","%_left-direction":"text-align-last:left;",'%_left-direction %arrow,%_left-direction select:hover + %arrow,%_left-direction select[data-preview~="hover"] + %arrow,%_left-direction select:focus + %arrow,%_left-direction select[data-preview~="focus"] + %arrow,%_left-direction[data-preview~="focus"] %arrow,%_left-direction select[data-error="true"] + %arrow,%_left-direction select[data-preview~="error"] + %arrow':"border-left:0;","%_left-direction %arrow":"right:0;","%_right-direction":"text-align-last:right;direction:rtl;",'%_right-direction %arrow,%_right-direction select:hover + %arrow,%_right-direction select[data-preview~="hover"] + %arrow,%_right-direction select:focus + %arrow,%_right-direction select[data-preview~="focus"] + %arrow,%_right-direction[data-preview~="focus"] %arrow,%_right-direction select[data-error="true"] + %arrow,%_right-direction select[data-preview~="error"] + %arrow':"border-right:0;","%_right-direction %arrow":"left:0;","%_center-direction":"text-align-last:left;text-align-last:center;",'%_center-direction %arrow,%_center-direction select:hover + %arrow,%_center-direction select[data-preview~="hover"] + %arrow,%_center-direction select:focus + %arrow,%_center-direction select[data-preview~="focus"] + %arrow,%_center-direction[data-preview~="focus"] %arrow,%_center-direction select[data-error="true"] + %arrow,%_center-direction select[data-preview~="error"] + %arrow':"border-left:0;","%_center-direction %arrow":"right:0;","%_mobileMenuContainer":"border:0;","%_mobileMenuContainer %arrow %_svg_container %icon":"fill:[txt];","%label":"[fntlbl]  color:[txtlbl];word-break:break-word;display:inline-block;line-height:1;","%_required %label::after":'content:" *";color:[txtlblrq];',"%_selector-wrapper":"-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;"}},MembersComboBoxInputSkin:{react:[["label","label",[],{}],["div",null,["_selector-wrapper"],{},["select","collection",[],{}],["div","arrow",[],{},["div",null,["_svg_container"],{},["svg","icon",[],{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 9.2828 4.89817"},["defs",null,[],{}],["title",null,[],{},"arrow&amp;v"],["path",null,["_cls-1"],{d:"M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z"}]]]]]],params:{brwe:"BORDER_SIZES",brde:"BORDER_COLOR_ALPHA",bge:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",shd:"BOX_SHADOW",fnt:"FONT",bg:"BG_COLOR_ALPHA",txt:"TEXT_COLOR",txt2:"TEXT_COLOR",txt_placeholder:"TEXT_COLOR",brwh:"BORDER_SIZES",brdh:"BORDER_COLOR_ALPHA",bgh:"BG_COLOR_ALPHA",brwf:"BORDER_SIZES",brdf:"BORDER_COLOR_ALPHA",bgf:"BG_COLOR_ALPHA",brdd:"BORDER_COLOR_ALPHA",txtd:"TEXT_COLOR",bgd:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA",fntlbl:"FONT",txtlbl:"TEXT_COLOR",txtlblrq:"COLOR_ALPHA"},paramsDefaults:{brwe:"2px",brde:"#F9F9F9",bge:"color_8",rd:"5px",shd:"0 0 0 rgba(0, 0, 0, 0)",fnt:"font_7",bg:"color_8",txt:"#888888",txt2:"color_15",txt_placeholder:"#888888",brwh:"2px",brdh:"#F9F9F9",bgh:"color_8",brwf:"2px",brdf:"#F9F9F9",bgf:"color_8",brdd:"#CCCCCC",txtd:"#FFFFFF",bgd:"#CCCCCC",arrowColor:"color_12",fntlbl:"font_8",txtlbl:"color_15",txtlblrq:"transparent"},css:{'%_with-validation-indication select:not([data-preview~="focus"]):invalid':"[brwe]  border-style:solid;border-color:[brde];background-color:[bge];","%":"display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;","% select":"[rd]  -webkit-appearance:none;-moz-appearance:none;[shd]  [fnt]  background-color:[bg];color:[txt];border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-width:1px;border-left-width:0px;border-right-width:0px;margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;","% select option":"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;","% select%_placeholder-style":"color:[txt2];","% select%_extended-placeholder-style":"color:[txt_placeholder];","% select:-moz-focusring":"color:transparent;text-shadow:0 0 0 #000;","% select::-ms-expand":"display:none;","% select:focus::-ms-value":"background:transparent;",'% select:not(%_mobileCollection):hover,% select:not(%_mobileCollection)[data-preview~="hover"]':"[brwh]  border-style:solid;border-color:[brdh];background-color:[bgh];",'% select:not(%_mobileCollection):focus,% select:not(%_mobileCollection)[data-preview~="focus"]':"[brwf]  border-style:solid;border-color:[brdf];background-color:[bgf];",'% select:not(%_mobileCollection)[data-error="true"],% select:not(%_mobileCollection)[data-preview~="error"]':"[brwe]  border-style:solid;border-color:[brde];background-color:[bge];",'% select:not(%_mobileCollection):disabled,% select:not(%_mobileCollection)[data-disabled="true"],% select:not(%_mobileCollection)[data-preview~="disabled"]':"border-width:2px;border-color:[brdd];color:[txtd];background-color:[bgd];",'% select:not(%_mobileCollection):disabled + %arrow,% select:not(%_mobileCollection)[data-disabled="true"] + %arrow,% select:not(%_mobileCollection)[data-preview~="disabled"] + %arrow':"border-width:2px;border-color:[brdd];color:[txtd];border:none;","%arrow":"position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-left-width:1px;","%arrow %_svg_container":"width:12px;","%arrow %_svg_container svg":"height:100%;fill:[arrowColor];","%_left-direction":"text-align-last:left;",'%_left-direction %arrow,%_left-direction select:hover + %arrow,%_left-direction select[data-preview~="hover"] + %arrow,%_left-direction select:focus + %arrow,%_left-direction select[data-preview~="focus"] + %arrow,%_left-direction[data-preview~="focus"] %arrow,%_left-direction select[data-error="true"] + %arrow,%_left-direction select[data-preview~="error"] + %arrow':"border-right:0;","%_left-direction %arrow":"right:0;border-left-width:1px;","%_right-direction":"text-align-last:right;direction:rtl;",'%_right-direction %arrow,%_right-direction select:hover + %arrow,%_right-direction select[data-preview~="hover"] + %arrow,%_right-direction select:focus + %arrow,%_right-direction select[data-preview~="focus"] + %arrow,%_right-direction[data-preview~="focus"] %arrow,%_right-direction select[data-error="true"] + %arrow,%_right-direction select[data-preview~="error"] + %arrow':"border-left:0;","%_right-direction %arrow":"left:0;border-right-width:1px;","%_center-direction":"text-align-last:left;text-align-last:center;",'%_center-direction %arrow,%_center-direction select:hover + %arrow,%_center-direction select[data-preview~="hover"] + %arrow,%_center-direction select:focus + %arrow,%_center-direction select[data-preview~="focus"] + %arrow,%_center-direction[data-preview~="focus"] %arrow,%_center-direction select[data-error="true"] + %arrow,%_center-direction select[data-preview~="error"] + %arrow':"border-right:0;","%_center-direction %arrow":"right:0;border-left-width:1px;","%_mobileMenuContainer":"border:0;","%_mobileMenuContainer %arrow %_svg_container %icon":"fill:[txt];","%label":"[fntlbl]  color:[txtlbl];word-break:break-word;display:inline-block;line-height:1;","%_required %label::after":'content:" *";color:[txtlblrq];',"%_selector-wrapper":"-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;"}},ResponsiveComboBoxInputSkin:{react:[["div",null,["_selector-wrapper"],{},["select","collection",[],{}],["div","arrow",[],{},["div",null,["_svg_container"],{},["svg","icon",[],{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 9.2828 4.89817"},["defs",null,[],{}],["title",null,[],{},"arrow&amp;v"],["path",null,["_cls-1"],{d:"M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z"}]]]]]],params:{brwe:"BORDER_SIZES",brde:"BORDER_COLOR_ALPHA",bge:"BG_COLOR_ALPHA",rd:"BORDER_RADIUS",shd:"BOX_SHADOW",fnt:"FONT",bg:"BG_COLOR_ALPHA",txt:"TEXT_COLOR",brw:"BORDER_SIZES",brd:"BORDER_COLOR_ALPHA",txt2:"TEXT_COLOR",txt_placeholder:"TEXT_COLOR",brwh:"BORDER_SIZES",brdh:"BORDER_COLOR_ALPHA",bgh:"BG_COLOR_ALPHA",brwf:"BORDER_SIZES",brdf:"BORDER_COLOR_ALPHA",bgf:"BG_COLOR_ALPHA",brdd:"BORDER_COLOR_ALPHA",txtd:"TEXT_COLOR",bgd:"BG_COLOR_ALPHA",arrowColor:"BG_COLOR_ALPHA"},paramsDefaults:{brwe:"2px",brde:"#F9F9F9",bge:"color_8",rd:"5px",shd:"0 0 0 rgba(0, 0, 0, 0)",fnt:"font_7",bg:"color_8",txt:"#888888",brw:"2px",brd:"#F9F9F9",txt2:"color_15",txt_placeholder:"#888888",brwh:"2px",brdh:"#F9F9F9",bgh:"color_8",brwf:"2px",brdf:"#F9F9F9",bgf:"color_8",brdd:"#CCCCCC",txtd:"#FFFFFF",bgd:"#CCCCCC",arrowColor:"color_12"},css:{'%_with-validation-indication select:not([data-preview~="focus"]):invalid':"[brwe]  border-style:solid;border-color:[brde];background-color:[bge];","% select":"[rd]  -webkit-appearance:none;-moz-appearance:none;[shd]  [fnt]  background-color:[bg];color:[txt];[brw]  border-style:solid;border-color:[brd];margin:0;padding:0 45px;cursor:pointer;position:relative;width:100%;text-overflow:ellipsis;white-space:nowrap;display:block;grid-area:1/1/2/2;","% select option":"text-overflow:ellipsis;white-space:nowrap;overflow:hidden;","% select%_placeholder-style":"color:[txt2];","% select%_extended-placeholder-style":"color:[txt_placeholder];","% select:-moz-focusring":"color:transparent;text-shadow:0 0 0 #000;","% select::-ms-expand":"display:none;","% select:focus::-ms-value":"background:transparent;",'% select:not(%_mobileCollection):hover,% select:not(%_mobileCollection)[data-preview~="hover"]':"[brwh]  border-style:solid;border-color:[brdh];background-color:[bgh];",'% select:not(%_mobileCollection):focus,% select:not(%_mobileCollection)[data-preview~="focus"]':"[brwf]  border-style:solid;border-color:[brdf];background-color:[bgf];",'% select:not(%_mobileCollection)[data-error="true"],% select:not(%_mobileCollection)[data-preview~="error"]':"[brwe]  border-style:solid;border-color:[brde];background-color:[bge];",'% select:not(%_mobileCollection):disabled,% select:not(%_mobileCollection)[data-disabled="true"],% select:not(%_mobileCollection)[data-preview~="disabled"]':"border-width:2px;border-color:[brdd];color:[txtd];background-color:[bgd];",'% select:not(%_mobileCollection):disabled + %arrow,% select:not(%_mobileCollection)[data-disabled="true"] + %arrow,% select:not(%_mobileCollection)[data-preview~="disabled"] + %arrow':"border-width:2px;border-color:[brdd];color:[txtd];border:none;","%arrow":"position:relative;pointer-events:none;box-sizing:border-box;padding-left:20px;padding-right:20px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;grid-area:1/1/2/2;justify-self:end;","%arrow %_svg_container":"width:12px;","%arrow %_svg_container svg":"height:100%;fill:[arrowColor];","%_left-direction":"text-align-last:left;",'%_left-direction %arrow,%_left-direction select:hover + %arrow,%_left-direction select[data-preview~="hover"] + %arrow,%_left-direction select:focus + %arrow,%_left-direction select[data-preview~="focus"] + %arrow,%_left-direction[data-preview~="focus"] %arrow,%_left-direction select[data-error="true"] + %arrow,%_left-direction select[data-preview~="error"] + %arrow':"border-left:0;","%_left-direction %arrow":"right:0;","%_right-direction":"text-align-last:right;",'%_right-direction %arrow,%_right-direction select:hover + %arrow,%_right-direction select[data-preview~="hover"] + %arrow,%_right-direction select:focus + %arrow,%_right-direction select[data-preview~="focus"] + %arrow,%_right-direction[data-preview~="focus"] %arrow,%_right-direction select[data-error="true"] + %arrow,%_right-direction select[data-preview~="error"] + %arrow':"border-right:0;","%_right-direction %arrow":"left:0;justify-self:start;","%_center-direction":"text-align-last:left;text-align-last:center;",'%_center-direction %arrow,%_center-direction select:hover + %arrow,%_center-direction select[data-preview~="hover"] + %arrow,%_center-direction select:focus + %arrow,%_center-direction select[data-preview~="focus"] + %arrow,%_center-direction[data-preview~="focus"] %arrow,%_center-direction select[data-error="true"] + %arrow,%_center-direction select[data-preview~="error"] + %arrow':"border-left:0;","%_center-direction %arrow":"right:0;","%_mobileMenuContainer":"border:0;","%_mobileMenuContainer %arrow %_svg_container %icon":"fill:[txt];","%_selector-wrapper":"position:absolute;top:0;right:0;bottom:0;left:0;display:grid;grid-template-columns:1fr;grid-template-rows:1fr;"}},"wysiwyg.viewer.skins.appinputs.AppsComboBoxInputSkin":{react:[["select","collection",[],{}],["p","errorMessage",[],{}]],params:{txt:"TEXT_COLOR",brw:"BORDER_SIZE",brd:"BORDER_COLOR",rd:"BORDER_RADIUS",bg:"BG_COLOR_ALPHA",bg2:"BG_COLOR_ALPHA"},paramsDefaults:{txt:"#333",brw:"2px",brd:"#1ab1ab",rd:"5px",bg:"#fff",bg2:"#aaa"},css:{"%":"position:relative;display:inline-block;padding:0;margin:0;","% select":"color:[txt];border:solid [brw] [brd];padding:5px 40px 5px 5px;[rd]  box-sizing:border-box !important;-webkit-appearance:none;-moz-appearance:none;background-color:[bg];position:relative;cursor:pointer;","% option":"border:solid [brw] [brd];background-color:[bg];padding:5px;","%:after":'content:"?";position:absolute;top:2px;bottom:2px;right:0;width:35px;pointer-events:none;[rd]  box-sizing:border-box !important;background-color:[bg2];border:[brw] solid [brd];color:#fff;text-align:center;font-size:10px;line-height:30px;text-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.6);cursor:pointer !important;border-bottom-left-radius:0;border-top-left-radius:0;','%[data-state~="invalid"] select':"border-color:#d00;color:#d00;",'%[data-state~="invalid"]:after':'content:"?";position:absolute;top:2px;bottom:2px;right:0;width:35px;pointer-events:none;[rd]  box-sizing:border-box !important;background-color:[bg2];border:#d00 solid [brd];color:#d00;text-align:center;font-size:10px;line-height:30px;text-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.6);cursor:pointer !important;border-bottom-left-radius:0;border-top-left-radius:0;','%[data-state~="invalid"]:hover + p':"opacity:1;color:#d00;","% p":"[rd]  opacity:0;display:inline-block;position:absolute;left:0;bottom:100%;width:140px;padding:10px;font-size:13px;line-height:16px;background:#fff;box-shadow:0 1px 3px rgba(0, 0, 0, 0.6);","% p:after":'content:"?";position:absolute;bottom:-12px;left:10px;color:#fff;text-shadow:0 1px 3px rgba(0, 0, 0, 0.6);[rd]'}},"wysiwyg.viewer.skins.appinputs.AppsComboBoxInputSkinNoValidation":{react:[["select","collection",[],{}]],params:{txt:"TEXT_COLOR",brw:"BORDER_SIZE",brd:"BORDER_COLOR",rd:"BORDER_RADIUS",bg:"BG_COLOR_ALPHA",bg2:"BG_COLOR_ALPHA"},paramsDefaults:{txt:"#333",brw:"2px",brd:"#1ab1ab",rd:"5px",bg:"#fff",bg2:"#aaa"},css:{"%":"position:relative;display:inline-block;padding:0;margin:0;","% select":"color:[txt];border:solid [brw] [brd];padding:5px 40px 5px 5px;[rd]  box-sizing:border-box !important;-webkit-appearance:none;-moz-appearance:none;background-color:[bg];position:relative;cursor:pointer;","% option":"border:solid [brw] [brd];background-color:[bg];padding:5px;","%:after":'content:"▼";position:absolute;top:3px;bottom:3px;right:0;width:35px;pointer-events:none;[rd]  box-sizing:border-box !important;background-color:[bg2];border:[brw] solid [brd];color:#fff;text-align:center;font-size:10px;line-height:30px;text-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.6);cursor:pointer !important;border-bottom-left-radius:0;border-top-left-radius:0;'}},"wysiwyg.viewer.skins.input.ComboBoxInputSkin":{react:[["select","collection",[],{}],["p","errorMessage",[],{}]],params:{txt:"TEXT_COLOR",brw:"BORDER_SIZE",brd:"BORDER_COLOR",rd:"BORDER_RADIUS",bg:"BG_COLOR_ALPHA",bg2:"BG_COLOR_ALPHA"},paramsDefaults:{txt:"#333",brw:"2px",brd:"#1ab1ab",rd:"5px",bg:"#fff",bg2:"#aaa"},css:{"%":"position:relative;display:inline-block;padding:0;margin:0;","% select":"color:[txt];border:solid [brw] [brd];padding:5px 40px 5px 5px;[rd]  box-sizing:border-box !important;-webkit-appearance:none !important;-moz-appearance:none !important;background-color:[bg];position:relative;cursor:pointer;","% option":"border:solid [brw] [brd];background-color:[bg];padding:5px;","%:after":'content:"▼";position:absolute;top:2px;bottom:2px;right:0;width:35px;pointer-events:none;[rd]  box-sizing:border-box !important;background-color:[bg2];border:[brw] solid [brd];color:#fff;text-align:center;font-size:10px;line-height:30px;text-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.6);cursor:pointer !important;border-bottom-left-radius:0;border-top-left-radius:0;','%[data-state~="invalid"] select':"border-color:#d00;color:#d00;",'%[data-state~="invalid"]:after':'content:"▼";position:absolute;top:2px;bottom:2px;right:0;width:35px;pointer-events:none;[rd]  box-sizing:border-box !important;background-color:[bg2];border:#d00 solid [brd];color:#d00;text-align:center;font-size:10px;line-height:30px;text-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.6);cursor:pointer !important;border-bottom-left-radius:0;border-top-left-radius:0;','%[data-state~="invalid"]:hover + p':"opacity:1;color:#d00;","% p":"[rd]  opacity:0;display:inline-block;position:absolute;left:0;bottom:100%;width:140px;padding:10px;font-size:13px;line-height:16px;background:#fff;box-shadow:0 1px 3px rgba(0, 0, 0, 0.6);","% p:after":'content:"▼";position:absolute;bottom:-12px;left:10px;color:#fff;text-shadow:0 1px 3px rgba(0, 0, 0, 0.6);[rd]'}}};return e})?r.apply(t,i):r)||(e.exports=l)},5:function(e,t){e.exports=i}})});
//# sourceMappingURL=comboBoxInput.min.js.map