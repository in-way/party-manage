webpackJsonp([14],{

/***/ "./node_modules/@mshare/mshareui-html/sass/weui.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/@share/bundle/dist/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

/*! version：2.0.0 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__("./node_modules/react/index.js"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["BUNDLE"] = factory(require("react"));
	else
		root["BUNDLE"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by liaoyf on 2017/6/13 0013.
 */


var Bundle = function (_Component) {
    _inherits(Bundle, _Component);

    function Bundle() {
        _classCallCheck(this, Bundle);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.state = {
            mod: null
        };
        return _this;
    }

    Bundle.prototype.componentWillMount = function componentWillMount() {
        this.load(this.props);
    };

    Bundle.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    };

    Bundle.prototype.load = function load(props) {
        var _this2 = this;

        this.setState({
            mod: null
        });
        props.load(function (mod) {
            _this2.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        });
    };

    Bundle.prototype.render = function render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    };

    return Bundle;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Bundle);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map

/***/ }),

/***/ "./node_modules/@share/scurd/mMain.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hotcss__ = __webpack_require__("./node_modules/hotcss/src/hotcss.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hotcss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hotcss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_font_awesome_css_font_awesome_css__ = __webpack_require__("./node_modules/font-awesome/css/font-awesome.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_font_awesome_css_font_awesome_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_font_awesome_css_font_awesome_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mshare_mshareui_html__ = __webpack_require__("./node_modules/@mshare/mshareui-html/sass/weui.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mshare_mshareui_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mshare_mshareui_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_weui_build_packages_react_weui_css__ = __webpack_require__("./node_modules/react-weui/build/packages/react-weui.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_weui_build_packages_react_weui_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_weui_build_packages_react_weui_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_m_sass_public_scss__ = __webpack_require__("./node_modules/@share/scurd/static/m/sass/public.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__static_m_sass_public_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__static_m_sass_public_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__("./node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_router_dom__ = __webpack_require__("./node_modules/react-router-dom/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__share_bundle__ = __webpack_require__("./node_modules/@share/bundle/dist/bundle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__share_bundle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__share_bundle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_bundle_loader_lazy_name_js_mQueryPage_block_m_query_main_m_query_main__ = __webpack_require__("./node_modules/bundle-loader/index.js?lazy&name=js/mQueryPage!./node_modules/@share/scurd/block/m_query_main/m_query_main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_bundle_loader_lazy_name_js_mQueryPage_block_m_query_main_m_query_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_bundle_loader_lazy_name_js_mQueryPage_block_m_query_main_m_query_main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_bundle_loader_lazy_name_js_mAddPage_block_m_add_main_m_add_main__ = __webpack_require__("./node_modules/bundle-loader/index.js?lazy&name=js/mAddPage!./node_modules/@share/scurd/block/m_add_main/m_add_main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_bundle_loader_lazy_name_js_mAddPage_block_m_add_main_m_add_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_bundle_loader_lazy_name_js_mAddPage_block_m_add_main_m_add_main__);












var mQueryPage = function mQueryPage() {
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_8__share_bundle___default.a,
        { load: __WEBPACK_IMPORTED_MODULE_9_bundle_loader_lazy_name_js_mQueryPage_block_m_query_main_m_query_main___default.a },
        function (MQueryPage) {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(MQueryPage, null);
        }
    );
};

var mAddPage = function mAddPage() {
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_8__share_bundle___default.a,
        { load: __WEBPACK_IMPORTED_MODULE_10_bundle_loader_lazy_name_js_mAddPage_block_m_add_main_m_add_main___default.a },
        function (MAddPage) {
            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(MAddPage, null);
        }
    );
};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_7_react_router_dom__["HashRouter"],
    null,
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { className: 'ui-full-page' },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_router_dom__["Route"], { exact: true, path: '/', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_router_dom__["withRouter"])(mQueryPage) }),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_router_dom__["Route"], { exact: true, path: '/add', component: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_react_router_dom__["withRouter"])(mAddPage) })
    )
), document.getElementById('root'));

/***/ }),

/***/ "./node_modules/@share/scurd/static/m/sass/public.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/bundle-loader/index.js?lazy&name=js/mAddPage!./node_modules/@share/scurd/block/m_add_main/m_add_main.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	__webpack_require__.e/* require.ensure */(2).then((function(require) {
		cb(__webpack_require__("./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"env\",{\"targets\":{\"browsers\":[\"> 1%\",\"ie >= 9\"]},\"modules\":false,\"useBuiltIns\":true,\"debug\":true,\"loose\":true}],\"react\"],\"plugins\":[\"transform-object-rest-spread\",\"transform-export-extensions\",\"transform-class-properties\"]}!./node_modules/@share/scurd/block/m_add_main/m_add_main.js"));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ }),

/***/ "./node_modules/bundle-loader/index.js?lazy&name=js/mQueryPage!./node_modules/@share/scurd/block/m_query_main/m_query_main.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	__webpack_require__.e/* require.ensure */(1).then((function(require) {
		cb(__webpack_require__("./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"env\",{\"targets\":{\"browsers\":[\"> 1%\",\"ie >= 9\"]},\"modules\":false,\"useBuiltIns\":true,\"debug\":true,\"loose\":true}],\"react\"],\"plugins\":[\"transform-object-rest-spread\",\"transform-export-extensions\",\"transform-class-properties\"]}!./node_modules/@share/scurd/block/m_query_main/m_query_main.js"));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ }),

/***/ "./node_modules/font-awesome/css/font-awesome.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/hotcss/src/hotcss.js":
/***/ (function(module, exports) {

(function( window , document ){

	'use strict';

	//给hotcss开辟个命名空间，别问我为什么，我要给你准备你会用到的方法，免得用到的时候还要自己写。
	var hotcss = {};

	(function() {
        //根据devicePixelRatio自定计算scale
        //可以有效解决移动端1px这个世纪难题。
        var viewportEl = document.querySelector('meta[name="viewport"]'),
            hotcssEl = document.querySelector('meta[name="hotcss"]'),
            dpr = window.devicePixelRatio || 1,
            maxWidth = 540,
            designWidth = 0;

        dpr = dpr >= 3 ? 3 : ( dpr >=2 ? 2 : 1 );

        //允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
        if (hotcssEl) {
            var hotcssCon = hotcssEl.getAttribute('content');
            if (hotcssCon) {
                var initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
                if (initialDprMatch) {
                    dpr = parseFloat(initialDprMatch[1]);
                }
                var maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/);
                if (maxWidthMatch) {
                    maxWidth = parseFloat(maxWidthMatch[1]);
                }
                var designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/);
                if (designWidthMatch) {
                    designWidth = parseFloat(designWidthMatch[1]);
                }
            }
        }

        document.documentElement.setAttribute('data-dpr', dpr);
        hotcss.dpr = dpr;

        document.documentElement.setAttribute('max-width', maxWidth);
        hotcss.maxWidth = maxWidth;

        if( designWidth ){
            document.documentElement.setAttribute('design-width', designWidth);
            hotcss.designWidth = designWidth;
        }

        var scale = 1 / dpr,
            content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

        if (viewportEl) {
            viewportEl.setAttribute('content', content);
        } else {
            viewportEl = document.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            viewportEl.setAttribute('content', content);
            document.head.appendChild(viewportEl);
        }

    })();

	hotcss.px2rem = function( px , designWidth ){
		//预判你将会在JS中用到尺寸，特提供一个方法助你在JS中将px转为rem。就是这么贴心。
		if( !designWidth ){
			//如果你在JS中大量用到此方法，建议直接定义 hotcss.designWidth 来定义设计图尺寸;
			//否则可以在第二个参数告诉我你的设计图是多大。
			designWidth = parseInt(hotcss.designWidth , 10);
		}

		return parseInt(px,10)*320/designWidth/20;
	}

	hotcss.rem2px = function( rem , designWidth ){
		//新增一个rem2px的方法。用法和px2rem一致。
		if( !designWidth ){
			designWidth = parseInt(hotcss.designWidth , 10);
		}
		//rem可能为小数，这里不再做处理了
		return rem*20*designWidth/320;
	}

	hotcss.mresize = function(){
		//对，这个就是核心方法了，给HTML设置font-size。
		var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

        if( hotcss.maxWidth && (innerWidth/hotcss.dpr > hotcss.maxWidth) ){
            innerWidth = hotcss.maxWidth*hotcss.dpr;
        }

		if( !innerWidth ){ return false;}

		document.documentElement.style.fontSize = ( innerWidth*20/320 ) + 'px';

        hotcss.callback && hotcss.callback();

	};

	hotcss.mresize(); 
	//直接调用一次

	window.addEventListener( 'resize' , function(){
		clearTimeout( hotcss.tid );
		hotcss.tid = setTimeout( hotcss.mresize , 33 );
	} , false ); 
	//绑定resize的时候调用

	window.addEventListener( 'load' , hotcss.mresize , false ); 
	//防止不明原因的bug。load之后再调用一次。


	setTimeout(function(){
		hotcss.mresize(); 
		//防止某些机型怪异现象，异步再调用一次
	},333)

	window.hotcss = hotcss; 
	//命名空间暴露给你，控制权交给你，想怎么调怎么调。


})( window , document );

/***/ }),

/***/ "./node_modules/react-weui/build/packages/react-weui.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["./node_modules/@share/scurd/mMain.js"]);
//# sourceMappingURL=../sourceMap/mQuery.map