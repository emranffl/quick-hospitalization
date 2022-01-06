// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { staff } from "@prisma/client"
import { mutateContactNumber } from "@functionalities/mutateObjects"

const hospitalStaffSchema = object().shape({
		name: string().required().min(2).max(50),
		mobile_no: string().required().min(11).max(11),
	}),
	updateStaff = async (staff: staff) => {
		return await prisma.staff.update({
			where: {
				email: staff.email,
			},
			data: {
				name: staff.name,
				mobile_no: staff.mobile_no,
				role: staff.role,
				status: staff.status,
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

	console.log(req.body)

	try {
		await hospitalStaffSchema.validate(req.body, {
			abortEarly: false,
		})
	} catch (error) {
		return res.status(406).json(error)
	}

	// todo implement updatedDiff
	await updateStaff(mutateContactNumber(req.body, true) as staff)

	return res.status(200).json({ updated: true })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
