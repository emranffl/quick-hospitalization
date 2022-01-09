"use strict";
(() => {
var exports = {};
exports.id = 4899;
exports.ids = [4899,2888,2218,2643,3918];
exports.modules = {

/***/ 5494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Loader)
});

;// CONCATENATED MODULE: external "@emotion/react"
const react_namespaceObject = require("@emotion/react");
;// CONCATENATED MODULE: external "react-spinners/FadeLoader"
const FadeLoader_namespaceObject = require("react-spinners/FadeLoader");
var FadeLoader_default = /*#__PURE__*/__webpack_require__.n(FadeLoader_namespaceObject);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/Loader.tsx




const Loader = () => {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "d-flex xd",
    style: {
      position: "fixed",
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(0deg, rgba(72,216,217,0.7) 0%, rgba(52,58,64,0.9) 96%)",
      zIndex: 1100,
      backdropFilter: "blur(3px)"
    },
    children: /*#__PURE__*/jsx_runtime_.jsx((FadeLoader_default()), {
      css: react_namespaceObject.css`
					margin: auto auto;
				`,
      speedMultiplier: 2,
      color: "white"
    })
  });
};

/* harmony default export */ const components_Loader = (Loader);

/***/ }),

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

/***/ 4609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6972);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4598);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1273);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5494);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);











const getServerSideProps = async ({
  query
}) => {
  const retrievedData = await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_3__/* .prisma.$queryRaw */ ._.$queryRaw`
	SELECT id, email, registration_no, name, sex, department, specialization, chamber, bio, image_source, joined_on, status
	FROM doctor
	WHERE joined_on IN 
		(
			SELECT MAX(joined_on) "joined_on"
			FROM doctor
			WHERE status <> "Inactive"
			GROUP BY  doctor.id
			ORDER BY doctor.id ASC
		)
	ORDER BY doctor.id
	LIMIT 12;
	`;
  return {
    props: {
      retrievedData: JSON.stringify(retrievedData)
    }
  };
};

const Doctor = ({
  retrievedData
}) => {
  const {
    0: doctors,
    1: setNewDoctors
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(JSON.parse(retrievedData)),
        {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false),
        {
    0: loadingCounter,
    1: setLoadingCounter
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(1);
  console.log(doctors); // useEffect(() => {})

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx((next_head__WEBPACK_IMPORTED_MODULE_0___default()), {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("title", {
        children: "Doctors | Quick Hospitalization"
      })
    }), loading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z, {}) : null, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("section", {
      className: "doctor-banner"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "container row my-5 mx-auto pt-5 pt-sm-0",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
        className: "col-12 col-md-6 col-lg-7",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("form", {
          className: "animate__animated animate__fadeInDown",
          style: {
            flex: "auto"
          },
          onSubmit: event => {
            event.preventDefault();
            event.stopPropagation();
          },
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("input", {
            className: "form-control mx-auto rounded",
            id: "search",
            style: {
              maxWidth: "512px"
            },
            type: "search",
            placeholder: "Search Hospitals",
            onKeyUp: async e => {
              if (e.key != "Enter") return;
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("input[name=searchOptions]").map(async (index, elem) => {
                if (jquery__WEBPACK_IMPORTED_MODULE_6___default()(elem).is(":checked")) {
                  setLoading(true);
                  await fetch("/api/searchdoctors", {
                    method: "GET",
                    headers: new Headers({
                      "content-type": "application/json",
                      "x-search-by": jquery__WEBPACK_IMPORTED_MODULE_6___default()(elem).val(),
                      "x-search-term": e.target.value
                    })
                  }).then(response => response.json()).then(res => {
                    setNewDoctors(res);
                  }).catch(err => console.error(err));
                  setLoading(false);
                }
              });
            },
            onInput: async e => {
              if (e.target.value != "") return;
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("input[name=searchOptions]").map(async (index, elem) => {
                if (jquery__WEBPACK_IMPORTED_MODULE_6___default()(elem).is(":checked")) {
                  await fetch("/api/searchdoctors", {
                    method: "GET",
                    headers: new Headers({
                      "content-type": "application/json",
                      "x-search-by": jquery__WEBPACK_IMPORTED_MODULE_6___default()(elem).val(),
                      "x-search-term": e.target.value
                    })
                  }).then(response => response.json()).then(res => {
                    setNewDoctors(res);
                  }).catch(err => console.error(err));
                }
              });
            }
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "col-12 col-md-6 col-lg-5 mt-3 mt-md-0 d-flex justify-content-center justify-content-lg-start align-items-center animate__animated animate__fadeInUp",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "form-check form-check-inline",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("input", {
            className: "form-check-input",
            type: "radio",
            name: "searchOptions",
            id: "searchOption1",
            value: "name",
            onClick: () => {
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("#search").trigger("focus");
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("#search").val("");
            },
            defaultChecked: true
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("label", {
            className: "form-check-label",
            htmlFor: "searchOption1",
            children: "name"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "form-check form-check-inline",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("input", {
            className: "form-check-input",
            type: "radio",
            name: "searchOptions",
            id: "searchOption2",
            value: "specialization",
            onClick: () => {
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("#search").trigger("focus");
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("#search").val("");
            }
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("label", {
            className: "form-check-label",
            htmlFor: "searchOption2",
            children: "specialization"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "form-check form-check-inline",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("input", {
            className: "form-check-input",
            type: "radio",
            name: "searchOptions",
            id: "searchOption3",
            value: "department",
            onClick: () => {
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("#search").trigger("focus");
              jquery__WEBPACK_IMPORTED_MODULE_6___default()("#search").val("");
            }
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("label", {
            className: "form-check-label",
            htmlFor: "searchOption3",
            children: "department"
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("main", {
      className: "container",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
        className: "row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 mt-5",
        children: doctors.map((doctor, index) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
            className: "col",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "card h-100 rounded shadow-sm" // style={{ backgroundColor: "transparent" }}
              ,
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__.default, {
                href: `${_app__WEBPACK_IMPORTED_MODULE_4__.Links.App.doctor}/${doctor.email}`,
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                  className: "text-decoration-none",
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                    className: "card-img-top d-flex justify-content-center align-items-center",
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.default, {
                      src: doctor.sex == "M" || doctor.sex == "T" ? "/media/doctor-profile-male.png" : "/media/doctor-profile-female.png",
                      alt: doctor.sex == "M" || doctor.sex == "T" ? "doctor-profile-male - doctor image" : "doctor-profile-female - doctor image",
                      width: 480,
                      height: 320
                    })
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "card-body",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__.default, {
                  href: `${_app__WEBPACK_IMPORTED_MODULE_4__.Links.App.doctor}/${doctor.email}`,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                    className: "card-title text-decoration-none text-dark h5",
                    children: doctor.name
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  className: "mt-3",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                    className: "d-flex align-items-center",
                    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("i", {
                      className: "bi bi-diagram-3-fill me-2 mb-0 h4",
                      "data-bs-toggle": "tooltip",
                      "data-bs-placement": "bottom",
                      title: "Department"
                    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("span", {
                      className: "text-secondary fst-italic",
                      children: doctor.department
                    })]
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                    className: "mt-3",
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("p", {
                      className: "text-truncate",
                      children: doctor.bio
                    })
                  })]
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
                className: "card-footer py-1",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(next_link__WEBPACK_IMPORTED_MODULE_1__.default, {
                  href: `${_app__WEBPACK_IMPORTED_MODULE_4__.Links.App.doctor}/${doctor.email}`,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                    className: "d-block text-decoration-none text-info text-center",
                    children: "More\xA0\u2192"
                  })
                })
              })]
            })
          }, index);
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("section", {
        className: "d-flex justify-content-center align-items-center mt-5",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("button", {
          className: "btm btn-sm btn-outline-dark",
          onClick: async () => {
            setLoading(true);
            await fetch("/api/getdoctorsinfo", {
              method: "POST",
              body: JSON.stringify({
                offset: 12 * loadingCounter
              }),
              headers: {
                "content-type": "application/json"
              }
            }).then(response => response.json()).then(res => {
              setNewDoctors([...doctors, ...res.doctors]);
              setLoadingCounter(loadingCounter + 1);
            }).catch(err => console.error(err));
            setLoading(false);
          },
          children: "More Doctors"
        })
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Doctor);

/***/ }),

/***/ 212:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 1273:
/***/ ((module) => {

module.exports = require("jquery");

/***/ }),

/***/ 9325:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 822:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 6695:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 7162:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 8773:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 2248:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 9372:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 665:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 2747:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 556:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 701:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6731:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,5675,1548], () => (__webpack_exec__(4609)));
module.exports = __webpack_exports__;

})();