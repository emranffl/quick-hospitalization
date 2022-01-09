"use strict";
exports.id = 8907;
exports.ids = [8907];
exports.modules = {

/***/ 3829:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);




const AnnotationToggler = ({
  textColor = "text-secondary",
  textContent
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "btn-group dropright",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
        className: `bi bi-patch-question-fill dropdown-toggle h5 px-2 ${textColor}`,
        style: textColor === "text-warning" ? {
          cursor: "pointer",
          color: "darkorange!important"
        } : {
          cursor: "pointer"
        },
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("small", {
        className: "dropdown-menu mt-n5 p-2",
        style: {
          boxSizing: "border-box",
          fontSize: "0.9rem"
        },
        children: textContent
      })]
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AnnotationToggler);

/***/ }),

/***/ 8907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_AnnotationToggler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3829);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);





const BedTypeInputFields = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "form-check col px-0 d-flex align-items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: "form-check-input mx-3",
        style: {
          cursor: "pointer"
        },
        type: "checkbox",
        "data-name": "ward",
        id: "ward",
        value: "Ward"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("label", {
        className: "form-check-label mt-n2",
        style: {
          cursor: "pointer"
        },
        htmlFor: "ward",
        children: "Ward"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "form-check col px-0 w-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "number",
        "data-name": "ward",
        className: "form-control",
        id: "wardCount",
        defaultValue: "0",
        min: "0",
        max: "65535",
        disabled: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "form-check col px-0 d-flex align-items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: "form-check-input mx-3",
        style: {
          cursor: "pointer"
        },
        type: "checkbox",
        "data-name": "special_ward",
        id: "specialWard",
        value: "Special Ward"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("label", {
        className: "form-check-label mt-n2",
        style: {
          cursor: "pointer"
        },
        htmlFor: "specialWard",
        children: "Special Ward"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "form-check col px-0 w-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "number",
        "data-name": "special_ward",
        className: "form-control",
        id: "specialWardCount",
        defaultValue: "0",
        min: "0",
        max: "65535",
        disabled: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "form-check col px-0 d-flex align-items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: "form-check-input mx-3",
        style: {
          cursor: "pointer"
        },
        type: "checkbox",
        "data-name": "cabin",
        id: "cabin",
        value: "Cabin"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("label", {
        className: "form-check-label mt-n2",
        style: {
          cursor: "pointer"
        },
        htmlFor: "cabin",
        children: "Cabin"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "form-check col px-0 w-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "number",
        "data-name": "cabin",
        className: "form-control",
        id: "cabinCount",
        defaultValue: "0",
        min: "0",
        max: "255",
        disabled: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "form-check col px-0 d-flex align-items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: "form-check-input mx-3",
        style: {
          cursor: "pointer"
        },
        type: "checkbox",
        "data-name": "icu",
        id: "icu",
        value: "ICU"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
        className: "form-check-label mt-n2",
        style: {
          cursor: "pointer"
        },
        htmlFor: "icu",
        children: ["ICU\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_components_AnnotationToggler__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
          textColor: "text-info",
          textContent: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("strong", {
              children: "Intensive Care Unit"
            }), ", input total capacity of all types of ICUs."]
          })
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "form-check col px-0 w-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "number",
        "data-name": "icu",
        className: "form-control",
        id: "icuCount",
        defaultValue: "0",
        min: "0",
        max: "255",
        disabled: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "form-check col px-0 d-flex align-items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: "form-check-input mx-3",
        style: {
          cursor: "pointer"
        },
        type: "checkbox",
        "data-name": "ccu",
        id: "ccu",
        value: "CCU"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
        className: "form-check-label mt-n2",
        style: {
          cursor: "pointer"
        },
        htmlFor: "ccu",
        children: ["CCU\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_components_AnnotationToggler__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
          textColor: "text-info",
          textContent: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("strong", {
              children: "Critical Care Unit"
            }), ", input total capacity of all types of CCUs."]
          })
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "form-check col px-0 w-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "number",
        "data-name": "ccu",
        className: "form-control",
        id: "ccuCount",
        defaultValue: "0",
        min: "0",
        max: "255",
        disabled: true
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "form-check col px-0 d-flex align-items-center",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: "form-check-input mx-3",
        style: {
          cursor: "pointer"
        },
        type: "checkbox",
        "data-name": "covidu",
        id: "covidu",
        value: "COVIDU"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
        className: "form-check-label mt-n2",
        style: {
          cursor: "pointer"
        },
        htmlFor: "covidu",
        children: ["COVIDU\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_components_AnnotationToggler__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
          textColor: "text-info",
          textContent: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("strong", {
              children: "COVID Unit"
            }), ", input total capacity of dedicated COVID treatment units."]
          })
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "form-check col px-0 w-5",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "number",
        "data-name": "covidu",
        className: "form-control",
        id: "covidCount",
        defaultValue: "0",
        min: "0",
        max: "65535",
        disabled: true
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BedTypeInputFields);

/***/ })

};
;