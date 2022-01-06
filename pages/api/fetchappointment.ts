// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { NextApiRequest, NextApiResponse } from "next"

export const appointmentIncludeParam = {
	doctor: {
		select: {
			chamber: true,
			specialization: true,
			department: true,
			email: true,
			image_source: true,
			name: true,
			status: true,
			schedule: true,
		},
	},
	hospital: {
		select: {
			address: true,
			hospital_name: true,
		},
	},
}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "GET")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.headers["x-appointment-id"])

	if (req.headers["x-appointment-id"])
		return res.status(200).json({
			appointment: mutateContactNumber(
				await prisma.appointment.findUnique({
					where: {
						id: req.headers["x-appointment-id"] as string,
					},
					include: appointmentIncludeParam,
				})
			),
		})

	return res.status(406).json({ message: "Invalid data format!" })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
