"use strict";
(() => {
var exports = {};
exports.id = 8222;
exports.ids = [8222,2888,2218,2643,3918];
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

/***/ 8940:
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
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1273);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4598);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5494);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6417);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _contexts_user__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(227);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);















const getServerSideProps = async ({
  params
}) => {
  let retrievedData = await _functionalities_DB_prismaInstance__WEBPACK_IMPORTED_MODULE_0__/* .prisma.doctor.findUnique */ ._.doctor.findUnique({
    where: {
      email: params.doctor_email
    },
    select: {
      bio: true,
      chamber: true,
      specialization: true,
      department: true,
      email: true,
      id: true,
      image_source: true,
      joined_on: true,
      name: true,
      registration_no: true,
      sex: true,
      hospital: {
        select: {
          hospital_name: true,
          address: {
            select: {
              district: true
            }
          }
        }
      },
      schedule: true,
      _count: {
        select: {
          appointment: true
        }
      }
    }
  });
  if (retrievedData == null) return {
    redirect: {
      destination: "/404",
      permanent: false
    }
  };
  return {
    props: {
      doctorInfo: JSON.stringify(retrievedData)
    }
  };
};

const DoctorInfo = ({
  doctorInfo
}) => {
  var _doctor$bio;

  const doctor = JSON.parse(doctorInfo),
        {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
        // modal
  {
    0: selectedSchedule,
    1: setSelectedSchedule
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(-1),
        getSelectableDates = () => {
    if (selectedSchedule != -1) {
      let date = new Date(),
          month = (new Date().getMonth() + 1) % 12 + 1,
          days = [],
          day = Object.values(_app__WEBPACK_IMPORTED_MODULE_7__.Days[doctor.schedule[selectedSchedule].day])[0]; // Get the first day in the month

      while (date.getDay() != day) date.setDate(date.getDate() + 1); // Get all the other days in the month


      while (date.getMonth() != month) {
        days.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 7);
      }

      return days;
    }
  },
        getSelectableTime = (startTime = (() => {
    var _doctor$schedule$sele;

    return (_doctor$schedule$sele = doctor.schedule[selectedSchedule]) === null || _doctor$schedule$sele === void 0 ? void 0 : _doctor$schedule$sele.start_time;
  })(), endTime = (() => {
    var _doctor$schedule$sele2;

    return (_doctor$schedule$sele2 = doctor.schedule[selectedSchedule]) === null || _doctor$schedule$sele2 === void 0 ? void 0 : _doctor$schedule$sele2.end_time;
  })(), step = 30) => {
    if (selectedSchedule != -1) {
      const selectableTimeArray = [];
      startTime = new Date(startTime);
      endTime = new Date(endTime);

      while (startTime.getTime() <= endTime.getTime() - step * 60) {
        let time = startTime.getTime();
        selectableTimeArray.push(new Date(time));
        startTime.setMinutes(startTime.getMinutes() + step);
      }

      return selectableTimeArray;
    }
  },
        {
    0: selectableDays,
    1: setSelectableDays
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(doctor.schedule.length != 0 ? getSelectableDates === null || getSelectableDates === void 0 ? void 0 : getSelectableDates() : undefined),
        {
    0: selectableTime,
    1: setSelectableTime
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(doctor.schedule.length != 0 ? getSelectableTime === null || getSelectableTime === void 0 ? void 0 : getSelectableTime() : undefined),
        {
    0: selectedDateTime,
    1: setSelectedDateTime
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null),
        {
    0: appointmentForSelf,
    1: setAppointmentForSelf
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false),
        {
    userContext
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useContext)(_contexts_user__WEBPACK_IMPORTED_MODULE_11__/* .UserContext */ .S),
        {
    0: userHasAppointment,
    1: setUserHasAppointment
  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null); // console.log()


  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (doctor.schedule.length != 0) {
      setSelectableDays(getSelectableDates());
      setSelectableTime(getSelectableTime());
    }

    userContext ? //* active appointment fetching
    fetch("/api/getuserappointmentlist", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-user": userContext.mobile_no,
        "x-doctor": doctor.email
      }
    }).then(response => response.json()).then(res => setUserHasAppointment(res.length > 0)).catch(err => console.error(err)) : //* to show appointment button for no user context
    setUserHasAppointment(false);
  }, [selectedSchedule]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("title", {
        children: doctor.name + " | Quick Hospitalization"
      })
    }), doctor.schedule.length != 0 && userHasAppointment == false && userContext ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("section", {
      className: "modal fade",
      id: "appointmentModal",
      tabIndex: -1,
      "data-bs-backdrop": false,
      "data-bs-keyboard": "false",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
        className: "modal-dialog modal-dialog-centered modal-lg",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
          className: "modal-content",
          style: {
            backgroundColor: "rgba(256, 256, 256, 0.85)",
            backdropFilter: "blur(8px)"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
            className: "modal-header py-1",
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("h5", {
              className: "modal-title",
              children: "Appointment"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("button", {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            })]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
            className: "modal-body",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("form", {
              className: "appointment-form container",
              onSubmit: e => {
                e.stopPropagation();
                e.preventDefault();
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("fieldset", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                  className: "row g-2",
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
                    className: "col-lg-7",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("input", {
                        type: "text",
                        className: "form-control",
                        id: "patientName",
                        placeholder: "Patient's Name",
                        defaultValue: appointmentForSelf ? userContext.name : "",
                        disabled: appointmentForSelf ? true : false,
                        readOnly: appointmentForSelf ? true : false,
                        required: true
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                        htmlFor: "patientName",
                        children: "Patient Name"
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                        className: "ml-1 text-danger invalid-feedback"
                      })]
                    })
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
                    className: "col-lg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("select", {
                        className: "form-select",
                        id: "patientSex" // defaultValue={userContext.sex}
                        ,
                        disabled: appointmentForSelf ? true : false,
                        required: true,
                        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("option", {
                          value: "null",
                          hidden: true,
                          children: "Select Gender..."
                        }), Object.keys(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.appointment_sex).map((elem, index) => {
                          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("option", {
                            value: elem,
                            children: _app__WEBPACK_IMPORTED_MODULE_7__.Sex[elem]
                          }, index);
                        })]
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                        htmlFor: "patientSex",
                        children: "Sex"
                      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                        className: "ml-1 text-danger invalid-feedback"
                      })]
                    })
                  })]
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                  htmlFor: "doctorSchedule",
                  className: "text-secondary mt-2",
                  children: "Schedule"
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
                  className: "btn-group d-block animate__animated animate__fadeInUp",
                  id: "doctorSchedule",
                  role: "group",
                  children: doctor.schedule.map((elem, index) => {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), {
                      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("input", {
                        type: "radio",
                        className: "btn-check",
                        name: "btnScheduleRadio",
                        id: "schedule" + index,
                        autoComplete: "off",
                        defaultChecked: index == selectedSchedule
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("label", {
                        htmlFor: "schedule" + index,
                        className: index % 2 == 0 ? "btn btn-sm mx-0 my-1 rounded-0 btn-outline-secondary" : "btn btn-sm mx-0 my-1 rounded-0 btn-outline-dark",
                        onClick: () => {
                          setSelectedSchedule(index);
                          setSelectedDateTime(null);
                          if (!jquery__WEBPACK_IMPORTED_MODULE_6___default()("#confirmAppointment").hasClass("disabled")) jquery__WEBPACK_IMPORTED_MODULE_6___default()("#confirmAppointment").addClass("disabled");
                        },
                        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("span", {
                          className: "d-block text-center",
                          children: Object.keys(_app__WEBPACK_IMPORTED_MODULE_7__.Days[elem.day])
                        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                          className: "d-inline",
                          children: new Date(elem.start_time).toLocaleTimeString([], {
                            timeStyle: "short"
                          })
                        }), " - ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                          className: "d-inline",
                          children: new Date(elem.end_time).toLocaleTimeString([], {
                            timeStyle: "short"
                          })
                        })]
                      })]
                    }, index);
                  })
                }), selectableDays ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                    htmlFor: "dateSelection",
                    className: "text-secondary mt-2 d-block",
                    children: "Select Date"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
                    className: "my-2 d-flex flex-wrap gap-1 animate__animated animate__fadeInUp",
                    id: "dateSelection",
                    role: "group",
                    children: selectableDays.map((selectableDayDateTime, index) => {
                      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), {
                        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("input", {
                          type: "radio",
                          name: "btnDateRadio",
                          className: "btn-check",
                          id: "date" + index
                        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                          className: index % 2 == 0 ? "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-dark" : "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-secondary",
                          htmlFor: "date" + index,
                          onClick: () => {
                            let dateTime = selectableDayDateTime; // if date is changed after time selected
                            // the datetime is adjusted

                            jquery__WEBPACK_IMPORTED_MODULE_6___default()("#timeSelection").children("input[type=radio]").is(":checked") ? jquery__WEBPACK_IMPORTED_MODULE_6___default()("#timeSelection").children("input[type=radio]").map((ind, timeBtn) => {
                              if (jquery__WEBPACK_IMPORTED_MODULE_6___default()(timeBtn).is(":checked")) {
                                dateTime = new Date(dateTime.setHours(new Date(jquery__WEBPACK_IMPORTED_MODULE_6___default()(timeBtn).attr("data-time")).getHours()));
                                dateTime = new Date(dateTime.setMinutes(new Date(jquery__WEBPACK_IMPORTED_MODULE_6___default()(timeBtn).attr("data-time")).getMinutes()));
                              }
                            }) : null;
                            setSelectedDateTime(dateTime);
                          },
                          children: selectableDayDateTime.toLocaleDateString("en-GB").replace(/\//g, "-")
                        })]
                      }, index);
                    })
                  })]
                }) : null, selectedDateTime ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
                  children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                    htmlFor: "timeSelection",
                    className: "text-secondary mt-2 d-block",
                    children: "Select Time"
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
                    className: "my-1 d-flex flex-wrap gap-1 animate__animated animate__fadeInUp",
                    id: "timeSelection",
                    role: "group",
                    children: selectableTime === null || selectableTime === void 0 ? void 0 : selectableTime.map((el, ind) => {
                      let time = el.toLocaleTimeString("en-US");
                      time = time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length);
                      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), {
                        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("input", {
                          type: "radio",
                          name: "btnTimeRadio",
                          className: "btn-check",
                          id: "time" + ind,
                          "data-time": el.toISOString()
                        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("label", {
                          className: ind % 2 == 0 ? "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-secondary" : "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-dark",
                          htmlFor: "time" + ind,
                          onClick: () => {
                            let time;
                            time = new Date(selectedDateTime.setHours(el.getHours()));
                            time = new Date(selectedDateTime.setMinutes(el.getMinutes()));
                            setSelectedDateTime(time);
                            jquery__WEBPACK_IMPORTED_MODULE_6___default()("#confirmAppointment").removeClass("disabled");
                          },
                          children: time
                        })]
                      }, ind);
                    })
                  })]
                }) : null]
              })
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
            className: "modal-footer py-1",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("button", {
              type: "button",
              className: "btn btn-sm btn-primary disabled",
              id: "confirmAppointment",
              onClick: async () => {
                var _$$val;

                setLoading(true);
                await fetch("/api/registerappointment", {
                  method: "POST",
                  body: JSON.stringify({
                    id: "a" + crypto__WEBPACK_IMPORTED_MODULE_9___default().randomBytes(5).toString("hex").toUpperCase().substring(0, 9),
                    user_mobile_no: userContext.mobile_no,
                    name: (_$$val = jquery__WEBPACK_IMPORTED_MODULE_6___default()("#patientName").val()) === null || _$$val === void 0 ? void 0 : _$$val.toString().trim(),
                    sex: jquery__WEBPACK_IMPORTED_MODULE_6___default()("#patientSex").val(),
                    // for: $("#appointmentFor").val(),
                    doctor_id: doctor.id,
                    time: selectedDateTime,
                    status: "Requested",
                    registration_no: doctor.registration_no
                  }),
                  headers: {
                    "content-type": "application/json"
                  }
                }).then(response => response.json()).then(res => {
                  setLoading(false);
                  next_router__WEBPACK_IMPORTED_MODULE_10___default().push(`/appointment?id=${res.id}`, `/appointment`);
                }).catch(err => console.error(err));
                setLoading(false);
              },
              children: "Confirm Appointment"
            })
          })]
        })
      })
    }) : null, loading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z, {}) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("main", {
      className: "container doctor",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        className: "row flex-column-reverse flex-lg-row",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
          className: "col-12 col-lg-7 d-flex justify-content-start align-items-center info h-auto",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
            className: "ms-2 ms-sm-5 my-3 text-white",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
              className: "fw-light",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("i", {
                className: "bi bi-geo-alt m-0 h6"
              }), "\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                className: "font-monospace",
                children: doctor.hospital.address.district
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("h2", {
              className: "mt-3",
              children: [doctor.name, "\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("span", {
                className: "text-info",
                "data-bs-toggle": "tooltip",
                "data-bs-placement": "bottom",
                title: doctor.sex == "M" || doctor.sex == "T" ? "Male" : "Female",
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("i", {
                  className: doctor.sex == "M" || doctor.sex == "T" ? "bi bi-gender-male m-0" : "bi bi-gender-female m-0"
                })
              })]
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("span", {
              className: "d-block h6 fst-italic fw-light mb-4",
              children: doctor.specialization
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
              className: "d-block h5",
              children: ["Department:\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                className: "fst-italic fw-light",
                children: doctor.department
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
              className: "d-block h5",
              children: ["Hospital:\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__.default, {
                href: _app__WEBPACK_IMPORTED_MODULE_7__.Links.App.home + doctor.registration_no,
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("a", {
                  className: "text-info",
                  target: "_blank",
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                    className: "fst-italic fw-light",
                    children: doctor.hospital.hospital_name
                  })
                })
              })]
            }), doctor.chamber == null ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
              className: "d-block h5",
              children: ["Chamber:\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                className: "fst-italic fw-light",
                children: doctor.chamber
              })]
            }), doctor.schedule.length != 0 && userHasAppointment != null ? //* on data fetch
            !userHasAppointment ?
            /*#__PURE__*/
            //* if there are no active appointments
            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
                className: "d-block h5 mt-2 ",
                children: ["Appointment Count:\xA0", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("small", {
                  className: "fst-italic fw-light",
                  children: doctor._count.appointment
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("button", {
                className: "btn btn-outline-light rounded-pill mt-3 fw-light animate__animated animate__fadeInUp",
                "data-bs-toggle": userContext ? "modal" : null,
                "data-bs-target": userContext ? "#appointmentModal" : null,
                onClick: () => {
                  userContext ? null : next_router__WEBPACK_IMPORTED_MODULE_10___default().push(`${_app__WEBPACK_IMPORTED_MODULE_7__.Links.App.login}?redirect=${(next_router__WEBPACK_IMPORTED_MODULE_10___default().asPath)}`, _app__WEBPACK_IMPORTED_MODULE_7__.Links.App.login);
                },
                children: "Make An Appointment"
              })]
            }) :
            /*#__PURE__*/
            //* if there are active appointments
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__.default, {
              href: _app__WEBPACK_IMPORTED_MODULE_7__.Links.App.User.appointments,
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("button", {
                className: "btn btn-outline-light rounded-pill mt-3 fw-light animate__animated animate__fadeInUp",
                children: "View Appointment"
              })
            }) : //* on first mount
            null]
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("div", {
          className: "col-12 col-lg-5 d-flex mt-3 mt-lg-0",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(next_image__WEBPACK_IMPORTED_MODULE_2__.default, {
            className: "m-auto",
            src: doctor.sex == "M" || doctor.sex == "T" ? "/media/doctor-profile-male.png" : "/media/doctor-profile-female.png",
            alt: doctor.sex == "M" || doctor.sex == "T" ? "doctor-profile-male - doctor image" : "doctor-profile-female - doctor image",
            width: 576,
            height: 576,
            priority: true
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
        className: "container-fluid my-5",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("h3", {
          className: "",
          children: "Bio"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx("p", {
          className: "fw-light",
          children: (_doctor$bio = doctor.bio) !== null && _doctor$bio !== void 0 ? _doctor$bio : "Not Provided"
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DoctorInfo);

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,5675,1548], () => (__webpack_exec__(8940)));
module.exports = __webpack_exports__;

})();