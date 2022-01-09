"use strict";
exports.id = 9032;
exports.ids = [9032];
exports.modules = {

/***/ 9032:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "doctorSelectParam": () => (/* binding */ doctorSelectParam),
/* harmony export */   "getDoctorList": () => (/* binding */ getDoctorList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const doctorSelectParam = {
  bio: true,
  chamber: true,
  department: true,
  email: true,
  id: true,
  image_source: true,
  joined_on: true,
  name: true,
  sex: true,
  specialization: true,
  status: true // appointment: true,

},
      getDoctorList = async registration_no => {
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.doctor.findMany */ ._.doctor.findMany({
    where: {
      registration_no
    },
    select: doctorSelectParam
  });
}; // ! entry point of get endpoint

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "GET") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.headers["x-registration-no"]);
  if (req.headers["x-registration-no"]) res.status(200).json(await getDoctorList(req.headers["x-registration-no"]));
  return res.status(406).json({
    message: "Invalid data format!"
  });
}); // ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete

const config = {
  api: {
    externalResolver: true
  }
};

/***/ })

};
;