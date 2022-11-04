"use strict";
(() => {
var exports = {};
exports.id = 2659;
exports.ids = [2659,2218,2643];
exports.modules = {

/***/ 7259:
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





const hospitalProfileSchema = (0,yup__WEBPACK_IMPORTED_MODULE_1__.object)().shape({
  hospital: (0,yup__WEBPACK_IMPORTED_MODULE_1__.object)().shape({
    hospital_name: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required().min(10).max(100),
    hospital_type: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required().oneOf(["Public", "Private"]),
    website: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().optional().url().nullable()
  }),
  address: (0,yup__WEBPACK_IMPORTED_MODULE_1__.object)().shape({
    phone_no: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().optional().min(9).max(11).nullable(),
    mobile_no: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().optional().min(11).max(11).nullable(),
    latitude: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().optional().min(-90).max(90),
    longitude: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().optional().min(-180).max(180),
    street_address: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required(),
    district: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required(),
    division: (0,yup__WEBPACK_IMPORTED_MODULE_1__.string)().required()
  })
}),
      updateProfile = async (updatedData, registration_no) => {
  if (updatedData["address"] != undefined) {
    await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.address.update */ ._.address.update({
      where: {
        registration_no
      },
      data: updatedData["address"]
    });
  }

  if (updatedData["hospital"] != undefined) {
    await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.hospital.update */ ._.hospital.update({
      where: {
        registration_no
      },
      data: updatedData["hospital"]
    });
  }
}; // ! entry point of get endpoint


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.body, (0,deep_object_diff__WEBPACK_IMPORTED_MODULE_2__.updatedDiff)(req.body.profileData, req.body.newProfileData));

  try {
    await hospitalProfileSchema.validate(req.body.newProfileData, {
      abortEarly: false
    });
  } catch (error) {
    return res.status(406).json(error);
  }

  const data = (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_3__/* .mutateContactNumber */ .D)((0,deep_object_diff__WEBPACK_IMPORTED_MODULE_2__.updatedDiff)(req.body.profileData, req.body.newProfileData), true); // check hospital name uniqueness

  if (data.hospital && data.hospital.hospital_name != undefined) if ((await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.hospital.findUnique */ ._.hospital.findUnique({
    where: {
      hospital_name: req.body.newProfileData.hospital.hospital_name
    }
  })) != null) return res.status(406).json({
    errors: ["hospital.hospital_name cannot be duplicate, another hospital with the same name exists"]
  });
  await updateProfile(data, req.body.profileData.hospital != undefined ? req.body.profileData.address.registration_no : req.body.profileData.hospital.registration_no);
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
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(7259)));
module.exports = __webpack_exports__;

})();