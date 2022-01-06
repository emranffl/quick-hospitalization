// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { prisma } from "@functionalities/DB/prismaInstance"

const staffLoginSchema = object().shape({
		email: string().required().email(),
		password: string().required().min(4).max(25),
	}),
	findStaff = async (email: string) => {
		return await prisma.staff.findUnique({ where: { email } })
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.body.data)

	try {
		// form data type validation
		await staffLoginSchema.validate(req.body.data, {
			abortEarly: false,
		})

		const staff = await findStaff(req.body.data.email)

		// staff existence
		if (staff == null)
			return res
				.status(200)
				.json({ staff: "Staff not found! Ask admin to add first." })

		// staff status check
		if (staff.status === "Inactive")
			return res.status(200).json({
				staff:
					"Staff is currently inactive! Contact admin for further inquiries.",
			})

		// credential check
		console.log(staff.password, req.body.data.password)
		if (staff.password === req.body.data.password)
			// todo redirect staff with session
			return res.json(staff)

		req.body.data.password != undefined
			? res.status(200).json({ error: "Password not valid!" })
			: res.status(406).json({ message: "Invalid data format!" })
		return
	} catch (error) {
		return res.status(406).json(error)
	}
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
