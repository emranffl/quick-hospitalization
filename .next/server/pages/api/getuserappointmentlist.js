"use strict";
(() => {
var exports = {};
exports.id = 9605;
exports.ids = [9605,2218,2643,3918];
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

/***/ 482:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// ! entry point of get endpoint
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "GET") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  return res.status(200).json(await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.appointment.findMany */ ._.appointment.findMany({
    where: {
      user_mobile_no: req.headers["x-user"].substring(1),
      doctor: {
        email: req.headers["x-doctor"]
      },
      OR: [{
        status: "Confirmed"
      }, {
        status: "Requested"
      }]
    }
  }));
  return res.status(406).json({
    message: "Invalid data format!"
  });
}); // ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete

const config = {
  api: {
    externalResolver: true
  }
};

/***/ }),

/***/ 212:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(482));
module.exports = __webpack_exports__;

})();