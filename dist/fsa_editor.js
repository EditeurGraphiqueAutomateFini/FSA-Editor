!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define('swal',[],function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
// create svg container w/ marker in a html container
define('viewmode/create_svg',[],function(){
    return function(container){
        if(container){

            var svg = d3.select(container).insert("svg",".buttons");

            svg.attr({
                "id":"svgbox"
            });

            // marker creation (will append at the end of each svg path element -> done with create_paths module)
            svg.append("defs")
                .append("marker")
                .attr({
                    "id" : "end",
                    "viewBox" : "0 -5 10 10",
                    "refX" : 25,
                    "refY" : -1,
                    "markerWidth" : 6,
                    "markerHeight" : 6,
                    "orient" : "auto"
                })
                .append("path")
                .attr("d","M0,-5L10,0L0,5");

        }else{  // if no container is supplied
            svg="";
        }

        return svg;
    }
})
;
define('viewmode/tick_helper',[],function(){
    return function(e,r,containmentWidth,containmentHeight){
        var path = d3.selectAll(".link"),
            condition = d3.selectAll(".condition"),
            circle = d3.selectAll("circle"),
            text = d3.selectAll(".state_name");

        path.attr("d",linkArc);
        condition.attr("transform", transformCondition);
        circle.attr("transform", transform);
        text.attr("transform", transform);

        // define new postition of arc between states
        function linkArc(d){
            var sourceCoordX = getContainmentX(d.source.x),
                sourceCoordY = getContainmentY(d.source.y),
                targetCoordX = getContainmentX(d.target.x),
                targetCoordY = getContainmentY(d.target.y);

            var dx = targetCoordX - sourceCoordX,
                dy = targetCoordY - sourceCoordY,
                dr = Math.sqrt(dx * dx + dy * dy);

            // if source is pointing toward itself, create a fixed arc
            // optimisé pour 50, a modifier/tester
            if(d.target === d.source){
                var distance = 50,
                    dr1 = "50",
                    dr2 = "33";
                return "M" + sourceCoordX + "," + sourceCoordY + " A" +dr1+","+dr2+ " 0 0,1 " + (targetCoordX+distance) + "," + (targetCoordY+distance)+
                        " M"+(targetCoordX+distance)+","+(targetCoordY+distance)+" A"+dr2+","+dr1+" 0 0,1 "+ sourceCoordX + "," + sourceCoordY;
            }else{
                return "M" + sourceCoordX + "," + sourceCoordY + " A" + dr + "," + dr + " 0 0,1 " + targetCoordX + "," + targetCoordY;
            }
        }
        // define new postition
        function transform(d) {
            var coordX = getContainmentX(d.x),
                coordY = getContainmentY(d.y);

            d.graphicEditor.coordX = coordX;
            d.graphicEditor.coordY = coordY;
            return "translate(" + coordX + "," + coordY + ")";
        }
        // define new postition of transition condition
        function transformCondition(d) {
            var sourceCoordX = getContainmentX(d.source.x),
                sourceCoordY = getContainmentY(d.source.y),
                targetCoordX = getContainmentX(d.target.x),
                targetCoordY = getContainmentY(d.target.y);

            var translate = "";

            // if source is related to itself
            if(d.source == d.target){ //todo variabiliser le 50
                translate += "translate(" + (sourceCoordX+50) + "," + (sourceCoordY+50) + ")";
            }else{
                translate += "translate(" + ((sourceCoordX+targetCoordX)/2) + "," + ((sourceCoordY+targetCoordY)/2) + ")";
            }

            return translate;
        }

        function getContainmentX(valX){ return Math.max(r,Math.min(valX,containmentWidth-r)); }
        function getContainmentY(valY){ return Math.max(r,Math.min(valY,containmentHeight-r)); }
    }
})
;
// create d3 force layout
define('viewmode/create_force_layout',['require','viewmode/tick_helper'],function(require){
    return function(container,states,links){

        var tick = require("viewmode/tick_helper");

        var containmentWidth = $("#svgbox")[0].getBoundingClientRect().width,
            containmentHeight = $("#svgbox")[0].getBoundingClientRect().height;

        // creating the force layout with states as nodes
        var force = d3.layout.force()
            .nodes(d3.values(states))
            .links(d3.values(links))
            .size(function(){
                container.each(function(){ return [this.clientWidth,this.clientHeight]; });
            })
            .linkDistance(200)
            .charge(-200)
            .on("tick",function(e){
                var r = 15;
                tick(e,r,containmentWidth,containmentHeight);
            })
            .start();

        return force;

    }
});

define('viewmode/create_circles',[],function(){
    return function(container,force){

        var svg = container;

        // create a circle for each state and apply D3 drag system
        svg.append("g").classed("state_container",true).selectAll("circle")
            .data(force.nodes()).enter()
            .append("circle")
            .attr({
                "r" : "15",
                "class" : function(d){
                    if(d.terminal){ return "terminal"; }
                    else{ return ""; }
                },
                "id" : function(d){
                    return "state_"+d.index;
                },
                "fill" : function(d){ return d.fill; }
            })
            .call(force.drag);
      }
});

define('viewmode/create_state_names',[],function(){
    return function(container,force){

        var svg = container;

        // create a text for each state w/ the name of the state and [max_nosie] if set
        var text = svg.append("g").classed("name_container",true).selectAll("text")
            .data(force.nodes()).enter()
            .append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : "state_name",
                "id" : function(d){ return "state_name_"+d.index; }
            });
            // add state label
            text.append("tspan")
                .text(function(d){ return d.name; })
                .classed("state_name_label",true);
            // add state max noise if needed
            text.append("tspan")
                .text(function(d){ return d.max_noise > 0 ? "["+d.max_noise+"]" : ""; })
                .attr("dx",3)
                .classed("state_name_maxnoise",true);
      }
});

// create path between states : container : html container /!\D3/!\ selector, states : array of states, links : links array created w/ data array
define('viewmode/create_paths',[],function(){
    return function(container,force){

        var svg = container;

        // create a path for each link/transition
        svg.append("g").classed("path_container",true).selectAll("path")
            .data(force.links()).enter()
            .append("path")
            .attr({
                "class" : "link",
                "id" : function(d){ return "link_"+d.source.index +"_"+d.target.index; },
                "marker-end" : "url(#end)"
            });

    }
});

define('viewmode/condition_list',[],function(){
    return function(d){
        var text = "",
            matched = false;

        if(d.conditions){
            d.conditions.forEach(function(element){
                if(!matched){
                    matched = true;
                    text += element.condition;
                }else{
                    text += ", "+element.condition;
                }
            });
        }

        return text;
    }
});

define('viewmode/create_conditions',['require','viewmode/condition_list'],function(require){
    return function(container,force){
        var condition_list = require("viewmode/condition_list");
        var svg = container;

        // create a text for each transition w/ the condition of the transition
        svg.append("g").classed("condition_container",true).selectAll("text")
            .data(force.links()).enter()
            .append("text")
            .attr({
                "x" : 20,
                "y" : 0,
                "class" : function(d){
                    return "condition link_"+d.source.index +"_"+d.target.index;
                }
            })
            .text(condition_list);

    }
});

// attention ici on essaie de créer un concept bâtard entre pile et file
// "pfile" ou "fpile" ? "FLIFO" ? moment difficile...
define('utility/undo',[],function(){
    // private
    var maxStateSave = 50,
        rollingBack = false,
        rollingBackCount = 0,
        undoQueue = [];

    function stackFull(){
        return (undoQueue.length === maxStateSave);
    }
    function stackEmpty(){
        return (undoQueue.length === 0);
    }

    // public
    function addToStack(state){
        if(rollingBack){
            var reroll = _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
            undoQueue = [reroll];
            rollingBack = false;
            rollingBackCount = 0;
        }

        var stateClone = _.cloneDeep(state);

        if(stackFull(undoQueue)){
            undoQueue.shift();
        }
        undoQueue.push(stateClone);
    }
    function rollBack(){
        if(!rollingBack){
            rollingBack = true;
        }
        if(rollingBackCount >= undoQueue.length-1){
            rollingBackCount = undoQueue.length-1;
        }else{
            rollingBackCount++;
        }
        return _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
    }
    function rollForth(){
        if(rollingBack){
            if(rollingBackCount <= 0){
                rollingBackCount = 0;
            }else{
                rollingBackCount--;
            }
            return _.cloneDeep(undoQueue[(undoQueue.length)-(1+rollingBackCount)]);
        }
        return true;
    }

    // return (reveal) public methods
    return{
        "addToStack" : addToStack,
        "rollBack" : rollBack,
        "rollForth" : rollForth,
        "stackEmpty" : stackEmpty
    }

});

define('viewmode/view_init',['require','viewmode/create_svg','viewmode/create_force_layout','viewmode/create_circles','viewmode/create_state_names','viewmode/create_paths','viewmode/create_conditions','viewmode/view_init','utility/undo'],function(require){
    return{
        // extract states
        extractStates : function(data){
            var states = [];
            // iterating over states objects in data file (JSON), making a JS array of objects
            if(data){
                for(var i=0; i<data.length; i++){
                    if(data[i].states){
                        states.push(data[i].states);
                    }
                }
            }
            return states;
        },
        getIdFromName : function(data,name){
            for(var key in data){
                if(data.hasOwnProperty(key)){
                    if(data[key]){
                        if(name === data[key].name){
                            return data[key].uniqueId;
                        }
                    }
                }
            }
        },
        getConditions :function(data,source,target){
            var conditions = [];
            for(var key in data){
                if(data.hasOwnProperty(key) && data[key]){
                    if(data[key].uniqueId === source && data[key].transitions){
                        data[key].transitions.forEach(function(transition){
                            if(transition.target === target){
                                conditions.push(transition);
                            }
                        });
                    }
                }
            }
            return conditions;
        },
        // initialisation function : states : array of state objects; getData: initial retrieved data
        init : function(states,getData){
            var create_svg = require("viewmode/create_svg"),
                create_force_layout = require("viewmode/create_force_layout"),
                create_circles = require("viewmode/create_circles"),
                create_state_names = require("viewmode/create_state_names"),
                create_paths = require("viewmode/create_paths"),
                create_conditions = require("viewmode/create_conditions"),
                // set_positions = require("viewmode/set_positions"),
                viewmode = require("viewmode/view_init"),
                undo = require("utility/undo");

            if(states){
                var links = [],
                    dataset = [],
                    newLink = {},
                    key,state,
                    testPresence = false,
                    i = 0, cpt = 0;

                // compute the distinct nodes from the transitionSet
                states.forEach(function(data){
                    cpt = 0;
                    for(key in data){
                        if(data.hasOwnProperty(key)){
                            state = data[key];
                            if(state){
                                state.fixed = true;
                                state.uniqueId = cpt;
                                state.index = cpt;
                                state.name = key;

                                // add graphicEditor values if not set
                                if(!state.graphicEditor){
                                    state.graphicEditor = {};
                                }else{
                                    state.graphicEditor.origCoordX = state.graphicEditor.coordX;
                                    state.graphicEditor.origCoordY = state.graphicEditor.coordY;
                                }

                                state.x = state.graphicEditor.coordX || 0;   //known position or 0
                                state.y = state.graphicEditor.coordY || 0;

                                // push state
                                dataset.push(state);
                                cpt++;
                            }
                        }
                    }
                    for(key in data){
                        if(data.hasOwnProperty(key)){
                            state = data[key];
                            if(state){
                                if(state.transitions && state.transitions.length > 0){
                                    for(i=0; i < state.transitions.length; i++){
                                        // add the new link if not already present
                                        testPresence = links.find(function(el){
                                             return (
                                                el.source === state.uniqueId
                                                && el.target === viewmode.getIdFromName(dataset,state.transitions[i].target)
                                            );
                                        });
                                        if(!testPresence){
                                            // creating a new link
                                            newLink = {
                                                "source" : state.uniqueId,
                                                "target" : viewmode.getIdFromName(dataset,state.transitions[i].target),
                                                "conditions" : viewmode.getConditions(dataset,state.uniqueId,state.transitions[i].target)
                                            }
                                            links.push(newLink);
                                        }
                                    }
                                }
                            }
                        }
                    }
                });

                // set_positions(states[0]);    // uncomment variable set_positions to activate again
                if($("svg").size() > 0){
                    $("svg").remove();
                }
                var svg = create_svg("#svg_container"),
                    force = create_force_layout(svg,dataset,links);

                create_paths(svg,force);
                create_conditions(svg,force);
                create_circles(svg,force);
                create_state_names(svg,force);

            }else{
                // todo : vue par défaut ? basculer vers le mode creation ?
            }

            // add state save on dragend
            force.drag().on("dragend",function(){
                undo.addToStack(getData);
            });

            // key bindings
            d3.select(document).on("keyup",function(){
                // ajouter un preventdefault pour les actions de base du nav ?
                if(d3.event.ctrlKey){
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z" rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   // if any action has already been performed
                                viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                            }
                            break;
                        case 89:    // on key "CTRL + Y" rollforth
                            var rollForth = undo.rollForth();
                            if(rollForth){   // if any action has already been performed
                                viewmode.init(viewmode.extractStates([rollForth]),rollForth,true);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });

            return {
                "svg" : svg,
                "force" : force,
                "getData" : getData,
                "links" : links
            };
        }
    }
});

define('viewmode/data_helper',[],function(){
    return{
        // cleans the set of data to obtain sendable/displayable data
        cleanData : function(getData){
            var endPostData = {
                states : {}
            },
            state,key;

            if(getData.allow_overlap){ endPostData.allow_overlap = getData.allow_overlap; }
            if(getData.state_defaults){ endPostData.state_defaults = getData.state_defaults; }
            if(getData.default_matcher){ endPostData.default_matcher = getData.default_matcher; }

            for(state in getData.states){
                if(getData.states.hasOwnProperty(state) && getData.states[state]){
                    endPostData.states[state] = {};
                    for(key in getData.states[state]){
                        if(getData.states[state].hasOwnProperty(key)){
                            // condition giving the set of properties we want to keep for each state
                            if(
                                key === "default_transition" ||
                                key === "graphicEditor" ||
                                key === "max_duration" ||
                                key ==="max_noise" ||
                                key === "max_total_duration" ||
                                key === "max_total_noise" ||
                                key === "terminal" ||
                                key ==="transitions"
                            ){
                                endPostData.states[state][key] = getData.states[state][key];
                            }
                        }
                    }
                }
            }

            return endPostData;
        }
    }
});

define('menu/context_menu',[],function(){
    // must return "delete" or "update"
    return function(event){
        // console.log(event);
        if(event){
            return "";
        }else{
            return "";
        }
    }
})
;
define('editmode/cancel_all_selections',[],function(){
    return function(){
        d3.selectAll("circle").each(function(d){    // testing if a state is being linked
            if(d.graphicEditor.linking){    // if linking, undo process and thus remove linking class
                d.graphicEditor.linking = false;
                d3.select("#state_"+d.index).classed("linking",false);
            }
        });
    }
});

// global utility functions
// code à optimiser
define('utility/utility',[],function(){
    return{
         // displays a JS object on screen; object : array of object to display
         // todo reussir a se passer du param level, trouver un moyen de compter les appels recursif (demander a jeanseba le roi de lalgo)
        displayObject : function(object,level){
            var objString = '',     // string which will contain the written object
                indent = 20,    // indent in px
                key,arrayItem,arrayItemType,
                j = 0;

            level++;

            for(var i=0; i < object.length; i++){   // iteration over the object array
                 // each object in the object array begins with a curl
                objString += '<span style="padding-left:'+indent+'px'+';"></span>{<br/>';
                for (key in object[i]){
                    if(object[i].hasOwnProperty(key)){
                        var objProperty = object[i][key];   // the property
                        if(key != "graphicEditor"){   // we don't want to display "graphicEditor" property to keep it simple
                            objString += '<span style="padding-left:'+(indent*level+indent)+'px'+';"></span>';
                            if(typeof(objProperty) == 'string'){    // display a string w/ simple quotes
                                objString += key+' : '+'\''+objProperty+'\'';
                            }else if(Object.prototype.toString.call(objProperty) == '[object Object]'){ // recursively display the content of a litteral object
                                objString += key+' : '+this.displayObject([objProperty],level);
                            }else if(Object.prototype.toString.call(objProperty)=='[object Array]'){    // displays an array
                                objString += key+' : ['+'<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                for(j=0; j < objProperty.length; j++){

                                    arrayItem = objProperty[j];
                                    arrayItemType = Object.prototype.toString.call(arrayItem);

                                    if(arrayItemType == '[object Object]' || arrayItemType == '[object Array]'){
                                        if(j == objProperty.length-1){
                                            objString += this.displayObject([arrayItem],level+2);
                                        }else{
                                            objString += this.displayObject([arrayItem],level+2)+',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                        }
                                    }else if (arrayItemType == 'string'){
                                        if(j == objProperty.length-1){
                                            objString += '\''+arrayItem+'\'';
                                        }else{
                                            objString += '\''+arrayItem+'\',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                        }
                                    }else{
                                        if(j == objProperty.length-1){
                                            objString += arrayItem;
                                        }else{
                                            objString += arrayItem+',<br/><span style="padding-left:'+(indent*(level+2))+'px'+';"></span>';
                                        }
                                    }
                                }
                                objString += '<br/><span style="padding-left:'+(indent*level+indent)+'px'+';"></span>'+']';
                            }
                            else{
                                objString += key+' : '+objProperty;
                            }
                            objString += ",<br/>";
                        }
                    }
                }
                // removing last coma
                if(objString.charAt(objString.length-6) == ','){
                    objString = objString.slice(0,-6)+objString.slice(-5);
                }
                // removing last backspace
                if(objString.slice(-5) == "<br/>"){
                    objString = objString.slice(0,-5);
                }
                // each object in the object array ends with a curl
                objString += '<br/><span style="padding-left:'+(indent*level)+'px'+';"></span> }';
                if(i != object.length-1){
                    objString += '<br/>';
                }
            }
            return objString;
        },
        // display the given object in a html container by calling "displayObject" method
        frontEndObject : function(data){
            var displayZone = "#object_container_left";
            $(displayZone).html('{<br/>'+this.displayObject(data,0)+'<br/>}');
            if($(displayZone).parents().find('textarea#objectArea').size() > 0){   // display object in a textarea (for copy/paste)
                $(displayZone).parents().find('textarea#objectArea').val(function(){
                    var text = "";
                    for(var i=0; i < data.length; i++){
                        text += JSON.stringify(data[i]);
                    }
                    return text;
                });
            }
        }
    }
});

define('editmode/edit_frontend_object',['require','utility/utility','viewmode/data_helper'],function(require){
    return function(data){
        var utility = require("utility/utility"),
            data_helper = require("viewmode/data_helper"),
            displayableData = data_helper.cleanData(data);

        utility.frontEndObject([displayableData]);
    }
});

define('editmode/global/edit_global',[],function(){
    return function(newValues,context){

        // edit allow_overlap
        context.getData.allow_overlap = newValues.newOverlap;

        // edit default_matcher
        context.getData.default_matcher = newValues.newDefaultMatcher;

        if(context.getData.state_defaults){
            // edit terminal
            context.getData.state_defaults.terminal = newValues.newTerminal;

            // edit max_noise
            context.getData.state_defaults.max_noise = parseInt(newValues.newMaxNoise) || 0;

            // edit max_total_noise
            context.getData.state_defaults.max_total_noise = parseInt(newValues.newMaxTotalNoise) || 0;

            // edit max_duration
            context.getData.state_defaults.max_duration = parseInt(newValues.newMaxDuration) || 0;

            // edit max_total_duration
            context.getData.state_defaults.max_total_duration = parseInt(newValues.newMaxTotalDuration) || 0;
        }else{
            context.getData.state_defaults = {
                "terminal" : newValues.newTerminal,
                "max_noise" : newValues.newMaxNoise,
                "max_total_noise" : newValues.newMaxTotalNoise,
                "max_duration" : newValues.newMaxDuration,
                "max_total_duration" : newValues.newMaxTotalDuration
            }
        }
    }
});

define('editmode/global/get_global_edition',['require','editmode/global/edit_global','utility/undo','editmode/edit_frontend_object'],function(require){
        return function(context){
            var edit_global = require("editmode/global/edit_global"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");

            swal({
                title : "Edit global properties",
                text : displayGlobalPropertiesAsList(),
                html : true,
                showCancelButton : true,
                closeOnConfirm : false,
                animation : "slide-from-top"
            },function(inputValue){
                    if(inputValue){
                        var newOverlap = false,
                            newDefaultMatcher = "",
                            newTerminal = false,
                            newMaxNoise = 0,
                            newMaxTotalNoise = 0,
                            newMaxDuration = 0,
                            newMaxTotalDuration = 0,
                            newValues;

                        // overlap
                        newOverlap = d3.select("#input_allow_overlap").property("checked");
                        // default_matcher
                        newDefaultMatcher = d3.select("#input_default_matcher").property("value");
                        // terminal
                        newTerminal = d3.select("#input_terminal").property("checked");
                        // max_noise
                        newMaxNoise = parseInt(d3.select("#input_max_noise").property("value"));
                        // max_total_noise
                        newMaxTotalNoise = parseInt(d3.select("#input_max_total_noise").property("value"));
                        // max_duration
                        newMaxDuration = parseInt(d3.select("#input_max_duration").property("value"));
                        // max_total_duration
                        newMaxTotalDuration = parseInt(d3.select("#input_max_total_duration").property("value"));

                        // tests
                        if(newMaxNoise < 0){
                            swal.showInputError("max_noise cannot be negative");
                            return false;
                        }
                        if(newMaxNoise > newMaxTotalNoise){
                            swal.showInputError("max_noise cannot be > total_max_noise");
                            return false;
                        }
                        if(newMaxTotalNoise < 0){
                            swal.showInputError("max_total_noise cannot be negative");
                            return false;
                        }
                        if(newMaxDuration < 0){
                            swal.showInputError("max_duration cannot be negative");
                            return false;
                        }
                        if(newMaxDuration > newMaxTotalDuration){
                            swal.showInputError("max_duration cannot be > total_max_duration");
                            return false;
                        }
                        if(newMaxTotalDuration < 0){
                            swal.showInputError("max_total_duration cannot be negative");
                            return false;
                        }

                        // values assignment
                        newValues = {
                            "newOverlap" : newOverlap,
                            "newDefaultMatcher" : newDefaultMatcher,
                            "newTerminal" : newTerminal,
                            "newMaxNoise" : newMaxNoise,
                            "newMaxTotalNoise" : newMaxTotalNoise,
                            "newMaxDuration" : newMaxDuration,
                            "newMaxTotalDuration" : newMaxTotalDuration
                        }

                        edit_global(newValues,context);

                        edit_frontend_object(context.getData);
                        undo.addToStack(context.getData);
                        swal.close();   // close sweetalert prompt window
                    }else if(inputValue === false){  // cancel
                        return false;
                    }else if(inputValue === ""){
                        swal.showInputError("error");
                        return false;
                    }
            });

            // display form with properties list
            function displayGlobalPropertiesAsList(){
                var html = "",
                    input = "",
                    propertiesToEdit=[
                        { "name":"allow_overlap", "type":"check" },
                        { "name":"default_matcher", "type":"text" },
                        { "name":"state_defaults", "type":"" },
                        { "name":"terminal", "type":"check", "sub":"state_defaults" },
                        { "name":"max_noise", "type":"number", "sub":"state_defaults" },
                        { "name":"max_total_noise", "type":"number", "sub":"state_defaults" },
                        { "name":"max_duration", "type":"number", "sub":"state_defaults" },
                        { "name":"max_total_duration", "type":"number", "sub":"state_defaults" }
                    ],
                    previousValue;

                for(var i=0; i < propertiesToEdit.length; i++){

                    if(propertiesToEdit[i].sub){
                        previousValue = context.getData[propertiesToEdit[i].sub][propertiesToEdit[i].name];
                    }else{
                        previousValue = context.getData[propertiesToEdit[i].name];
                    }

                    switch(propertiesToEdit[i].type){
                        case "text":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='text' "+
                                        "value='"+ (previousValue || "")+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>"
                            break;
                        case "number":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='number' "+
                                        "value='"+(previousValue || 0)+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>"
                            break;
                        case "check":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='checkbox' "+
                                        (previousValue ? "checked='true' " : "")+
                                        "id='input_"+propertiesToEdit[i].name+"' "+
                                    "/>"
                            break;
                        default:
                            input="";
                            break;
                    }
                    html += "<span class='swal_display global_display'>"+
                                "<label "+
                                    "class='custom_swal_label' "+
                                    "for='input_"+propertiesToEdit[i].name+"' "+
                                    "id='label_property_"+propertiesToEdit[i].name+"'"+
                                ">"
                                    +propertiesToEdit[i].name+" : "+
                                "</label>"+
                                input+
                            "</span>";
                }

                return html;
            }
        }
});

define('editmode/state/delete_state',[],function(){
    // delete a state having index == elementIndex
    // "context" parameter is containing "svg" object, "getData" original datas, "force" d3 current force layout object
    // makes global data sendable to the server
    return function(elementIndex,context){
        var states = context.getData.states,
            delete_link_id = [],
            delete_node_id = [],
            sourceIndex,targetIndex,
            i = 0, j = 0;

        // delete links w/ source or target pointing at elementIndex
        context.force.links().forEach(function(el,ind){
            if(el.source.index == elementIndex || el.target.index == elementIndex){
                delete_link_id.push(ind);
            }
        });
        for(i=0; i < delete_link_id.length; i++){
            context.force.links().splice(delete_link_id[i],1);
            for(j=0; j < delete_link_id.length; j++) delete_link_id[j]--;
        }
        // suppress node at index elementIndex
        context.force.nodes().forEach(function(el,ind){
            if(el.index == elementIndex){
                delete_node_id.push(ind);
                d3.select("#state_"+elementIndex).remove();
            }
        });
        for(i=0; i < delete_node_id.length; i++){
            context.force.nodes().splice(delete_node_id[i],1);
            for(j=0; j < delete_node_id.length; j++) delete_node_id[j]--;
        }
        // delete state name
        d3.select("#state_name_"+elementIndex).remove();
        // delete links w/ target or source set to the element
        d3.selectAll("path.link").each(function(d){
            sourceIndex = d.source.index;
            targetIndex = d.target.index;

            // delete link and condition
            if(sourceIndex == elementIndex || targetIndex == elementIndex){
                d3.selectAll(
                    "path.link[id$='_"+elementIndex+"'],path.link[id^='link_"+elementIndex+"_']"
                ).remove();
                d3.selectAll(
                    "text.condition[class$='_"+elementIndex+"'],text.condition[class*='link_"+elementIndex+"_']"
                ).remove();
            }
        });
        // deleting state
        for(var key in states){
            if(states.hasOwnProperty(key) && states[key]){
                if(states[key].index == elementIndex){
                    states[key] = undefined;
                }
            }
        }
        // restarting force w/ new nodes and links
        context.force.start();
        // editing classes and ids on svg elements which index was modified
        d3.selectAll("circle").attr("id",function(d){ return "state_"+d.index; });
        d3.selectAll("text.state_name").attr("id",function(d){ return "state_name_"+d.index; });
        d3.selectAll("path.link").attr("id",function(d){ return "link_"+d.source.index+"_"+d.target.index; });
        d3.selectAll("text.condition").attr("class",function(d){ return "condition "+"link_"+d.source.index+"_"+d.target.index; });
    }
});

// delete references to "name" (string, name of a state) parameter in "object" (object) parameter. Designed to clean data that are being sent
define('editmode/state/delete_references',[],function(){
    return function(object,name){
        var states = object.states,
            indexToDelete = [],
            i = 0, j = 0;

        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                if(states[state].transitions){  // remove transitions that we do not want anymore. Errors otherwise
                    indexToDelete = [];
                    states[state].transitions.forEach(function(el,index){
                        if(el.target == name){
                            indexToDelete.push(index);
                        }
                    });
                    for(i=0; i < indexToDelete.length; i++){
                        states[state].transitions.splice(indexToDelete[i],1);
                        for(j=0; j < indexToDelete.length; j++) indexToDelete[j]--;
                    }
                }
            }
        }
    }
})
;
// dit references to "name" (string) parameter in "object" (object) parameter. Designed to clean data that are being sent
define('editmode/state/edit_references',[],function(){
    return function(object,name,newName){
        var states = object.states;

        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                if(states[state].transitions){  // remove transitions that we do not want anymore. Errors otherwise
                    states[state].transitions.forEach(function(el){
                        if(el.target == name){
                            el.target = newName;
                        }
                    });
                }
            }
        }
    }
})
;
define('editmode/state/edit_state_defaulttransition',[],function(){
    return function(d,newSilent,newTarget,context){
        var states = context.getData.states,
            newTargetName = "",
            state;

        if(d.max_noise > 0){    // cannot be set together w/ max_noise
            d.default_transition = undefined;
            for(state in states){
                if(states.hasOwnProperty(state) && states[state]){
                    if(states[state].index === d.index){
                        states[state].default_transition = undefined;
                    }
                }
            }
        }else{
            for(state in states){
                if(states.hasOwnProperty(state) && states[state]){
                    if(parseInt(states[state].index) === parseInt(newTarget)){
                        newTargetName = states[state].name;
                    }
                }
            }

            if(d.default_transition){
                d.default_transition.silent = newSilent;
                d.default_transition.target = newTargetName;
            }else{
                d.default_transition = {
                    "silent" : newSilent,
                    "target" : newTargetName
                }
            }

            for(state in states){
                if(states.hasOwnProperty(state) && states[state]){
                    if(states[state].index === d.index){
                        if(states[state].default_transition){
                            states[state].default_transition.silent = newSilent;
                            states[state].default_transition.target = newTargetName;
                        }else{
                            states[state].default_transition = {
                                "silent" : newSilent,
                                "target" : newTargetName
                            }
                        }
                    }
                }
            }
        }
    }
});

define('editmode/state/edit_state_maxduration',[],function(){
    return function(d,newMaxDuration,context){
        d.max_duration = newMaxDuration;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_duration = parseInt(newMaxDuration) || 0;
        }
    }
});

define('editmode/state/edit_state_maxtotalduration',[],function(){
    return function(d,newMaxTotalDuration,context){
        d.max_total_duration = newMaxTotalDuration;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_total_duration = parseInt(newMaxTotalDuration) || 0;
        }
    }
});

define('editmode/state/edit_state_maxnoise',[],function(){
    // edit selected state's properties
    return function(d,inputValue,context){
        d.max_noise = inputValue;
        context.getData.states[d.name].max_noise = parseInt(inputValue) || 0;
        d3.select("text#state_name_"+d.index+" tspan.state_name_maxnoise").html(function(d){
          return d.max_noise > 0 ? "["+d.max_noise+"]" : "";
        });

        // restart force layout w/ new data
        context.force.start();
    }
});

define('editmode/state/edit_state_maxtotalnoise',[],function(){
    return function(d,newMaxTotalNoise,context){
        d.max_total_noise = newMaxTotalNoise;
        if(context.getData.states[d.name]){
            context.getData.states[d.name].max_total_noise = parseInt(newMaxTotalNoise) || 0;
        }
    }
});

define('editmode/state/edit_state_name',[],function(){
    // edit selected state's properties
    return function(d,inputValue,context){
        var oldName = d.name;

        d.name = inputValue;
        context.getData.states[d.name] = context.getData.states[oldName];
        context.getData.states[oldName] = undefined;
        d3.select("text#state_name_"+d.index+" tspan.state_name_label").html(function(d){
            return d.name;
        });

        // restart force layout w/ new data
        context.force.start();
    }
});

define('editmode/state/edit_state_terminal',[],function(){
    // edit selected state's properties
    return function(d,newTerminal,context){
        d.terminal = newTerminal;
        context.getData.states[d.name].terminal = newTerminal;
        d3.select("circle#state_"+d.index).classed("terminal",function(){
            return d.terminal;
        });
    }
});

define('editmode/state/edit_state',['require','editmode/state/edit_references','editmode/state/edit_state_defaulttransition','editmode/state/edit_state_maxduration','editmode/state/edit_state_maxtotalduration','editmode/state/edit_state_maxnoise','editmode/state/edit_state_maxtotalnoise','editmode/state/edit_state_name','editmode/state/edit_state_terminal'],function(require){
    return function(newValues,d,context){   // newValues includes newName,newTerminal,newMaxNoise,newMaxTotalNoise,newMaxDuration,newMaxTotalDuration,newDefaultTransition
        var edit_references = require("editmode/state/edit_references"),
            edit_state_defaulttransition = require("editmode/state/edit_state_defaulttransition"),
            edit_state_maxduration = require("editmode/state/edit_state_maxduration"),
            edit_state_maxtotalduration = require("editmode/state/edit_state_maxtotalduration"),
            edit_state_maxnoise = require("editmode/state/edit_state_maxnoise"),
            edit_state_maxtotalnoise = require("editmode/state/edit_state_maxtotalnoise"),
            edit_state_name = require("editmode/state/edit_state_name"),
            edit_state_terminal = require("editmode/state/edit_state_terminal");

        // edit max_duration if necessary
        if(newValues.newMaxDuration !== d.max_duration){
            edit_state_maxduration(d,newValues.newMaxDuration,context);
        }

        // edit max_noise if necessary
        if(newValues.newMaxNoise !== d.max_noise){
            edit_state_maxnoise(d,newValues.newMaxNoise,context);
        }

        // edit max_total_duration if necessary
        if(newValues.newMaxTotalDuration !== d.max_total_duration){
            edit_state_maxtotalduration(d,newValues.newMaxTotalDuration,context);
        }

        // edit max_total_noise if necessary
        if(newValues.newMaxTotalNoise !== d.max_total_noise){
            edit_state_maxtotalnoise(d,newValues.newMaxTotalNoise,context);
        }

        // edit name if necessary
        if(newValues.newName !== d.name){
            edit_references(context.getData,d.name,newValues.newName);
            edit_state_name(d,newValues.newName,context);
        }

        // edit terminal if necessary
        if(newValues.newTerminal !== d.terminal){
            edit_state_terminal(d,newValues.newTerminal,context);
        }

        // edit default_transition if necessary
        if(newValues.newDefaultTransition){
            if(d.default_transition){
                if(
                    newValues.newDefaultTransition.silent !== d.default_transition.silent
                    || newValues.newDefaultTransition.target !== d.default_transition.target
                ){
                    edit_state_defaulttransition(d,newValues.newDefaultTransition.silent,newValues.newDefaultTransition.target,context);
                }
            }else{
                edit_state_defaulttransition(d,newValues.newDefaultTransition.silent,newValues.newDefaultTransition.target,context);
            }
        }

        // restart force layout w/ new data
        context.force.start();
    }
});

define('editmode/cancel_selection',[],function(){
    return function(d){
        if(d){
            d3.select("#state_"+d.index).classed("editing",false);
            d.graphicEditor.linking = false;
            d3.select("#state_"+d.index).classed("linking",false);
        }
    }
});

define('editmode/state/get_state_edition',['require','editmode/state/edit_state','editmode/cancel_selection','utility/undo','editmode/edit_frontend_object'],function(require){
        return function (d,context){
            var edit_state = require("editmode/state/edit_state"),
                cancel_selection = require("editmode/cancel_selection"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");

            swal({
                title : d.name,
                text : displayStateAsList(d),
                html : true,
                showCancelButton : true,
                closeOnConfirm : false,
                animation : "slide-from-top"
            },function(inputValue){
                if(inputValue){
                    var newName = "",
                        newTerminal = false,
                        newMaxNoise = 0,
                        newMaxTotalNoise = 0,
                        newMaxDuration = 0,
                        newMaxTotalDuration = 0,
                        newValues,
                        newDefaultTransition = {
                            "condition":"",
                            "target":0
                        };

                    // name
                    newName = d3.select("#input_name_"+d.index).property("value");
                    // terminal
                    newTerminal = d3.select("#input_terminal_"+d.index).property("checked");
                    // max_noise
                    newMaxNoise = parseInt(d3.select("#input_max_noise_"+d.index).property("value"));
                    // max_total_noise
                    newMaxTotalNoise = parseInt(d3.select("#input_max_total_noise_"+d.index).property("value"));
                    // max_duration
                    newMaxDuration = parseInt(d3.select("#input_max_duration_"+d.index).property("value"));
                    // max_total_duration
                    newMaxTotalDuration = parseInt(d3.select("#input_max_total_duration_"+d.index).property("value"));
                    // default_transition
                    newDefaultTransition.silent = d3.select("#input_default_transition_silent_"+d.index).property("checked");
                    newDefaultTransition.target = d3.select("#input_default_transition_target_"+d.index).property("value");

                    // tests
                    if(newMaxNoise < 0){
                        swal.showInputError("max_noise cannot be negative");
                        return false;
                    }
                    if(newMaxNoise > newMaxTotalNoise){
                        swal.showInputError("max_noise cannot be > max_total_noise");
                        return false;
                    }
                    if(newMaxTotalNoise < 0){
                        swal.showInputError("max_total_noise cannot be negative");
                        return false;
                    }
                    if(newMaxDuration < 0){
                        swal.showInputError("max_duration cannot be negative");
                        return false;
                    }
                    if(newMaxDuration > newMaxTotalDuration){
                        swal.showInputError("max_duration cannot be > max_total_duration");
                        return false;
                    }
                    if(newMaxTotalDuration < 0){
                        swal.showInputError("max_total_duration cannot be negative");
                        return false;
                    }

                    // max noise cannot be set together with default_transition
                    if(
                        parseInt(d3.select("[id^=input_max_noise_]").property("value")) > 0
                        && parseInt(d3.select("[id^=input_default_transition_target_]").property("selectedIndex")) > 0
                    ){
                        swal.showInputError("max_noise cannot be set with default_transition");
                        return false;
                    }

                    // check if name already exists
                    for(var state in context.getData.states){
                        if(context.getData.states.hasOwnProperty(state) && context.getData.states[state]){
                            if(newName === context.getData.states[state].name && context.getData.states[state].index !== d.index){
                                swal.showInputError("A state with this name already exists");
                                return false;
                            }
                        }
                    }

                    // aggregating new values in a single object
                    newValues = {
                        "newName":newName,
                        "newTerminal":newTerminal,
                        "newMaxNoise":newMaxNoise,
                        "newMaxTotalNoise":newMaxTotalNoise,
                        "newMaxDuration":newMaxDuration,
                        "newMaxTotalDuration":newMaxTotalDuration,
                        "newDefaultTransition":newDefaultTransition
                    }

                    edit_state(newValues,d,context);

                    cancel_selection(d);
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                    swal.close();   // close sweetalert prompt window
                }else if(inputValue === false){  // cancel
                    cancel_selection(d);
                    return false;
                }else if(inputValue === ""){
                    swal.showInputError("error");
                    return false;
                }
            });

            function displayStateAsList(d){
                var html = "",
                    currentState = context.getData.states[d.name],
                    input="",
                    propertiesToEdit=[
                        { "name":"name", "type":"text" },
                        { "name":"terminal", "type":"check" },
                        { "name":"max_noise", "type":"number" },
                        { "name":"max_total_noise", "type":"number" },
                        { "name":"max_duration", "type":"number" },
                        { "name":"max_total_duration", "type":"number" },
                        { "name":"default_transition", "type":"transition" }
                    ],
                    options = "",
                    hasSelection = false,
                    state,
                    isSilent = false;

                for(var i=0; i < propertiesToEdit.length; i++){
                    switch(propertiesToEdit[i].type){
                        case "text":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='text' "+
                                        "value='"+(currentState[propertiesToEdit[i].name] || "")+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "/>"
                            break;
                        case "number":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='number' "+
                                        "value='"+(currentState[propertiesToEdit[i].name] || 0)+"' "+
                                        "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "/>"
                            break;
                        case "check":
                            input = "<input "+
                                        "class='custom_swal_input' "+
                                        "type='checkbox' "+
                                        (currentState[propertiesToEdit[i].name] ? "checked='true' " : "")+
                                        "id='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "/>"
                            break;
                        case "transition":
                            options = "";
                            hasSelection = false;

                            for(state in context.getData.states){
                                if(context.getData.states.hasOwnProperty(state) && context.getData.states[state] !== undefined){
                                    if(currentState[propertiesToEdit[i].name] !== undefined && currentState[propertiesToEdit[i].name].target == context.getData.states[state].name){
                                        hasSelection = context.getData.states[state].index;
                                    }
                                     options += "<option "+
                                                    (hasSelection === context.getData.states[state].index ? "selected='true'" : "")+
                                                    "value='"+context.getData.states[state].index+
                                                "'>"+
                                                    state+
                                                "</option>";
                                }
                             }

                             isSilent = false;
                             if(currentState[propertiesToEdit[i].name]){
                                 isSilent = currentState[propertiesToEdit[i].name].silent;
                             }else{
                                 isSilent = false;
                             }
                            input = "<span class='swal_select_container'>"+
                                        "<span class='swal_select_subcontainer'>"+
                                            "<select "+
                                                "class='custom_swal_select' "+
                                                "id='input_"+propertiesToEdit[i].name+"_target_"+d.index+"' "+
                                            ">"+
                                                "<option "+(hasSelection ? "" : "selected='true'")+" value=''>Select a target</option>"+
                                                options +
                                            "</select>"+
                                        "</span>"+
                                        "<span class='swal_select_subcontainer'>"+
                                            "<span class='sub_label'>silent : </span>"+
                                            "<input "+
                                                "class='custom_swal_input' "+
                                                "type='checkbox' "+
                                                (isSilent ? "checked='true' " : "")+
                                                "id='input_"+propertiesToEdit[i].name+"_silent_"+d.index+"' "+
                                            "/>"+
                                        "</span>"+
                                    "</span>"

                            break;
                        default:
                            input = "";
                            break;
                    }
                    html += "<span class='swal_display state_display state_display_"+d.index+"'>"+
                                "<label "+
                                    "class='custom_swal_label' "+
                                    "for='input_"+propertiesToEdit[i].name+"_"+d.index+"' "+
                                    "id='label_property_"+propertiesToEdit[i].name+"'"+
                                ">"
                                    +propertiesToEdit[i].name+" : "+
                                "</label>"+
                                input+
                            "</span>";
                }

                return html;
            }
        }
});

define('editmode/state/get_state_name_edition',['require','editmode/state/edit_references','editmode/state/edit_state_name','editmode/cancel_selection','utility/undo','editmode/edit_frontend_object'],function(require){
    return function (d,context){    // get new name w/ prompt-like
        var edit_references = require("editmode/state/edit_references"),
            edit_state_name = require("editmode/state/edit_state_name"),
            cancel_selection = require("editmode/cancel_selection"),
            undo = require("utility/undo"),
            edit_frontend_object = require("editmode/edit_frontend_object");

        swal({
            title : "State Edition",
            text : "Write a new name",
            type : "input",
            inputValue : d.name,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            if(inputValue){  // edit state name if confirmed
                if(inputValue !== d.name){

                    // check if name already exists
                    for(var state in context.getData.states){
                        if(context.getData.states.hasOwnProperty(state) && context.getData.states[state]){
                            if(inputValue === context.getData.states[state].name && context.getData.states[state].index !== d.index){
                                swal.showInputError("A state with this name already exists");
                                return false;
                            }
                        }
                    }

                    edit_references(context.getData,d.name,inputValue);
                    edit_state_name(d,inputValue,context);
                    cancel_selection(d);
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                }
                swal.close();   // close sweetalert prompt window
            }else if(inputValue === false){  // cancel
                cancel_selection(d);
                return false;
            }else if(inputValue === ""){  // empty new state name
                swal.showInputError("Please enter a state name");
                return false;
            }
        });
    }
});

define('editmode/state/get_max_noise_edition',['require','editmode/state/edit_state_maxnoise','editmode/cancel_selection','utility/undo','editmode/edit_frontend_object'],function(require){
    return function (d,context){
        var edit_state_maxnoise = require("editmode/state/edit_state_maxnoise"),
            cancel_selection = require("editmode/cancel_selection"),
            undo = require("utility/undo"),
            edit_frontend_object = require("editmode/edit_frontend_object");

        swal({
            title : "Max noise edition",
            text : "Write a new value",
            type : "input",
            inputType : "number",
            inputValue : d.max_noise,
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top"
        },function(inputValue){
            if(inputValue){  // edit state name if confirmed
                if(parseInt(inputValue) < 0){ // negative noise
                    swal.showInputError("max_noise cannot be negative");
                    return false;
                }else if(parseInt(inputValue) > parseInt(d.max_total_noise)){
                    swal.showInputError("max_noise cannot be > max_total_noise ("+d.max_total_noise+")");
                    return false;
                }else{
                    edit_state_maxnoise(d,inputValue,context);
                    cancel_selection(d);
                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                    swal.close();   // close sweetalert prompt window
                }
            }else if(inputValue === false){  // cancel
                cancel_selection(d);
                return false;
            }else if(inputValue === ""){  // empty noise
                swal.showInputError("Please enter a value");
                return false;
            }
        });
    }
});

// add transition array to the global object
define('editmode/transition/add_transition',[],function(){
    return function(force,object,source,target,condition){

        // edit global object
        var state = object.states[source.name],
            transition = {
                "condition" : condition,
                "target" : target.name
            };

        if(state){
            if(state.transitions){
                state.transitions.push(transition);
            }else{
                state.transitions = [transition];
            }
        }

        // edit links
        var testPresence = force.links().find(function(el){ return el.source.index === source.index && el.target.index === target.index; });
        if(testPresence){
            force.links().forEach(function(link){
                if(link.source.index === source.index && link.target.index === target.index){
                    if(!link.conditions){
                        link.conditions = [];
                    }
                    link.conditions.push(transition);
                }
            });
        }else{
            force.links().push({
                "conditions" : [transition],
                "source" : source,
                "target" : target
            });
        }

        // restart force layout
        force.start();
    }
});

define('editmode/transition/edit_condition',['viewmode/condition_list'],function(){
    // create a link between two states
    return function(svg,force,sourceID,targetID,condition,isNew){

        var condition_list = require("viewmode/condition_list");

        if(isNew === "new"){    // create new transition (path+text)
            // adding a path for the newly created link
            svg.select("g.path_container").selectAll("path")
                .data(force.links()).enter()
                .append("path")
                .attr({
                    "class" : "link new_link",
                    "id" : function(){ return "link_"+sourceID +"_"+targetID; },
                    "marker-end" : "url(#end)"
                });
            // adding a condition text for the newly created link
            svg.select("g.condition_container").selectAll("text")
                .data(force.links()).enter()
                .append("text")
                .attr({
                    "x" : 20,
                    "y" : 0,
                    "class" : function(){ return "condition link_"+sourceID +"_"+targetID+" new_link"; }
                })
                .text(condition_list);
        }else{  // simply render the new condition (transition already exists) (only text)

            svg.select(".condition.link_"+sourceID+"_"+targetID)
                .text(condition_list)
                .classed("new_condition",true);
        }

        // restart force layout w/ new data
        force.start();
    }
});

define('editmode/transition/edit_transition',['viewmode/condition_list'],function(){
    // conditionsToEdit : string array
    return function(d,conditionsToEdit){
        var condition_list = require("viewmode/condition_list");

         conditionsToEdit.forEach(function(element){
             if(d.conditions){
                 if(d.conditions[element.index]){
                     if(d.conditions[element.index].condition !== element.updatedValues.condition){
                         d.conditions[element.index].condition = element.updatedValues.condition;
                     }
                     if(d.conditions[element.index].matcher !== element.updatedValues.matcher){
                         d.conditions[element.index].matcher = element.updatedValues.matcher;
                     }
                     if(d.conditions[element.index].silent !== element.updatedValues.silent){
                         d.conditions[element.index].silent = element.updatedValues.silent;
                     }
                 }
             }
         });

         d3.select("text.link_"+d.source.index+"_"+d.target.index)
             .text(condition_list);
    }
});

define('editmode/transition/delete_transition',['viewmode/condition_list'],function(){
    return function(d,conditionsToDelete,context){
        var condition_list = require("viewmode/condition_list");
        var states = context.getData.states,
            indexesToDelete = [],
            indexToDelete,
            i = 0, j = 0;

        // delete transitions in global object
        for(var state in states){
            if(states.hasOwnProperty(state) && states[state]){
                if(states[state].index === d.source.index){
                    if(states[state].transitions){
                        states[state].transitions.forEach(function(object,index){
                            conditionsToDelete.forEach(function(condition){
                                if(object.condition === d.conditions[condition].condition && object.target === d.target.name){
                                    indexesToDelete.push(index);
                                }
                            });
                        });
                        for(i=0; i < indexesToDelete.length; i++){
                            states[state].transitions.splice(indexesToDelete[i],1);
                            for(j=0; j < indexesToDelete.length; j++) indexesToDelete[j]--;
                        }
                    }
                }
            }
        }

        // delete in d3 links
        if(d.conditions){
            for(i=0; i < conditionsToDelete.length; i++){
                d.conditions.splice(conditionsToDelete[i],1);
                for(j=0; j < conditionsToDelete.length; j++) conditionsToDelete[j]--;
            }
        }

        // edit html
        d3.selectAll(".condition.link_"+d.source.index+"_"+d.target.index)
            .text(condition_list);

        // checking if no conditions remaining. If so, delete link
        if(d.conditions){
            if(d.conditions.length === 0){
                d3.selectAll(".link_"+d.source.index+"_"+d.target.index).remove();
                d3.select("#link_"+d.source.index+"_"+d.target.index).remove();
                context.force.links().forEach(function(link,index){
                    if(link.source.index === d.source.index && link.target.index === d.target.index){
                        indexToDelete = index;
                    }
                });
                context.force.links().splice(indexToDelete,1);
            }
        }

        // restarting force w/ new nodes and links
        context.force.start();
    }
});

define('editmode/transition/get_transition_edition',['require','editmode/transition/edit_transition','editmode/transition/delete_transition','utility/undo','editmode/edit_frontend_object'],function(require){
        return function (d,context){    // get new name w/ prompt-like
            var edit_transition = require("editmode/transition/edit_transition"),
                delete_transition = require("editmode/transition/delete_transition"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");

            swal({
                title : "Transition edition",
                text : displayTransitionsAsList(d),
                html : true,
                showCancelButton : true,
                closeOnConfirm : false,
                animation : "slide-from-top"
            },function(inputValue){
                if(inputValue){
                    var conditionsToDelete = [],
                        conditionsToEdit = [],
                        editedItem = {},
                        commaError = false,
                        attribute = 0,
                        index = 0,
                        type = "";

                    d3.selectAll(".condition_display.user_delete").each(function(){
                        attribute = 0;
                        index = 0;

                        attribute = this.getAttribute("id").indexOf("condition_display_")+"condition_display_".length;
                        index = parseInt(this.getAttribute("id").substr(attribute,1));

                        conditionsToDelete.push(index);
                    });
                    d3.selectAll(".condition_display.user_edited").each(function(){
                        attribute = 0,
                        index = 0;

                        attribute = this.getAttribute("id").indexOf("condition_display_")+"condition_display_".length;
                        index = parseInt(this.getAttribute("id").substr(attribute,1));

                        editedItem = {
                            "index" : index,
                            "updatedValues" : {}
                        };

                        d3.select(this).selectAll("input").each(function(){
                            type = d3.select(this).attr("type");
                            switch (type) {
                                case "text" :
                                    if(d3.select(this).classed("condition_input")){
                                        editedItem.updatedValues.condition = this.value;
                                    }else if(d3.select(this).classed("matcher_input")){
                                        editedItem.updatedValues.matcher = this.value;
                                    }
                                    break;
                                case "checkbox" :
                                    if(d3.select(this).classed("silent_input")){
                                        editedItem.updatedValues.silent = this.checked;
                                    }
                                    break;
                                default:
                            }
                        });

                        if(!d3.select(this.parentNode.parentNode).classed("user_delete")){
                            conditionsToEdit.push(editedItem);
                        }
                    });

                    if(conditionsToEdit.length > 0){
                        conditionsToEdit.forEach(function(el){
                            if(el.updatedValues){
                                if(el.updatedValues.condition.indexOf(",") != -1){
                                    commaError = true;
                                }
                            }
                        });
                        if(commaError){
                            swal.showInputError("\',\' is not allowed for transitions");
                            return false;
                        }else{
                            edit_transition(d,conditionsToEdit);
                        }
                    }
                    if(conditionsToDelete.length > 0){
                        delete_transition(d,conditionsToDelete,context);
                    }

                    edit_frontend_object(context.getData);
                    undo.addToStack(context.getData);
                    swal.close();   // close sweetalert prompt window
                }else if(inputValue === false){  // cancel
                    return false;
                }else if(inputValue === ""){
                    swal.showInputError("error");
                    return false;
                }
            });
            d3.selectAll(".custom_swal_delete").each(function(){
                d3.select(this)
                    .on("click",function(){
                        d3.select(this.parentNode).classed("user_delete",true);
                    });
            });
            d3.selectAll(".condition_display input").each(function(){
                d3.select(this)
                    .on("change",function(){
                        d3.select(this.parentNode.parentNode).classed("user_edited",true);
                    });
            });

            function displayTransitionsAsList(d){
                var html = "<div class='transition_title'>"+d.source.name + " => "+d.target.name+"</div>";

                html += "<div class='header_transition'>"+
                            "<span class='header_condition'>condition</span>"+
                            "<span class='header_matcher'>matcher</span>"+
                            "<span class='header_silent'>silent</span>"+
                        "</div>";

                if(d.conditions){
                    d.conditions.forEach(function(condition,index){
                        html += "<span class='swal_display condition_display' id='condition_display_"+index+"'>"+
                                "<span class='custom_swal_delete' id='delete_condition_"+index+"'>X</span>"+
                                "<label><input class='custom_swal_input condition_input' type='text' value='"+condition.condition+"' id='input_condition_"+index+"' /></label>"+
                                "<label><input class='custom_swal_input matcher_input' type='text' value='"+
                                    (condition.matcher ? condition.matcher : "") +"'/>"+
                                "</label>"+
                                "<label class='checkbox_label'><input class='custom_swal_input silent_input' type='checkbox' "+
                                    (condition.silent ? "checked='true'" : "") +"'/>"+
                                "</label> "+
                            "</span>";
                    });
                }

                return html;
            }
        }
});

define('editmode/transition/get_condition',['require','editmode/transition/add_transition','editmode/transition/edit_condition','editmode/transition/get_transition_edition','utility/undo','editmode/edit_frontend_object'],function(require){
    return function(d,previouslySelectedState,thisID,context){
        var add_transition = require("editmode/transition/add_transition"),
            edit_condition = require("editmode/transition/edit_condition"),
            get_transition_edition = require("editmode/transition/get_transition_edition"),
            undo = require("utility/undo"),
            edit_frontend_object = require("editmode/edit_frontend_object");

        var linkingTestID = "#state_"+previouslySelectedState.index;
        var previouslyExistingLink = false;
        swal({
            title : "Condition",
            text : "Write a condition for this new transition",
            type : "input",
            showCancelButton : true,
            closeOnConfirm : false,
            animation : "slide-from-top",
            inputPlaceholder : "condition"
        },function(inputValue){
            if (inputValue === false){  // on cancel
                // edit visual hints
                previouslySelectedState.graphicEditor.linking = false;
                d.graphicEditor.linking = false;
                d3.select(linkingTestID).classed("linking",false);
                d3.select(thisID).classed("linking",false);
                return false;
            }
            if (inputValue === "") {    // if no value is entered
                swal.showInputError("You need to write a condition");
                return false;
            }
            if(inputValue.indexOf(",") !== -1){
                swal.showInputError("\',\' is not allowed for transitions");
                return false;
            }
            if(d3.select(linkingTestID).data()[0].hasOwnProperty("transitions")){   // if link alreay exists width the condition, error message
                d3.select(linkingTestID).data()[0].transitions.forEach(function(el){
                    if(el.target === d.name){
                        if(el.condition === inputValue){
                            inputValue = false;
                        }
                    }
                });
            }
            if(d3.selectAll("path.link#link_"+previouslySelectedState.index+"_"+d.index).size() > 0){   // if path already exist
                previouslyExistingLink = true;
            }
            if(inputValue){
                // all condition passed
                var condition = inputValue;

                add_transition(context.force,context.getData,previouslySelectedState,d,condition);    // add transition to global data object

                if(previouslyExistingLink){
                    edit_condition(context.svg,context.force,previouslySelectedState.index,d.index,condition); // edit path
                }else{
                    edit_condition(context.svg,context.force,previouslySelectedState.index,d.index,condition,"new"); // edit path
                    d3.select("text.condition.link_"+previouslySelectedState.index+"_"+d.index)
                        .on("click",function(d){
                            get_transition_edition(d,context);
                        });
                }
                // edit visual hints
                previouslySelectedState.graphicEditor.linking = false;
                d.graphicEditor.linking = false;
                d3.select(linkingTestID).classed("linking",false);
                d3.select(thisID).classed("linking",false);
                // edit fe object
                edit_frontend_object(context.getData);
                undo.addToStack(context.getData);
                // close sweetalert prompt window
                swal.close();
            }else{  // transition already exists w/ the same condition
                swal.showInputError("This condition already exists for the same transition");
                return false;
            }
        });
    }
});

define('editmode/edit_init',['require','menu/context_menu','editmode/edit_init','viewmode/view_init','editmode/cancel_all_selections','utility/undo','editmode/edit_frontend_object','editmode/global/get_global_edition','editmode/state/delete_state','editmode/state/delete_references','editmode/state/get_state_edition','editmode/state/get_state_name_edition','editmode/state/get_max_noise_edition','editmode/transition/get_condition','editmode/transition/get_transition_edition'],function(require){
    return{
        init: function(svg,force,getData,links){
            // utilities
            var context_menu = require("menu/context_menu"),
                editmode = require("editmode/edit_init"),
                viewmode = require("viewmode/view_init"),
                cancel_all_selections = require("editmode/cancel_all_selections"),
                undo = require("utility/undo"),
                edit_frontend_object = require("editmode/edit_frontend_object");
            // global
            var get_global_edition = require("editmode/global/get_global_edition");
            // state
            var delete_state = require("editmode/state/delete_state"),
                delete_references = require("editmode/state/delete_references"),
                get_state_edition = require("editmode/state/get_state_edition"),
                get_state_name_edition = require("editmode/state/get_state_name_edition"),
                get_max_noise_edition = require("editmode/state/get_max_noise_edition");
            // transition
            var get_condition = require("editmode/transition/get_condition"),
                get_transition_edition = require("editmode/transition/get_transition_edition");
            // defining context object w/ usefull variable to pass when invoking functions
            var context = {"svg":svg,"force":force,"getData":getData,"links":links};

            // generate global edition button
            d3.select("#global_properties").html("<button class='btn btn-primary button_edit_global_properties'>Edit global properties</button>");
            d3.selectAll("#global_properties button").on("click",function(){
                get_global_edition(context);
            });

            // on click on background cancel state selection
            d3.select("#svgbox").on("click",cancel_all_selections);
            force.drag().on("drag",function(d){ d.graphicEditor.unselectable=true; });

            // iterates over svg circles (representing states)
            d3.selectAll("circle").each(function(){
                d3.select(this)
                    // on right click, call a context menu to delete or edit state
                    .on("contextmenu",function(d){
                        switch (context_menu) {
                            case "delete":
                                deleteState(d);
                                break;
                            default:
                                break;
                        }
                    })
                    // on double click, select a state
                    // on a second double click on a state, create a link between them
                    // (can be the same state, source state cannot be terminal)
                    .on("click",function(d){
                        d3.event.stopPropagation();     // stop bubbling to avoid ending in background click event
                        d3.event.preventDefault();      // in case of right click
                        if(!d.graphicEditor.unselectable){
                            selectState(d);
                        }else{
                            d.graphicEditor.unselectable = false;
                        }
                    });
            });
            d3.selectAll("text.state_name .state_name_label").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_state_name_edition(d,context);
                    });
            });
            d3.selectAll("text.state_name .state_name_maxnoise").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_max_noise_edition(d,context);
                    });
            });
            d3.selectAll("text.condition").each(function(){
                d3.select(this)
                    .on("click",function(d){
                        get_transition_edition(d,context);
                    });
            });

            // key bingings
            d3.select(document).on("keyup",function(){
                // ajouter un preventdefault pour les actions de base du nav ?

                // key "CTRL" is pressed
                if(d3.event.ctrlKey){
                    var newLoadedViewMode;
                    switch (d3.event.keyCode) {
                        case 90:    // on key "CTRL + Z" rollback
                            var rollBack = undo.rollBack();
                            if(rollBack){   //if any action has already been performed
                                newLoadedViewMode = viewmode.init(viewmode.extractStates([rollBack]),rollBack,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                edit_frontend_object(getData);
                            }
                            break;
                        case 89:    // on key "CTRL + Y" rollforth
                            var rollForth = undo.rollForth();
                            if(rollForth){   // if any action has already been performed
                                newLoadedViewMode = viewmode.init(viewmode.extractStates([rollForth]),rollForth,true);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                edit_frontend_object(getData);
                            }
                            break;
                        default:
                            break;
                    }
                // key "CTRL" is not pressed
                }else{
                    switch(d3.event.keyCode){
                        case 27:    // on key "ECHAP" cancel all linking process
                            cancel_all_selections();
                            break;
                        case 46:    // on key "SUPPR" delete state
                            d3.selectAll("circle").each(function(d){
                                if(isEligible(d)){
                                    deleteState(d);
                                }
                            });
                            break;
                        case 69:    // on key "E" edit state name
                            d3.selectAll("circle").each(function(d){    // testing if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    get_state_edition(d,context);
                                }
                            });
                            break;
                        case 77:    // on key "M" edit max_noise
                            d3.selectAll("circle").each(function(d){    //t esting if a state is being linked
                                if(isEligible(d)){
                                    d3.select("#state_"+d.index).classed("editing",true);
                                    get_max_noise_edition(d,context);
                                }
                            });
                            break;
                        default:
                            break;
                    }
                }
            });

            // delete state
            function deleteState(d){

                delete_state(d.index,context);
                delete_references(getData,d.name);

                // edit fe object
                edit_frontend_object(getData);
                undo.addToStack(getData);
            }
            // select state - tries to create a new link if a state is already selected
            function selectState(d){
                var previouslySelectedState = false,
                    currentStateId = "#state_"+d.index;

                d3.selectAll("circle").each(function(d){    // testing if a first state is selected (being linked)
                    if(d.graphicEditor.linking){
                        previouslySelectedState = d;
                    }
                });
                if(previouslySelectedState){    // if a first state is selected, create new transition
                    d3.select(currentStateId).classed("linking",true);
                    get_condition(d,previouslySelectedState,currentStateId,context);
                }else{  // first selection of state
                    d.graphicEditor.linking=true;
                    d3.select(currentStateId).classed("linking",true);
                }
            }
            // test if a state is eligible for alteration
            function isEligible(d){
                return (
                    d.graphicEditor.linking
                    && (d3.select("#state_"+d.index).classed("editing") === false)
                    && (d3.selectAll(".linking").size() === 1)
                );
            }
        }
    }
});

// données d'exemple format JSON selon la structure "Finite State Automata" (FSA)
//from link : http://fsa4streams.readthedocs.org/en/latest/syntax.html#example
define('data/data_example',[],function(){
    return [
        {
            "allow_overlap": true,
            "states": {
                "start": {
                    "max_noise": 0,
                    "transitions": [
                        {
                            "condition": "a",
                            "target": "start"
                        },
                        {
                            "condition": "b",
                            "target": "start"
                        },
                        {
                            "condition": "a",
                            "target": "s1"
                        },
                        {
                            "condition": "d",
                            "target": "s2"
                        }
                    ]
                },
                "s1": {
                    "transitions": [
                        {
                            "condition": "b",
                            "target": "s1"
                        },
                        {
                            "condition": "c",
                            "target": "success"
                        },
                        {
                            "condition": "d",
                            "target": "error"
                        }
                    ]
                },
                "s2": {
                    "max_noise": 4,
                    "transitions": [
                        {
                            "condition": "d",
                            "target": "success"
                        }
                    ]
                },
                "success": {
                    "terminal": true
                },
                "error": {
                    "terminal": true
                }
            }
        }
    ]
});

define('utility/server_request',['require','viewmode/view_init','viewmode/data_helper','editmode/edit_init','utility/utility','utility/undo','utility/server_request','data/data_example','viewmode/view_init','viewmode/data_helper','editmode/edit_init','utility/utility'],function(require){
    return{
        // obtain data, use it to load a mode. mode : string representing the mode to load
        getRequest : function(mode){
            var viewmode = require("viewmode/view_init"),
                data_helper = require("viewmode/data_helper"),
                editmode = require("editmode/edit_init"),
                utility = require("utility/utility"),
                undo = require("utility/undo"),
                server = require("utility/server_request");

            $.ajax({
                  type : 'GET',
                  url : 'http://www.fsaeditor.com',
                  success : function(data){
                      return succesFunction(data,mode);
                  },
                  error : function(){
                      return errorFunction(mode);
                  },
                  beforeSend : function(){
                      $(".load_helper").show();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                  }
            });
            function succesFunction(getData,mode){
                if(getData){
                    var parsedData = JSON.parse(getData);
                    var parsedDataSolid = _.cloneDeep(parsedData); // cloning parsed data to keep it untouched for a later reset
                    // display object
                    utility.frontEndObject([parsedData]);
                    undo.addToStack(parsedData);
                    switch (mode) {
                        case "view":
                            // initiate viewmode
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            // handel reset
                            $("button.reset").click(function(){
                                var parsedDataLiquid = _.cloneDeep(parsedDataSolid);   // cloning untouched cloned data
                                // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                                viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,true);
                                // reseting front-end object display
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","transparent");
                            });
                            break;
                        case "edit":
                            // loading view mode
                            var loadedViewMode = viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                            // loading edit mode from previously loaded viewmode
                            editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                            // handling reset (same as edit mode)
                            $("button.reset").click(function(){
                                var parsedDataLiquid = _.cloneDeep(parsedDataSolid);
                                var newLoadedViewMode = viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid);
                                editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                                utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                                $("#object_container_left").css("background","transparent");
                            });
                            break;
                        default:
                            viewmode.init(viewmode.extractStates([parsedData]),parsedData);
                    }

                    // handle saving (posting edited data)
                    $("button.save").click(function(){
                        var endPostData = data_helper.cleanData(parsedData);
                        server.postRequest(endPostData,mode);
                    });
                }
            }
            function errorFunction(mode){
                // there has been an error w/ ajax request
                console.log("/!\\ ajax : error retrieving data from server, local data loaded");

                // thus loading local data (probablement a modifier)
                var data = require("data/data_example");
                var dataSolid = _.cloneDeep(data);
                // display object
                utility.frontEndObject(data);
                // intiate view mode w/ static data
                switch (mode) {
                    case "view":
                        // initiate viewmode
                        viewmode.init(viewmode.extractStates(data),data);
                        // handel reset
                        $("button.reset").click(function(){
                            var parsedDataLiquid = _.cloneDeep(dataSolid);   // cloning untouched cloned data
                            // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                            viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid,true);
                            // reseting front-end object display
                            utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                            $("#object_container_left").css("background","transparent");
                        });
                        break;
                    case "edit":
                        // loading view mode
                        var loadedViewMode = viewmode.init(viewmode.extractStates(data),data);
                        // loading edit mode from previously loaded viewmode
                        editmode.init(loadedViewMode.svg,loadedViewMode.force,loadedViewMode.getData,loadedViewMode.links);
                        // handling reset (same as edit mode)
                        $("button.reset").click(function(){
                            var parsedDataLiquid = _.cloneDeep(dataSolid);
                            var newLoadedViewMode = viewmode.init(viewmode.extractStates([parsedDataLiquid]),parsedDataLiquid);
                            editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                            utility.frontEndObject([data_helper.cleanData(parsedDataLiquid)]);
                            $("#object_container_left").css("background","transparent");
                        });
                        break;
                    default:
                        viewmode.init(viewmode.extractStates(data),data);
                }
            }
        },
        // post data to overwrite JSON file server-side
        postRequest: function(postData,mode){
            var viewmode = require("viewmode/view_init"),
            data_helper = require("viewmode/data_helper"),
            editmode = require("editmode/edit_init"),
            utility = require("utility/utility");

            $.ajax({
                  type : 'POST',
                  data : { graphicEditorFSA : JSON.stringify(postData) },
                  url : 'http://www.fsaeditor.com',
                  beforeSend : function(){
                      $(".load_helper").fadeIn();
                  },
                  complete : function(){
                      $(".load_helper").fadeOut();
                      $("#object_container_left").css("background","transparent");
                      d3.selectAll(".new_link").classed("new_link",false);
                      switch (mode) {
                          case "view":
                              // re-initiate viewmode with cloned data, adding a "true" parameter which indicates we are reseting
                              viewmode.init(viewmode.extractStates([postData]),postData,true);
                              // reseting front-end object display
                              utility.frontEndObject([data_helper.cleanData(postData)]);
                              break;
                          case "edit":
                              var newLoadedViewMode = viewmode.init(viewmode.extractStates([postData]),postData);
                              editmode.init(newLoadedViewMode.svg,newLoadedViewMode.force,newLoadedViewMode.getData,newLoadedViewMode.links);
                              utility.frontEndObject([data_helper.cleanData(postData)]);
                              break;
                          default:
                      }
                  },
                  success : function(){
                     swal("Saved!", "JSON file successfully overwritten", "success");
                  },
                  error : function(){
                      console.log("send error");
                  }
            });
        }
    }
});

define('menu/menu',['require','utility/server_request'],function(require){
    var server = require("utility/server_request")
    // return menu value (view : viewmode, edit: editmode)
    if(location.href.indexOf("edit") != -1){  //pour éviter d'avoir le menu en test, ajouter "?edit=1" au bout de son url
        // exemple file:///D:/Martin/_Cours/IUT/Projet%20tuteur%C3%A9/Editeur_graphique_projet/index.html?edit=1
        server.getRequest("edit"); // Editor mode
    }else if(location.href.indexOf("view") != -1){
        server.getRequest("view");
    }else{
        // code ici pour définir le menu
        $(document).ready(function(){
            $("body").prepend("<div class='menu'></div>");
            $(".menu").html(
                "<ul id='menu' class='list-group'>"+
                    "<li id='view' class='list-group-item'>"+
                        "<a href='#' class='list-group-item'>Mode vue</a>"+
                    "</li>"+
                    "<li id='edit' class='list-group-item'>"+
                        "<a href='#' class='list-group-item'>Mode edition</a>"+
                    "</li>"+
                "</ul>"
            );

            var li = document.getElementById("menu").getElementsByTagName("li"),
            liItem,id;

            for(var i=0; i < li.length; i++){
            liItem = document.getElementById(li[i].id);
            liItem.addEventListener("click",function(e){
                id = this.id;
                e.preventDefault(); // blocks the click event
                switch(id){   // checking clicked element's id value
                    case "view":
                        server.getRequest("view");  // View mode
                        break;
                    case "edit":
                        server.getRequest("edit"); // Editor mode
                        break;
                    case "create":
                        break;
                    default:
                        server.getRequest("view");
                }
                $(".menu").hide();
            });
            }
        });
    }
});

// main function
define('../main',['require','menu/menu'],function(require){   console.log("test");
    require("menu/menu");

    //right panel
    closeContainer("#object_container_wrapper","#object_container_close","left");
    $("#object_container_close").click(function(){
        closeContainer("#object_container_wrapper","#object_container_close","left");
    });

    //left pannel
    closeContainer("#object_container_wrapper_left","#object_container_close_right","right");
    $("#object_container_close_right").click(function(){
        closeContainer("#object_container_wrapper_left","#object_container_close_right","right");
    });

    function closeContainer(wrapper,button,orientation){
        $(wrapper).toggleClass("closed");
        if($(button).hasClass("panel_closed")){
            $(button)
                .html((orientation === "left" ? ">" : "<"))
                .prependTo(wrapper);
        }else{
            $(button)
                .html((orientation === "left" ? "<" : ">"))
                .prependTo("body");
        }
        $(button).toggleClass("panel_closed");
    }
});

// require configuration
require.config({
    baseUrl: "app/src/",    // all scripts will be called from this path
    paths: {
        data: "../../data" // except for local datas (for local testing)
        ,test: "../test/"    // and tests
        ,jquery : "http://code.jquery.com/jquery-2.1.4.min"  // defining jquery as a module
        ,swal: "../../res/js/sweetalert.min"
    }
});
// calling main function
require(
    [
        // libs first
        // jQuery
        //"jquery"
        "http://code.jquery.com/jquery-2.1.4.min.js"
        // lodash (mostly for object cloning)
        ,"https://cdn.jsdelivr.net/lodash/3.10.1/lodash.js"
        // sweetalert (for alerts and prompts)
        ,"swal"
        // jQuery UI
        ,"https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"
        // QUnit
        ,"http://code.jquery.com/qunit/qunit-1.20.0.js"
        // d3
        ,"http://d3js.org/d3.v3.min.js"

        // main
        ,"../main"
    ]
);

define("app", function(){});

