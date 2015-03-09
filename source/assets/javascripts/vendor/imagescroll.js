// (function(e,t){if(typeof define==="function"&&define.amd){define(["jquery"],t)}else{t(e.jQuery)}})(this,function(e){"use strict";function b(e,t){return typeof e===t}function w(e,t){return!!~(""+e).indexOf(t)}function E(e,t){for(var n in e){var r=e[n];if(!w(r,"-")&&l[r]!==undefined){return t=="pfx"?r:true}}return false}function S(e,t,n){for(var r in e){var i=t[e[r]];if(i!==undefined){if(n===false)return e[r];if(b(i,"function")){return i.bind(n||t)}return i}}return false}function x(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+h.join(r+" ")+r).split(" ");if(b(t,"string")||b(t,"undefined")){return E(i,t)}else{i=(e+" "+p.join(r+" ")+r).split(" ");return S(i,t,n)}}var t,n={image:null,imageAttribute:"image",holderClass:"imageHolder",imgClass:"img-holder-img",container:e("body"),windowObject:e(window),speed:.2,coverRatio:.75,holderMinHeight:200,holderMaxHeight:null,extraHeight:0,mediaWidth:1600,mediaHeight:900,parallax:true,touch:false},r="imageScroll",i="plugin_"+r,s=function(e,t){return function(){return e.apply(t,arguments)}},o={},u=document.documentElement,a="imageScrollModernizr",f=document.createElement(a),l=f.style,c="Webkit Moz O ms",h=c.split(" "),p=c.toLowerCase().split(" "),d={},v=0,m="",g,y=function(e,t,n,r){var i,s,o,f,l=document.createElement("div"),c=document.body,h=c||document.createElement("body");if(parseInt(n,10)){while(n--){o=document.createElement("div");o.id=r?r[n]:a+(n+1);l.appendChild(o)}}i=["&#173;",'<style id="s',a,'">',e,"</style>"].join("");l.id=a;(c?l:h).innerHTML+=i;h.appendChild(l);if(!c){h.style.background="";h.style.overflow="hidden";f=u.style.overflow;u.style.overflow="hidden";u.appendChild(h)}s=t(l,e);if(!c){h.parentNode.removeChild(h);u.style.overflow=f}else{l.parentNode.removeChild(l)}return!!s};d["csstransforms"]=function(){return!!x("transform")};d["csstransforms3d"]=function(){var e=!!x("perspective");if(e&&"webkitPerspective"in u.style){y("@media (transform-3d),(-webkit-transform-3d){#imageScrollModernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=t.offsetLeft===9&&t.offsetHeight===3})}return e};o.prefixed=function(e,t,n){if(!t){return x(e,"pfx")}else{return x(e,t,n)}};window.requestAnimationFrame=o.prefixed("requestAnimationFrame",window)||function(e,t){var n=(new Date).getTime();var r=Math.max(0,16-(n-v));var i=window.setTimeout(function(){e(n+r)},r);v=n+r;return i};if(d["csstransforms3d"]()){m="csstransforms3d"}else if(d["csstransforms"]()){m="csstransforms"}if(m!==""){g=o.prefixed("transform")}t=function(t,i){this.$imageHolder=e(t);this.settings=e.extend({},n,i);this.image=this.$imageHolder.data(this.settings.imageAttribute)||this.settings.image;this.mediaWidth=this.$imageHolder.data("width")||this.settings.mediaWidth;this.mediaHeight=this.$imageHolder.data("height")||this.settings.mediaHeight;this.coverRatio=this.$imageHolder.data("cover-ratio")||this.settings.coverRatio;this.holderMinHeight=this.$imageHolder.data("min-height")||this.settings.holderMinHeight;this.holderMaxHeight=this.$imageHolder.data("max-height")||this.settings.holderMaxHeight;this.extraHeight=this.$imageHolder.data("extra-height")||this.settings.extraHeight;this.ticking=false;this.refresh=s(this.refresh,this);this._onScroll=s(this._onScroll,this);this._defaults=n;this._name=r;this.init()};e.extend(t.prototype,{constructor:t,init:function(){if(this.image){this.$scrollingElement=e("<img/>",{src:this.image}).addClass(this.settings.imgClass)}else{throw new Error("You need to provide either a data-img attr or an image option")}if(this.settings.touch===true){this.$scrollingElement.css({maxWidth:"100%"}).prependTo(this.$imageHolder)}else if(this.settings.parallax===true){this.$scrollerHolder=e("<div/>",{html:this.$imageHolder.html()}).css({top:0,visibility:"hidden",position:"fixed",overflow:"hidden"}).addClass(this.settings.holderClass).prependTo(this.settings.container);this.$imageHolder.css("visibility","hidden").empty();this.$scrollingElement.css({position:"absolute",visibility:"hidden",maxWidth:"none"}).prependTo(this.$scrollerHolder)}else{this.$scrollerHolder=this.$imageHolder.css({overflow:"hidden"});this.$scrollingElement.css({position:"relative",overflow:"hidden"}).prependTo(this.$imageHolder)}if(this.settings.touch===false){this._bindEvents();this.refresh()}},_adjustImgHolderHeights:function(){var e=this.settings.windowObject.height(),t=this.settings.windowObject.width()-this.settings.container.offset().left,n=this.coverRatio*e,r,i,s,o,u,a,f,l,c;n=this.holderMaxHeight===null||this.holderMaxHeight>n?Math.floor(n):this.holderMaxHeight;n=this.holderMinHeight<n?Math.floor(n):this.holderMinHeight;n+=this.extraHeight;l=Math.floor(e-(e-n)*this.settings.speed);a=Math.round(this.mediaWidth*(l/this.mediaHeight));if(a>=t){f=l}else{a=t;f=Math.round(this.mediaHeight*(a/this.mediaWidth))}c=l-n;u=e+n;o=e*2*(1-this.settings.speed)-c;r=-(c/2+(f-l)/2);i=Math.round((a-t)*-.5);s=r-o/2;this.$scrollingElement.css({height:f,width:a});this.$imageHolder.height(n);this.$scrollerHolder.css({height:n,width:a});this.scrollingState={winHeight:e,fromY:s,imgTopPos:r,imgLeftPos:i,imgHolderHeight:n,imgScrollingDistance:o,travelDistance:u,holderDistanceFromTop:this.$imageHolder.offset().top-this.settings.windowObject.scrollTop()}},_bindEvents:function(){this.settings.windowObject.on("resize",this.refresh);if(this.settings.parallax===true){this.settings.windowObject.on("scroll",this._onScroll)}},_unBindEvents:function(){this.settings.windowObject.off("resize",this.refresh);if(this.settings.parallax===true){this.settings.windowObject.off("scroll",this._onScroll)}},_onScroll:function(){this.scrollingState.holderDistanceFromTop=this.$imageHolder.offset().top-this.settings.windowObject.scrollTop();this._requestTick()},_requestTick:function(){var e=this;if(!this.ticking){this.ticking=true;requestAnimationFrame(function(){e._updatePositions()})}},_updatePositions:function(){if(this.scrollingState.holderDistanceFromTop<=this.scrollingState.winHeight&&this.scrollingState.holderDistanceFromTop>=-this.scrollingState.imgHolderHeight){var e=this.scrollingState.holderDistanceFromTop+this.scrollingState.imgHolderHeight,t=e/this.scrollingState.travelDistance,n=Math.round(this.scrollingState.fromY+this.scrollingState.imgScrollingDistance*(1-t)),r=this.settings.container.offset().left;this.$scrollerHolder.css(this._getCSSObject({transform:g,left:r,x:Math.ceil(this.scrollingState.imgLeftPos)+(m===""&&r>0?r:0),y:Math.round(this.scrollingState.holderDistanceFromTop),visibility:"visible"}));this.$scrollingElement.css(this._getCSSObject({transform:g,x:0,y:n,visibility:"visible"}))}else{this.$scrollerHolder.css({visibility:"hidden"});this.$scrollingElement.css({visibility:"hidden"})}this.ticking=false},_updateFallbackPositions:function(){this.$scrollerHolder.css({width:"100%"});this.$scrollingElement.css({top:this.scrollingState.imgTopPos,left:this.scrollingState.imgLeftPos})},_getCSSObject:function(e){if(m==="csstransforms3d"){e.transform="translate3d("+e.x+"px, "+e.y+"px, 0)"}else if(m==="csstransforms"){e.transform="translate("+e.x+"px, "+e.y+"px)"}else{e.top=e.y;e.left=e.x}return e},enable:function(){if(this.settings.touch===false){this._bindEvents();this.refresh()}},disable:function(){if(this.settings.touch===false){this._unBindEvents()}},refresh:function(){if(this.settings.touch===false){this._adjustImgHolderHeights();if(this.settings.parallax===true){this._requestTick()}else{this._updateFallbackPositions()}}},destroy:function(){if(this.settings.touch===false){this._unBindEvents()}if(this.settings.touch===true){this.$imageHolder.removeAttr("style");this.$scrollingElement.remove()}else if(this.settings.parallax===true){this.$scrollerHolder.find("."+this.settings.imgClass).remove();this.$imageHolder.css({visibility:"visible",height:"auto"}).html(this.$scrollerHolder.html());this.$scrollerHolder.remove()}else{this.$imageHolder.css({overflow:"auto"}).removeAttr("style");this.$scrollingElement.remove()}this.$imageHolder.removeData()}});e.fn[r]=function(n){if(n===undefined||typeof n==="object"){return this.each(function(){if(!e.data(this,i)){e.data(this,i,new t(this,n))}})}else if(typeof n==="string"&&n[0]!=="_"&&n!=="init"){return this.each(function(){var r=e.data(this,i);if(r instanceof t&&typeof r[n]==="function"){r[n].apply(r,Array.prototype.slice.call(arguments,1))}})}};e.fn[r].defaults=t.defaults=n;e.fn[r].Plugin=t;return t})

/**
 * Parallax ImageScroll - jQuery plugin
 * Author: Peder A. Nielsen
 * Created date: 04.12.13
 * Updated date: 05.02.15
 * Version: 0.2.0
 * Company: Making Waves
 * Licensed under the MIT license
 */
;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {
    'use strict';

    var Plugin,
        defaults = {
            image: null,
            imageAttribute: 'image',
            holderClass: 'imageHolder',
            imgClass: 'img-holder-img',
            container: $('body'),
            windowObject: $(window),
            speed: 0.2,
            coverRatio: 0.75,
            holderMinHeight: 200,
            holderMaxHeight: null,
            extraHeight: 0,
            mediaWidth: 1600,
            mediaHeight: 900,
            parallax: true,
            touch: false
        },
        pluginName = 'imageScroll',
        dataKey = "plugin_" + pluginName,
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        },
        ImageScrollModernizr = {},
        docElement = document.documentElement,
        mod = 'imageScrollModernizr',
        modElem = document.createElement(mod),
        mStyle = modElem.style,
        omPrefixes = 'Webkit Moz O ms',
        cssomPrefixes = omPrefixes.split(' '),
        domPrefixes = omPrefixes.toLowerCase().split(' '),
        tests = {},
        lastTickTime = 0,
        supportedFeature = '',
        transformProperty,
        injectElementWithStyles = function (rule, callback, nodes, testnames) {

            var style, ret, node, docOverflow,
                div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

            if (parseInt(nodes, 10)) {
                while (nodes--) {
                    node = document.createElement('div');
                    node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
                    div.appendChild(node);
                }
            }

            style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
            div.id = mod;
            (body ? div : fakeBody).innerHTML += style;
            fakeBody.appendChild(div);
            if (!body) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
                docOverflow = docElement.style.overflow;
                docElement.style.overflow = 'hidden';
                docElement.appendChild(fakeBody);
            }

            ret = callback(div, rule);
            if (!body) {
                fakeBody.parentNode.removeChild(fakeBody);
                docElement.style.overflow = docOverflow;
            } else {
                div.parentNode.removeChild(div);
            }

            return !!ret;

        };

    function is(obj, type) {
        return typeof obj === type;
    }

    function contains(str, substr) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) {

                if (elem === false) return props[i];

                if (is(item, 'function')) {
                    return item.bind(elem || obj);
                }

                return item;
            }
        }
        return false;
    }

    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        if (is(prefixed, "string") || is(prefixed, "undefined")) {
            return testProps(props, prefixed);
        } else {
            props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
            return testDOMProps(props, prefixed, elem);
        }
    }

    tests['csstransforms'] = function () {
        return !!testPropsAll('transform');
    };

    tests['csstransforms3d'] = function () {

        var ret = !!testPropsAll('perspective');

        if (ret && 'webkitPerspective' in docElement.style) {

            injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#imageScrollModernizr{left:9px;position:absolute;height:3px;}}', function (node, rule) {
                ret = node.offsetLeft === 9 && node.offsetHeight === 3;
            });
        }
        return ret;
    };

    ImageScrollModernizr.prefixed = function (prop, obj, elem) {
        if (!obj) {
            return testPropsAll(prop, 'pfx');
        } else {
            return testPropsAll(prop, obj, elem);
        }
    };

    window.requestAnimationFrame = ImageScrollModernizr.prefixed('requestAnimationFrame', window) || function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTickTime));
        var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            },
            timeToCall);
        lastTickTime = currTime + timeToCall;
        return id;
    };

    if (tests['csstransforms3d']()) {
        supportedFeature = 'csstransforms3d';
    } else if (tests['csstransforms']()) {
        supportedFeature = 'csstransforms';
    }

    if (supportedFeature !== '') {
        transformProperty = ImageScrollModernizr.prefixed('transform');
    }

    // The actual plugin constructor
    Plugin = function (imageHolder, options) {
        this.$imageHolder = $(imageHolder);
        this.settings = $.extend({}, defaults, options);
        this.image = this.$imageHolder.data(this.settings.imageAttribute) || this.settings.image;
        this.mediaWidth = this.$imageHolder.data('width') || this.settings.mediaWidth;
        this.mediaHeight = this.$imageHolder.data('height') || this.settings.mediaHeight;
        this.coverRatio = this.$imageHolder.data('cover-ratio') || this.settings.coverRatio;
        this.holderMinHeight = this.$imageHolder.data('min-height') || this.settings.holderMinHeight;
        this.holderMaxHeight = this.$imageHolder.data('max-height') || this.settings.holderMaxHeight;
        this.extraHeight = this.$imageHolder.data('extra-height') || this.settings.extraHeight;
        this.ticking = false;
        this.refresh = __bind(this.refresh, this);
        this._onScroll = __bind(this._onScroll, this);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        constructor: Plugin,
        init: function () {
            if (this.image) {
                this.$scrollingElement = $('<img/>', {
                    src: this.image
                }).addClass(this.settings.imgClass);
            } else {
                throw new Error('You need to provide either a data-img attr or an image option');
            }

            if (this.settings.touch === true) {
                this.$scrollingElement.css({maxWidth: '100%'}).prependTo(this.$imageHolder);
            } else if (this.settings.parallax === true) {
                this.$scrollerHolder = $('<div/>', {
                    html: this.$imageHolder.html()
                }).css({
                    top: 0,
                    visibility: 'hidden',
                    position: 'fixed',
                    overflow: 'hidden'
                }).addClass(this.settings.holderClass).prependTo(this.settings.container);
                this.$imageHolder.css('visibility', 'hidden').empty();
                this.$scrollingElement.css({
                    position: 'absolute',
                    visibility: 'hidden',
                    maxWidth: 'none'
                }).prependTo(this.$scrollerHolder);
            } else {
                this.$scrollerHolder = this.$imageHolder.css({overflow: 'hidden'});
                this.$scrollingElement.css({position: 'relative', overflow: 'hidden'}).prependTo(this.$imageHolder);
            }

            if (this.settings.touch === false) {
                this._bindEvents();
                this.refresh();
            }
        },
        _adjustImgHolderHeights: function () {
            var winHeight = this.settings.windowObject.height(),
                winWidth = this.settings.windowObject.width() - this.settings.container.offset().left,
                imgHolderHeight = this.coverRatio * winHeight,
                imgTopPos,
                imgLeftPos,
                fromY,
                imgScrollingDistance,
                travelDistance,
                imgWidth,
                imgHeight,
                fakedImgHeight,
                imageDiff;
            imgHolderHeight = this.holderMaxHeight === null || this.holderMaxHeight > imgHolderHeight ? Math.floor(imgHolderHeight) : this.holderMaxHeight;
            imgHolderHeight = this.holderMinHeight < imgHolderHeight ? Math.floor(imgHolderHeight) : this.holderMinHeight;
            imgHolderHeight += this.extraHeight;
            fakedImgHeight = Math.floor(winHeight - (winHeight - imgHolderHeight) * this.settings.speed);
            imgWidth = Math.round(this.mediaWidth * (fakedImgHeight / this.mediaHeight));

            if (imgWidth >= winWidth) {
                imgHeight = fakedImgHeight;
            } else {
                imgWidth = winWidth;
                imgHeight = Math.round(this.mediaHeight * (imgWidth / this.mediaWidth));
            }

            imageDiff = fakedImgHeight - imgHolderHeight;
            travelDistance = winHeight + imgHolderHeight;
            imgScrollingDistance = (((winHeight * 2) * (1 - this.settings.speed)) - imageDiff);
            imgTopPos = -((imageDiff / 2) + ((imgHeight - fakedImgHeight) / 2));
            imgLeftPos = Math.round((imgWidth - winWidth) * -0.5);
            fromY = imgTopPos - (imgScrollingDistance / 2);

            this.$scrollingElement.css({
                height: imgHeight,
                width: imgWidth
            });
            this.$imageHolder.height(imgHolderHeight);

            this.$scrollerHolder.css({
                height: imgHolderHeight,
                width: imgWidth
            });

            this.scrollingState = {
                winHeight: winHeight,
                fromY: fromY,
                imgTopPos: imgTopPos,
                imgLeftPos: imgLeftPos,
                imgHolderHeight: imgHolderHeight,
                imgScrollingDistance: imgScrollingDistance,
                travelDistance: travelDistance,
                holderDistanceFromTop: this.$imageHolder.offset().top - this.settings.windowObject.scrollTop()
            };
        },
        _bindEvents: function () {
            this.settings.windowObject.on('resize', this.refresh);
            if (this.settings.parallax === true) {
                this.settings.windowObject.on('scroll', this._onScroll);
            }
        },
        _unBindEvents: function () {
            this.settings.windowObject.off('resize', this.refresh);
            if (this.settings.parallax === true) {
                this.settings.windowObject.off('scroll', this._onScroll);
            }
        },
        _onScroll: function () {
            this.scrollingState.holderDistanceFromTop = this.$imageHolder.offset().top - this.settings.windowObject.scrollTop();
            this._requestTick();
        },
        _requestTick: function () {
            var self = this;
            if (!this.ticking) {
                this.ticking = true;
                requestAnimationFrame(function () {
                    self._updatePositions();
                });
            }
        },
        _updatePositions: function () {
            if (this.scrollingState.holderDistanceFromTop <= (this.scrollingState.winHeight) && this.scrollingState.holderDistanceFromTop >= -this.scrollingState.imgHolderHeight) {
                var distanceFromTopAddedWinHeight = this.scrollingState.holderDistanceFromTop + this.scrollingState.imgHolderHeight,
                    distanceInPercent = distanceFromTopAddedWinHeight / this.scrollingState.travelDistance,
                    currentImgYPosition = Math.round(this.scrollingState.fromY + (this.scrollingState.imgScrollingDistance * (1 - distanceInPercent))),
                    leftOffset = this.settings.container.offset().left;

                this.$scrollerHolder.css(this._getCSSObject({
                    transform: transformProperty,
                    left: leftOffset,
                    x: Math.ceil(this.scrollingState.imgLeftPos) + (supportedFeature === '' && leftOffset > 0 ? leftOffset : 0),
                    y: Math.round(this.scrollingState.holderDistanceFromTop),
                    visibility: 'visible'
                }));

                this.$scrollingElement.css(this._getCSSObject({
                    transform: transformProperty,
                    x: 0,
                    y: currentImgYPosition,
                    visibility: 'visible'
                }));
            } else {
                this.$scrollerHolder.css({visibility: 'hidden'});
                this.$scrollingElement.css({visibility: 'hidden'});
            }

            this.ticking = false;
        },
        _updateFallbackPositions: function () {
            this.$scrollerHolder.css({width: '100%'});
            this.$scrollingElement.css({
                top: this.scrollingState.imgTopPos,
                left: this.scrollingState.imgLeftPos
            });
        },
        _getCSSObject: function (options) {
            if (supportedFeature === "csstransforms3d") {
                options.transform = "translate3d(" + options.x + "px, " + options.y + "px, 0)";
            } else if (supportedFeature === "csstransforms") {
                options.transform = "translate(" + options.x + "px, " + options.y + "px)";
            } else {
                options.top = options.y;
                options.left = options.x;
            }
            return options;
        },
        enable: function () {
            if (this.settings.touch === false) {
                this._bindEvents();
                this.refresh();
            }
        },
        disable: function () {
            if (this.settings.touch === false) {
                this._unBindEvents();
            }
        },
        refresh: function () {
            if (this.settings.touch === false) {
                this._adjustImgHolderHeights();
                if (this.settings.parallax === true) {
                    this._requestTick();
                } else {
                    this._updateFallbackPositions();
                }
            }
        },
        destroy: function () {
            //clean up events
            if (this.settings.touch === false) {
                this._unBindEvents();
            }

            //restore initial html structure
            if (this.settings.touch === true) {
                this.$imageHolder.removeAttr('style');
                this.$scrollingElement.remove();
            } else if (this.settings.parallax === true) {
                this.$scrollerHolder.find('.' + this.settings.imgClass).remove();
                this.$imageHolder.css({visibility: 'visible', height: 'auto'}).html(this.$scrollerHolder.html());
                this.$scrollerHolder.remove();
            } else {
                this.$imageHolder.css({overflow: 'auto'}).removeAttr('style');
                this.$scrollingElement.remove();
            }

            // Remove data
            this.$imageHolder.removeData();
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, dataKey)) {
                    // Create a new instance for each element in the matched jQuery set
                    // Also save the instance so it can be accessed later to use methods/properties etc
                    // e.g.
                    //    var instance = $('.img-holder').data('plugin_imageScroll');
                    //    instance.refresh();
                    $.data(this, dataKey, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            // Invoke the specified method on each selected element
            return this.each(function () {
                var instance = $.data(this, dataKey);
                // e.g.
                //    var instance = $('.img-holder');
                //    instance.imageScroll('refresh');
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
                }
            });
        }
    };

    // Expose defaults and Constructor (allowing overriding of prototype methods for example)
    $.fn[pluginName].defaults = Plugin.defaults = defaults;
    $.fn[pluginName].Plugin = Plugin;

    return Plugin;
}));