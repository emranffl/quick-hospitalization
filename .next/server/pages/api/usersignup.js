"use strict";
(() => {
var exports = {};
exports.id = 2538;
exports.ids = [2538,2218,2643];
exports.modules = {

/***/ 7938:
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




const userEmailSchema = (0,yup__WEBPACK_IMPORTED_MODULE_0__.object)().shape({
  email: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().email().max(50)
}),
      userInfoSchema = (0,yup__WEBPACK_IMPORTED_MODULE_0__.object)().shape({
  name: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().min(2).max(50),
  document_id: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().optional().min(9).max(17),
  mobile_no: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().min(11).max(11),
  password: (0,yup__WEBPACK_IMPORTED_MODULE_0__.string)().required().min(4).max(25)
}),
      checkUserExistence = async (type, value) => {
  if (type === "email") return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__/* .prisma.user.findUnique */ ._.user.findUnique({
    where: {
      email: value
    }
  });else if (type === "mobile") return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__/* .prisma.user.findUnique */ ._.user.findUnique({
    where: {
      mobile_no: value
    }
  });else if (type === "documentID") return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_1__/* .prisma.user.findUnique */ ._.user.findUnique({
    where: {
      document_id: value
    }
  });
},
      createUser = async user => {
  // return await prisma.$queryRaw(``)
  console.log(user);
  return await prisma.user.create({
    data: user
  });
}; // ! entry point of get endpoint


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });

  if (req.body.step === "user email") {
    try {
      console.log(req.body.data); // check if the user is not already signed up

      if ((await checkUserExistence("email", req.body.data.email)) == null) return res.status(200).json(await userEmailSchema.validate(req.body.data, {
        abortEarly: false
      }));
      return res.status(200).json({
        error: "A user with the provided email already exists! Try with another email."
      });
    } catch (error) {
      return res.status(406).json(error);
    }
  } else if (req.body.step === "user info") {
    try {
      console.log(req.body.data); // throws error upon invalid data

      await userInfoSchema.validate(req.body.data, {
        abortEarly: false
      }); // duplicate mobile number validation

      if ((await checkUserExistence("mobile", (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_2__/* .mutateContactNumber */ .D)(req.body.data, true).mobile_no)) != null) return res.status(200).json({
        error: {
          mobile_no: "A user with the provided mobile already exists! Try with another mobile."
        }
      }); // duplicate document id validation

      if ((await checkUserExistence("documentID", req.body.data.document_id)) != null) return res.status(200).json({
        error: {
          document_id: "A user with the provided document ID already exists! Try with another ID."
        }
      }); // * create new user
      // return res
      // 	.status(200)
      // 	.json(
      // 		mutateContactNumber(
      // 			await createUser(mutateContactNumber(req.body.data, true) as user)
      // 		)
      // 	)

      return res.status(200).json(req.body.data);
    } catch (error) {
      return res.status(406).json(error);
    }
  }

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
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(7938)));
module.exports = __webpack_exports__;

})();