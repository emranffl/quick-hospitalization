"use strict";
(() => {
var exports = {};
exports.id = 8143;
exports.ids = [8143,2218,2643,3918];
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

/***/ 1261:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var _api_getdoctorlist__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9032);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



const findDoctor = async email => {
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.doctor.findUnique */ ._.doctor.findUnique({
    where: {
      email
    }
  });
},
      createDoctor = async (id, email, registration_no) => {
  await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.$queryRawUnsafe */ ._.$queryRawUnsafe(`
			INSERT INTO doctor(
				id,
				password,
				email,
				registration_no,
				name,
				sex,
				department,
				specialization,
				status
			)
			VALUES(
				'${id}',
				'',
				'${email}',
				'${registration_no}',
				'undefined',
				'M',
				'ENT',
				'',
				'Inactive'
			)
		`);
  return await (0,_api_getdoctorlist__WEBPACK_IMPORTED_MODULE_1__.getDoctorList)(registration_no);
}; // ! entry point of get endpoint


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.body, req.headers["x-registration-no"]);
  if (await findDoctor(req.body.email)) return res.status(200).json({
    message: "Email already in use!"
  });
  return res.status(200).json(await createDoctor(req.body.id, req.body.email, req.headers["x-registration-no"]));
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
var __webpack_exports__ = __webpack_require__.X(0, [9032], () => (__webpack_exec__(1261)));
module.exports = __webpack_exports__;

})();