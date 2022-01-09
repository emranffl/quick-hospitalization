"use strict";
(() => {
var exports = {};
exports.id = 8439;
exports.ids = [8439,2888,2218,2643];
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

/***/ 5107:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4598);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5494);
/* harmony import */ var _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6972);
/* harmony import */ var _functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4688);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);











const getServerSideProps = async ({
  query
}) => {
  // redirect upon error
  if (query.doctor == "" || query.doctor == undefined) return {
    redirect: {
      destination: _app__WEBPACK_IMPORTED_MODULE_0__.Links.Doctor.login,
      permanent: false
    }
  };
  const retrievedData = await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_2__/* .prisma.doctor.findUnique */ ._.doctor.findUnique({
    where: {
      email: query.doctor
    },
    include: {
      hospital: {
        select: {
          hospital_name: true
        }
      },
      appointment: {
        orderBy: {
          status: "asc"
        }
      }
    }
  });
  return {
    props: {
      retrievedData: JSON.stringify((0,_functionalities_mutateObjects__WEBPACK_IMPORTED_MODULE_7__/* .mutateContactNumber */ .D)(retrievedData))
    }
  };
};

const Dashboard = ({
  retrievedData
}) => {
  var _doctor$appointment;

  const {
    0: doctor,
    1: setDoctor
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(JSON.parse(retrievedData)),
        {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false),
        //* appointment block
  manageAppointment = async (id, status) => {
    await fetch("/api/managedoctorappointment", {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id,
        status,
        email: doctor.email
      })
    }).then(response => response.json()).then(res => {
      // console.log(res)
      setDoctor(res);
    }).catch(err => console.error(err));
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("title", {
        children: "Dashboard | Doctor Panel"
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("section", {
      className: "modal fade",
      id: "logoutModal",
      "data-bs-backdrop": "static",
      "data-bs-keyboard": "true",
      "aria-labelledby": "logoutModalLabel",
      "aria-hidden": "true",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
        className: "modal-dialog modal-dialog-centered",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "modal-content",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "modal-body",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("p", {
              children: "Are you sure you want to logout?"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "modal-footer",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("button", {
              type: "button",
              className: "btn btn-secondary",
              onClick: () => {
                // todo handle routing with session
                next_router__WEBPACK_IMPORTED_MODULE_4___default().replace(_app__WEBPACK_IMPORTED_MODULE_0__.Links.Doctor.login);
              },
              children: "Yes"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("button", {
              type: "button",
              className: "btn btn-primary",
              "data-bs-dismiss": "modal",
              children: "No"
            })]
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("main", {
      className: "dashboard",
      children: [loading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {}) : null, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
        className: "offcanvas offcanvas-start p-0",
        tabIndex: -1,
        id: "offcanvasStart",
        style: {
          width: "260px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "offcanvas-body p-0 bg-dark d-flex flex-column",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "mt-2 text-white text-center h3",
            children: "Doctor Panel"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "my-auto",
            id: "offcanvasStartContent",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("ul", {
              className: "nav nav-tabs flex-column border-0 w-100 bg-light",
              role: "tablist",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#dashboard",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "100ms"
                  } // onClick={e => {
                  // 	$("#offcanvasStart").removeClass("show")
                  // }}
                  ,
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                    className: "bi bi-house-door-fill h4 me-2 my-auto"
                  }), "Dashboard"]
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft active",
                  href: "#appointments",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "200ms"
                  },
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                    className: "bi bi-calendar-week-fill h4 me-2 my-auto"
                  }), "Appointments"]
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#schedule",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "400ms"
                  },
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                    className: "bi bi-person-bounding-box h4 my-auto"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                    className: "bi bi-calendar2-week h5 me-2 mb-n3",
                    style: {
                      zIndex: -1,
                      marginLeft: "-7px"
                    }
                  }), "Schedule"]
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#activity",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "550ms"
                  },
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                    className: "bi bi-archive-fill h4 me-2 my-auto"
                  }), "Activity"]
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#settings",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "500ms"
                  },
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                    className: "bi bi-gear-fill h4 me-2 my-auto"
                  }), "Settings"]
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "text-white",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("hr", {
              className: "my-0"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "m-1 d-flex justify-content-center",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app__WEBPACK_IMPORTED_MODULE_0__.Links.App.about,
                  target: "_blank",
                  children: "About"
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
                children: "\xA0\u2022\xA0"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app__WEBPACK_IMPORTED_MODULE_0__.Links.App.contact,
                  target: "_blank",
                  children: "Contact"
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
                children: "\xA0\u2022\xA0"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app__WEBPACK_IMPORTED_MODULE_0__.Links.App.privacy,
                  target: "_blank",
                  children: "Privacy"
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
                children: "\xA0\u2022\xA0"
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app__WEBPACK_IMPORTED_MODULE_0__.Links.App.terms,
                  target: "_blank",
                  children: "Terms"
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("section", {
        className: "ms-sm-auto px-0",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("nav", {
          className: "navbar navbar-secondary bg-light sticky-top pt-3 pb-2 mb-3 border-bottom animate__animated animate__fadeInDown",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "container px-0 d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("i", {
                className: "bi bi-three-dots navbar-toggler d-inline-block h6 my-auto",
                style: {
                  fontSize: "1.6rem"
                },
                "data-bs-toggle": "offcanvas",
                "data-bs-target": "#offcanvasStart"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("h6", {
                className: "navbar-brand fw-light text-wrap d-inline-block m-0 p-0",
                children: [doctor.hospital.hospital_name, " | Doctor Panel"]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "mx-auto mx-md-0 mt-3 mt-md-0 ps-2",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                className: "",
                children: doctor.name
              }), "\xA0|\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                className: "text-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": "#logoutModal",
                children: "Logout"
              })]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "tab-content",
          id: "nav-tabContent",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "tab-pane fade",
            id: "dashboard",
            role: "tabpanel",
            children: "Please design me, from dashboard"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "tab-pane fade container show active",
            id: "appointments",
            role: "tabpanel",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("table", {
              className: "table table-sm table-hover",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("thead", {
                className: "table-dark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tr", {
                  className: "text-center",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("th", {
                    children: "ID"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("th", {
                    children: "Mobile"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("th", {
                    children: "Name"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("th", {
                    children: "Time"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("th", {
                    children: "Status"
                  })]
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("tbody", {
                children: doctor === null || doctor === void 0 ? void 0 : (_doctor$appointment = doctor.appointment) === null || _doctor$appointment === void 0 ? void 0 : _doctor$appointment.map((appointmentTuple, ind) => {
                  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("tr", {
                    className: appointmentTuple.status == "Requested" ? "table-active" : undefined,
                    children: Object.keys(appointmentTuple).filter(el => !["doctor_id", "cancelled_at", "cancelled_by", "sex", "for", "registration_no", "last_updated", "remarks"].includes(el)).map((key, index) => {
                      if (key == "id") return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx((react__WEBPACK_IMPORTED_MODULE_5___default().Fragment), {
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("td", {
                          className: "d-flex justify-content-between",
                          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
                            className: "font-monospace",
                            children: appointmentTuple[key]
                          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("small", {
                            className: "text-primary pe-1",
                            style: {
                              cursor: "pointer"
                            },
                            "data-bs-toggle": "modal",
                            "data-bs-target": "#modal" + ind,
                            children: "Details"
                          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("section", {
                            className: "modal fade",
                            id: "modal" + ind,
                            tabIndex: -1,
                            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
                              className: "modal-dialog modal-dialog-centered",
                              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                                className: "modal-content",
                                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                                  className: "modal-header py-1",
                                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("h5", {
                                    className: "modal-title",
                                    children: "Appointment Details"
                                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("button", {
                                    type: "button",
                                    className: "btn-close",
                                    "data-bs-dismiss": "modal",
                                    "aria-label": "Close"
                                  })]
                                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
                                  className: "modal-body",
                                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("pre", {
                                    children: JSON.stringify(appointmentTuple, null, 2)
                                  })
                                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                                  className: "modal-footer py-1",
                                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("button", {
                                    type: "button",
                                    className: "btn btn-sm btn-primary",
                                    "data-bs-dismiss": "modal",
                                    onClick: () => manageAppointment(appointmentTuple.id, "Confirmed"),
                                    children: "Confirm"
                                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("button", {
                                    type: "button",
                                    className: "btn btn-sm btn-danger",
                                    "data-bs-dismiss": "modal",
                                    onClick: () => manageAppointment(appointmentTuple.id, "Cancelled"),
                                    children: "Cancel"
                                  })]
                                })]
                              })
                            })
                          })]
                        })
                      }, index);else if (key == "time") return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("td", {
                        children: new Date(appointmentTuple[key]).toUTCString()
                      }, index);else return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("td", {
                        children: appointmentTuple[key]
                      }, index);
                    })
                  }, ind);
                })
              })]
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "tab-pane fade",
            id: "schedule",
            role: "tabpanel",
            children: "Please design me, from schedule"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "tab-pane fade",
            id: "activity",
            role: "tabpanel",
            children: "Please design me, from activity"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("div", {
            className: "tab-pane fade",
            id: "settings",
            role: "tabpanel",
            children: "Please design me, from activity, from settings"
          })]
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,4394,1548], () => (__webpack_exec__(5107)));
module.exports = __webpack_exports__;

})();