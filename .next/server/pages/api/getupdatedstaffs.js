"use strict";
(() => {
var exports = {};
exports.id = 9758;
exports.ids = [9758,2218,2643];
exports.modules = {

/***/ 4285:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4688);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

 // ! entry point of get endpoint

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "GET") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.headers["x-registration-no"], req.headers["x-user-email"]);
  const staff = (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_1__/* .mutateContactNumber */ .D)(await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.staff.findMany */ ._.staff.findMany({
    where: {
      registration_no: req.headers["x-registration-no"],
      email: {
        not: req.headers["x-user-email"]
      }
    },
    select: {
      mobile_no: true,
      name: true,
      email: true,
      role: true,
      status: true,
      joined_on: true,
      last_updated: true
    },
    orderBy: {
      joined_on: "desc"
    }
  }));
  return res.status(200).json(staff);
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
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(4285)));
module.exports = __webpack_exports__;

})();