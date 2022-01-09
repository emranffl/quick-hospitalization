exports.id = 1548;
exports.ids = [1548];
exports.modules = {

/***/ 2428:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ DoctorContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const DoctorContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});

/***/ }),

/***/ 227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ UserContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const UserContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);

/***/ }),

/***/ 4598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "BedTypes": () => (/* binding */ BedTypes),
  "Days": () => (/* binding */ Days),
  "Links": () => (/* binding */ Links),
  "Sex": () => (/* binding */ Sex),
  "default": () => (/* binding */ AppMain)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(1273);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./contexts/user.ts
var user = __webpack_require__(227);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/app/AppNavbar.tsx










const AppNavbar = () => {
  const isRouteHome = () => {
    return (router_default()).asPath == "/";
  },
        {
    userContext,
    setUserContext
  } = (0,external_react_.useContext)(user/* UserContext */.S);

  (0,external_react_.useEffect)(function onEveryMount() {
    // adds active class to nav on every page change
    external_jquery_default()("nav > div > div > ul").children("li").map((index, element) => {
      if (external_jquery_default()(element).children("a").attr("href") === window.location.pathname && !external_jquery_default()(element).children("a").hasClass("active")) {
        external_jquery_default()(element).children("a").addClass("active");
      } else {
        if (external_jquery_default()(element).children("a").attr("href") !== window.location.pathname && external_jquery_default()(element).children("a").hasClass("active")) {
          external_jquery_default()(element).children("a").removeClass("active");
        }
      }
    }); // closes nav menu on click inside

    external_jquery_default()("#nav-div .nav-item, #nav-div > .nav-item a").children().on("click", () => {
      external_jquery_default()("#nav-div").hasClass("show");
      external_jquery_default()("#nav-div").removeClass("show");
    });
  });
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx("nav", {
      className: "navbar navbar-expand-xl navbar-light bg-light shadow sticky-top mb-3 justify-content-center bg-faded",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "container",
        children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
          href: "/",
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            className: "navbar-brand",
            children: "Quick Hospitalization"
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("button", {
          className: "navbar-toggler ms-auto d-print-none",
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": "#nav-div",
          children: /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "navbar-toggler-icon"
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "collapse navbar-collapse text-center",
          id: "nav-div",
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
            className: "navbar-nav me-auto",
            children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.home,
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "nav-link",
                  children: "Home"
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.doctor,
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "nav-link",
                  children: "Doctors"
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.booking,
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "nav-link",
                  children: "Booking"
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.appointment,
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "nav-link",
                  children: "Appointment"
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("li", {
              className: "nav-item",
              children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.about,
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "nav-link",
                  children: "About"
                })
              })
            })]
          }), (0,router_.useRouter)().pathname == Links.App.login || (0,router_.useRouter)().pathname == Links.App.signup ? null : userContext ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "nav-item d-inline dropdown",
            style: {
              cursor: "pointer"
            },
            children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
              className: "me-2 font-monospace dropdown-toggle",
              "data-bs-toggle": "dropdown",
              children: userContext.name
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "dropdown-menu pb-0",
              children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.User.account,
                children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "dropdown-item",
                  children: "Profile"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.User.appointments,
                children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "dropdown-item",
                  children: "My Appointments"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: Links.App.User.bookings,
                children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "dropdown-item mb-2",
                  children: "My Bookings"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: "dropdown-item border-top",
                onClick: () => {
                  // logout fn
                  setUserContext(null);
                },
                children: "Logout"
              })]
            })]
          }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "nav-item d-inline",
            children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: Links.App.login,
              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                className: "text-decoration-none ps-2 pe-1 py-2",
                children: /*#__PURE__*/jsx_runtime_.jsx("small", {
                  children: "Login"
                })
              })
            }), /*#__PURE__*/jsx_runtime_.jsx("strong", {
              children: "|"
            }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: Links.App.signup,
              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                className: "text-decoration-none ps-1 pe-2 py-2",
                children: /*#__PURE__*/jsx_runtime_.jsx("small", {
                  children: "Sign Up"
                })
              })
            })]
          })]
        })]
      })
    })
  });
};

/* harmony default export */ const app_AppNavbar = (AppNavbar);
;// CONCATENATED MODULE: ./components/app/Footer.tsx





const Footer = () => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("footer", {
    className: "text-white mt-5 d-print-none",
    style: {
      background: "linear-gradient(to bottom, #005254, #00292a)"
    },
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("section", {
      className: "container-fluid row d-flex justify-content-center",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "col-12 col-sm-6 col-lg-4 col-xl-4 my-4",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "text-center text-lg-start",
          children: "Quick Hospitalization"
        }), /*#__PURE__*/jsx_runtime_.jsx("p", {
          className: "mt-4 mx-auto ms-lg-0 w-75",
          children: "It is a platform where one can search and book for available hospital beds, ICU beds, cabin, etc. at the time of their needs to admit a patient."
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("hr", {
        className: "w-100 d-sm-none"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "col-12 col-sm-6 col-lg-2 col-xl-2 my-4",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "text-center",
          children: "Site Link"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
          className: "list-unstyled text-center mt-4",
          children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: Links.App.about,
              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                className: "text-white",
                children: "About Us"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: Links.App.contact,
              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                className: "text-white",
                children: "Contact Us"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: Links.App.privacy,
              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                className: "text-white",
                children: "Privacy Policy"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: Links.App.terms,
              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                className: "text-white",
                children: "Terms of Service"
              })
            })
          })]
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("hr", {
        className: "w-100 d-sm-none"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "col-12 col-sm-6 col-lg-3 col-xl-3 my-4",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "text-center",
          children: "Center Info"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
          className: "list-unstyled text-center mt-4",
          children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: "Dhaka: 0123456789"
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: "Sylhet: 0123456789"
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: "Mymensing: 0123456789"
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: "Barisal: 0123456789"
          }), /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "pb-1",
            children: "Khulna: 0123456789"
          })]
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("hr", {
        className: "w-100 d-sm-none"
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "col-12 col-sm-6 col-lg-3 col-xl-2 my-4",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
          className: "text-center",
          children: "Follow Us"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "d-flex justify-content-center mt-4",
          children: [/*#__PURE__*/jsx_runtime_.jsx("a", {
            className: "btn btn-outline-primary mx-1 hvr-float",
            href: "#",
            children: /*#__PURE__*/jsx_runtime_.jsx("i", {
              className: "bi bi-facebook h5"
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("a", {
            className: "btn btn-outline-primary mx-1 hvr-float",
            href: "#",
            children: /*#__PURE__*/jsx_runtime_.jsx("i", {
              className: "bi bi-twitter h5"
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("a", {
            className: "btn btn-outline-primary mx-1 hvr-float",
            href: "#",
            children: /*#__PURE__*/jsx_runtime_.jsx("i", {
              className: "bi bi-instagram h5"
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("a", {
            className: "btn btn-outline-primary mx-1 hvr-float",
            href: "#",
            children: /*#__PURE__*/jsx_runtime_.jsx("i", {
              className: "bi bi-linkedin h5"
            })
          })]
        })]
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("hr", {}), /*#__PURE__*/jsx_runtime_.jsx("section", {
      className: "text-center mb-2",
      children: /*#__PURE__*/jsx_runtime_.jsx("small", {
        children: "Copyright \xA9 All rights reserved"
      })
    })]
  });
};

/* harmony default export */ const app_Footer = (Footer);
;// CONCATENATED MODULE: ./layouts/AppLayout.tsx







const AppLayout = ({
  children
}) => {
  const headerVariables = {
    url: "",
    title: "Quick Hospitalization",
    description: "",
    twitterDescription: "",
    imgUrl: ""
  };
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: headerVariables.title
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        httpEquiv: "Content-Type",
        content: "text/html; charset=utf-8"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "url",
        content: headerVariables.url
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "title",
        content: headerVariables.title
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: headerVariables.description
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "image",
        content: headerVariables.imgUrl
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "robots",
        content: "index, follow"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "language",
        content: "English"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "keywords",
        content: ""
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:type",
        content: "website"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:url",
        content: headerVariables.url
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:title",
        content: headerVariables.title
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:description",
        content: headerVariables.description
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:image",
        content: headerVariables.imgUrl
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:image:type",
        content: "image/jpeg"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "twitter:card",
        content: "summary_large_image"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "twitter:url",
        content: headerVariables.url
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "twitter:title",
        content: headerVariables.title
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "twitter:description",
        content: headerVariables.twitterDescription
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "twitter:image",
        content: headerVariables.imgUrl
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(app_AppNavbar, {}), children, /*#__PURE__*/jsx_runtime_.jsx(app_Footer, {})]
  });
};

/* harmony default export */ const layouts_AppLayout = (AppLayout);
;// CONCATENATED MODULE: ./layouts/AdminPanelLayout.tsx





const AdminPanelLayout = ({
  children
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "robots",
        content: "noindex, nofollow, noarchive"
      }), /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Admin Panel | Quick Hospitalization"
      })]
    }), children]
  });
};

/* harmony default export */ const layouts_AdminPanelLayout = (AdminPanelLayout);
// EXTERNAL MODULE: ./contexts/doctor.ts
var doctor = __webpack_require__(2428);
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const Links = {
  Admin: {
    booking: "/booking",
    dashboard: "/admin/dashboard",
    login: "/admin",
    signup: "/admin/signup"
  },
  App: {
    404: "/404",
    500: "/500",
    about: "/about",
    appointment: "/appointment",
    booking: "/booking",
    contact: "/contact",
    doctor: "/doctor",
    home: "/",
    login: "/login",
    privacy: "/privacy",
    recover: "/recover",
    signup: "/signup",
    terms: "/terms",
    User: {
      account: "/user/account",
      appointments: "/user/appointments",
      bookings: "/user/bookings"
    }
  },
  Doctor: {
    dashboard: "/doctor/dashboard",
    login: "/doctor/login",
    signup: "/doctor/signup"
  }
},
      Days = {
  A: {
    Saturday: 6
  },
  S: {
    Sunday: 0
  },
  M: {
    Monday: 1
  },
  T: {
    Tuesday: 2
  },
  W: {
    Wednesday: 3
  },
  R: {
    Thursday: 4
  },
  F: {
    Friday: 5
  }
},
      Sex = {
  M: "Male",
  F: "Female",
  T: "Trans",
  S: "Sis"
},
      BedTypes = {
  ward: "Ward",
  special_ward: "Special_Ward",
  cabin: "Cabin",
  vip_cabin: "VIP_Cabin",
  icu: "ICU",
  ccu: "CCU",
  hdu: "HDU",
  hfncu: "HFNCU",
  emergency: "Emergency",
  covidu: "COVIDU",
  extra: "Extra"
};
function AppMain({
  Component,
  pageProps
}) {
  const isRouteRootAdmin = () => {
    return (0,router_.useRouter)().asPath.includes("admin");
  },
        isRouteRootDoctorManagement = () => {
    return (0,router_.useRouter)().asPath.includes(Links.Doctor.dashboard) || (0,router_.useRouter)().asPath.includes(Links.Doctor.login) || (0,router_.useRouter)().asPath.includes(Links.Doctor.signup);
  },
        {
    0: userContext,
    1: setUserContext
  } = (0,external_react_.useState)(),
        {
    0: doctorContext,
    1: setDoctorContext
  } = (0,external_react_.useState)();

  (0,external_react_.useEffect)(() => {
    // activating tooltips
    var tooltipList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(tooltipTriggerEl => {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("link", {
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
        crossOrigin: "anonymous"
      }), /*#__PURE__*/jsx_runtime_.jsx("script", {
        defer: true,
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM",
        crossOrigin: "anonymous"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "stylesheet",
        href: "/lib/animate.min.css"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "stylesheet",
        href: "https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css",
        crossOrigin: "anonymous"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "stylesheet",
        href: "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
      })]
    }), isRouteRootAdmin() ? /*#__PURE__*/jsx_runtime_.jsx(layouts_AdminPanelLayout, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
    }) : isRouteRootDoctorManagement() ? /*#__PURE__*/jsx_runtime_.jsx(doctor/* DoctorContext.Provider */.D.Provider, {
      value: {
        doctorContext,
        setDoctorContext
      },
      children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
    }) : /*#__PURE__*/jsx_runtime_.jsx(user/* UserContext.Provider */.S.Provider, {
      value: {
        userContext,
        setUserContext
      },
      children: /*#__PURE__*/jsx_runtime_.jsx(layouts_AppLayout, {
        children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
      })
    })]
  });
}

/***/ }),

/***/ 2431:
/***/ (() => {

/* (ignored) */

/***/ })

};
;