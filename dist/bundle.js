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
/******/ 	__webpack_require__.p = "";
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_Network__ = __webpack_require__(1);


const canvas = document.getElementById('neural-net')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
ctx.translate(canvas.width / 2, canvas.height / 2)

const network = new __WEBPACK_IMPORTED_MODULE_0__modules_Network__["a" /* default */]([3, 15, 10])

network.input([1, 2, 3])

network.forward()

network.draw(ctx)


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layer__ = __webpack_require__(2);


class Network {
  constructor (layers) {
    this.layers = layers.map(neurons => new __WEBPACK_IMPORTED_MODULE_0__Layer__["a" /* default */](neurons))
    this.spacingX = 200
    this.spacingY = 40

    this.layers.forEach((layer, index) => {
      if (this.layers[index - 1]) {
        layer.connect(this.layers[index - 1])
      }
    })
  }

  input (values) {
    this.layers[0].input(values)
  }

  draw (ctx) {
    ctx.translate(-this.spacingX * this.layers.length / 2, 0)

    this.layers.forEach((layer, layerIndex) => {
      ctx.save()
      ctx.translate(0, -this.spacingY * layer.neurons.length / 2)

      layer.neurons.forEach((neuron, neuronIndex) => {
        ctx.beginPath()
        ctx.arc(layerIndex * this.spacingX, neuronIndex * this.spacingY, 4, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        neuron.connections.forEach((connection, connectionIndex) => {
          ctx.beginPath()
          ctx.moveTo(layerIndex * this.spacingX, neuronIndex * this.spacingY)
          ctx.lineTo((layerIndex - 1) * this.spacingX, (connectionIndex * this.spacingY) - ((this.layers[layerIndex - 1].neurons.length - layer.neurons.length) * this.spacingY / 2 ) )
          const opacity = ((connection.weight + 0.5) * 0.75) + 0.25
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.closePath()
        })

        ctx.font = "12px Arial";
        ctx.strokeStyle='rgb(255,0,0)'
        ctx.strokeText(neuron.value, layerIndex * this.spacingX + 8, neuronIndex * this.spacingY);

      })

      ctx.restore()
    })
  }

  forward () {
    this.layers.forEach(layer => layer.forward())
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Network);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Neuron__ = __webpack_require__(3);


class Layer {
  constructor (neurons) {
    this.neurons = []
    for (var i = 0; i < neurons; i++) {
      this.neurons.push(new __WEBPACK_IMPORTED_MODULE_0__Neuron__["a" /* default */]())
    }
  }

  connect (targetLayer) {
    this.neurons.forEach(neuron => {
      targetLayer.neurons.forEach(targetNeuron => {
        neuron.connect(targetNeuron)
      })
    })
  }

  input (values) {
    this.neurons.forEach((neuron, index) => neuron.input(values[index]))
  }

  forward () {
    this.neurons.forEach(neuron => neuron.forward())
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Layer);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Neuron {
  constructor () {
    this.connections = []
    this.value = 0
  }

  connect (targetNeuron) {
    this.connections.push({
      targetNeuron: targetNeuron,
      weight: Math.random() - 0.5
    })
  }

  input (value) {
    this.value = value
  }

  forward () {
    if (this.connections.length === 0) {
      return
    }

    this.value = this.sigmoid(this.connections.reduceRight((sum, connection) => (sum + connection.targetNeuron.value * connection.weight), 0))
  }

  sigmoid (value) {
    return 1 / (1 + Math.exp(-value))
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Neuron);


/***/ })
/******/ ]);