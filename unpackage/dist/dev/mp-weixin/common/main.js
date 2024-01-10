(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!*********************************!*\
  !*** E:/demo/myQQ/myQQ/main.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, uni, createApp) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 27));
var _store = _interopRequireDefault(__webpack_require__(/*! @/store/store.js */ 35));
var _requestMiniprogram = __webpack_require__(/*! @escook/request-miniprogram */ 38);
var _imageTools = __webpack_require__(/*! image-tools */ 39);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
uni.$http = _requestMiniprogram.$http;
uni.pathToBase64 = _imageTools.pathToBase64;
uni.base64ToPath = _imageTools.base64ToPath;

// 请求的根路径
_requestMiniprogram.$http.baseUrl = 'http://127.0.0.1:8080';

// 请求拦截器
_requestMiniprogram.$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...'
  });

  // 检测是否需要权限
  if (options.url.indexOf('/api/') === -1) {
    options.header = {
      Authorization: _store.default.state.m_user.token
    };
  }
};

// 响应拦截器
_requestMiniprogram.$http.afterRequest = function (e) {
  wx.hideLoading();
  if (e.data.message === "身份认证失败！") {
    uni.switchTab({
      url: '/pages/my/my',
      complete: function complete() {
        uni.setStorageSync('token', '');
        uni.setStorageSync('userinfo', '');
      }
    });
  }
};

// 封装请求失败后的弹窗
uni.showMsg = function () {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '数据请求失败';
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    duration: duration,
    icon: 'none'
  });
};
_vue.default.config.productionTip = false;
_App.default.mpType = 'app';
uni.$showMsg = function () {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '数据请求失败';
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    duration: duration,
    icon: 'none'
  });
};
var app = new _vue.default(_objectSpread(_objectSpread({}, _App.default), {}, {
  store: _store.default
}));
createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createApp"]))

/***/ }),

/***/ 27:
/*!*********************************!*\
  !*** E:/demo/myQQ/myQQ/App.vue ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 28);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../HBuilderX/HBuilderX.3.98.2023112510/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);
var render, staticRenderFns, recyclableRender, components
var renderjs




/* normalize component */

var component = Object(_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 28:
/*!**********************************************************!*\
  !*** E:/demo/myQQ/myQQ/App.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX.3.98.2023112510/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX/HBuilderX.3.98.2023112510/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../HBuilderX/HBuilderX.3.98.2023112510/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../HBuilderX/HBuilderX.3.98.2023112510/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../HBuilderX/HBuilderX.3.98.2023112510/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 29);
/* harmony import */ var _HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_HBuilderX_3_98_2023112510_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 29:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/demo/myQQ/myQQ/App.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 30));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 32));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 33);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    return {
      socketOpen: false
    };
  },
  computed: _objectSpread({}, (0, _vuex.mapState)('m_user', ['token', 'userinfo'])),
  methods: _objectSpread(_objectSpread({}, (0, _vuex.mapMutations)('m_chat', ['updateChatMessage'])), {}, {
    // 页面一打开就发送一个无返回参数的网络请求，用于检测token是否过期
    detectToken: function detectToken() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var res;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.token === '')) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                _context.next = 4;
                return uni.$http.get('/cs');
              case 4:
                res = _context.sent;
                if (res.data.status !== 0) {
                  uni.setStorageSync('token', '');
                  uni.setStorageSync('userinfo', '');
                  uni.switchTab({
                    url: '/pages/my/my'
                  });
                }
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    // 页面进入调用接口，更新登录时间，以便于后续猜测是否还在登录
    showPage: function showPage() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.token !== '')) {
                  _context2.next = 3;
                  break;
                }
                _context2.next = 3;
                return uni.$http.post('/userinfo/showpage');
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 页面进入后台调用接口，服务端开启定时器，猜测是否还在登录
    hidePage: function hidePage() {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return uni.$http.post('/userinfo/hidepage');
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 页面进入，连接websocket
    connSocket: function connSocket() {
      var _this3 = this;
      // 没有token，说明没有登录，就不需要链接websocket了
      if (this.token === '') return;
      uni.connectSocket({
        url: 'ws://127.0.0.1:8001'
      });
      uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
        _this3.socketOpen = true;
        var data = {
          value: '用户加入聊天',
          id: _this3.userinfo.user_id
        };
        if (_this3.socketOpen === true) {
          uni.sendSocketMessage({
            data: JSON.stringify(data)
          });

          // uni.onSocketMessage((res) =>{
          //   console.log('收到服务器内容：' + res.data);
          //   this.updateChatMessage(res.data)
          // })
        }
      });

      uni.onSocketError(function (res) {
        _this3.socketOpen = false;
        console.log('WebSocket连接打开失败，请检查！');
      });
    },
    // 离开页面，断开websocket
    disconnSocket: function disconnSocket() {
      var _this4 = this;
      uni.closeSocket();
      uni.onSocketClose(function (res) {
        _this4.socketOpen = false;
        console.log('WebSocket 已关闭！');
      });
    }
  }),
  onShow: function onShow() {
    this.detectToken(), this.showPage(), this.connSocket();
  },
  onHide: function onHide() {
    if (this.token !== '') {
      this.disconnSocket();
      this.hidePage();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map