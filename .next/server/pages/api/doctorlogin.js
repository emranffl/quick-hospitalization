"use strict";
(() => {
var exports = {};
exports.id = 4068;
exports.ids = [4068,2218,2643];
exports.modules = {

/***/ 9015:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9440);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6972);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4688);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction




const userLoginSchema = (0,yup__WEBPACK_IMPORTED_MODULE_0__.object)().shape({
  email: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().max(50).email(),
  password: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().min(4).max(25)
}),
      findUser = async email => {
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__/* .prisma.doctor.findUnique */ ._.doctor.findUnique({
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

  try {
    // console.log(req.body.data)
    // form data type validation
    // await userLoginSchema.validate(req.body.data, {
    // 	abortEarly: false,
    // })
    const data = req.body.data;
    const doctor = await findUser(data["email"]);
    console.log(doctor, data); // user existence

    if (!doctor) return res.status(200).json({
      doctor: "Doctor not found! Try Sign Up."
    }); // inactive user

    if (doctor.password == "undefined") return res.status(200).json({
      doctor: "Your profile is inactive. If this is a mistake, contact your admin."
    }); // credential check

    if (doctor.password == data.password) // todo redirect user with session
      return res.status(200).json((0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_2__/* .mutateContactNumber */ .D)(doctor));else if (doctor.password != data.password) return res.status(200).json({
      pass: "Password not valid!"
    });
    return res.status(406).json({
      message: "Invalid data format!"
    });
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
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(9015)));
module.exports = __webpack_exports__;

})();