// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"

export const doctorSelectParam = {
		bio: true,
		chamber: true,
		department: true,
		email: true,
		id: true,
		image_source: true,
		joined_on: true,
		name: true,
		sex: true,
		specialization: true,
		status: true,
		// appointment: true,
	},
	getDoctorList = async (registration_no: string) => {
		return await prisma.doctor.findMany({
			where: { registration_no },
			select: doctorSelectParam,
		})
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "GET")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.headers["x-registration-no"])

	if (req.headers["x-registration-no"])
		res
			.status(200)
			.json(await getDoctorList(req.headers["x-registration-no"] as string))

	return res.status(406).json({ message: "Invalid data format!" })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
