"use strict";
(() => {
var exports = {};
exports.id = 5246;
exports.ids = [5246,2888,2218,2643];
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

/***/ 4235:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6972);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(212);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1273);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4598);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6417);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5494);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4688);
/* harmony import */ var _contexts_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(227);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















const getServerSideProps = async ({
  params
}) => {
  let retrievedData = await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.hospital.findUnique */ ._.hospital.findUnique({
    where: {
      registration_no: params.hospital_registration_no
    },
    include: {
      address: true,
      capacity: true,
      vacant_bed_log: {
        orderBy: {
          last_updated: "desc"
        },
        take: 1
      }
    }
  });
  if (retrievedData == null) return {
    redirect: {
      destination: "/404",
      permanent: false
    }
  };
  retrievedData = _objectSpread(_objectSpread({}, retrievedData), {}, {
    vacant_bed_log: retrievedData.vacant_bed_log[0]
  });
  return {
    props: {
      hospitalInfo: JSON.stringify((0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_12__/* .mutateContactNumber */ .D)(retrievedData))
    }
  };
};

const HospitalInfo = ({
  hospitalInfo
}) => {
  const hospital = JSON.parse(hospitalInfo),
        {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
        placeModeMapSrc = !hospital.address.latitude || !hospital.address.longitude ? // when either (or both) of them is null, search by name
  "https://www.google.com/maps/embed/v1/place?key=" + "AIzaSyChJhm4z9IojHLRs2YLnfjrpBixXKy8iPU" + "&q=" + hospital.hospital_name.replace(/ /g, "+") + "&zoom=16" : "https://www.google.com/maps/embed/v1/place?key=" + "AIzaSyChJhm4z9IojHLRs2YLnfjrpBixXKy8iPU" + "&q=" + hospital.address.latitude + "," + hospital.address.longitude + "&zoom=16",
        {
    0: mapSrc,
    1: setMapSrc
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(placeModeMapSrc),
        {
    0: bookingForSelf,
    1: setBookingForSelf
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(true),
        {
    0: selectedBedType,
    1: setSelectedBedType
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
        {
    userContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(_contexts_user__WEBPACK_IMPORTED_MODULE_10__/* .UserContext */ .S);
  console.log(hospital.address, placeModeMapSrc);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("title", {
        children: hospital.hospital_name + " | Quick Hospitalization"
      })
    }), userContext ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("section", {
      className: "modal fade",
      id: "bookingModal",
      tabIndex: -1,
      "data-bs-backdrop": false,
      "data-bs-keyboard": "false",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
        className: "modal-dialog modal-dialog-centered modal-lg",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "modal-content",
          style: {
            backgroundColor: "rgba(256, 256, 256, 0.85)",
            backdropFilter: "blur(8px)"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "modal-header py-1",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("h5", {
              className: "modal-title",
              children: "Booking"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("button", {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            })]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
            className: "modal-body",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("form", {
              className: "appointment-form container",
              onSubmit: e => {
                e.stopPropagation();
                e.preventDefault();
              },
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("fieldset", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                  className: "row g-2",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
                    className: "col-lg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("select", {
                        className: "form-select",
                        id: "bookingFor",
                        onInput: e => {
                          if (e.target.value == _prisma_client__WEBPACK_IMPORTED_MODULE_1__.booking_booked_for.Self) {
                            setBookingForSelf(true);
                            jquery__WEBPACK_IMPORTED_MODULE_5___default()("#patientName").val(userContext.name);
                            jquery__WEBPACK_IMPORTED_MODULE_5___default()("#patientSex").val(userContext.sex);
                          } else {
                            setBookingForSelf(false);
                            jquery__WEBPACK_IMPORTED_MODULE_5___default()("#patientName").val("");
                            jquery__WEBPACK_IMPORTED_MODULE_5___default()("#patientSex").val("null");
                          }
                        },
                        required: true,
                        children: Object.keys(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.booking_booked_for).map((elem, index) => {
                          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("option", {
                            value: _prisma_client__WEBPACK_IMPORTED_MODULE_1__.booking_booked_for[elem],
                            children: _prisma_client__WEBPACK_IMPORTED_MODULE_1__.booking_booked_for[elem]
                          }, index);
                        })
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("label", {
                        htmlFor: "bookingFor",
                        children: "Booking For"
                      })]
                    })
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
                    className: "col-lg-5",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("input", {
                        type: "text",
                        className: "form-control",
                        id: "patientName",
                        placeholder: "Patient's Name",
                        defaultValue: bookingForSelf ? userContext.name : "",
                        disabled: bookingForSelf ? true : false,
                        readOnly: bookingForSelf ? true : false,
                        required: true
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("label", {
                        htmlFor: "patientName",
                        children: "Name"
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("small", {
                        className: "ml-1 text-danger invalid-feedback"
                      })]
                    })
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
                    className: "col-lg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("select", {
                        className: "form-select",
                        id: "patientSex",
                        defaultValue: userContext.sex,
                        disabled: bookingForSelf ? true : false,
                        required: true,
                        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("option", {
                          value: "null",
                          hidden: true,
                          children: "Select Gender..."
                        }), Object.keys(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.booking_sex).map((elem, index) => {
                          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("option", {
                            value: elem,
                            children: _app__WEBPACK_IMPORTED_MODULE_7__.Sex[elem]
                          }, index);
                        })]
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("label", {
                        htmlFor: "patientSex",
                        children: "Sex"
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("small", {
                        className: "ml-1 text-danger invalid-feedback"
                      })]
                    })
                  })]
                })
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
            className: "modal-footer py-1",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("button", {
              type: "button",
              className: "btn btn-sm btn-primary",
              onClick: async () => {
                setLoading(true);
                await fetch("/api/registerbooking", {
                  method: "POST",
                  body: JSON.stringify({
                    id: "b" + crypto__WEBPACK_IMPORTED_MODULE_8___default().randomBytes(5).toString("hex").toUpperCase().substring(0, 9),
                    user_mobile_no: userContext.mobile_no,
                    name: jquery__WEBPACK_IMPORTED_MODULE_5___default()("#patientName").val(),
                    sex: jquery__WEBPACK_IMPORTED_MODULE_5___default()("#patientSex").val(),
                    bed_type: selectedBedType,
                    booked_for: jquery__WEBPACK_IMPORTED_MODULE_5___default()("#bookingFor").val(),
                    registration_no: hospital.registration_no,
                    status: "Requested"
                  }),
                  headers: {
                    "content-type": "application/json"
                  }
                }).then(response => response.json()).then(res => {
                  setLoading(false);
                  next_router__WEBPACK_IMPORTED_MODULE_6___default().push(`/booking?id=${res.id}`, `/booking`);
                }).catch(err => console.error(err));
                setLoading(false);
              },
              children: "Confirm Booking"
            })
          })]
        })
      })
    }) : null, loading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_9__/* .default */ .Z, {}) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("main", {
      className: "container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
          className: "col-12 col-md-5",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.default, {
            src: "/media/hospital-building-2.jpg",
            width: "390",
            height: "220",
            layout: "responsive",
            priority: true
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "col-12 col-md-7",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("h3", {
            children: hospital.hospital_name
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "mt-4 d-grid gap-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                className: "fw-light h5 me-2",
                "data-bs-toggle": "tooltip",
                "data-bs-placement": "bottom",
                title: "Type",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("i", {
                  className: "bi bi-info-lg"
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                className: "text-secondary",
                children: hospital.hospital_type
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                className: "fw-light h6 me-2",
                "data-bs-toggle": "tooltip",
                "data-bs-placement": "bottom",
                title: "Address",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("i", {
                  className: "bi bi-geo-alt-fill"
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                className: "text-secondary",
                children: `${hospital.address.street_address}, ${hospital.address.district}, ${hospital.address.division}`
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                className: "fw-light h6 me-2",
                "data-bs-toggle": "tooltip",
                "data-bs-placement": "bottom",
                title: "Contacts",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("i", {
                  className: "bi bi-telephone-fill"
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                className: "text-secondary",
                children: hospital.address.phone_no == null ? hospital.address.mobile_no : hospital.address.mobile_no == null ? hospital.address.phone_no : `${hospital.address.mobile_no}, ${hospital.address.phone_no}`
              })]
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "mt-4",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("h4", {
          children: "Book now"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
          className: "mt-2 mx-0 row row-cols-2 row-cols-md-3 row-cols-lg-4",
          children: ["ward", "special_ward", "cabin", "vip_cabin", "icu", "ccu", "hdu", "hfncu", "emergency", "covidu", "extra"].map((bedType, key) => {
            return hospital.vacant_bed_log[bedType] == null ? null : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
              className: "\r d-flex\r justify-content-center\r align-items-center\r col\r p-1\r ",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("button", {
                className: hospital.vacant_bed_log[bedType] <= 5 ? hospital.vacant_bed_log[bedType] == 0 ? "btn btn-outline-danger w-100 disabled" : "btn btn-outline-warning text-dark w-100" : "btn btn-outline-primary w-100",
                "data-bs-toggle": userContext ? "modal" : null,
                "data-bs-target": userContext ? "#bookingModal" : null,
                onClick: () => {
                  userContext ? setSelectedBedType(_app__WEBPACK_IMPORTED_MODULE_7__.BedTypes[bedType]) : next_router__WEBPACK_IMPORTED_MODULE_6___default().push(`${_app__WEBPACK_IMPORTED_MODULE_7__.Links.App.login}?redirect=${(next_router__WEBPACK_IMPORTED_MODULE_6___default().asPath)}`, _app__WEBPACK_IMPORTED_MODULE_7__.Links.App.login);
                },
                children: [bedType.replace("_", " ").toUpperCase(), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("span", {
                  className: "d-block",
                  children: hospital.vacant_bed_log[bedType]
                })]
              })
            }, key);
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "mt-4 shadow rounded bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("nav", {
          className: "position-relative",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "nav nav-tabs justify-content-start justify-content-md-center",
            id: "nav-tab",
            role: "tablist",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("a", {
              className: "nav-link border-0 mb-0 active",
              "data-bs-toggle": "tab",
              href: "#nav-location",
              role: "tab",
              "aria-selected": "false",
              children: "Location"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("a", {
              className: "nav-link border-0",
              "data-bs-toggle": "tab",
              href: "#nav-description",
              role: "tab",
              "aria-selected": "false",
              children: "Description"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "form-check form-switch position-absolute top-0 end-0 ps-0 mt-2 me-2",
            style: {
              backgroundColor: "rgba(256, 256, 256, 0.85)",
              backdropFilter: "blur(8px)"
            },
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("input", {
              className: "form-check-input",
              type: "checkbox",
              role: "switch",
              id: "mode",
              onChange: e => {
                navigator.geolocation ? navigator.geolocation.getCurrentPosition(position => {
                  // switching map views
                  e.target.checked ? setMapSrc(!hospital.address.latitude || !hospital.address.longitude ? // when either (or both) of them is null, search by name
                  "https://www.google.com/maps/embed/v1/directions?key=" + "AIzaSyChJhm4z9IojHLRs2YLnfjrpBixXKy8iPU" + "&origin=" + position.coords.latitude + "," + position.coords.longitude + "&destination=" + hospital.hospital_name.replace(/ /g, "+") + "&mode=driving&units=metric" : "https://www.google.com/maps/embed/v1/directions?key=" + "AIzaSyChJhm4z9IojHLRs2YLnfjrpBixXKy8iPU" + "&origin=" + position.coords.latitude + "," + position.coords.longitude + "&destination=" + hospital.address.latitude + "," + hospital.address.longitude + "&mode=driving&units=metric") : setMapSrc(placeModeMapSrc);
                }, error => jquery__WEBPACK_IMPORTED_MODULE_5___default()("#map").html(error.message)) : jquery__WEBPACK_IMPORTED_MODULE_5___default()("#map").text(`Your browser doesn\'t support geolocation. Try inputting manually.`);
              }
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("label", {
              className: "form-check-label font-monospace d-none d-md-inline-block",
              htmlFor: "mode",
              children: "Directions Mode"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "tab-content",
          id: "nav-tabContent",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
            className: "tab-pane fade active show",
            id: "nav-location",
            role: "tabpanel",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("iframe", {
                id: "map",
                width: "100%",
                height: "450px",
                frameBorder: 0,
                style: {
                  border: "0"
                },
                allowFullScreen: true,
                src: mapSrc
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
            className: "tab-pane fade",
            id: "nav-description",
            role: "tabpanel",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx("div", {
              className: "container py-3",
              children: hospital.description == null ? "Not provided" : hospital.description
            })
          })]
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HospitalInfo);

/***/ }),

/***/ 212:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 6417:
/***/ ((module) => {

module.exports = require("crypto");

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
var __webpack_exports__ = __webpack_require__.X(0, [1664,5675,4394,1548], () => (__webpack_exec__(4235)));
module.exports = __webpack_exports__;

})();