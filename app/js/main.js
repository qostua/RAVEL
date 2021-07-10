!function(e){var n={};function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)r.d(t,a,function(n){return e[n]}.bind(null,a));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s="./src/js/main.js")}({"./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */function(module,exports){eval("function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar banner = document.querySelector('.promo__banner');\nvar slogans = document.querySelectorAll('.promo__slogan');\nvar bannerBtnNext = document.querySelector('.promo__pag-btn--right');\nvar bannerBtnPrevious = document.querySelector('.promo__pag-btn--left');\nvar pagNumber = document.querySelector('.promo__pag-number');\nvar slideNum = slogans.length;\n\nvar getCurrentNum = function getCurrentNum() {\n  for (var i = 1; i <= slideNum; i++) {\n    var bannerClass = 'promo__banner--' + i;\n\n    if (banner.classList.contains(bannerClass)) {\n      return i;\n    }\n\n    ;\n  }\n};\n\nvar makeBannerClass = function makeBannerClass(num) {\n  return 'promo__banner--' + num;\n};\n\nvar currentNum = getCurrentNum();\n\nbannerBtnPrevious.onclick = function () {\n  if (currentNum > 1) {\n    bannerBtnPrevious.classList.remove('btn--pag-disable');\n    banner.classList.remove(makeBannerClass(currentNum));\n    banner.classList.add(makeBannerClass(currentNum - 1));\n    currentNum--;\n    pagNumber.textContent = '0' + currentNum;\n  }\n\n  if (currentNum == 1) {\n    bannerBtnPrevious.classList.add('btn--pag-disable');\n  }\n\n  if (currentNum < 3) {\n    bannerBtnNext.classList.remove('btn--pag-disable');\n  }\n};\n\nbannerBtnNext.onclick = function () {\n  if (currentNum < 3) {\n    bannerBtnNext.classList.remove('btn--pag-disable');\n    banner.classList.remove(makeBannerClass(currentNum));\n    banner.classList.add(makeBannerClass(currentNum + 1));\n    currentNum++;\n    pagNumber.textContent = '0' + currentNum;\n  }\n\n  if (currentNum == 3) {\n    bannerBtnNext.classList.add('btn--pag-disable');\n  }\n\n  if (currentNum > 1) {\n    bannerBtnPrevious.classList.remove('btn--pag-disable');\n  }\n};\n\nvar reviewsBtns = document.querySelectorAll('.reviews__slider-pag-btn');\nvar reviews = document.querySelectorAll('.reviews__slider-item');\n\nvar makeAllReviewsBtnsDisable = function makeAllReviewsBtnsDisable() {\n  var _iterator = _createForOfIteratorHelper(reviewsBtns),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var reviewsBtn = _step.value;\n      reviewsBtn.classList.remove('reviews__slider-pag-btn--active');\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n};\n\nvar showReview = function showReview(num) {\n  reviews[num].classList.add('reviews__slider-item--show');\n};\n\nvar hideReview = function hideReview() {\n  var _iterator2 = _createForOfIteratorHelper(reviews),\n      _step2;\n\n  try {\n    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n      var review = _step2.value;\n      review.classList.remove('reviews__slider-item--show');\n    }\n  } catch (err) {\n    _iterator2.e(err);\n  } finally {\n    _iterator2.f();\n  }\n};\n\nvar makeReviewsBtnActive = function makeReviewsBtnActive(reviewsBtn, i) {\n  reviewsBtn.addEventListener('click', function () {\n    makeAllReviewsBtnsDisable();\n    reviewsBtn.classList.add('reviews__slider-pag-btn--active');\n    hideReview();\n    showReview(i);\n  });\n};\n\nfor (var i = 0; i < reviewsBtns.length; i++) {\n  makeReviewsBtnActive(reviewsBtns[i], i);\n}\n\n//# sourceURL=webpack:///./src/js/main.js?")}});