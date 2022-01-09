(() => {
var exports = {};
exports.id = 5593;
exports.ids = [5593,2888,2218,2643];
exports.modules = {

/***/ 5494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

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

/***/ 7986:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ appointment),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./functionalities/DB/prismaInstance.ts
var prismaInstance = __webpack_require__(6972);
// EXTERNAL MODULE: external "@prisma/client"
var client_ = __webpack_require__(212);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(1273);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./pages/_app.tsx + 4 modules
var _app = __webpack_require__(4598);
// EXTERNAL MODULE: ./components/Loader.tsx + 2 modules
var Loader = __webpack_require__(5494);
;// CONCATENATED MODULE: external "react-datepicker"
const external_react_datepicker_namespaceObject = require("react-datepicker");
var external_react_datepicker_default = /*#__PURE__*/__webpack_require__.n(external_react_datepicker_namespaceObject);
// EXTERNAL MODULE: ./node_modules/react-datepicker/dist/react-datepicker.css
var react_datepicker = __webpack_require__(5994);
// EXTERNAL MODULE: ./pages/api/fetchappointment.ts
var fetchappointment = __webpack_require__(629);
// EXTERNAL MODULE: ./functionalities/mutateObjects.ts
var mutateObjects = __webpack_require__(4688);
// EXTERNAL MODULE: ./contexts/user.ts
var user = __webpack_require__(227);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./pages/appointment.tsx


















const getServerSideProps = async ({
  query
}) => {
  if (query.id == null || query.id == undefined) return {
    props: {
      retrievedData: null
    }
  };
  let retrievedData = await prismaInstance/* prisma.appointment.findUnique */._.appointment.findUnique({
    where: {
      id: query.id
    },
    include: fetchappointment.appointmentIncludeParam
  });
  return {
    props: {
      retrievedData: JSON.stringify((0,mutateObjects/* mutateContactNumber */.D)(retrievedData))
    }
  };
};

const Doctor = ({
  retrievedData
}) => {
  const {
    0: appointmentInfo,
    1: setAppointmentInfo
  } = (0,external_react_.useState)(JSON.parse(retrievedData)),
        {
    0: appointmentIsInvalid,
    1: setAppointmentIsInvalid
  } = (0,external_react_.useState)(false),
        {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false),
        // edit mode
  {
    0: editMode,
    1: setEditMode
  } = (0,external_react_.useState)(false),
        {
    0: appointmentForSelf,
    1: setAppointmentForSelf
  } = (0,external_react_.useState)((appointmentInfo === null || appointmentInfo === void 0 ? void 0 : appointmentInfo.for) == "Self"),
        // schedule and date time
  {
    0: selectedSchedule,
    1: setSelectedSchedule
  } = (0,external_react_.useState)(0),
        getSelectableDates = () => {
    let date = new Date(),
        month = 12 - (new Date().getMonth() + 1),
        days = [],
        day;
    appointmentInfo ? day = Object.values(_app.Days[appointmentInfo === null || appointmentInfo === void 0 ? void 0 : appointmentInfo.doctor.schedule[selectedSchedule].day])[0] : day = 0; // Get the first day in the month

    while (date.getDay() != day) date.setDate(date.getDate() + 1); // Get all the other days in the month


    while (date.getMonth() != month) {
      days.push(new Date(date.getTime()));
      date.setDate(date.getDate() + 7);
    }

    return days;
  },
        getSelectableTime = (startTime = appointmentInfo === null || appointmentInfo === void 0 ? void 0 : appointmentInfo.doctor.schedule[selectedSchedule].start_time, endTime = appointmentInfo === null || appointmentInfo === void 0 ? void 0 : appointmentInfo.doctor.schedule[selectedSchedule].end_time, step = 15) => {
    const selectableTimeArray = [];
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    while (startTime.getTime() <= endTime.getTime() - step * 60) {
      let time = startTime.getTime();
      selectableTimeArray.push(new Date(time));
      startTime.setMinutes(startTime.getMinutes() + step);
    }

    return selectableTimeArray;
  },
        {
    0: selectableDays,
    1: setSelectableDays
  } = (0,external_react_.useState)(getSelectableDates()),
        {
    0: selectableTime,
    1: setSelectableTime
  } = (0,external_react_.useState)(getSelectableTime()),
        {
    0: selectedDateTime,
    1: setSelectedDateTime
  } = (0,external_react_.useState)(appointmentInfo ? new Date(appointmentInfo.time) : null),
        {
    userContext
  } = (0,external_react_.useContext)(user/* UserContext */.S);

  (0,external_react_.useEffect)(() => {
    if (!userContext) {
      router_default().push(`${_app.Links.App.login}?redirect=${(router_default()).asPath}`, _app.Links.App.login);
      return;
    }

    if (editMode) return setSelectedDateTime(appointmentInfo === null || appointmentInfo === void 0 ? void 0 : appointmentInfo.time);
    setSelectableDays(getSelectableDates());
    setSelectableTime(getSelectableTime());
  }, [selectedSchedule, editMode, userContext]);
  console.log(appointmentInfo);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Appointment | Quick Hospitalization"
      })
    }), loading ? /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}) : null, /*#__PURE__*/(0,jsx_runtime_.jsxs)("main", {
      className: "container",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
        className: "",
        onSubmit: e => {
          e.stopPropagation();
          e.preventDefault();
        },
        children: [/*#__PURE__*/jsx_runtime_.jsx("fieldset", {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "form-floating d-print-none",
            children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
              type: "search",
              className: "form-control",
              id: "floatingInput",
              placeholder: "a67*D9f8*5",
              defaultValue: appointmentInfo ? appointmentInfo.id : "",
              onKeyUp: async e => {
                if (e.key !== "Enter") return;
                setLoading(true);
                await fetch("/api/fetchappointment", {
                  method: "GET",
                  headers: {
                    "content-type": "application/json",
                    "x-appointment-id": e.target.value
                  }
                }).then(response => response.json()).then(res => {
                  setLoading(false);
                  setAppointmentInfo(res.appointment);
                  setEditMode(false);
                  if (!res.appointment) setAppointmentIsInvalid(true);else setAppointmentIsInvalid(false);
                }).catch(err => console.error(err));
                setLoading(false);
              }
            }), /*#__PURE__*/jsx_runtime_.jsx("label", {
              htmlFor: "id",
              children: "Appointment ID"
            })]
          })
        }), appointmentInfo ? /*#__PURE__*/jsx_runtime_.jsx("fieldset", {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "row mx-0 bg-light mt-4",
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center mt-3 mt-lg-0",
              children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "position-relative mt-3",
                style: {
                  width: "200px",
                  height: "200px"
                },
                children:  false ? /*#__PURE__*/0 : null
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                className: "m-3 px-2 d-grid",
                style: {
                  overflowWrap: "break-word"
                },
                children: ["To verify this appointment please visit\xA0", /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "font-monospace",
                  children: "www.quickhospitalization.org/appointment"
                }), "\xA0or\xA0", /*#__PURE__*/jsx_runtime_.jsx("strong", {
                  children: "scan the QR code."
                })]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "col-12 col-lg-7 h-auto  card rounded-0 px-0 d-flex flex-column justify-content-center",
              children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "card-header h5 text-center",
                children: "Appointment Info"
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "card-body",
                children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "row mx-0 row-cols-1 row-cols-sm-2 border border-primary rounded",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "ID:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "font-monospace",
                      children: appointmentInfo.id
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Status:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fst-italic",
                      children: appointmentInfo.status
                    })]
                  }), editMode ? /*#__PURE__*/jsx_runtime_.jsx("div", {
                    className: "col px-2 py-1",
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("select", {
                        className: "form-select",
                        id: "appointmentFor",
                        onInput: e => {
                          if (e.target.value == client_.appointment_for.Self) {
                            setAppointmentForSelf(true);
                            external_jquery_default()("#patientSex").val(appointmentInfo.sex);
                            external_jquery_default()("#patientName").val(userContext.name);
                          } else setAppointmentForSelf(false);
                        },
                        defaultValue: appointmentInfo.for,
                        required: true,
                        children: Object.keys(client_.appointment_for).map((elem, index) => {
                          return /*#__PURE__*/jsx_runtime_.jsx("option", {
                            value: client_.appointment_for[elem],
                            children: client_.appointment_for[elem]
                          }, index);
                        })
                      }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                        htmlFor: "appointmentFor",
                        children: "Appointment For"
                      })]
                    })
                  }) : appointmentInfo.for != client_.appointment_for.Self ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Appointment For:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "",
                      children: appointmentInfo.for
                    })]
                  }) : null, editMode ? /*#__PURE__*/jsx_runtime_.jsx("div", {
                    className: "col px-2 py-1",
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                        type: "text",
                        className: "form-control",
                        id: "patientName",
                        placeholder: "Patient's Name",
                        defaultValue: appointmentInfo.name,
                        disabled: appointmentForSelf ? true : false,
                        readOnly: appointmentForSelf ? true : false,
                        required: true
                      }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                        htmlFor: "patientName",
                        children: "Patient Name"
                      }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                        className: "ml-1 text-danger invalid-feedback"
                      })]
                    })
                  }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Patient Name:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fw-bold",
                      children: appointmentInfo.name
                    })]
                  }), editMode ? /*#__PURE__*/jsx_runtime_.jsx("div", {
                    className: "col px-2 py-1",
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "form-floating",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
                        className: "form-select",
                        id: "patientSex",
                        defaultValue: appointmentForSelf ? userContext.sex : appointmentInfo.sex,
                        disabled: appointmentForSelf ? true : false,
                        required: true,
                        children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "null",
                          hidden: true,
                          children: "Select Gender..."
                        }), Object.keys(client_.appointment_sex).map((elem, index) => {
                          return /*#__PURE__*/jsx_runtime_.jsx("option", {
                            value: elem,
                            children: _app.Sex[elem]
                          }, index);
                        })]
                      }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                        htmlFor: "patientSex",
                        children: "Sex"
                      }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                        className: "ml-1 text-danger invalid-feedback"
                      })]
                    })
                  }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Sex:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "",
                      children: _app.Sex[appointmentInfo.sex]
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Mobile:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "",
                      children: appointmentInfo.user_mobile_no
                    })]
                  }), editMode ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "col-12 px-2 py-1",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                        htmlFor: "doctorSchedule",
                        className: "text-secondary",
                        children: "Schedule"
                      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: "btn-group d-block animate__animated animate__fadeIn animate__zoomIn ",
                        id: "doctorSchedule",
                        role: "group",
                        children: appointmentInfo === null || appointmentInfo === void 0 ? void 0 : appointmentInfo.doctor.schedule.map((elem, index) => {
                          return /*#__PURE__*/(0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
                            children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                              type: "radio",
                              className: "btn-check",
                              name: "btnScheduleRadio",
                              id: "schedule" + index,
                              autoComplete: "off",
                              defaultChecked: Object.keys(_app.Days[elem.day])[0].includes(new Date(appointmentInfo.time).toString().substring(0, 3)) ? true : false
                            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
                              htmlFor: "schedule" + index,
                              className: index % 2 == 0 ? "btn btn-sm mx-0 my-1 rounded-0 btn-outline-secondary" : "btn btn-sm mx-0 my-1 rounded-0 btn-outline-dark",
                              onClick: () => {
                                setSelectedSchedule(index);
                                setSelectedDateTime(null);
                              },
                              children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                                className: "d-block text-center",
                                children: Object.keys(_app.Days[elem.day])
                              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                                className: "d-inline",
                                children: new Date(elem.start_time).toLocaleTimeString([], {
                                  timeStyle: "short"
                                })
                              }), " - ", /*#__PURE__*/jsx_runtime_.jsx("small", {
                                className: "d-inline",
                                children: new Date(elem.end_time).toLocaleTimeString([], {
                                  timeStyle: "short"
                                })
                              })]
                            })]
                          }, index);
                        })
                      })]
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "col-12 px-2 py-1",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                        htmlFor: "dateTime",
                        className: "text-secondary d-block",
                        children: "Date & Time"
                      }), selectedSchedule != -1 ? /*#__PURE__*/jsx_runtime_.jsx((external_react_datepicker_default()), {
                        className: "form-control",
                        id: "dateTime",
                        placeholderText: "Select date and time",
                        autoComplete: "off",
                        onChange: date => setSelectedDateTime(date),
                        selected: selectedDateTime,
                        dateFormat: "dd-MM-yyyy | p",
                        showTimeSelect: true,
                        includeTimes: selectableTime // minTime={
                        // 	new Date(doctor.schedule[selectedSchedule].start_time)
                        // }
                        // maxTime={
                        // 	new Date(doctor.schedule[selectedSchedule].end_time)
                        // }
                        ,
                        timeIntervals: 15,
                        useWeekdaysShort: true,
                        calendarStartDay: 6,
                        includeDates: selectableDays,
                        wrapperClassName: "clamp-mw-50",
                        required: true
                      }) : null]
                    })]
                  }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Date:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fw-bold",
                      children: (() => {
                        let date = new Date(appointmentInfo.time).toLocaleString("en-GB").replace(/\//g, "-"),
                            time = new Date(appointmentInfo.time).toLocaleString("en-US"); // return time

                        return date.substring(0, date.length - 10) + " | " + time.substring(time.length - 11, time.length - 6) + time.substring(time.length, time.length - 3);
                      })()
                    })]
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "row mx-0 row-cols-1 row-cols-sm-2 border border-secondary rounded mt-2",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Doctor Name:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "",
                      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                        href: `/doctor/${appointmentInfo.doctor.email}`,
                        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                          className: "text-decoration-none",
                          children: appointmentInfo.doctor.name
                        })
                      })
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Specification:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fw-bold",
                      children: appointmentInfo.doctor.specialization
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Department:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fw-bold",
                      children: appointmentInfo.doctor.department.replace(/_/g, " ")
                    })]
                  }), appointmentInfo.doctor.chamber ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Chamber:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fw-bold",
                      children: appointmentInfo.doctor.chamber
                    })]
                  }) : null]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "row mx-0 row-cols-1 border border-info rounded mt-2",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Hospital Name:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "",
                      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                        href: `/${appointmentInfo.doctor.registration_no}`,
                        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                          target: "_blank",
                          className: "text-decoration-none",
                          children: appointmentInfo.hospital.hospital_name
                        })
                      })
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "col px-2 py-1",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                      className: "text-secondary",
                      children: "Address:\xA0"
                    }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                      className: "fw-bold",
                      children: `${appointmentInfo.hospital.address.street_address}, ${appointmentInfo.hospital.address.district}, ${appointmentInfo.hospital.address.division}`
                    })]
                  })]
                }), appointmentInfo.remarks ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "border border-warning rounded mt-2 px-2 py-1",
                  children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                    className: "text-secondary",
                    children: "Remarks:\xA0"
                  }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                    className: "",
                    children: appointmentInfo.remarks
                  })]
                }) : null]
              }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "card-footer p-0",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "btn-group btn-group-sm d-flex align-items-center d-print-none",
                  role: "group",
                  "aria-label": "Controls",
                  children: [!editMode ? /*#__PURE__*/jsx_runtime_.jsx("button", {
                    type: "button",
                    className: "btn btn-primary",
                    onClick: () => {
                      window.print();
                    },
                    children: "Print"
                  }) : null, appointmentInfo.status == "Requested" || appointmentInfo.status == "Confirmed" ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                    children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
                      type: "button",
                      className: editMode ? "btn btn-outline-primary" : "btn btn-outline-dark",
                      onClick: () => {
                        if (!editMode) return setEditMode(true);
                      },
                      children: editMode ? "Save" : "Edit"
                    }), /*#__PURE__*/jsx_runtime_.jsx("button", {
                      type: "button",
                      className: "btn btn-outline-danger",
                      onClick: () => {
                        if (editMode) return setEditMode(false);
                      },
                      children: "Cancel"
                    })]
                  }) : null]
                })
              })]
            })]
          })
        }) : null]
      }), appointmentIsInvalid ? /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "text-center text-danger font-monospace m-4",
        children: "Invalid appointment ID"
      }) : null]
    })]
  });
};

/* harmony default export */ const appointment = (Doctor);

/***/ }),

/***/ 5994:
/***/ (() => {



/***/ }),

/***/ 212:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ 1273:
/***/ ((module) => {

"use strict";
module.exports = require("jquery");

/***/ }),

/***/ 9325:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 822:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 6695:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 7162:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 8773:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 2248:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 9372:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 665:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 2747:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 556:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 701:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6731:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 9297:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1664,5675,4394,1548,629], () => (__webpack_exec__(7986)));
module.exports = __webpack_exports__;

})();