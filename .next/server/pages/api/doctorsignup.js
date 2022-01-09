"use strict";
(() => {
var exports = {};
exports.id = 3246;
exports.ids = [3246,2218,2643];
exports.modules = {

/***/ 9570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4688);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(212);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9440);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction





const doctorEmailSchema = (0,yup__WEBPACK_IMPORTED_MODULE_2__.object)().shape({
  email: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required().email().max(50)
}),
      doctorInfoSchema = (0,yup__WEBPACK_IMPORTED_MODULE_2__.object)().shape({
  name: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required().min(2).max(50),
  sex: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().oneOf(Object.values(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.doctor_sex)),
  department: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().oneOf(Object.values(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.doctor_department)),
  specialization: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required(),
  chamber: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().optional().max(10),
  bio: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().optional().max(16383),
  password: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required().min(4).max(25)
}),
      doctorScheduleSchema = (0,yup__WEBPACK_IMPORTED_MODULE_2__.array)().of((0,yup__WEBPACK_IMPORTED_MODULE_2__.object)().shape({
  day: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required().min(1).max(1).oneOf(Object.values(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.schedule_day)),
  start_time: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required(),
  end_time: (0,yup__WEBPACK_IMPORTED_MODULE_2__.string)().required()
})),
      updateDoctorWOrWOSchedule = async (email, data) => {
  data.schedule ? await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.schedule.createMany */ ._.schedule.createMany({
    data: data.schedule
  }) : null;
  return await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.doctor.update */ ._.doctor.update({
    where: {
      email
    },
    data: _objectSpread(_objectSpread(_objectSpread({}, data.bio ? {
      bio: data.bio
    } : {}), data.chamber ? {
      chamber: data.chamber
    } : {}), {}, {
      name: data.name,
      sex: data.sex,
      department: data.department,
      specialization: data.specialization,
      password: data.password,
      status: "Active"
    }),
    select: {
      email: true
    }
  });
};

// ! entry point of get endpoint
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "GET") if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.headers.email, req.headers.step, req.body);

  if (req.headers.step == "0") {
    try {
      await doctorEmailSchema.validate({
        email: req.headers.email
      }, {
        abortEarly: false
      });
      let doctor = await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.doctor.findUnique */ ._.doctor.findUnique({
        where: {
          email: req.headers.email
        },
        select: {
          id: true,
          password: true,
          hospital: {
            select: {
              hospital_name: true
            }
          }
        }
      });
      if (!doctor) return res.status(200).json({
        message: "Your work email does not match from the system. Contact your hospital admin to enroll your profile first!"
      });
      if (doctor.password == "undefined") return res.status(200).json({
        message: "Your profile is inactive. You can't join with the same email."
      });
      return res.status(200).json({
        id: doctor.id,
        hospital: {
          hospital_name: doctor.hospital.hospital_name
        }
      });
    } catch (error) {
      return res.status(406).json(error);
    }
  } else if (req.headers.step == "1") {
    try {
      await doctorInfoSchema.validate(req.body, {
        abortEarly: false
      });
      return res.status(200).json({
        validated: true
      });
    } catch (error) {
      return res.status(406).json(error);
    }
  } else if (req.headers.step == "2") {
    try {
      await doctorScheduleSchema.validate(req.body.schedule, {
        abortEarly: false
      });
      return res.status(200).json( // {email: req.headers.email}
      await updateDoctorWOrWOSchedule(req.headers.email, (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_3__/* .mutateDateTimeString */ .L)(req.body)));
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
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(9570)));
module.exports = __webpack_exports__;

})();