"use strict";
exports.id = 4394;
exports.ids = [4394];
exports.modules = {

/***/ 6972:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(212);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);
 // add prisma to the NodeJS global type

const prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
if (false) {}


/***/ }),

/***/ 4688:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ mutateContactNumber),
/* harmony export */   "L": () => (/* binding */ mutateDateTimeString)
/* harmony export */ });
const mutateContactNumber = (object, subtractive = false) => {
  if (object == null) return null;
  Object.keys(object).map(key => {
    if (typeof object[key] != "object" && (key == "mobile_no" || key == "phone_no" || key == "user_mobile_no")) subtractive ? object[key] = object[key].substring(1, object[key].length) : object[key] = `0${object[key]}`;else if (typeof object[key] == "object") mutateContactNumber(object[key], subtractive);
  });
  return object;
},
      mutateDateTimeString = object => {
  if (object == null) return null;
  Object.keys(object).map(key => {
    if (typeof object[key] != "object" && (key == "start_time" || key == "end_time")) object[key] = new Date(object[key]);else if (typeof object[key] == "object") mutateDateTimeString(object[key]);
  });
  return object;
};



/***/ })

};
;