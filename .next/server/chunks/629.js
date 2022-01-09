"use strict";
exports.id = 629;
exports.ids = [629];
exports.modules = {

/***/ 629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appointmentIncludeParam": () => (/* binding */ appointmentIncludeParam),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4688);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const appointmentIncludeParam = {
  doctor: {
    select: {
      chamber: true,
      specialization: true,
      department: true,
      email: true,
      image_source: true,
      name: true,
      status: true,
      schedule: true
    }
  },
  hospital: {
    select: {
      address: true,
      hospital_name: true
    }
  }
}; // ! entry point of get endpoint

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "GET") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.headers["x-appointment-id"]);
  if (req.headers["x-appointment-id"]) return res.status(200).json({
    appointment: (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_1__/* .mutateContactNumber */ .D)(await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.appointment.findUnique */ ._.appointment.findUnique({
      where: {
        id: req.headers["x-appointment-id"]
      },
      include: appointmentIncludeParam
    }))
  });
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