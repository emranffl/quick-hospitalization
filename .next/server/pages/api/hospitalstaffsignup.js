"use strict";
(() => {
var exports = {};
exports.id = 4275;
exports.ids = [4275,2218,2643];
exports.modules = {

/***/ 5062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ hospitalstaffsignup)
});

// EXTERNAL MODULE: external "yup"
var external_yup_ = __webpack_require__(9440);
// EXTERNAL MODULE: ./functionalities/DB/prismaInstance.ts
var prismaInstance = __webpack_require__(6972);
;// CONCATENATED MODULE: ./functionalities/saveImage.ts
const base64ToImage = __webpack_require__(8928);

const saveImage = (base64Data, directory, id) => {
  // todo correct pathname as per prod env
  const path = `D:/Workspace/smart-medicare/public/uploads/${directory}/`,
        optionalObj = {
    fileName: directory == "hospitals" ? "profile-image-" + id + "-" + Math.floor(Math.random() * 10) : "NID",
    type: base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
  };
  return path + base64ToImage(base64Data, path, optionalObj)["fileName"];
};


// EXTERNAL MODULE: ./functionalities/mutateObjects.ts
var mutateObjects = __webpack_require__(4688);
;// CONCATENATED MODULE: ./pages/api/hospitalstaffsignup.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction





const hospitalInfoSchema = (0,external_yup_.object)().shape({
  hospitalName: (0,external_yup_.string)().required().min(10).max(100),
  registrationNo: (0,external_yup_.string)().required().min(10).max(10)
}),
      hospitalAddressSchema = (0,external_yup_.object)().shape({
  phone: (0,external_yup_.string)().optional().min(9).max(11).nullable(),
  mobile: (0,external_yup_.string)().optional().min(11).max(11).nullable(),
  website: (0,external_yup_.string)().optional().max(255).url().nullable(),
  street_address: (0,external_yup_.string)().required(),
  district: (0,external_yup_.string)().required(),
  division: (0,external_yup_.string)().required()
}),
      hospitalAdminSchema = (0,external_yup_.object)().shape({
  adminName: (0,external_yup_.string)().required().min(2).max(50),
  adminEmail: (0,external_yup_.string)().required().email(),
  adminMobile: (0,external_yup_.string)().required().min(11).max(11),
  adminPassword: (0,external_yup_.string)().required().min(4).max(25)
}),
      create = async ({
  hospital,
  address,
  capacity,
  staff,
  vacant_bed_log,
  log
}) => {
  return await prismaInstance/* prisma.hospital.create */._.hospital.create({
    data: {
      registration_no: hospital.registration_no,
      hospital_name: hospital.hospital_name,
      description: hospital.description,
      hospital_type: hospital.hospital_type,
      bed_type: hospital.bed_type,
      image_source: hospital.image_source,
      website: hospital.website,
      address: {
        create: {
          street_address: address.street_address,
          district: address.district,
          division: address.division,
          phone_no: address.phone_no,
          mobile_no: address.mobile_no,
          latitude: address.latitude,
          longitude: address.longitude
        }
      },
      capacity: {
        create: {
          total_capacity: capacity.total_capacity,
          ward: capacity.ward,
          special_ward: capacity.special_ward,
          cabin: capacity.cabin,
          icu: capacity.icu,
          ccu: capacity.ccu,
          covidu: capacity.covidu
        }
      },
      vacant_bed_log: {
        create: {
          ward: vacant_bed_log.ward,
          special_ward: vacant_bed_log.special_ward,
          cabin: vacant_bed_log.cabin,
          icu: vacant_bed_log.icu,
          ccu: vacant_bed_log.ccu,
          covidu: vacant_bed_log.covidu
        }
      },
      staff: {
        create: {
          mobile_no: staff.mobile_no,
          password: staff.password,
          name: staff.name,
          email: staff.email,
          role: staff.role,
          status: staff.status,
          joined_on: new Date()
        }
      },
      log: {
        create: {
          mobile_no: log.mobile_no,
          task: log.task,
          role: log.role
        }
      }
    }
  });
}; // ! entry point of get endpoint


/* harmony default export */ const hospitalstaffsignup = (async (req, res) => {
  // revoking other methods
  if (req.method !== "POST") return res.status(405).json({
    message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`
  });

  if (req.body.step === "hospital info") {
    try {
      console.log(req.body.data);
      await hospitalInfoSchema.validate(req.body.data, {
        abortEarly: false
      }); // check if the hospital is already signed up

      if ((await prismaInstance/* prisma.hospital.findUnique */._.hospital.findUnique({
        where: {
          registration_no: req.body.data.registrationNo
        }
      })) != null) return res.status(200).json({
        error: "Hospital is already registered! Try Login."
      });
      return res.status(200).json({});
    } catch (error) {
      return res.status(406).json(error);
    }
  } else if (req.body.step === "address info") {
    try {
      console.log(req.body.data);
      return res.status(200).json(await hospitalAddressSchema.validate(req.body.data, {
        abortEarly: false
      }));
    } catch (error) {
      return res.status(406).json(error);
    }
  } else if (req.body.step === "admin info") {
    try {
      console.log(req.body.data);
      return res.status(200).json(await hospitalAdminSchema.validate(req.body.data, {
        abortEarly: false
      }));
    } catch (error) {
      return res.status(406).json(error);
    }
  } else if (req.body.step == "submit") {
    try {
      console.log(req.body.data);
      req.body.data.hospital.image_source === "default" ? req.body.data.hospital.image_source = "/media/profile-image-default.jpg" : req.body.data.hospital.image_source = saveImage(req.body.data.hospital.image_source, "hospitals", req.body.data.hospital.registration_no);
      await create((0,mutateObjects/* mutateContactNumber */.D)(req.body.data, true));
      return res.status(302).json({
        reg: req.body.data.hospital.registration_no,
        user: req.body.data.staff.email
      }); // return res
      // 	.writeHead(302, {
      // 		Location: `/admin/dashboard?reg=${req.body.data.hospital.registration_no}&user=${req.body.data.staff.email}`,
      // 	})
      // 	.end()
    } catch (error) {
      return res.status(406).json(error);
    }
  }

  return res.status(406).json({
    message: "Invalid data format!"
  });
}); // ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete

const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

/***/ }),

/***/ 212:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 8928:
/***/ ((module) => {

module.exports = require("base64-to-image");

/***/ }),

/***/ 9440:
/***/ ((module) => {

module.exports = require("yup");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4394], () => (__webpack_exec__(5062)));
module.exports = __webpack_exports__;

})();