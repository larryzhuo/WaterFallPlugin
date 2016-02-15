!function(undefined){String.prototype.trim===undefined&&(String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}),Array.prototype.reduce===undefined&&(Array.prototype.reduce=function(fun){if(void 0===this||null===this)throw new TypeError;var accumulator,t=Object(this),len=t.length>>>0,k=0;if("function"!=typeof fun)throw new TypeError;if(0==len&&1==arguments.length)throw new TypeError;if(arguments.length>=2)accumulator=arguments[1];else for(;;){if(k in t){accumulator=t[k++];break}if(++k>=len)throw new TypeError}for(;len>k;)k in t&&(accumulator=fun.call(undefined,accumulator,t[k],k,t)),k++;return accumulator})}();var Zepto=function(){function isFunction(value){return"[object Function]"==toString.call(value)}function isObject(value){return value instanceof Object}function isPlainObject(value){var key,ctor;if("[object Object]"!==toString.call(value))return!1;if(ctor=isFunction(value.constructor)&&value.constructor.prototype,!ctor||!hasOwnProperty.call(ctor,"isPrototypeOf"))return!1;for(key in value);return key===undefined||hasOwnProperty.call(value,key)}function isArray(value){return value instanceof Array}function likeArray(obj){return"number"==typeof obj.length}function compact(array){return array.filter(function(item){return item!==undefined&&null!==item})}function flatten(array){return array.length>0?[].concat.apply([],array):array}function dasherize(str){return str.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function classRE(name){return name in classCache?classCache[name]:classCache[name]=new RegExp("(^|\\s)"+name+"(\\s|$)")}function maybeAddPx(name,value){return"number"!=typeof value||cssNumber[dasherize(name)]?value:value+"px"}function defaultDisplay(nodeName){var element,display;return elementDisplay[nodeName]||(element=document.createElement(nodeName),document.body.appendChild(element),display=getComputedStyle(element,"").getPropertyValue("display"),element.parentNode.removeChild(element),"none"==display&&(display="block"),elementDisplay[nodeName]=display),elementDisplay[nodeName]}function filtered(nodes,selector){return selector===undefined?$(nodes):$(nodes).filter(selector)}function funcArg(context,arg,idx,payload){return isFunction(arg)?arg.call(context,idx,payload):arg}function insert(operator,target,node){var parent=operator%2?target:target.parentNode;parent?parent.insertBefore(node,operator?1==operator?parent.firstChild:2==operator?target:null:target.nextSibling):$(node).remove()}function traverseNode(node,fun){fun(node);for(var key in node.childNodes)traverseNode(node.childNodes[key],fun)}var undefined,key,$,classList,camelize,uniq,emptyArray=[],slice=emptyArray.slice,document=window.document,elementDisplay={},classCache={},getComputedStyle=document.defaultView.getComputedStyle,cssNumber={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},fragmentRE=/^\s*<(\w+|!)[^>]*>/,elementTypes=[1,3,8,9,11],adjacencyOperators=["after","prepend","before","append"],table=document.createElement("table"),tableRow=document.createElement("tr"),containers={tr:document.createElement("tbody"),tbody:table,thead:table,tfoot:table,td:tableRow,th:tableRow,"*":document.createElement("div")},readyRE=/complete|loaded|interactive/,classSelectorRE=/^\.([\w-]+)$/,idSelectorRE=/^#([\w-]+)$/,tagSelectorRE=/^[\w-]+$/,toString={}.toString,zepto={},tempParent=document.createElement("div");return zepto.matches=function(element,selector){if(!element||1!==element.nodeType)return!1;var matchesSelector=element.webkitMatchesSelector||element.mozMatchesSelector||element.oMatchesSelector||element.matchesSelector;if(matchesSelector)return matchesSelector.call(element,selector);var match,parent=element.parentNode,temp=!parent;return temp&&(parent=tempParent).appendChild(element),match=~zepto.qsa(parent,selector).indexOf(element),temp&&tempParent.removeChild(element),match},camelize=function(str){return str.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():""})},uniq=function(array){return array.filter(function(item,idx){return array.indexOf(item)==idx})},zepto.fragment=function(html,name){name===undefined&&(name=fragmentRE.test(html)&&RegExp.$1),name in containers||(name="*");var container=containers[name];return container.innerHTML=""+html,$.each(slice.call(container.childNodes),function(){container.removeChild(this)})},zepto.Z=function(dom,selector){return dom=dom||[],dom.__proto__=arguments.callee.prototype,dom.selector=selector||"",dom},zepto.isZ=function(object){return object instanceof zepto.Z},zepto.init=function(selector,context){if(selector){if(isFunction(selector))return $(document).ready(selector);if(zepto.isZ(selector))return selector;var dom;if(isArray(selector))dom=compact(selector);else if(isPlainObject(selector))dom=[$.extend({},selector)],selector=null;else if(elementTypes.indexOf(selector.nodeType)>=0||selector===window)dom=[selector],selector=null;else if(fragmentRE.test(selector))dom=zepto.fragment(selector.trim(),RegExp.$1),selector=null;else{if(context!==undefined)return $(context).find(selector);dom=zepto.qsa(document,selector)}return zepto.Z(dom,selector)}return zepto.Z()},$=function(selector,context){return zepto.init(selector,context)},$.extend=function(target){return slice.call(arguments,1).forEach(function(source){for(key in source)source[key]!==undefined&&(target[key]=source[key])}),target},zepto.qsa=function(element,selector){var found;return element===document&&idSelectorRE.test(selector)?(found=element.getElementById(RegExp.$1))?[found]:emptyArray:1!==element.nodeType&&9!==element.nodeType?emptyArray:slice.call(classSelectorRE.test(selector)?element.getElementsByClassName(RegExp.$1):tagSelectorRE.test(selector)?element.getElementsByTagName(selector):element.querySelectorAll(selector))},$.isFunction=isFunction,$.isObject=isObject,$.isArray=isArray,$.isPlainObject=isPlainObject,$.inArray=function(elem,array,i){return emptyArray.indexOf.call(array,elem,i)},$.trim=function(str){return str.trim()},$.uuid=0,$.map=function(elements,callback){var value,i,key,values=[];if(likeArray(elements))for(i=0;i<elements.length;i++)value=callback(elements[i],i),null!=value&&values.push(value);else for(key in elements)value=callback(elements[key],key),null!=value&&values.push(value);return flatten(values)},$.each=function(elements,callback){var i,key;if(likeArray(elements)){for(i=0;i<elements.length;i++)if(callback.call(elements[i],i,elements[i])===!1)return elements}else for(key in elements)if(callback.call(elements[key],key,elements[key])===!1)return elements;return elements},$.fn={forEach:emptyArray.forEach,reduce:emptyArray.reduce,push:emptyArray.push,indexOf:emptyArray.indexOf,concat:emptyArray.concat,map:function(fn){return $.map(this,function(el,i){return fn.call(el,i,el)})},slice:function(){return $(slice.apply(this,arguments))},ready:function(callback){return readyRE.test(document.readyState)?callback($):document.addEventListener("DOMContentLoaded",function(){callback($)},!1),this},get:function(idx){return idx===undefined?slice.call(this):this[idx]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(callback){return this.forEach(function(el,idx){callback.call(el,idx,el)}),this},filter:function(selector){return $([].filter.call(this,function(element){return zepto.matches(element,selector)}))},add:function(selector,context){return $(uniq(this.concat($(selector,context))))},is:function(selector){return this.length>0&&zepto.matches(this[0],selector)},not:function(selector){var nodes=[];if(isFunction(selector)&&selector.call!==undefined)this.each(function(idx){selector.call(this,idx)||nodes.push(this)});else{var excludes="string"==typeof selector?this.filter(selector):likeArray(selector)&&isFunction(selector.item)?slice.call(selector):$(selector);this.forEach(function(el){excludes.indexOf(el)<0&&nodes.push(el)})}return $(nodes)},eq:function(idx){return-1===idx?this.slice(idx):this.slice(idx,+idx+1)},first:function(){var el=this[0];return el&&!isObject(el)?el:$(el)},last:function(){var el=this[this.length-1];return el&&!isObject(el)?el:$(el)},find:function(selector){var result;return result=1==this.length?zepto.qsa(this[0],selector):this.map(function(){return zepto.qsa(this,selector)}),$(result)},closest:function(selector,context){for(var node=this[0];node&&!zepto.matches(node,selector);)node=node!==context&&node!==document&&node.parentNode;return $(node)},parents:function(selector){for(var ancestors=[],nodes=this;nodes.length>0;)nodes=$.map(nodes,function(node){return(node=node.parentNode)&&node!==document&&ancestors.indexOf(node)<0?(ancestors.push(node),node):void 0});return filtered(ancestors,selector)},parent:function(selector){return filtered(uniq(this.pluck("parentNode")),selector)},children:function(selector){return filtered(this.map(function(){return slice.call(this.children)}),selector)},siblings:function(selector){return filtered(this.map(function(i,el){return slice.call(el.parentNode.children).filter(function(child){return child!==el})}),selector)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(property){return this.map(function(){return this[property]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=null),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=defaultDisplay(this.nodeName))})},replaceWith:function(newContent){return this.before(newContent).remove()},wrap:function(newContent){return this.each(function(){$(this).wrapAll($(newContent)[0].cloneNode(!1))})},wrapAll:function(newContent){return this[0]&&($(this[0]).before(newContent=$(newContent)),newContent.append(this)),this},unwrap:function(){return this.parent().each(function(){$(this).replaceWith($(this).children())}),this},clone:function(){return $(this.map(function(){return this.cloneNode(!0)}))},hide:function(){return this.css("display","none")},toggle:function(setting){return(setting===undefined?"none"==this.css("display"):setting)?this.show():this.hide()},prev:function(){return $(this.pluck("previousElementSibling"))},next:function(){return $(this.pluck("nextElementSibling"))},html:function(html){return html===undefined?this.length>0?this[0].innerHTML:null:this.each(function(idx){var originHtml=this.innerHTML;$(this).empty().append(funcArg(this,html,idx,originHtml))})},text:function(text){return text===undefined?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=text})},attr:function(name,value){var result;return"string"==typeof name&&value===undefined?0==this.length||1!==this[0].nodeType?undefined:"value"==name&&"INPUT"==this[0].nodeName?this.val():!(result=this[0].getAttribute(name))&&name in this[0]?this[0][name]:result:this.each(function(idx){if(1===this.nodeType)if(isObject(name))for(key in name)this.setAttribute(key,name[key]);else this.setAttribute(name,funcArg(this,value,idx,this.getAttribute(name)))})},removeAttr:function(name){return this.each(function(){1===this.nodeType&&this.removeAttribute(name)})},prop:function(name,value){return value===undefined?this[0]?this[0][name]:undefined:this.each(function(idx){this[name]=funcArg(this,value,idx,this[name])})},data:function(name,value){var data=this.attr("data-"+dasherize(name),value);return null!==data?data:undefined},val:function(value){return value===undefined?this.length>0?this[0].value:undefined:this.each(function(idx){this.value=funcArg(this,value,idx,this.value)})},offset:function(){if(0==this.length)return null;var obj=this[0].getBoundingClientRect();return{left:obj.left+window.pageXOffset,top:obj.top+window.pageYOffset,width:obj.width,height:obj.height}},css:function(property,value){if(value===undefined&&"string"==typeof property)return 0==this.length?undefined:this[0].style[camelize(property)]||getComputedStyle(this[0],"").getPropertyValue(property);var css="";for(key in property)"string"==typeof property[key]&&""==property[key]?this.each(function(){this.style.removeProperty(dasherize(key))}):css+=dasherize(key)+":"+maybeAddPx(key,property[key])+";";return"string"==typeof property&&(""==value?this.each(function(){this.style.removeProperty(dasherize(property))}):css=dasherize(property)+":"+maybeAddPx(property,value)),this.each(function(){this.style.cssText+=";"+css})},index:function(element){return element?this.indexOf($(element)[0]):this.parent().children().indexOf(this[0])},hasClass:function(name){return this.length<1?!1:classRE(name).test(this[0].className)},addClass:function(name){return this.each(function(idx){classList=[];var cls=this.className,newName=funcArg(this,name,idx,cls);newName.split(/\s+/g).forEach(function(klass){$(this).hasClass(klass)||classList.push(klass)},this),classList.length&&(this.className+=(cls?" ":"")+classList.join(" "))})},removeClass:function(name){return this.each(function(idx){return name===undefined?this.className="":(classList=this.className,funcArg(this,name,idx,classList).split(/\s+/g).forEach(function(klass){classList=classList.replace(classRE(klass)," ")}),void(this.className=classList.trim()))})},toggleClass:function(name,when){return this.each(function(idx){var newName=funcArg(this,name,idx,this.className);(when===undefined?!$(this).hasClass(newName):when)?$(this).addClass(newName):$(this).removeClass(newName)})}},["width","height"].forEach(function(dimension){$.fn[dimension]=function(value){var offset,Dimension=dimension.replace(/./,function(m){return m[0].toUpperCase()});return value===undefined?this[0]==window?window["inner"+Dimension]:this[0]==document?document.documentElement["offset"+Dimension]:(offset=this.offset())&&offset[dimension]:this.each(function(idx){var el=$(this);el.css(dimension,funcArg(this,value,idx,el[dimension]()))})}}),adjacencyOperators.forEach(function(key,operator){$.fn[key]=function(){var nodes=$.map(arguments,function(n){return isObject(n)?n:zepto.fragment(n)});if(nodes.length<1)return this;var size=this.length,copyByClone=size>1,inReverse=2>operator;return this.each(function(index,target){for(var i=0;i<nodes.length;i++){var node=nodes[inReverse?nodes.length-i-1:i];traverseNode(node,function(node){null==node.nodeName||"SCRIPT"!==node.nodeName.toUpperCase()||node.type&&"text/javascript"!==node.type||window.eval.call(window,node.innerHTML)}),copyByClone&&size-1>index&&(node=node.cloneNode(!0)),insert(operator,target,node)}})},$.fn[operator%2?key+"To":"insert"+(operator?"Before":"After")]=function(html){return $(html)[key](this),this}}),zepto.Z.prototype=$.fn,zepto.camelize=camelize,zepto.uniq=uniq,$.zepto=zepto,$}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function($){function zid(element){return element._zid||(element._zid=_zid++)}function findHandlers(element,event,fn,selector){if(event=parse(event),event.ns)var matcher=matcherFor(event.ns);return(handlers[zid(element)]||[]).filter(function(handler){return handler&&(!event.e||handler.e==event.e)&&(!event.ns||matcher.test(handler.ns))&&(!fn||zid(handler.fn)===zid(fn))&&(!selector||handler.sel==selector)})}function parse(event){var parts=(""+event).split(".");return{e:parts[0],ns:parts.slice(1).sort().join(" ")}}function matcherFor(ns){return new RegExp("(?:^| )"+ns.replace(" "," .* ?")+"(?: |$)")}function eachEvent(events,fn,iterator){$.isObject(events)?$.each(events,iterator):events.split(/\s/).forEach(function(type){iterator(type,fn)})}function add(element,events,fn,selector,getDelegate,capture){capture=!!capture;var id=zid(element),set=handlers[id]||(handlers[id]=[]);eachEvent(events,fn,function(event,fn){var delegate=getDelegate&&getDelegate(fn,event),callback=delegate||fn,proxyfn=function(event){var result=callback.apply(element,[event].concat(event.data));return result===!1&&event.preventDefault(),result},handler=$.extend(parse(event),{fn:fn,proxy:proxyfn,sel:selector,del:delegate,i:set.length});set.push(handler),element.addEventListener(handler.e,proxyfn,capture)})}function remove(element,events,fn,selector){var id=zid(element);eachEvent(events||"",fn,function(event,fn){findHandlers(element,event,fn,selector).forEach(function(handler){delete handlers[id][handler.i],element.removeEventListener(handler.e,handler.proxy,!1)})})}function createProxy(event){var proxy=$.extend({originalEvent:event},event);return $.each(eventMethods,function(name,predicate){proxy[name]=function(){return this[predicate]=returnTrue,event[name].apply(event,arguments)},proxy[predicate]=returnFalse}),proxy}function fix(event){if(!("defaultPrevented"in event)){event.defaultPrevented=!1;var prevent=event.preventDefault;event.preventDefault=function(){this.defaultPrevented=!0,prevent.call(this)}}}var handlers=($.zepto.qsa,{}),_zid=1,specialEvents={};specialEvents.click=specialEvents.mousedown=specialEvents.mouseup=specialEvents.mousemove="MouseEvents",$.event={add:add,remove:remove},$.proxy=function(fn,context){if($.isFunction(fn)){var proxyFn=function(){return fn.apply(context,arguments)};return proxyFn._zid=zid(fn),proxyFn}if("string"==typeof context)return $.proxy(fn[context],fn);throw new TypeError("expected function")},$.fn.bind=function(event,callback){return this.each(function(){add(this,event,callback)})},$.fn.unbind=function(event,callback){return this.each(function(){remove(this,event,callback)})},$.fn.one=function(event,callback){return this.each(function(i,element){add(this,event,callback,null,function(fn,type){return function(){var result=fn.apply(element,arguments);return remove(element,type,fn),result}})})};var returnTrue=function(){return!0},returnFalse=function(){return!1},eventMethods={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};$.fn.delegate=function(selector,event,callback){var capture=!1;return("blur"==event||"focus"==event)&&($.iswebkit?event="blur"==event?"focusout":"focus"==event?"focusin":event:capture=!0),this.each(function(i,element){add(element,event,callback,selector,function(fn){return function(e){var evt,match=$(e.target).closest(selector,element).get(0);return match?(evt=$.extend(createProxy(e),{currentTarget:match,liveFired:element}),fn.apply(match,[evt].concat([].slice.call(arguments,1)))):void 0}},capture)})},$.fn.undelegate=function(selector,event,callback){return this.each(function(){remove(this,event,callback,selector)})},$.fn.live=function(event,callback){return $(document.body).delegate(this.selector,event,callback),this},$.fn.die=function(event,callback){return $(document.body).undelegate(this.selector,event,callback),this},$.fn.on=function(event,selector,callback){return void 0==selector||$.isFunction(selector)?this.bind(event,selector):this.delegate(selector,event,callback)},$.fn.off=function(event,selector,callback){return void 0==selector||$.isFunction(selector)?this.unbind(event,selector):this.undelegate(selector,event,callback)},$.fn.trigger=function(event,data){return"string"==typeof event&&(event=$.Event(event)),fix(event),event.data=data,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(event)})},$.fn.triggerHandler=function(event,data){var e,result;return this.each(function(i,element){e=createProxy("string"==typeof event?$.Event(event):event),e.data=data,e.target=element,$.each(findHandlers(element,event.type||event),function(i,handler){return result=handler.proxy(e),e.isImmediatePropagationStopped()?!1:void 0})}),result},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(event){$.fn[event]=function(callback){return this.bind(event,callback)}}),["focus","blur"].forEach(function(name){$.fn[name]=function(callback){if(callback)this.bind(name,callback);else if(this.length)try{this.get(0)[name]()}catch(e){}return this}}),$.Event=function(type,props){var event=document.createEvent(specialEvents[type]||"Events"),bubbles=!0;if(props)for(var name in props)"bubbles"==name?bubbles=!!props[name]:event[name]=props[name];return event.initEvent(type,bubbles,!0,null,null,null,null,null,null,null,null,null,null,null,null),event}}(Zepto),function($){function detect(ua){var os=this.os={},browser=this.browser={},webkit=ua.match(/WebKit\/([\d.]+)/),android=ua.match(/(Android)\s+([\d.]+)/),ipad=ua.match(/(iPad).*OS\s([\d_]+)/),iphone=!ipad&&ua.match(/(iPhone\sOS)\s([\d_]+)/),webos=ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),touchpad=webos&&ua.match(/TouchPad/),kindle=ua.match(/Kindle\/([\d.]+)/),silk=ua.match(/Silk\/([\d._]+)/),blackberry=ua.match(/(BlackBerry).*Version\/([\d.]+)/);(browser.webkit=!!webkit)&&(browser.version=webkit[1]),android&&(os.android=!0,os.version=android[2]),iphone&&(os.ios=os.iphone=!0,os.version=iphone[2].replace(/_/g,".")),ipad&&(os.ios=os.ipad=!0,os.version=ipad[2].replace(/_/g,".")),webos&&(os.webos=!0,os.version=webos[2]),touchpad&&(os.touchpad=!0),blackberry&&(os.blackberry=!0,os.version=blackberry[2]),kindle&&(os.kindle=!0,os.version=kindle[1]),silk&&(browser.silk=!0,browser.version=silk[1]),!silk&&os.android&&ua.match(/Kindle Fire/)&&(browser.silk=!0)}detect.call($,navigator.userAgent),$.__detect=detect}(Zepto),function($,undefined){function downcase(str){return str.toLowerCase()}function normalizeEvent(name){return eventPrefix?eventPrefix+name:downcase(name)}var eventPrefix,prefix="",vendors={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},document=window.document,testEl=document.createElement("div"),supportedTransforms=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,clearProperties={};$.each(vendors,function(vendor,event){return testEl.style[vendor+"TransitionProperty"]!==undefined?(prefix="-"+downcase(vendor)+"-",eventPrefix=event,!1):void 0}),clearProperties[prefix+"transition-property"]=clearProperties[prefix+"transition-duration"]=clearProperties[prefix+"transition-timing-function"]=clearProperties[prefix+"animation-name"]=clearProperties[prefix+"animation-duration"]="",$.fx={off:eventPrefix===undefined&&testEl.style.transitionProperty===undefined,cssPrefix:prefix,transitionEnd:normalizeEvent("TransitionEnd"),animationEnd:normalizeEvent("AnimationEnd")},$.fn.animate=function(properties,duration,ease,callback){return $.isObject(duration)&&(ease=duration.easing,callback=duration.complete,duration=duration.duration),duration&&(duration/=1e3),this.anim(properties,duration,ease,callback)},$.fn.anim=function(properties,duration,ease,callback){var transforms,key,wrappedCallback,cssProperties={},that=this,endEvent=$.fx.transitionEnd;if(duration===undefined&&(duration=.4),$.fx.off&&(duration=0),"string"==typeof properties)cssProperties[prefix+"animation-name"]=properties,cssProperties[prefix+"animation-duration"]=duration+"s",endEvent=$.fx.animationEnd;else{for(key in properties)supportedTransforms.test(key)?(transforms||(transforms=[]),transforms.push(key+"("+properties[key]+")")):cssProperties[key]=properties[key];transforms&&(cssProperties[prefix+"transform"]=transforms.join(" ")),$.fx.off||"object"!=typeof properties||(cssProperties[prefix+"transition-property"]=Object.keys(properties).join(", "),cssProperties[prefix+"transition-duration"]=duration+"s",cssProperties[prefix+"transition-timing-function"]=ease||"linear")}return wrappedCallback=function(event){if("undefined"!=typeof event){if(event.target!==event.currentTarget)return;$(event.target).unbind(endEvent,arguments.callee)}$(this).css(clearProperties),callback&&callback.call(this)},duration>0&&this.bind(endEvent,wrappedCallback),setTimeout(function(){that.css(cssProperties),0>=duration&&setTimeout(function(){that.each(function(){wrappedCallback.call(this)})},0)},0),this},testEl=null}(Zepto),function($){function triggerAndReturn(context,eventName,data){var event=$.Event(eventName);return $(context).trigger(event,data),!event.defaultPrevented}function triggerGlobal(settings,context,eventName,data){return settings.global?triggerAndReturn(context||document,eventName,data):void 0}function ajaxStart(settings){settings.global&&0===$.active++&&triggerGlobal(settings,null,"ajaxStart")}function ajaxStop(settings){settings.global&&!--$.active&&triggerGlobal(settings,null,"ajaxStop")}function ajaxBeforeSend(xhr,settings){var context=settings.context;return settings.beforeSend.call(context,xhr,settings)===!1||triggerGlobal(settings,context,"ajaxBeforeSend",[xhr,settings])===!1?!1:void triggerGlobal(settings,context,"ajaxSend",[xhr,settings])}function ajaxSuccess(data,xhr,settings){var context=settings.context,status="success";settings.success.call(context,data,status,xhr),triggerGlobal(settings,context,"ajaxSuccess",[xhr,settings,data]),ajaxComplete(status,xhr,settings)}function ajaxError(error,type,xhr,settings){var context=settings.context;settings.error.call(context,xhr,type,error),triggerGlobal(settings,context,"ajaxError",[xhr,settings,error]),ajaxComplete(type,xhr,settings)}function ajaxComplete(status,xhr,settings){var context=settings.context;settings.complete.call(context,xhr,status),triggerGlobal(settings,context,"ajaxComplete",[xhr,settings]),ajaxStop(settings)}function empty(){}function mimeToDataType(mime){return mime&&(mime==htmlType?"html":mime==jsonType?"json":scriptTypeRE.test(mime)?"script":xmlTypeRE.test(mime)&&"xml")||"text"}function appendQuery(url,query){return(url+"&"+query).replace(/[&?]{1,2}/,"?")}function serializeData(options){isObject(options.data)&&(options.data=$.param(options.data)),!options.data||options.type&&"GET"!=options.type.toUpperCase()||(options.url=appendQuery(options.url,options.data))}function serialize(params,obj,traditional,scope){var array=$.isArray(obj);$.each(obj,function(key,value){scope&&(key=traditional?scope:scope+"["+(array?"":key)+"]"),!scope&&array?params.add(value.name,value.value):(traditional?$.isArray(value):isObject(value))?serialize(params,value,traditional,key):params.add(key,value)})}var key,name,jsonpID=0,isObject=$.isObject,document=window.document,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(options){var abortTimeout,callbackName="jsonp"+ ++jsonpID,script=document.createElement("script"),abort=function(){$(script).remove(),callbackName in window&&(window[callbackName]=empty),ajaxComplete("abort",xhr,options)},xhr={abort:abort};return options.error&&(script.onerror=function(){xhr.abort(),options.error()}),window[callbackName]=function(data){clearTimeout(abortTimeout),$(script).remove(),delete window[callbackName],ajaxSuccess(data,xhr,options)},serializeData(options),script.src=options.url.replace(/=\?/,"="+callbackName),$("head").append(script),options.timeout>0&&(abortTimeout=setTimeout(function(){xhr.abort(),ajaxComplete("timeout",xhr,options)},options.timeout)),xhr},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)void 0===settings[key]&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host);var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if("jsonp"==dataType||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);settings.url||(settings.url=window.location.toString()),serializeData(settings);var abortTimeout,mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=$.ajaxSettings.xhr();settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime)),(settings.contentType||settings.data&&"GET"!=settings.type.toUpperCase())&&(baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded"),settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(4==xhr.readyState){clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||304==xhr.status||0==xhr.status&&"file:"==protocol){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{"script"==dataType?(1,eval)(result):"xml"==dataType?result=xhr.responseXML:"json"==dataType&&(result=blankRE.test(result)?null:JSON.parse(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,"error",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(url,success){return $.ajax({url:url,success:success})},$.post=function(url,data,success,dataType){return $.isFunction(data)&&(dataType=dataType||success,success=data,data=null),$.ajax({type:"POST",url:url,data:data,success:success,dataType:dataType})},$.getJSON=function(url,success){return $.ajax({url:url,success:success,dataType:"json"})},$.fn.load=function(url,success){if(!this.length)return this;var selector,self=this,parts=url.split(/\s/);return parts.length>1&&(url=parts[0],selector=parts[1]),$.get(url,function(response){self.html(selector?$(document.createElement("div")).html(response.replace(rscript,"")).find(selector).html():response),success&&success.call(self)}),this};var escape=encodeURIComponent;$.param=function(obj,traditional){var params=[];return params.add=function(k,v){this.push(escape(k)+"="+escape(v))},serialize(params,obj,traditional),params.join("&").replace("%20","+")}}(Zepto),function($){$.fn.serializeArray=function(){var el,result=[];return $(Array.prototype.slice.call(this.get(0).elements)).each(function(){el=$(this);var type=el.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=type&&"reset"!=type&&"button"!=type&&("radio"!=type&&"checkbox"!=type||this.checked)&&result.push({name:el.attr("name"),value:el.val()})}),result},$.fn.serialize=function(){var result=[];return this.serializeArray().forEach(function(elm){result.push(encodeURIComponent(elm.name)+"="+encodeURIComponent(elm.value))}),result.join("&")},$.fn.submit=function(callback){if(callback)this.bind("submit",callback);else if(this.length){var event=$.Event("submit");this.eq(0).trigger(event),event.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function($){function parentIfText(node){return"tagName"in node?node:node.parentNode}function swipeDirection(x1,x2,y1,y2){var xDelta=Math.abs(x1-x2),yDelta=Math.abs(y1-y2);return xDelta>=yDelta?x1-x2>0?"Left":"Right":y1-y2>0?"Up":"Down"}function longTap(){longTapTimeout=null,touch.last&&(touch.el.trigger("longTap"),touch={})}function cancelLongTap(){longTapTimeout&&clearTimeout(longTapTimeout),longTapTimeout=null}var touchTimeout,longTapTimeout,touch={},longTapDelay=750;$(document).ready(function(){var now,delta;$(document.body).bind("touchstart",function(e){now=Date.now(),delta=now-(touch.last||now),touch.el=$(parentIfText(e.touches[0].target)),touchTimeout&&clearTimeout(touchTimeout),touch.x1=e.touches[0].pageX,touch.y1=e.touches[0].pageY,delta>0&&250>=delta&&(touch.isDoubleTap=!0),touch.last=now,longTapTimeout=setTimeout(longTap,longTapDelay);
}).bind("touchmove",function(e){cancelLongTap(),touch.x2=e.touches[0].pageX,touch.y2=e.touches[0].pageY}).bind("touchend",function(e){cancelLongTap(),touch.isDoubleTap?(touch.el.trigger("doubleTap"),touch={}):touch.x2&&Math.abs(touch.x1-touch.x2)>30||touch.y2&&Math.abs(touch.y1-touch.y2)>30?(touch.el.trigger("swipe")&&touch.el.trigger("swipe"+swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)),touch={}):"last"in touch&&(touch.el.trigger("tap"),touchTimeout=setTimeout(function(){touchTimeout=null,touch.el.trigger("singleTap"),touch={}},250))}).bind("touchcancel",function(){touchTimeout&&clearTimeout(touchTimeout),longTapTimeout&&clearTimeout(longTapTimeout),longTapTimeout=touchTimeout=null,touch={}})}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(m){$.fn[m]=function(callback){return this.bind(m,callback)}})}(Zepto);