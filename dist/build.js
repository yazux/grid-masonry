/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GridMasonry; });
let GridMasonry = class GridMasonry {
  constructor(opt) {
    this.opt = opt;
    this.items = [];
    this.requiredOpt = ['containerClass', 'itemClass', 'itemContentClass', 'gridRowGap', 'gridColumnGap', 'itemMinWith', 'itemMaxWith'];
    this.checkOptions();
  }

  /**
   * Запускает необходимые методы для работы
  */
  init() {
    this.items = [];
    this.checkOptions();
    this.findItems().then(() => {
      this.bindStyles();
      this.resizeItems();
    });;
    this.listenEvent();
  }

  /**
   * Проверяет переданы ли обязательные параметры
  */
  checkOptions() {
    this.requiredOpt.map(key => {
      if (!this.opt[key]) throw new Error("Required property '" + key + "' is not defined. " + "You should define that property before call 'init' method.");
    });
  }

  /**
   * Находит все элементы внутри списка
  */
  findItems() {
    this.container = document.querySelector(this.opt.containerClass);
    if (!this.container) throw new Error("Container with class '" + this.opt.containerClass + "' is not find.");
    return new Promise((resolve, reject) => {
      this.items = this.container.querySelectorAll(this.opt.itemClass);
      resolve(this.items);
    });
  }

  /**
   * Добавляет к контейнеру и элементам grid стили
  */
  bindStyles() {
    if (!this.items || !(this.items instanceof NodeList) || !this.items.length) return;
    this.container.style.display = 'grid';
    this.container.style.gridRowGap = this.opt.gridRowGap;
    this.container.style.gridColumnGap = this.opt.gridColumnGap;
    this.container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(' + this.opt.itemMinWith + ', ' + this.opt.itemMaxWith + '))';
    //this.container.style.gridTemplateRows = 'none';
    //this.container.style.gridTemplateRows = 'repeat(auto-fill, minmax(0px, max-content))';
    this.container.style.gridAutoRows = '0';

    this.items.forEach(item => {
      //item.style.gridAutoRows = 'repeat(auto-fill, minmax(1px, 1fr))';
      item.style.gridAutoRows = 0;
      item.style.gridAutoColumns = 0;
    });
  }

  /**
   * Изменяет размер каждого элемента, в зависимости от его наполнения
  */
  resizeItems() {
    if (!this.items || !(this.items instanceof NodeList) || !this.items.length) return;
    let rowGap = parseInt(window.getComputedStyle(this.container).getPropertyValue('grid-row-gap')),
        rowHeight = parseInt(window.getComputedStyle(this.container).getPropertyValue('grid-auto-rows'));
    this.items.forEach(item => {
      let itemContent = item.querySelector(this.opt.itemContentClass),
          rowSpan = 0;
      if (!itemContent) throw new Error("All grid items must contents 'div' element with class '" + this.opt.itemContentClass + "'.");
      rowSpan = Math.ceil((itemContent.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      //rowSpan = Math.ceil((itemContent.getBoundingClientRect().height)/(rowHeight));
      item.style.gridRowEnd = 'span ' + rowSpan;
    });
  }

  /**
   * Слушает события изменения страницы и запускает ресайз повторно
  */
  listenEvent() {
    ['load', 'resize'].map(event => window.addEventListener(event, e => this.resizeItems()));
  }
};
window.GridMasonry = GridMasonry;


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map