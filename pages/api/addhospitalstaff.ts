// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { prisma } from "@functionalities/DB/prismaInstance"
import { staff } from "@prisma/client"
import { mutateContactNumber } from "@functionalities/mutateObjects"

const hospitalStaffSchema = object().shape({
		staffName: string().required().min(2).max(50),
		staffMobile: string().required().min(11).max(11),
		staffEmail: string().required().email(),
	}),
	createStaff = async ({
		mobile_no,
		password,
		name,
		email,
		role,
		status,
		registration_no,
	}: any) => {
		console.log(mobile_no, password, name, email, role, status, registration_no)
		return await prisma.staff.create({
			data: {
				email,
				mobile_no,
				name,
				password,
				role,
				status,
				hospital: { connect: { registration_no } },
			},
		})

		await prisma.$queryRaw`INSERT INTO staff(mobile_no, password, name, email, role, status, registration_no, joined_on) 
						VALUES ('${mobile_no}','${password}','${name}','${email}','${role}','${status}','${registration_no}','${new Date()}')
						SET FOREIGN_KEY_CHECKS=0;`

		return await prisma.staff.findUnique({
			where: {
				email,
			},
		})
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	// console.log(req.body)

	if (req.headers["x-fields-validated"] == "true") {
		return res.status(200).json(await createStaff(mutateContactNumber(req.body, true)))
	}

	try {
		await hospitalStaffSchema.validate(req.body, {
			abortEarly: false,
		})
	} catch (error) {
		return res.status(406).json(error)
	}

	return res.status(200).json({ validated: true })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
