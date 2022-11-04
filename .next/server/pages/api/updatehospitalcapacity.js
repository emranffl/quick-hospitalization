"use strict";
(() => {
var exports = {};
exports.id = 1336;
exports.ids = [1336,2218,2643,3918];
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

/***/ 8315:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9457);
/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deep_object_diff__WEBPACK_IMPORTED_MODULE_1__);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



const updateCapacity = async (registration_no, updatedCapacity, bed_type) => {
  return _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.$transaction */ ._.$transaction([_functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.capacity.update */ ._.capacity.update({
    where: {
      registration_no
    },
    data: updatedCapacity
  }), _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.hospital.update */ ._.hospital.update({
    where: {
      registration_no
    },
    data: {
      bed_type
    }
  })]);
}; // ! entry point of get endpoint


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.body, (0,deep_object_diff__WEBPACK_IMPORTED_MODULE_1__.updatedDiff)(req.body.capacity, req.body.newCapacity));
  const bedTypes = {
    ward: "Ward",
    special_ward: "Special Ward",
    cabin: "Cabin",
    vip_cabin: "VIP Cabin",
    icu: "ICU",
    ccu: "CCU",
    hdu: "HDU",
    hfncu: "HFNCU",
    emergency: "Emergency",
    covidu: "COVIDU",
    extra: "Extra"
  },
        newBedTypes = [];
  Object.keys(req.body.newCapacity).filter(el => el.indexOf("registration_no") == -1).filter(el => el.indexOf("total_capacity") == -1).map(el => {
    if (req.body.newCapacity[el] != null) {
      newBedTypes.push(bedTypes[el]);
    }
  });
  return res.status(200).json(await updateCapacity(req.body.capacity.registration_no, (0,deep_object_diff__WEBPACK_IMPORTED_MODULE_1__.updatedDiff)(req.body.capacity, req.body.newCapacity), newBedTypes.join(",")));
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

/***/ }),

/***/ 9457:
/***/ ((module) => {

module.exports = require("deep-object-diff");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8315));
module.exports = __webpack_exports__;

})();