"use strict";
(() => {
var exports = {};
exports.id = 6846;
exports.ids = [6846,2218,2643];
exports.modules = {

/***/ 312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9440);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9457);
/* harmony import */ var deep_object_diff__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deep_object_diff__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4688);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction





const hospitalUserSchema = (0,yup__WEBPACK_IMPORTED_MODULE_1__.object)().shape({
  name: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required().min(2).max(50),
  mobile_no: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required().min(11).max(11),
  email: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required().email().max(50)
}),
      hospitalUserPasswordSchema = (0,yup__WEBPACK_IMPORTED_MODULE_1__.object)().shape({
  email: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required().email(),
  newPassword: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required()
}),
      updateUser = async (email, userData) => {
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.staff.update */ ._.staff.update({
    where: {
      email
    },
    data: userData
  });
},
      updatePassword = async (email, password) => {
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.staff.update */ ._.staff.update({
    where: {
      email
    },
    data: {
      password
    }
  });
}; // ! entry point of get endpoint


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.body, (0,deep_object_diff__WEBPACK_IMPORTED_MODULE_2__.updatedDiff)(req.body.userData, req.body.newUserData), req.headers["x-action-update-password"]);

  try {
    req.headers["x-action-update-password"] ? await hospitalUserPasswordSchema.validate(req.body, {
      abortEarly: false
    }) : await hospitalUserSchema.validate(req.body.newUserData, {
      abortEarly: false
    });
  } catch (error) {
    return res.status(406).json(error);
  }

  if (req.headers["x-action-update-password"]) await updatePassword(req.body.email, req.body.newPassword);else {
    const data = (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_3__/* .mutateContactNumber */ .D)((0,deep_object_diff__WEBPACK_IMPORTED_MODULE_2__.updatedDiff)(req.body.userData, req.body.newUserData), true);

    if (data.email != undefined) {
      if ((await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.staff.findUnique */ ._.staff.findUnique({
        where: {
          email: req.body.newUserData.email
        }
      })) != null) return res.status(406).json({
        errors: ["email cannot be duplicate, another user found with the provided email"]
      });
    } else await updateUser(req.body.userData.email, data);
  }
  return res.status(200).json({
    updated: true
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

/***/ 9457:
/***/ ((module) => {

module.exports = require("deep-object-diff");

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
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(312)));
module.exports = __webpack_exports__;

})();