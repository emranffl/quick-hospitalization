"use strict";
(() => {
var exports = {};
exports.id = 1734;
exports.ids = [1734,2218,2643,3918];
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

/***/ 436:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9440);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6972);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



const staffLoginSchema = (0,yup__WEBPACK_IMPORTED_MODULE_0__.object)().shape({
  email: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().email(),
  password: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().min(4).max(25)
}),
      findStaff = async email => {
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__/* .prisma.staff.findUnique */ ._.staff.findUnique({
    where: {
      email
    }
  });
}; // ! entry point of get endpoint


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.body.data);

  try {
    // form data type validation
    await staffLoginSchema.validate(req.body.data, {
      abortEarly: false
    });
    const staff = await findStaff(req.body.data.email); // staff existence

    if (staff == null) return res.status(200).json({
      staff: "Staff not found! Ask admin to add first."
    }); // staff status check

    if (staff.status === "Inactive") return res.status(200).json({
      staff: "Staff is currently inactive! Contact admin for further inquiries."
    }); // credential check

    console.log(staff.password, req.body.data.password);
    if (staff.password === req.body.data.password) // todo redirect staff with session
      return res.json(staff);
    req.body.data.password != undefined ? res.status(200).json({
      error: "Password not valid!"
    }) : res.status(406).json({
      message: "Invalid data format!"
    });
    return;
  } catch (error) {
    return res.status(406).json(error);
  }
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

/***/ 9440:
/***/ ((module) => {

module.exports = require("yup");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(436));
module.exports = __webpack_exports__;

})();