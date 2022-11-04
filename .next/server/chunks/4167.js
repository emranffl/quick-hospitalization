exports.id = 4167;
exports.ids = [4167];
exports.modules = {

/***/ 6150:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "C": () => (/* binding */ sendEmail),
  "O": () => (/* binding */ sendOTP)
});

;// CONCATENATED MODULE: ./lib/smtp.js
/* SmtpJS.com - v3.0.0 */
let Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      ;
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
      let t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    let a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
      let e = a.responseText;
      null != t && t(e);
    }, a.send(n);
  },
  ajax: function (e, n) {
    let t = Email.createCORSRequest("GET", e);
    t.onload = function () {
      let e = t.responseText;
      null != n && n(e);
    }, t.send();
  },
  createCORSRequest: function (e, n) {
    let t = new XMLHttpRequest();
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest()).open(e, n) : t = null, t;
  }
};

;// CONCATENATED MODULE: ./functionalities/emailManager.ts


const sendEmail = async (To, Subject, Body) => {
  return await send(To, Subject, Body);
},
      sendOTP = async (To, Subject, OTP) => {
  return await send(To, Subject, `This email is automatically generated from internal system of Quick Hospitalization, do not reply. 
            Your OTP is: ${OTP}. If you haven't requested for the OTP, take necessary steps immediately!`);
},
      send = async (To, Subject, Body) => {
  const mailServerRes = await Email.send({
    Host: process.env.NEXT_PUBLIC_MAIL_SERVER_HOST,
    Username: process.env.NEXT_PUBLIC_MAIL_SERVER_USERNAME,
    Password: process.env.NEXT_PUBLIC_MAIL_SERVER_PASSWORD,
    From: process.env.NEXT_PUBLIC_MAIL_SERVER_USERNAME,
    To,
    Subject,
    Body
  });
  if (mailServerRes === "OK") return true;else return false;
};



/***/ }),

/***/ 5692:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2034);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8819);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_1__);


react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.configure();
const color = {
  warning: "tomato",
  danger: "red",
  primary: "#007BFF"
},
      customId = "custom-id-yes";

const Toast = (content, type = "primary", autoClose = 4000) => {
  (0,react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast)(content, {
    autoClose,
    position: react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.POSITION.BOTTOM_RIGHT,
    style: {
      backgroundColor: color[type],
      backdropFilter: "blur(3px)",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,0.75)!important"
    },
    bodyClassName: "text-light",
    bodyStyle: {
      font: "status-bar"
    },
    hideProgressBar: true // toastId: customId, // disables multiple toast bursts 

  });
};



/***/ }),

/***/ 8819:
/***/ (() => {



/***/ })

};
;