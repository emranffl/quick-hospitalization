"use strict";
(() => {
var exports = {};
exports.id = 9189;
exports.ids = [9189,2888,2218,2643];
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

/***/ 1953:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ dashboard),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(1273);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./functionalities/DB/prismaInstance.ts
var prismaInstance = __webpack_require__(6972);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./functionalities/toast.ts
var toast = __webpack_require__(5692);
// EXTERNAL MODULE: ./functionalities/emailManager.ts + 1 modules
var emailManager = __webpack_require__(6150);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6417);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
// EXTERNAL MODULE: ./components/Loader.tsx + 2 modules
var Loader = __webpack_require__(5494);
// EXTERNAL MODULE: ./components/BedTypeInputFields.tsx
var BedTypeInputFields = __webpack_require__(8907);
;// CONCATENATED MODULE: ./functionalities/compareObjects.ts
const isObjectEqual = (object1, object2) => {
  const keys1 = Object.keys(object1),
        keys2 = Object.keys(object2),
        isObject = object => {
    return object != null && typeof object === "object";
  };

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = object1[key],
          val2 = object2[key],
          areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !isObjectEqual(val1, val2) || !areObjects && val1 !== val2) return false;
  }

  return true;
};


// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: ./pages/_app.tsx + 4 modules
var _app = __webpack_require__(4598);
// EXTERNAL MODULE: ./functionalities/mutateObjects.ts
var mutateObjects = __webpack_require__(4688);
// EXTERNAL MODULE: ./pages/api/getdoctorlist.ts
var getdoctorlist = __webpack_require__(9032);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./pages/admin/dashboard.tsx


















const getServerSideProps = async ({
  query
}) => {
  // redirect upon error
  if ((query.reg == "" || query.reg == undefined) && (query.user == "" || query.user == undefined)) return {
    redirect: {
      destination: "/admin",
      permanent: false
    }
  };
  const retrievedData = await prismaInstance/* prisma.hospital.findUnique */._.hospital.findUnique({
    where: {
      registration_no: query.reg
    },
    include: {
      address: true,
      booking: {
        take: 10,
        orderBy: {
          booked_at: "desc"
        }
      },
      capacity: true,
      vacant_bed_log: {
        take: 10,
        orderBy: {
          last_updated: "desc"
        }
      },
      doctor: {
        select: getdoctorlist.doctorSelectParam
      },
      staff: {
        where: {
          email: {
            not: query.user
          }
        },
        select: {
          email: true,
          joined_on: true,
          last_updated: true,
          mobile_no: true,
          name: true,
          role: true,
          status: true
        },
        orderBy: {
          joined_on: "desc"
        }
      },
      log: {
        take: 10,
        orderBy: {
          logged_at: "desc"
        },
        include: {
          staff: {
            select: {
              name: true,
              email: true,
              status: true
            }
          }
        }
      }
    }
  });
  if (query.user) retrievedData["user"] = await prismaInstance/* prisma.staff.findUnique */._.staff.findUnique({
    where: {
      email: query.user
    }
  });else retrievedData["user"] = {
    email: "lixnj2@example.com",
    joined_on: "2017-06-06T10:45:13.000Z",
    last_updated: "2009-02-12T03:24:54.000Z",
    mobile_no: "1557465755",
    name: "Ginger Lynch",
    role: "DB_Manager",
    status: "Active"
  };
  retrievedData["count"] = {
    ["booking"]: {
      requested: 0,
      booked: 0,
      served: 0,
      cancelled: 0
    }
  };

  for (const status of ["Requested", "Booked", "Served", "Cancelled"]) {
    retrievedData.count.booking[status.toLowerCase()] = await prismaInstance/* prisma.booking.count */._.booking.count({
      where: {
        registration_no: query.reg,
        AND: {
          status: status
        }
      }
    });
  }

  return {
    props: {
      retrievedData: JSON.stringify((0,mutateObjects/* mutateContactNumber */.D)(retrievedData))
    }
  };
};

const Dashboard = ({
  retrievedData
}) => {
  var _hospital$address$lat, _hospital$address$lon;

  let hospital = JSON.parse(retrievedData);
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  console.log(hospital); // * employee management

  const {
    0: staff,
    1: setStaff
  } = (0,external_react_.useState)(hospital.staff),
        filterStaff = (status = "Active") => {
    return staff.filter(el => {
      return el.status.indexOf(status) != -1;
    });
  },
        {
    0: filteredStaff,
    1: setFilteredStaff
  } = (0,external_react_.useState)(filterStaff()),
        {
    0: filteredStaffOnSearch,
    1: setFilteredStaffOnSearch
  } = (0,external_react_.useState)(filterStaff()),
        {
    0: searchFieldName,
    1: setSearchFieldName
  } = (0,external_react_.useState)("name"),
        {
    0: showAddStaff,
    1: setShowAddStaff
  } = (0,external_react_.useState)(false),
        {
    0: OTP,
    1: setOTP
  } = (0,external_react_.useState)(""),
        getStaffInputFieldData = (submit = false) => {
    let data = submit ? {
      registration_no: hospital.registration_no,
      status: "Active",
      password: external_crypto_default().randomBytes(5).toString("hex") // 10 characters

    } : {};
    external_jquery_default()("#staffDataRow").find("input[type=text], input[type=tel], input[type=email], select").map((index, elem) => {
      submit ? external_jquery_default()(elem).attr("data-name") == "mobile_no" ? data[external_jquery_default()(elem).attr("data-name")] = external_jquery_default()(elem).val() : data[external_jquery_default()(elem).attr("data-name")] = external_jquery_default()(elem).val() : external_jquery_default()(elem).attr("id") == "staffMobile" ? data[external_jquery_default()(elem).attr("id")] = external_jquery_default()(elem).val() : data[external_jquery_default()(elem).attr("id")] = external_jquery_default()(elem).val();
    });
    return data;
  },
        {
    0: editStaffTuple,
    1: setEditStaffTuple
  } = (0,external_react_.useState)(""),
        getStaffEditFieldData = (tupleId, email) => {
    let data = {
      email
    };
    external_jquery_default()(`#${tupleId} input, #${tupleId} select`).map((ind, elem) => {
      external_jquery_default()(elem).attr("data-name") == "role" ? data[external_jquery_default()(elem).attr("data-name")] = external_jquery_default()(elem).val().replace(" ", "_") : data[external_jquery_default()(elem).attr("data-name")] = external_jquery_default()(elem).val();
    });
    return data;
  },
        populateStaffRow = (tr, index) => {
    const populateForActiveStaffs = () => {
      return /*#__PURE__*/(0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
        children: [["name", "mobile_no", "email", "role", "status", "joined_on"].map((td, index) => {
          return /*#__PURE__*/jsx_runtime_.jsx("td", {
            className: td == "joined_on" ? "ps-0" : undefined,
            children: td == "joined_on" || td == "last_updated" ? new Date(tr[td]).toUTCString() : td == "name" ? editStaffTuple == tr.mobile_no ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
              children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                type: "text",
                className: "w-100",
                placeholder: "E.g.: Alice Milburn",
                onInput: e => e.target.value = e.target.value.slice(0, 50),
                onChange: e => {
                  external_jquery_default()(e.target).attr("value") == e.target.value ? external_jquery_default()("#btn_save_" + tr.mobile_no).addClass("disabled") : external_jquery_default()("#btn_save_" + tr.mobile_no).removeClass("disabled");
                },
                required: true,
                "data-name": td,
                defaultValue: tr[td]
              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                className: "d-block text-danger text-left mt-1 ps-1 fst-italic",
                style: {
                  fontSize: "0.73rem"
                },
                id: tr.mobile_no + "_nameErr"
              })]
            }) : tr[td] : td == "mobile_no" ? editStaffTuple == tr.mobile_no ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
              children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                type: "tel",
                className: "w-100",
                placeholder: "E.g.: 01*********",
                onInput: e => e.target.value = e.target.value.slice(0, 11),
                onChange: e => {
                  external_jquery_default()(e.target).attr("value") == e.target.value ? external_jquery_default()("#btn_save_" + tr.mobile_no).addClass("disabled") : external_jquery_default()("#btn_save_" + tr.mobile_no).removeClass("disabled");
                },
                required: true,
                "data-name": td,
                defaultValue: tr[td]
              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                className: "d-block text-danger text-left mt-1 ps-1 fst-italic",
                style: {
                  fontSize: "0.73rem"
                },
                id: tr.mobile_no + "_mobile_noErr"
              })]
            }) : tr[td] : td == "email" ? // editTuple == tr.mobile_no ? (
            // 	<>
            // 		<input
            // 			type="email"
            // 			className="w-100"
            // 			placeholder="E.g.: 01*********"
            // 			onInput={e =>
            // 				(e.target.value = e.target.value.slice(0, 14))
            // 			}
            // 			required
            // 			data-name={td}
            // 			defaultValue={tr[td as keyof staff].toString()}
            // 		/>
            // 		<small
            // 			className="d-block text-danger text-left mt-1 ps-1"
            // 			id={tr.mobile_no + "_staffEmailErr"}
            // 		></small>
            // 	</>
            // ) : (
            tr[td] : // )
            td == "role" ? editStaffTuple == tr.mobile_no ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
              className: "form-select",
              defaultValue: tr[td],
              "data-name": td,
              onChange: e => {
                tr.role == e.target.value ? external_jquery_default()("#btn_save_" + tr.mobile_no).addClass("disabled") : external_jquery_default()("#btn_save_" + tr.mobile_no).removeClass("disabled");
              },
              children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
                value: "Admin",
                children: "Admin"
              }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                value: "DB Manager",
                children: "DB Manager"
              }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                value: "Moderator",
                children: "Moderator"
              })]
            }) : tr[td].replace("_", " ") : td == "status" ? editStaffTuple == tr.mobile_no ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
                className: "form-select",
                defaultValue: tr[td],
                "data-name": td,
                onChange: e => {
                  tr.status == e.target.value ? external_jquery_default()("#btn_save_" + tr.mobile_no).addClass("disabled") : external_jquery_default()("#btn_save_" + tr.mobile_no).removeClass("disabled");
                },
                children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
                  value: "Active",
                  children: "Active"
                }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                  value: "Inactive",
                  children: "Inactive"
                })]
              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                className: "text-danger fst-italic",
                style: {
                  fontSize: "0.73rem"
                },
                children: "# irreversible change"
              })]
            }) : tr[td] : null
          }, index);
        }), /*#__PURE__*/jsx_runtime_.jsx("td", {
          className: "ps-0 pe-2",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "btn-group w-100 animate__animated animate__fadeIn animate__slow",
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
              className: "btn btn-sm btn-dark d-inline-block hvr-float",
              onClick: e => {
                setEditStaffTuple(editStaffTuple == tr.mobile_no ? "" : tr.mobile_no);
                external_jquery_default()(".btn-save").addClass("disabled");
              },
              children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                className: "bi bi-pencil-square"
              }), "\xA0Edit"]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
              className: "btn btn-sm btn-primary d-inline-block hvr-float btn-save disabled",
              id: "btn_save_" + tr.mobile_no,
              onClick: async e => {
                if (external_jquery_default()(e.target).hasClass("disabled")) return; // * update staff info block

                setLoading(true);
                await fetch("/api/updatehospitalstaff", {
                  method: "POST",
                  body: JSON.stringify(getStaffEditFieldData(tr.mobile_no, tr.email)),
                  headers: {
                    "content-type": "application/json"
                  }
                }).then(response => response.json()).then(async res => {
                  const fields = {
                    name: false,
                    mobile_no: false
                  };

                  if (res.updated) {
                    external_jquery_default()(e.target).addClass("disabled");
                    external_jquery_default()("#btn_refresh").trigger("click");
                  } else if (res.errors != undefined) {
                    res.errors.map(error => {
                      fields[error.split(" ")[0]] = true;
                      external_jquery_default()(`#${tr.mobile_no}_${error.split(" ")[0]}Err`).text(error.replace("_no", ""));
                    });
                  }

                  Object.keys(fields).map(error => {
                    !fields[error] ? external_jquery_default()(`#${tr.mobile_no}_${error.split(" ")[0]}Err`).text("") : null;
                  });
                }).catch(err => console.error(err));
                setLoading(false);
              },
              children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                className: "bi bi-file-earmark-check"
              }), "\xA0Save"]
            })]
          })
        })]
      }, index);
    };

    return  false ? 0 : populateForActiveStaffs();
  }; // * amenities & services management
  // const [amenity, setAmenity] = useState(hospital.amenity),
  // 	[newAmenity, setNewAmenity] = useState(hospital.amenity),
  // 	[generalService, setGeneralService] = useState(hospital.general_service),
  // 	[newGeneralService, setNewGeneralService] = useState(
  // 		hospital.general_service
  // 	),
  // 	[bloodAnalyticalService, setBloodAnalyticalService] = useState(
  // 		hospital.blood_analytical_service
  // 	),
  // 	[newBloodAnalyticalService, setNewBloodAnalyticalService] = useState(
  // 		hospital.blood_analytical_service
  // 	),
  // 	[diagnosticImagingService, setDiagnosticImagingService] = useState(
  // 		hospital.diagnostic_imaging_service
  // 	),
  // 	[newDiagnosticImagingService, setNewDiagnosticImagingService] = useState(
  // 		hospital.diagnostic_imaging_service
  // 	)
  // useEffect(() => {
  // 	const unsavedAmenity = !isObjectEqual(amenity, newAmenity),
  // 		unsavedGeneralService = !isObjectEqual(generalService, newGeneralService),
  // 		unsavedBloodAnalyticalService = !isObjectEqual(
  // 			bloodAnalyticalService,
  // 			newBloodAnalyticalService
  // 		),
  // 		unsavedDiagnosticImagingService = !isObjectEqual(
  // 			diagnosticImagingService,
  // 			newDiagnosticImagingService
  // 		)
  // 	// enabling save button if changes are made
  // 	if (!unsavedAmenity) $("#btn_amenity").addClass("disabled")
  // 	else if (unsavedAmenity) $("#btn_amenity").removeClass("disabled")
  // 	if (!unsavedGeneralService) $("#btn_general_service").addClass("disabled")
  // 	else if (unsavedGeneralService)
  // 		$("#btn_general_service").removeClass("disabled")
  // 	if (!unsavedBloodAnalyticalService)
  // 		$("#btn_blood_analytical_service").addClass("disabled")
  // 	else if (unsavedBloodAnalyticalService)
  // 		$("#btn_blood_analytical_service").removeClass("disabled")
  // 	if (!unsavedDiagnosticImagingService)
  // 		$("#btn_diagnostic_imaging_service").addClass("disabled")
  // 	else if (unsavedDiagnosticImagingService)
  // 		$("#btn_diagnostic_imaging_service").removeClass("disabled")
  // 	// // removing navigation event listener if changes are reverted
  // 	// if (
  // 	// 	!unsavedAmenity ||
  // 	// 	!unsavedGeneralService ||
  // 	// 	!unsavedBloodAnalyticalService ||
  // 	// 	!unsavedDiagnosticImagingService
  // 	// ) {
  // 	// 	$(
  // 	// 		"#offcanvasStart a, #offcanvasStart li, #offcanvasStart span, #offcanvasStart i"
  // 	// 	).off("click.new")
  // 	// }
  // 	// // adding event listener on unsaved changes and stopping navigation
  // 	// $("#offcanvasStart li").on("click.new", event => {
  // 	// 	if (
  // 	// 		unsavedAmenity ||
  // 	// 		unsavedGeneralService ||
  // 	// 		unsavedBloodAnalyticalService ||
  // 	// 		unsavedDiagnosticImagingService
  // 	// 	) {
  // 	// 		event.stopImmediatePropagation()
  // 	// 		Toast(
  // 	// 			"Unsaved changes persist! To proceed further, save them first or revert changes.",
  // 	// 			"warning",
  // 	// 			false
  // 	// 		)
  // 	// 	}
  // 	// })
  // }, [
  // 	newAmenity,
  // 	newGeneralService,
  // 	newBloodAnalyticalService,
  // 	newDiagnosticImagingService,
  // ]) // detecting changes


  (0,external_react_.useEffect)(() => {
    // showing indeterminate in custom checkbox of services if null
    external_jquery_default()("#amenities-and-services").find("input[type=checkbox]").map((index, elem) => hospital[external_jquery_default()(elem).attr("data-parent")][external_jquery_default()(elem).attr("id")] == null ? external_jquery_default()(elem).prop("indeterminate", true) : null);
  }, []); // * doctors and schedule

  const {
    0: doctorList,
    1: setDoctorList
  } = (0,external_react_.useState)(hospital.doctor); // * settings

  let base64image = "default";
  (0,external_react_.useEffect)(() => {
    // * profile view handler
    // hospital profile view data generator
    const getProfileViewData = () => {
      let data = {
        hospital: {
          registration_no: hospital.registration_no
        },
        address: {
          registration_no: hospital.registration_no
        }
      };
      external_jquery_default()("#hospital_profile").find("input, select").map((index, elem) => {
        data[external_jquery_default()(elem).attr("data-parent")][external_jquery_default()(elem).attr("name")] = external_jquery_default()(elem).val() == "" ? null : external_jquery_default()(elem).val();
      });
      return data;
    };

    external_jquery_default()("#hospital_profile").find("input, select").on("input", e => {
      setNewProfileData(getProfileViewData());
    }); // populating division select list from api call

    external_jquery_default().ajax({
      async: true,
      crossDomain: true,
      url: "https://bdapi.p.rapidapi.com/v1.1/divisions",
      method: "GET",
      headers: {
        "x-rapidapi-key": "cbf862913cmshaa46309e036812ap179cb1jsna79dc0cf751a",
        "x-rapidapi-host": "bdapi.p.rapidapi.com"
      }
    }).done(function (response) {
      let optionsHtml = `<option value="null" hidden>Select Division...</option>`;
      response.data.map((elem, index) => {
        optionsHtml += `<option value="${elem.division}" ${elem.division == hospital.address.division ? "selected" : null}>${elem.division}</option>`;
      });
      external_jquery_default()("#hospital_division").html(optionsHtml);
    }); // populating district select list from api call

    external_jquery_default().ajax({
      async: true,
      crossDomain: true,
      url: `https://bdapi.p.rapidapi.com/v1.1/division/${hospital.address.division}`,
      method: "GET",
      headers: {
        "x-rapidapi-key": "cbf862913cmshaa46309e036812ap179cb1jsna79dc0cf751a",
        "x-rapidapi-host": "bdapi.p.rapidapi.com"
      }
    }).done(function (response) {
      let optionsHtml = `<option value="null" hidden selected>Select District...</option>`;
      response.data.map(element => {
        optionsHtml += `<option value="${element.district}" ${element.district == hospital.address.district ? "selected" : null}>${element.district}</option>`;
      });
      external_jquery_default()("#hospital_district").html(optionsHtml);
    }); // * capacity view handler
    // capacity checkbox checked/unchecked setter

    external_jquery_default()("#hospital_capacity").find("input[type=checkbox]").map((index, elem) => {
      external_jquery_default()(elem).attr("checked", hospital.capacity[external_jquery_default()(elem).attr("data-name")]);
    }); // capacity value & enabled/disabled setter

    external_jquery_default()("#hospital_capacity").find("input[type=number]").map((index, elem) => {
      external_jquery_default()(elem).val(hospital.capacity[external_jquery_default()(elem).attr("data-name")]);
      external_jquery_default()(elem).attr("min", "1");
      external_jquery_default()(elem).parent().prev().children("input[type=checkbox]").is(":checked") ? external_jquery_default()(elem).removeAttr("disabled") : null;
    }); // enable/disable input fields on checkbox click

    external_jquery_default()("#hospital_capacity").find("input[type=checkbox]").on("click", e => {
      const inputField = external_jquery_default()(e.target).parent().next().children("input[type=number]");

      if (external_jquery_default()(e.target).is(":checked")) {
        external_jquery_default()(inputField).removeAttr("disabled");
        external_jquery_default()(inputField).val("1");
      } else {
        external_jquery_default()(inputField).attr("disabled", "true");
        external_jquery_default()(inputField).val("");
      }

      external_jquery_default()(inputField).trigger("input");
    }); // hospital capacity view data generator

    const getCapacityViewData = () => {
      let data = {
        registration_no: hospital.registration_no,
        total_capacity: (() => {
          let sum = 0;
          external_jquery_default()("#hospital_capacity").find("input[type=number]").map((ind, elem) => {
            sum += parseInt(external_jquery_default()(elem).val() == "" ? "0" : external_jquery_default()(elem).val());
          });
          return sum;
        })()
      };
      external_jquery_default()("#hospital_capacity").find("input[type=number]").map((index, elem) => {
        data[external_jquery_default()(elem).attr("data-name")] = external_jquery_default()(elem).val() == "" ? null : parseInt(external_jquery_default()(elem).val());
      });
      return data;
    };

    external_jquery_default()("#hospital_capacity").find("input[type=number]").on("input", e => {
      setNewCapacity(getCapacityViewData());
    }); // * user view handler
    // hospital profile view data generator

    const getUserViewData = () => {
      let data = {
        registration_no: hospital.registration_no
      };
      external_jquery_default()("#hospital_user").find("input").map((index, elem) => {
        if (!external_jquery_default()(elem).attr("disabled") && !external_jquery_default()(elem).attr("readonly")) // excluding uneditable fields
          external_jquery_default()(elem).attr("name") == "password" ? external_jquery_default()(elem).hasClass("is-valid") ? data[external_jquery_default()(elem).attr("name")] = external_jquery_default()(elem).val() : null : external_jquery_default()(elem).attr("name") == "mobile_no" ? data[external_jquery_default()(elem).attr("name")] = external_jquery_default()(elem).val() : data[external_jquery_default()(elem).attr("name")] = external_jquery_default()(elem).val() == "" ? null : external_jquery_default()(elem).val();
      });
      return data;
    };

    external_jquery_default()("#hospital_user").find("input").on("input", e => {
      setNewUserData(getUserViewData());
    });
    external_jquery_default()("#offcanvasStartContent > ul > li").on("click", e => {
      var bsOffcanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasStart"));
      bsOffcanvas.hide();
    });
  }, []);
  const profileViewData = {
    hospital: {
      registration_no: hospital.registration_no,
      hospital_name: hospital.hospital_name,
      hospital_type: hospital.hospital_type,
      website: hospital.website
    },
    address: {
      registration_no: hospital.registration_no,
      street_address: hospital.address.street_address,
      district: hospital.address.district,
      division: hospital.address.division,
      phone_no: hospital.address.phone_no,
      mobile_no: hospital.address.mobile_no,
      latitude: hospital.address.latitude,
      longitude: hospital.address.longitude
    }
  },
        {
    0: profileData,
    1: setProfileData
  } = (0,external_react_.useState)(profileViewData),
        {
    0: newProfileData,
    1: setNewProfileData
  } = (0,external_react_.useState)(profileViewData),
        {
    0: capacity,
    1: setCapacity
  } = (0,external_react_.useState)(hospital.capacity),
        {
    0: newCapacity,
    1: setNewCapacity
  } = (0,external_react_.useState)(hospital.capacity),
        {
    0: passwordChangeViewIsVisible,
    1: setPasswordChangeViewIsVisible
  } = (0,external_react_.useState)(false),
        userViewData = {
    registration_no: hospital.registration_no,
    name: hospital.user.name,
    email: hospital.user.email,
    mobile_no: hospital.user.mobile_no // role: hospital.user.role,

  },
        {
    0: userData,
    1: setUserData
  } = (0,external_react_.useState)(userViewData),
        {
    0: newUserData,
    1: setNewUserData
  } = (0,external_react_.useState)(userViewData);
  (0,external_react_.useEffect)(() => {
    isObjectEqual(profileData, newProfileData) ? external_jquery_default()("#btn_profile").addClass("disabled") : external_jquery_default()("#btn_profile").removeClass("disabled");
    isObjectEqual(capacity, newCapacity) ? external_jquery_default()("#btn_capacity").addClass("disabled") : external_jquery_default()("#btn_capacity").removeClass("disabled");
    isObjectEqual(userData, newUserData) ? external_jquery_default()("#btn_user").addClass("disabled") : external_jquery_default()("#btn_user").removeClass("disabled");
  }, [newProfileData, newCapacity, newUserData]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Dashboard | Admin Panel"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("section", {
      className: "modal fade",
      id: "logoutModal",
      "data-bs-backdrop": "static",
      "data-bs-keyboard": "true",
      "aria-labelledby": "logoutModalLabel",
      "aria-hidden": "true",
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "modal-dialog modal-dialog-centered",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "modal-content",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "modal-body",
            children: /*#__PURE__*/jsx_runtime_.jsx("p", {
              children: "Are you sure you want to logout?"
            })
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "modal-footer",
            children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
              type: "button",
              className: "btn btn-secondary",
              onClick: () => {
                // todo handle routing with session
                router_default().replace(`/admin`);
              },
              children: "Yes"
            }), /*#__PURE__*/jsx_runtime_.jsx("button", {
              type: "button",
              className: "btn btn-primary",
              "data-bs-dismiss": "modal",
              children: "No"
            })]
          })]
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("main", {
      className: "dashboard",
      children: [loading ? /*#__PURE__*/jsx_runtime_.jsx(Loader/* default */.Z, {}) : null, /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "offcanvas offcanvas-start p-0",
        tabIndex: -1,
        id: "offcanvasStart",
        style: {
          width: "260px"
        },
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "offcanvas-body p-0 bg-dark d-flex flex-column",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "mt-2 text-white text-center h3",
            children: "Admin Panel"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "my-auto",
            id: "offcanvasStartContent",
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
              className: "nav nav-tabs flex-column border-0 w-100 bg-light",
              role: "tablist",
              children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
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
                  children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "bi bi-house-door-fill h4 me-2 my-auto"
                  }), "Dashboard"]
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#employees",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "200ms"
                  },
                  children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "bi bi-people-fill h4 me-2 my-auto"
                  }), "Employees"]
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft active",
                  href: "#doctors-and-schedule",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "400ms"
                  },
                  children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "bi bi-person-bounding-box h4 my-auto"
                  }), /*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "bi bi-calendar2-week h5 me-2 mb-n3",
                    style: {
                      zIndex: -1,
                      marginLeft: "-7px"
                    }
                  }), "Doctors & Schedule"]
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#activity",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "550ms"
                  },
                  children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "bi bi-archive-fill h4 me-2 my-auto"
                  }), "Activity"]
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                className: "nav-item bg-dark",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
                  className: "nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft",
                  href: "#settings",
                  "data-bs-toggle": "tab",
                  role: "tab",
                  style: {
                    animationDelay: "500ms"
                  },
                  children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                    className: "bi bi-gear-fill h4 me-2 my-auto"
                  }), "Settings"]
                })
              })]
            })
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "text-white",
            children: [/*#__PURE__*/jsx_runtime_.jsx("hr", {
              className: "my-0"
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "m-1 d-flex justify-content-center",
              children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app.Links.App.about,
                  target: "_blank",
                  children: "About"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                children: "\xA0\u2022\xA0"
              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app.Links.App.contact,
                  target: "_blank",
                  children: "Contact"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                children: "\xA0\u2022\xA0"
              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app.Links.App.privacy,
                  target: "_blank",
                  children: "Privacy"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                children: "\xA0\u2022\xA0"
              }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                  className: "text-decoration-none hvr-float",
                  href: _app.Links.App.terms,
                  target: "_blank",
                  children: "Terms"
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("section", {
        className: "ms-sm-auto px-0",
        children: [/*#__PURE__*/jsx_runtime_.jsx("nav", {
          className: "navbar navbar-secondary bg-light sticky-top pt-3 pb-2 mb-3 border-bottom animate__animated animate__fadeInDown",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "container px-0 d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap",
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                className: "bi bi-three-dots navbar-toggler d-inline-block h6 my-auto",
                style: {
                  fontSize: "1.6rem"
                },
                "data-bs-toggle": "offcanvas",
                "data-bs-target": "#offcanvasStart"
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("h6", {
                className: "navbar-brand fw-light text-wrap d-inline-block m-0 p-0",
                children: [hospital.hospital_name, " | Admin Panel"]
              })]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "mx-auto mx-md-0 mt-3 mt-md-0 ps-2",
              children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                className: "",
                children: hospital.user.name
              }), "\xA0|\xA0", /*#__PURE__*/jsx_runtime_.jsx("small", {
                className: "text-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": "#logoutModal",
                children: "Logout"
              })]
            })]
          })
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "tab-content",
          id: "nav-tabContent",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "tab-pane fade",
            id: "dashboard",
            role: "tabpanel",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "row row-cols-1 row-cols-sm-2 row-cols-lg-4 mx-0 mt-n3 px-2 py-4",
              style: {
                backgroundColor: "aliceblue"
              },
              children: Object.keys(hospital.count.booking).map((elem, index) => {
                return /*#__PURE__*/jsx_runtime_.jsx((external_react_default()).Fragment, {
                  children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                    className: "col p-1",
                    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                      className: "card card-stats shadow border rounded",
                      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: "card-body",
                        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "row",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                            className: "col-5 col-md-4 p-0 d-flex justify-content-center align-items-center",
                            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                              className: "h1 text-center text-info",
                              children: index == 0 ? /*#__PURE__*/jsx_runtime_.jsx("i", {
                                className: "bi bi-journal-medical"
                              }) : index == 1 ? /*#__PURE__*/jsx_runtime_.jsx("i", {
                                className: "bi bi-journal-bookmark-fill"
                              }) : index == 2 ? /*#__PURE__*/jsx_runtime_.jsx("i", {
                                className: "bi bi-journal-check"
                              }) : /*#__PURE__*/jsx_runtime_.jsx("i", {
                                className: "bi bi-journal-x"
                              })
                            })
                          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                            className: "col-7 col-md-8 text-center",
                            children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
                              className: "card-title",
                              children: elem.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => ltr.toUpperCase())
                            }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                              className: "fs-1 fw-light",
                              children: hospital.count.booking[elem]
                            })]
                          })]
                        })
                      })
                    })
                  })
                }, index);
              })
            })
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "tab-pane fade",
            id: "employees",
            role: "tabpanel",
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "container",
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "d-flex",
                children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "btn-group btn-group-sm btn-group-toggle d-flex",
                  style: {
                    flex: "auto"
                  },
                  role: "group",
                  "data-bs-toggle": "buttons",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
                    className: "btn btn-primary animate__animated animate__zoomIn active",
                    id: "active",
                    onClick: e => {
                      setFilteredStaff(filterStaff());
                      setFilteredStaffOnSearch(filterStaff());
                      setEditStaffTuple("");
                    },
                    children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                      className: "btn-check",
                      type: "radio",
                      name: "options",
                      defaultChecked: true
                    }), "Active"]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
                    className: "btn btn-warning animate__animated animate__zoomIn",
                    id: "inactive",
                    onClick: e => {
                      setFilteredStaff(filterStaff("Inactive"));
                      setFilteredStaffOnSearch(filterStaff("Inactive"));
                    },
                    children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                      className: "btn-check",
                      type: "radio",
                      name: "options"
                    }), "Inactive"]
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "",
                  children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
                    className: "btn btn-sm btn-info ms-1 hvr-grow",
                    "data-bs-toggle": "tooltip",
                    "data-bs-placement": "bottom",
                    title: "Refresh List",
                    onClick: async e => {
                      // * refresh button action
                      external_jquery_default()("#btn_refresh_employee_spinner").addClass("rotate");
                      await fetch("/api/getupdatedstaffs", {
                        method: "GET",
                        headers: {
                          "content-type": "application/json",
                          "x-registration-no": hospital.registration_no,
                          "x-user-email": hospital.user.email
                        }
                      }).then(response => response.json()).then(res => {
                        setStaff(res);
                        external_jquery_default()("#inactive input[type=radio]").is(":checked") ? external_jquery_default()("#inactive").trigger("click") : external_jquery_default()("#active").trigger("click");
                        external_jquery_default()("#btn_refresh_employee_spinner").removeClass("rotate");
                        (0,toast/* Toast */.F)(`Staff list refreshed!`, "primary", 1800);
                      }).catch(err => console.error(err));
                    },
                    children: /*#__PURE__*/jsx_runtime_.jsx("i", {
                      className: "bi bi-arrow-repeat h6 d-inline-block mb-0",
                      id: "btn_refresh_employee_spinner"
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx("button", {
                    className: "btn btn-sm btn-dark ms-1 hvr-grow",
                    id: "addStaff",
                    "data-bs-toggle": "tooltip",
                    "data-bs-placement": "bottom",
                    title: "Add New Staff",
                    onClick: () => {
                      setShowAddStaff(!showAddStaff);
                      setOTP("");
                    },
                    children: /*#__PURE__*/jsx_runtime_.jsx("i", {
                      className: "bi bi-person-plus-fill h6"
                    })
                  })]
                })]
              }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "my-3",
                children: /*#__PURE__*/jsx_runtime_.jsx("form", {
                  onSubmit: e => {
                    e.stopPropagation();
                    e.preventDefault();
                  },
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                    className: "form-group row",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                      className: "col-12 col-lg-6 col-xl-7 animate__animated animate__fadeInDown",
                      children: /*#__PURE__*/jsx_runtime_.jsx("input", {
                        type: "search",
                        placeholder: "Search employees",
                        className: hospital.staff.length == 0 ? "form-control form-control-sm disabled" : "form-control form-control-sm",
                        id: "searchStaffs",
                        onChange: event => {
                          setFilteredStaffOnSearch(filteredStaff.filter(staff => {
                            return searchFieldName == "joined_on" ? new Date(staff[searchFieldName]).toUTCString().toLowerCase().indexOf(event.target.value.toLowerCase()) != -1 : staff[searchFieldName].toString().toLowerCase().indexOf(event.target.value.toLowerCase()) != -1;
                          }));
                        },
                        onClick: () => {
                          // resetting table tuple if in edit mode
                          setEditStaffTuple("");
                          external_jquery_default()(".btn-save").addClass("disabled");
                        }
                      })
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "col-12 col-lg-6 col-xl-5 animate__animated animate__fadeInUp mt-2 mt-lg-0 d-flex justify-content-around",
                      id: "searchType",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "form-check form-check-inline",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "radio",
                          id: "name",
                          name: "radioInline",
                          className: "form-check-input",
                          onClick: e => {
                            setSearchFieldName(e.target.id);
                            external_jquery_default()("#searchStaffs").trigger("focus");
                          },
                          defaultChecked: true
                        }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                          className: "form-check-label ms-1",
                          htmlFor: "name",
                          children: "name"
                        })]
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "form-check form-check-inline",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "radio",
                          id: "mobile_no",
                          name: "radioInline",
                          className: "form-check-input",
                          onClick: e => {
                            setSearchFieldName(e.target.id);
                            external_jquery_default()("#searchStaffs").trigger("focus");
                          }
                        }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                          className: "form-check-label ms-1",
                          htmlFor: "mobile_no",
                          children: "mobile"
                        })]
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "form-check form-check-inline",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "radio",
                          id: "email",
                          name: "radioInline",
                          className: "form-check-input",
                          onClick: e => {
                            setSearchFieldName(e.target.id);
                            external_jquery_default()("#searchStaffs").trigger("focus");
                          }
                        }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                          className: "form-check-label ms-1",
                          htmlFor: "email",
                          children: "email"
                        })]
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "form-check form-check-inline",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "radio",
                          id: "joined_on",
                          name: "radioInline",
                          className: "form-check-input",
                          onClick: e => {
                            setSearchFieldName(e.target.id);
                            external_jquery_default()("#searchStaffs").trigger("focus");
                          }
                        }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                          className: "form-check-label ms-1",
                          htmlFor: "joined_on",
                          children: "joined on"
                        })]
                      })]
                    })]
                  })
                })
              })]
            }), showAddStaff ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "table-responsive mt-5 mb-5 px-lg-5 px-md-3 px-2 animate__animated animate__fadeIn",
              children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
                children: "Add New Staff"
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("table", {
                className: "table",
                children: [/*#__PURE__*/jsx_runtime_.jsx("thead", {
                  className: "thead-dark text-center",
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
                    children: [/*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Name *"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Mobile *"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Email *"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Role *"
                    }), OTP != "" ? /*#__PURE__*/jsx_runtime_.jsx("th", {
                      className: "animate__animated animate__fadeIn",
                      children: "OTP *"
                    }) : null, /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Action"
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
                  className: "text-center",
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
                    id: "staffDataRow",
                    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                        type: "text",
                        className: "w-100",
                        id: "staffName",
                        placeholder: "E.g.: Alice Milburn",
                        onInput: e => e.target.value = e.target.value.slice(0, 50),
                        required: true,
                        "data-name": "name"
                      }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                        className: "d-block text-danger text-left mt-1 ps-1",
                        id: "staffNameErr"
                      })]
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                        type: "tel",
                        className: "w-100",
                        id: "staffMobile",
                        placeholder: "E.g.: 01*********",
                        onInput: e => e.target.value = e.target.value.slice(0, 11),
                        required: true,
                        "data-name": "mobile_no"
                      }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                        className: "d-block text-danger text-left mt-1 ps-1",
                        id: "staffMobileErr"
                      })]
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                        type: "email",
                        className: "w-100",
                        id: "staffEmail",
                        placeholder: "E.g.: example@domain.com",
                        onInput: e => e.target.value = e.target.value.slice(0, 50),
                        required: true,
                        "data-name": "email"
                      }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                        className: "d-block text-danger text-left mt-1 ps-1",
                        id: "staffEmailErr"
                      })]
                    }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                      className: "input-group input-group-sm",
                      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
                        className: "form-select",
                        id: "staffRole",
                        onChange: e => {
                          external_jquery_default()("#btn_addStaff").removeClass("disabled");
                        },
                        "data-name": "role",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "null",
                          hidden: true,
                          children: "Choose..."
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "Admin",
                          children: "Admin"
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "DB_Manager",
                          children: "DB Manager"
                        }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                          value: "Moderator",
                          children: "Moderator"
                        })]
                      })
                    }), OTP != "" ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                      className: "animate__animated animate__fadeIn",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "code_group",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "number",
                          className: "form-control",
                          min: "0",
                          max: "9",
                          id: "d-1",
                          onInput: e => {
                            ;
                            e.target.value.length == 1 ? external_jquery_default()("#d-2").trigger("focus") : null;
                          }
                        }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "number",
                          className: "form-control",
                          min: "0",
                          max: "9",
                          id: "d-2",
                          onInput: e => {
                            ;
                            e.target.value.length == 1 ? external_jquery_default()("#d-3").trigger("focus") : null;
                          }
                        }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "number",
                          className: "form-control",
                          min: "0",
                          max: "9",
                          id: "d-3",
                          onInput: e => {
                            ;
                            e.target.value.length == 1 ? external_jquery_default()("#d-4").trigger("focus") : null;
                          }
                        }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                          type: "number",
                          className: "form-control",
                          min: "0",
                          max: "9",
                          id: "d-4",
                          onChange: async e => {
                            const enteredOTP = external_jquery_default()("#d-1").val() + external_jquery_default()("#d-2").val() + external_jquery_default()("#d-3").val() + external_jquery_default()("#d-4").val();

                            if (OTP == enteredOTP) {
                              setOTP("");
                              external_jquery_default()("#otpErr").text(""); // * new staff addition block

                              await fetch("/api/addhospitalstaff", {
                                method: "POST",
                                body: JSON.stringify(getStaffInputFieldData(true)),
                                headers: {
                                  "content-type": "application/json",
                                  "x-fields-validated": "true"
                                }
                              }).then(response => response.json()).then(async res => {
                                // * on new staff addition success
                                if (res != null) {
                                  // loading spinner
                                  setLoading(true);

                                  if (await (0,emailManager/* sendEmail */.C)(res.email, "Staff Login Credentials", `This email is automatically generated from internal system of Quick Hospitalization, do not reply. 
           																					An account has been created for you as '${res.role.replace("_", " ")}' to access the dashboard functionalities
																							at https://${window.location.host}/admin. Mobile '${res.mobile_no}' & password '${res.password}'
																							are your login credentials. You are advised to change your password immediately after login.`)) {
                                    // * on new staff addition & credentials sent success
                                    (0,toast/* Toast */.F)("Staff added and the credentials have been sent to the provided email.", "primary", 5000); // resetting input fields & enabling 'Add Staff' button

                                    external_jquery_default()("#staffDataRow").find("input[type=text], input[type=tel], input[type=email], select").map((index, elem) => {
                                      external_jquery_default()(elem).attr("id") == "staffRole" ? external_jquery_default()(elem).html(external_jquery_default()(elem).html()) : external_jquery_default()(elem).val("");
                                    });
                                    external_jquery_default()("#btn_addStaff").removeClass("disabled");
                                  } // * on new staff addition success but credentials sending failure
                                  else {
                                    (0,toast/* Toast */.F)(`Staff added but the credentials could not send to the provided email. 
																							Recovering the staff's password is advised.`, "warning", 5000);
                                  }

                                  setLoading(false);
                                } // * on new staff addition failure
                                else {
                                  (0,toast/* Toast */.F)("Could not add the staff! Please try again.", "warning");
                                  external_jquery_default()("#btn_addStaff").removeClass("disabled");
                                }
                              }).catch(err => console.error(err));
                            } else {
                              external_jquery_default()("#otpErr").text("Invalid OTP!");
                            }
                          }
                        })]
                      }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                        className: "d-block text-danger text-left mt-1 ps-1",
                        id: "otpErr"
                      })]
                    }) : null, /*#__PURE__*/jsx_runtime_.jsx("td", {
                      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
                        className: "btn btn-sm btn-primary disabled",
                        id: "btn_addStaff",
                        onClick: async e => {
                          if (external_jquery_default()("#btn_addStaff").hasClass("disabled")) return;
                          let otp; // field data validation

                          await fetch("/api/addhospitalstaff", {
                            method: "POST",
                            body: JSON.stringify(getStaffInputFieldData()),
                            headers: {
                              "content-type": "application/json"
                            }
                          }).then(response => response.json()).then(async res => {
                            const fieldHasError = {};
                            Object.keys(getStaffInputFieldData()).map(fieldName => {
                              fieldHasError[fieldName] = false;
                            }); // show error text

                            if (res.errors != undefined) {
                              res.errors.map(error => {
                                external_jquery_default()("#" + Object.keys(getStaffInputFieldData()).filter(el => {
                                  return el.indexOf(error.split(" ")[0]) != -1;
                                })[0] + "Err").text(error.replace("staff", ""));
                                fieldHasError[error.split(" ")[0]] = true;
                              });
                            } // hide error text upon validation


                            Object.keys(getStaffInputFieldData()).map(fieldName => {
                              if (!fieldHasError[fieldName]) external_jquery_default()("#" + fieldName + "Err").text("");
                            }); // * send OTP upon server side validation

                            if (res.validated) {
                              external_jquery_default()("#btn_addStaff_spinner").removeClass("d-none");
                              otp = Math.floor(1000 + Math.random() * 9000);
                              setOTP(otp.toString());
                              console.log(otp);

                              if (await (0,emailManager/* sendOTP */.O)(external_jquery_default()("#staffEmail").val(), "Staff Email Verification", otp)) {
                                setOTP(otp.toString());
                                (0,toast/* Toast */.F)(`An OTP has been sent to the provided staff email, input OTP and verify.`, "primary", 7000);
                                external_jquery_default()("#btn_addStaff").addClass("disabled");
                              } else {
                                (0,toast/* Toast */.F)(`Couldn't send OTP at the moment. Check your internet connectivity, please try again later.`, "warning", 5000);
                              }

                              external_jquery_default()("#btn_addStaff_spinner").addClass("d-none");
                            }
                          }).catch(err => console.error(err));
                        },
                        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                          className: "spinner-border spinner-border-sm d-none",
                          id: "btn_addStaff_spinner"
                        }), "\xA0Add Staff"]
                      })
                    })]
                  })
                })]
              })]
            }) : null, /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "table-responsive px-lg-5 px-md-3 px-2 animate__animated animate__fadeIn animate__slow",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("table", {
                className: "table table-striped table-hover bg-light rounded-3 shadow border-primary",
                id: "staffDataTable",
                children: [/*#__PURE__*/jsx_runtime_.jsx("caption", {
                  children: /*#__PURE__*/jsx_runtime_.jsx("small", {
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("i", {
                      children: ["Showing ", filteredStaffOnSearch.length, "\xA0of\xA0", filteredStaff.length, " entries"]
                    })
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("thead", {
                  className: "table-dark text-center",
                  children: /*#__PURE__*/jsx_runtime_.jsx("tr", {
                    children:  false ? 0 : // * populate thead - active
                    ["name", "mobile_no", "email", "role", "status", "joined_on", "action"].map((th, index) => {
                      return /*#__PURE__*/jsx_runtime_.jsx("th", {
                        children: th.split("_").join(" ").replace(" no", "").replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => ltr.toUpperCase())
                      }, index);
                    })
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
                  className: "text-center",
                  children: filteredStaffOnSearch.map((tr, index) => {
                    return /*#__PURE__*/jsx_runtime_.jsx("tr", {
                      className: (tr === null || tr === void 0 ? void 0 : tr.status) == "Active" ? "table-active" : "table-secondary text-secondary",
                      id: tr === null || tr === void 0 ? void 0 : tr.mobile_no,
                      children: populateStaffRow(tr, index)
                    }, index);
                  })
                })]
              })
            })]
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "tab-pane fade show active",
            id: "doctors-and-schedule",
            role: "tabpanel",
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "container",
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
                className: "form-floating",
                style: {
                  maxWidth: "21rem"
                },
                onSubmit: e => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
                  children: "Add a doctor profile"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "form-floating my-2",
                  children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                    type: "text",
                    className: "form-control",
                    id: "doctor_id",
                    placeholder: "E.g.: d123456789",
                    required: true,
                    onFocusCapture: e => e.target.value = "d",
                    onInput: e => e.target.value = "d" + e.target.value.slice(1, 10)
                  }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                    htmlFor: "id",
                    children: "Doctor ID *"
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "form-floating",
                  children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                    type: "email",
                    className: "form-control",
                    id: "doctor_email",
                    placeholder: "E.g.: example@domain.com",
                    required: true,
                    onInput: e => e.target.value = e.target.value.slice(0, 50)
                  }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                    htmlFor: "email",
                    children: "Work Email *"
                  })]
                }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                  className: "text-danger",
                  id: "addDoctorErr"
                }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                  className: "d-flex justify-content-end",
                  children: /*#__PURE__*/jsx_runtime_.jsx("button", {
                    className: "btn btn-sm btn-outline-dark mt-2",
                    onClick: async () => {
                      setLoading(true);
                      await fetch("/api/adddoctor", {
                        method: "POST",
                        headers: {
                          "content-type": "application/json",
                          "x-registration-no": hospital.registration_no
                        },
                        body: JSON.stringify({
                          id: external_jquery_default()("#doctor_id").val(),
                          email: external_jquery_default()("#doctor_email").val()
                        })
                      }).then(response => response.json()).then(async res => {
                        console.log(res);
                        setLoading(false);
                        if (res.message != undefined) external_jquery_default()("#addDoctorErr").text(res.message);else {
                          external_jquery_default()("#addDoctorErr").text("");
                          setDoctorList(res);
                          (0,toast/* Toast */.F)("Profile added to database. Doctor can now signup and update their profile.", "primary", 6000); // confirmation email sending block

                          if (await (0,emailManager/* sendEmail */.C)(res.email, `Eligible to signup for ${hospital.hospital_name}`, `Your profile has been added to the database of ${hospital.hospital_name} and is currently inactive. 
																You can now signup, set up your schedule and continue curing patients. Head on to https://www.quickhospitalization.org/doctor/signup in order to signup.`)) (0,toast/* Toast */.F)("Confirmation email sent to the email!");else (0,toast/* Toast */.F)("Confirmation email could not be sent at the moment.", "warning");
                        }
                      }).catch(error => console.error(error));
                      setLoading(false);
                    },
                    children: "Add Doctor"
                  })
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "mt-4 mb-2 d-flex justify-content-between align-items-center",
                children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
                  className: "",
                  children: "Doctors"
                }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "",
                  children: /*#__PURE__*/jsx_runtime_.jsx("button", {
                    className: "btn btn-sm btn-info hvr-grow",
                    "data-bs-toggle": "tooltip",
                    "data-bs-placement": "bottom",
                    title: "Refresh List",
                    onClick: async e => {
                      // * refresh button action
                      external_jquery_default()("#btn_refresh_doctor_spinner").addClass("rotate");
                      await fetch("/api/getdoctorlist", {
                        method: "GET",
                        headers: {
                          "content-type": "application/json",
                          "x-registration-no": hospital.registration_no
                        }
                      }).then(response => response.json()).then(res => {
                        setDoctorList(res);
                        external_jquery_default()("#btn_refresh_doctor_spinner").removeClass("rotate");
                        (0,toast/* Toast */.F)(`Doctor list refreshed!`, "primary", 1800);
                      }).catch(err => console.error(err));
                    },
                    children: /*#__PURE__*/jsx_runtime_.jsx("i", {
                      className: "bi bi-arrow-repeat h6",
                      id: "btn_refresh_doctor_spinner"
                    })
                  })
                })]
              }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "table-responsive",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("table", {
                  className: "table table-sm table-striped table-bordered table-hover",
                  children: [/*#__PURE__*/jsx_runtime_.jsx("thead", {
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
                      className: "text-center",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("th", {
                        children: "ID"
                      }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                        children: "Email"
                      }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                        children: "Status"
                      })]
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
                    children: doctorList.map((doctorTuple, index) => {
                      return /*#__PURE__*/jsx_runtime_.jsx("tr", {
                        children: ["id", "email", "status"].map((key, ind) => {
                          if (key == "email") {
                            return doctorTuple.status == "Active" ? /*#__PURE__*/jsx_runtime_.jsx("td", {
                              children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                                href: `mailto:${doctorTuple[key].toString()}`,
                                children: doctorTuple[key].toString()
                              })
                            }, ind) : /*#__PURE__*/jsx_runtime_.jsx("td", {
                              className: "text-secondary",
                              children: doctorTuple[key].toString()
                            }, ind);
                          } else if (doctorTuple.status == "Inactive" && key == "status") return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            className: "text-secondary",
                            children: doctorTuple[key].toString()
                          }, ind);else if (key == "id") return /*#__PURE__*/(0,jsx_runtime_.jsxs)("td", {
                            className: "font-monospace d-flex justify-content-between align-items-center",
                            children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                              children: doctorTuple[key].toString()
                            }), /*#__PURE__*/jsx_runtime_.jsx("button", {
                              className: "btn btn-sm btn-outline-dark px-1 py-0",
                              children: "Details"
                            })]
                          }, ind);else return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: doctorTuple[key].toString()
                          }, ind);
                        })
                      }, index);
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx("tfoot", {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)("caption", {
                    children: [hospital.doctor.length, " entries"]
                  })]
                })
              })]
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "tab-pane fade",
            id: "activity",
            role: "tabpanel",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "table-responsive px-lg-5 px-md-3 px-2 animate__animated animate__fadeIn animate__slow",
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("table", {
                className: "table table-striped table-hover bg-light rounded-3 shadow",
                id: "logDataTable",
                children: [/*#__PURE__*/jsx_runtime_.jsx("caption", {
                  children: /*#__PURE__*/jsx_runtime_.jsx("small", {
                    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("i", {
                      children: ["Showing ", hospital.log.length, "\xA0of\xA0", hospital.log.length, " entries"]
                    })
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("thead", {
                  className: "table-dark text-center",
                  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
                    children: [/*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Logged At"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Name"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Mobile"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Email"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Role"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Status"
                    }), /*#__PURE__*/jsx_runtime_.jsx("th", {
                      children: "Task"
                    })]
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx("tbody", {
                  className: "text-center",
                  children: hospital.log.map((tr, outerIndex) => {
                    return /*#__PURE__*/jsx_runtime_.jsx("tr", {
                      className: "table-active",
                      id: tr.mobile_no,
                      children: ["logged_at", "name", "mobile_no", "email", "role", "status", "task"].map((td, innerIndex) => {
                        if (td == "logged_at") {
                          return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: new Date(tr[td]).toUTCString()
                          }, innerIndex);
                        } else if (td == "name" || td == "status") {
                          return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: tr["staff"][td]
                          }, innerIndex);
                        } else if (td == "email") {
                          return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                              href: `mailto:${tr["staff"][td]}`,
                              target: "_blank",
                              children: tr["staff"][td]
                            })
                          }, innerIndex);
                        } else if (td == "mobile_no") {
                          return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: tr[td]
                          }, innerIndex);
                        } else if (td == "role") {
                          return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: tr[td].toString().replace("_", " ")
                          }, innerIndex);
                        } else {
                          return /*#__PURE__*/jsx_runtime_.jsx("td", {
                            children: tr[td]
                          }, innerIndex);
                        }
                      })
                    }, outerIndex);
                  })
                })]
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "tab-pane fade",
            id: "settings",
            role: "tabpanel",
            children: /*#__PURE__*/jsx_runtime_.jsx("div", {
              className: "container",
              children: /*#__PURE__*/jsx_runtime_.jsx("form", {
                onSubmit: e => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                  className: "card border-0 mb-5 bg-transparent",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("fieldset", {
                    className: "bg-white shadow-sm rounded animate__animated animate__fadeIn",
                    style: {
                      animationDelay: "100ms"
                    },
                    children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
                      className: "card-header",
                      children: "Profile"
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "card-body",
                      id: "hospital_profile",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "row row-cols-md-3 row-cols-sm-2 row-cols-1",
                        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_hospital_name",
                            children: "Name *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "hospital_hospital_name",
                            "data-parent": "hospital",
                            name: "hospital_name",
                            placeholder: "E.g.: United Hospital Ltd.",
                            defaultValue: hospital.hospital_name,
                            onInput: e => e.target.value = e.target.value.slice(0, 100),
                            required: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_registration_no",
                            children: "Registration"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "hospital_registration_no",
                            "data-parent": "hospital",
                            name: "registration_no",
                            placeholder: "E.g.: 1*2*3*4*5*",
                            defaultValue: hospital.registration_no,
                            onInput: e => e.target.value = e.target.value.slice(0, 10),
                            disabled: true,
                            readOnly: true
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_hospital_type",
                            children: "Type *"
                          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("select", {
                            className: "form-select",
                            id: "hospital_hospital_type",
                            "data-parent": "hospital",
                            name: "hospital_type",
                            defaultValue: hospital.hospital_type,
                            required: true,
                            children: [/*#__PURE__*/jsx_runtime_.jsx("option", {
                              value: "Public",
                              children: "Public"
                            }), /*#__PURE__*/jsx_runtime_.jsx("option", {
                              value: "Private",
                              children: "Private"
                            })]
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_website",
                            children: "Website #"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "url",
                            className: "form-control",
                            id: "hospital_website",
                            "data-parent": "hospital",
                            name: "website",
                            placeholder: "E.g.: www.example.com",
                            defaultValue: hospital.website,
                            onInput: e => e.target.value = e.target.value.slice(0, 255)
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_phone_no",
                            children: "Phone #"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "tel",
                            className: "form-control",
                            id: "hospital_phone_no",
                            "data-parent": "address",
                            name: "phone_no",
                            placeholder: "E.g.: 023456712",
                            defaultValue: hospital.address.phone_no == null ? "" : hospital.address.phone_no,
                            onInput: e => e.target.value = e.target.value.slice(0, 11)
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_mobile_no",
                            children: "Mobile #"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "tel",
                            className: "form-control",
                            id: "hospital_mobile_no",
                            "data-parent": "address",
                            name: "mobile_no",
                            placeholder: "E.g.: 01*********",
                            defaultValue: hospital.address.mobile_no == null ? "" : hospital.address.mobile_no,
                            onInput: e => e.target.value = e.target.value.slice(0, 11)
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        })]
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "row row-cols-3 mb-3",
                        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_latitude",
                            children: "Latitude $"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "number",
                            min: "-90",
                            max: "90",
                            step: "0.00000001",
                            onInput: e => e.target.value = e.target.value.slice(0, 10),
                            className: "form-control",
                            id: "hospital_latitude",
                            "data-parent": "address",
                            name: "latitude",
                            placeholder: "E.g.: 23.80665",
                            defaultValue: (_hospital$address$lat = hospital.address.latitude) === null || _hospital$address$lat === void 0 ? void 0 : _hospital$address$lat.toString()
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_longitude",
                            children: "Longitude $"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "number",
                            min: "-180",
                            max: "180",
                            step: "0.00000001",
                            onInput: e => e.target.value = e.target.value.slice(0, 10),
                            className: "form-control",
                            id: "hospital_longitude",
                            "data-parent": "address",
                            name: "longitude",
                            placeholder: "E.g.: 90.679456",
                            defaultValue: (_hospital$address$lon = hospital.address.longitude) === null || _hospital$address$lon === void 0 ? void 0 : _hospital$address$lon.toString()
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                          className: "col d-flex",
                          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
                            className: "btn btn-sm btn-dark mt-auto mb-1 mx-auto mx-md-0",
                            style: {
                              fontSize: "0.85rem"
                            },
                            onClick: () => {
                              navigator.geolocation ? navigator.geolocation.getCurrentPosition(position => {
                                external_jquery_default()("#coordinateErr").text("");
                                external_jquery_default()("#hospital_latitude, #hospital_longitude").next("small").text("");
                                external_jquery_default()("#hospital_latitude").val(position.coords.latitude.toString().slice(0, 10));
                                external_jquery_default()("#hospital_longitude").val(position.coords.longitude.toString().slice(0, 10));
                                external_jquery_default()("#hospital_latitude").trigger("input");
                              }, error => external_jquery_default()("#coordinateErr").html(error.message)) : external_jquery_default()("#coordinateErr").text(`Your browser doesn\'t support geolocation. Try inputting manually.`);
                            },
                            children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                              className: "bi bi-geo-alt"
                            }), "\xA0Get Position"]
                          })
                        }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "text-danger fst-italic ms-1 mt-1",
                          id: "coordinateErr"
                        })]
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "row mt-n1",
                        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col-12 col-md-4 mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_street_address",
                            children: "Street Address *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "hospital_street_address",
                            "data-parent": "address",
                            name: "street_address",
                            placeholder: "Street address of the hospital",
                            defaultValue: hospital.address.street_address,
                            required: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col-6 col-md-4 mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_division",
                            children: "Division *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("select", {
                            className: "form-select",
                            id: "hospital_division",
                            "data-parent": "address",
                            name: "division",
                            required: true,
                            onChange: event => {
                              external_jquery_default().ajax({
                                async: true,
                                crossDomain: true,
                                url: `https://bdapi.p.rapidapi.com/v1.1/division/${event.target.value}`,
                                method: "GET",
                                headers: {
                                  "x-rapidapi-key": "cbf862913cmshaa46309e036812ap179cb1jsna79dc0cf751a",
                                  "x-rapidapi-host": "bdapi.p.rapidapi.com"
                                }
                              }).done(function (response) {
                                let optionsHtml = `<option value="null" hidden selected>Select District...</option>`;
                                response.data.map(element => {
                                  optionsHtml += `<option value="${element.district}">${element.district}</option>`;
                                });
                                external_jquery_default()("#hospital_district").html(optionsHtml);
                              });
                            },
                            children: /*#__PURE__*/jsx_runtime_.jsx("option", {
                              value: "null",
                              hidden: true,
                              children: "Select Division"
                            })
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col-6 col-md-4 mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_district",
                            children: "District *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("select", {
                            className: "form-select",
                            id: "hospital_district",
                            "data-parent": "address",
                            name: "district",
                            required: true,
                            children: /*#__PURE__*/jsx_runtime_.jsx("option", {
                              value: "null",
                              hidden: true,
                              children: "Select District"
                            })
                          })]
                        })]
                      })]
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "card-footer d-flex justify-content-end py-1",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "text-info me-auto pe-2",
                        children: [/*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "me-2 mb-1 d-inline-block",
                          children: "* - required"
                        }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "me-2 mb-1 d-inline-block",
                          children: "# - either one is required"
                        }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "me-2 mb-1 d-inline-block",
                          children: "$ - optional"
                        })]
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
                        className: "btn btn-sm btn-primary disabled",
                        id: "btn_profile",
                        onClick: async e => {
                          if (external_jquery_default()(e.target).hasClass("disabled")) return;
                          external_jquery_default()("#btn_profile_spinner").removeClass("d-none");
                          await fetch("/api/updatehospitalprofile", {
                            method: "POST",
                            headers: {
                              "content-type": "application/json"
                            },
                            body: JSON.stringify({
                              profileData,
                              newProfileData
                            })
                          }).then(response => response.json()).then(res => {
                            external_jquery_default()("#hospital_profile").find("input, select").map((index, elem) => {
                              if (!external_jquery_default()(elem).attr("disabled") && !external_jquery_default()(elem).attr("readonly")) external_jquery_default()(elem).addClass("is-valid").removeClass("is-invalid");
                            });

                            if (res.errors != undefined) {
                              res.errors.map(error => {
                                external_jquery_default()("#hospital_" + error.split(".")[1].split(" ")[0]).addClass("is-invalid").removeClass("is-valid").next("small").text(error.split(".")[1].replace("_no", "").replace("_", " "));
                              });
                            } else if (res.updated) {
                              setProfileData(newProfileData);
                              external_jquery_default()("#btn_profile").addClass("disabled");
                              (0,toast/* Toast */.F)("Profile updated successfully!", "primary", 1800);
                              external_jquery_default()("#hospital_profile").find("input, select").map((index, elem) => {
                                external_jquery_default()(elem).removeClass("is-valid is-invalid");
                              });
                            }
                          }).catch(err => console.error(err));
                          external_jquery_default()("#btn_profile_spinner").addClass("d-none");
                        },
                        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                          className: "spinner-border spinner-border-sm d-none",
                          id: "btn_profile_spinner"
                        }), "\xA0Save Changes"]
                      })]
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("fieldset", {
                    className: "mt-5 bg-white shadow-sm rounded animate__animated animate__fadeIn",
                    style: {
                      animationDelay: "300ms"
                    },
                    children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
                      className: "card-header",
                      children: "Description & Avatar"
                    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                      className: "card-body",
                      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "row",
                        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3 my-auto",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_image",
                            children: "Avatar $"
                          }), /*#__PURE__*/jsx_runtime_.jsx(next_image.default // todo fix image path
                          // src={hospital.image_source}
                          , {
                            src: "/media/hospital-building-3.jpg",
                            width: 1280,
                            height: 780,
                            id: "hospital_image",
                            priority: true
                          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                            className: "input-group",
                            children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
                              type: "file",
                              className: "form-control",
                              id: "hospital_image_source",
                              "data-parent": "hospital",
                              name: "image_source",
                              accept: "image/jpeg, image/png",
                              onChange: event => {
                                var _event$target$files;

                                if (((_event$target$files = event.target.files) === null || _event$target$files === void 0 ? void 0 : _event$target$files.length) == 1) {
                                  external_jquery_default()("#imageErr").text("");
                                  const file = event.target.files[0],
                                        reader = new FileReader();
                                  reader.readAsDataURL(file);

                                  reader.onloadend = () => {
                                    base64image = reader.result;
                                    external_jquery_default()("#hospital_image").attr("srcset", reader.result);
                                  };
                                } else {
                                  external_jquery_default()("#imageErr").text("No image file chosen, default image will be displayed!");
                                  external_jquery_default()("#hospital_image").attr("srcset", hospital.image_source);
                                  base64image = "default";
                                }
                              }
                            }), /*#__PURE__*/jsx_runtime_.jsx("label", {
                              className: "input-group-text",
                              htmlFor: "hospital_image_source",
                              children: "Upload"
                            })]
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "d-block text-danger ms-1 mt-1",
                            id: "imageErr"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col m-auto",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "hospital_description",
                            children: "Description $"
                          }), /*#__PURE__*/jsx_runtime_.jsx("textarea", {
                            className: "form-control",
                            style: {
                              fontSize: "0.85rem"
                            },
                            id: "hospital_description",
                            "data-parent": "hospital",
                            name: "description",
                            placeholder: "Provide a brief description of the hospital.",
                            defaultValue: hospital.description,
                            rows: 7,
                            autoComplete: "true",
                            spellCheck: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        })]
                      })
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "card-footer d-flex justify-content-end py-1",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: "text-info me-auto",
                        children: /*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "me-2 mb-1",
                          children: "$ - optional"
                        })
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
                        className: "btn btn-sm btn-primary disabled",
                        id: "btn_description",
                        onClick: () => {},
                        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                          className: "spinner-border spinner-border-sm d-none",
                          id: "btn_description_spinner"
                        }), "\xA0Save Changes"]
                      })]
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("fieldset", {
                    className: "mt-5 bg-white shadow-sm rounded",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
                      className: "card-header",
                      children: "Capacity"
                    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                      className: "card-body",
                      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: "row row-cols-xl-6 row-cols-md-4 row-cols-2",
                        "data-parent": "capacity",
                        id: "hospital_capacity",
                        children: /*#__PURE__*/jsx_runtime_.jsx(BedTypeInputFields/* default */.Z, {})
                      })
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "card-footer d-flex justify-content-end py-1",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: "text-info me-auto pe-2",
                        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("small", {
                          className: "me-2 mb-1 d-inline-block",
                          children: ["Total capacity:\xA0", /*#__PURE__*/jsx_runtime_.jsx("span", {
                            className: "fw-bolder",
                            children: newCapacity.total_capacity
                          })]
                        })
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
                        className: "btn btn-sm btn-primary disabled",
                        id: "btn_capacity",
                        onClick: async e => {
                          if (external_jquery_default()(e.target).hasClass("disabled")) return;
                          external_jquery_default()("#btn_capacity_spinner").removeClass("d-none");
                          await fetch("/api/updatehospitalcapacity", {
                            method: "POST",
                            headers: {
                              "content-type": "application/json"
                            },
                            body: JSON.stringify({
                              capacity,
                              newCapacity
                            })
                          }).then(response => response.json()).then(res => {
                            (0,toast/* Toast */.F)("Hospital capacity updated successfully!", "primary", 1800);
                            setCapacity(newCapacity);
                            external_jquery_default()(e.target).addClass("disabled");
                          }).catch(err => console.error(err));
                          external_jquery_default()("#btn_capacity_spinner").addClass("d-none");
                        },
                        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                          className: "spinner-border spinner-border-sm d-none",
                          id: "btn_capacity_spinner"
                        }), "\xA0Save Changes"]
                      })]
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("fieldset", {
                    className: "mt-5 bg-white shadow-sm rounded",
                    children: [/*#__PURE__*/jsx_runtime_.jsx("h5", {
                      className: "card-header",
                      children: "User"
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "card-body",
                      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "row row-cols-1 row-cols-sm-2",
                        id: "hospital_user",
                        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "staff_name",
                            children: "Name *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "staff_name",
                            "data-parent": "staff",
                            name: "name",
                            placeholder: "E.g.: Alice Milburn",
                            defaultValue: hospital.user.name,
                            onInput: e => e.target.value = e.target.value.slice(0, 50),
                            required: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "staff_email",
                            children: "Email *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "email",
                            className: "form-control",
                            id: "staff_email",
                            "data-parent": "staff",
                            name: "email",
                            placeholder: "E.g.: example@domain.com",
                            defaultValue: hospital.user.email,
                            onInput: e => e.target.value = e.target.value.slice(0, 50),
                            required: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "staff_mobile_no",
                            children: "Mobile *"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "tel",
                            className: "form-control",
                            id: "staff_mobile_no",
                            "data-parent": "staff",
                            name: "mobile_no",
                            placeholder: "E.g.: 01*********",
                            defaultValue: hospital.user.mobile_no,
                            onInput: e => e.target.value = e.target.value.slice(0, 11),
                            required: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "staff_role",
                            children: "Role"
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "text",
                            className: "form-control",
                            id: "staff_role",
                            "data-parent": "staff",
                            name: "role",
                            defaultValue: hospital.user.role.replace("_", " "),
                            disabled: true,
                            readOnly: true
                          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                            className: "invalid-feedback"
                          })]
                        })]
                      }), passwordChangeViewIsVisible ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                        className: "row row-cols-1 row-cols-sm-2 mb-1 animate__animated animate__fadeIn",
                        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                          className: "col mb-3",
                          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
                            className: "text-primary",
                            style: {
                              fontSize: "0.9rem"
                            },
                            htmlFor: "staff_password",
                            children: [/*#__PURE__*/jsx_runtime_.jsx("i", {
                              className: "bi bi-pencil-square"
                            }), "\xA0Change Password"]
                          }), /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "password",
                            className: "form-control",
                            id: "staff_password",
                            "data-parent": "staff",
                            name: "password",
                            placeholder: "New password",
                            onKeyDown: e => {
                              e.code == "Backspace" ? external_jquery_default()(e.target).trigger("input") : null;
                            },
                            onInput: e => {
                              var _$$val;

                              ;
                              e.target.value = e.target.value.slice(0, 25);

                              if (((_$$val = external_jquery_default()(e.target).val()) === null || _$$val === void 0 ? void 0 : _$$val.length) < 4) {
                                external_jquery_default()(e.target).addClass("is-invalid");
                                external_jquery_default()("#staffPasswordErr").text("Password too short! Should be between 4 - 25 characters.");
                                return;
                              } else {
                                external_jquery_default()(e.target).removeClass("is-invalid");
                                external_jquery_default()("#staffPasswordErr").text("");
                              }

                              const input = external_jquery_default()(e.target).parent().next().children("input[type=password]").removeClass("is-valid is-invalid").val("");
                              return;
                              if (input.val() == e.target.value) external_jquery_default()("#btn_save_password").removeClass("disabled");else external_jquery_default()("#btn_save_password").addClass("disabled");
                            }
                          })]
                        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                          className: "col mt-auto mb-3",
                          children: /*#__PURE__*/jsx_runtime_.jsx("input", {
                            type: "password",
                            className: "form-control",
                            "data-parent": "staff",
                            name: "password",
                            placeholder: "Confirm new password",
                            onInput: e => {
                              var _input$val;

                              ;
                              e.target.value = e.target.value.slice(0, 25);
                              const input = external_jquery_default()(e.target).parent().prev().children("input[type=password]");
                              if (input.val() == "") return;
                              if (((_input$val = input.val()) === null || _input$val === void 0 ? void 0 : _input$val.length) < 4) return;

                              if (input.val() != e.target.value) {
                                input.removeClass("is-valid");
                                external_jquery_default()(e.target).addClass("is-invalid");
                                external_jquery_default()("#staffPasswordErr").text("Passwords do not match!");
                                external_jquery_default()("#btn_save_password").addClass("disabled");
                              } else {
                                input.addClass("is-valid");
                                external_jquery_default()(e.target).removeClass("is-invalid");
                                external_jquery_default()(e.target).addClass("is-valid");
                                external_jquery_default()("#staffPasswordErr").text("");
                                external_jquery_default()("#btn_save_password").removeClass("disabled");
                              }
                            }
                          })
                        }), /*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "text-danger ms-1 mw-100",
                          style: {
                            flex: "none"
                          },
                          id: "staffPasswordErr"
                        })]
                      }) : null, /*#__PURE__*/jsx_runtime_.jsx("button", {
                        className: "btn btn-sm btn-dark me-1",
                        onClick: e => {
                          setPasswordChangeViewIsVisible(!passwordChangeViewIsVisible);
                        },
                        children: "Change Password"
                      }), passwordChangeViewIsVisible ? /*#__PURE__*/jsx_runtime_.jsx("button", {
                        className: "btn btn-sm btn-info disabled animate__animated animate__fadeIn",
                        id: "btn_save_password",
                        onClick: async e => {
                          if (external_jquery_default()(e.target).hasClass("disabled")) return;
                          setLoading(true);
                          await fetch("/api/updatehospitaluser", {
                            method: "POST",
                            headers: {
                              "content-type": "application/json",
                              "x-action-update-password": "true"
                            },
                            body: JSON.stringify({
                              // todo implement encryption
                              newPassword: external_jquery_default()("#staff_password").val(),
                              email: userData.email
                            })
                          }).then(response => response.json()).then(res => {
                            (0,toast/* Toast */.F)("User password updated successfully!", "primary", 1800);
                            setPasswordChangeViewIsVisible(false);
                          }).catch(err => console.error(err));
                          setLoading(false);
                        },
                        children: "Save Password"
                      }) : null]
                    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                      className: "card-footer d-flex justify-content-end py-1",
                      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
                        className: "text-info me-auto",
                        children: /*#__PURE__*/jsx_runtime_.jsx("small", {
                          className: "me-2 mb-1",
                          children: "* - required"
                        })
                      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
                        className: "btn btn-sm btn-primary disabled",
                        id: "btn_user",
                        onClick: async e => {
                          if (external_jquery_default()(e.target).hasClass("disabled")) return;
                          external_jquery_default()("#btn_user_spinner").removeClass("d-none");
                          await fetch("/api/updatehospitaluser", {
                            method: "POST",
                            headers: {
                              "content-type": "application/json"
                            },
                            body: JSON.stringify({
                              userData,
                              newUserData
                            })
                          }).then(response => response.json()).then(res => {
                            external_jquery_default()("#hospital_user").find("input").map((index, elem) => {
                              if (!external_jquery_default()(elem).attr("disabled") && !external_jquery_default()(elem).attr("readonly")) external_jquery_default()(elem).addClass("is-valid").removeClass("is-invalid");
                            });

                            if (res.errors != undefined) {
                              res.errors.map(error => {
                                external_jquery_default()("#staff_" + error.split(" ")[0]).addClass("is-invalid").removeClass("is-valid").next("small").text(error.replace("_no", "").replace("_", ""));
                              });
                            } else if (res.updated) {
                              setUserData(newUserData);
                              external_jquery_default()("#btn_user").addClass("disabled");
                              (0,toast/* Toast */.F)("User updated successfully!", "primary", 1800);
                              external_jquery_default()("#hospital_user").find("input").map((index, elem) => {
                                external_jquery_default()(elem).removeClass("is-valid is-invalid");
                              });
                            }
                          }).catch(err => console.error(err));
                          external_jquery_default()("#btn_user_spinner").addClass("d-none");
                        },
                        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                          className: "spinner-border spinner-border-sm d-none",
                          id: "btn_user_spinner"
                        }), "\xA0Save Changes"]
                      })]
                    })]
                  })]
                })
              })
            })
          })]
        })]
      })]
    })]
  });
};

/* harmony default export */ const dashboard = (Dashboard);

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

/***/ 2034:
/***/ ((module) => {

module.exports = require("react-toastify");

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
var __webpack_exports__ = __webpack_require__.X(0, [1664,5675,4394,1548,4167,9032,8907], () => (__webpack_exec__(1953)));
module.exports = __webpack_exports__;

})();