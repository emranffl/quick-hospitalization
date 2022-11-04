"use strict";
exports.id = 6164;
exports.ids = [6164];
exports.modules = {

/***/ 6164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookingIncludeParam": () => (/* binding */ bookingIncludeParam),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4688);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const bookingIncludeParam = {
  hospital: {
    select: {
      hospital_name: true,
      registration_no: true,
      address: {
        select: {
          street_address: true,
          district: true,
          division: true
        }
      }
    }
  }
}; // ! entry point of get endpoint

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res) => {
  // revoking other methods
  if (req.method !== "GET") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });
  console.log(req.headers["x-booking-id"]);
  if (req.headers["x-booking-id"]) return res.status(200).json({
    appointment: (0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_1__/* .mutateContactNumber */ .D)(await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.booking.findUnique */ ._.booking.findUnique({
      where: {
        id: req.headers["x-booking-id"]
      },
      include: bookingIncludeParam
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