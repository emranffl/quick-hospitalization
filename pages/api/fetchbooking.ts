// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { NextApiRequest, NextApiResponse } from "next"

export const bookingIncludeParam = {
	hospital: {
		select: {
			hospital_name: true,
			registration_no: true,
			address: {
				select: {
					street_address: true,
					district: true,
					division: true,
				},
			},
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

	console.log(req.headers["x-booking-id"])

	if (req.headers["x-booking-id"])
		return res.status(200).json({
			appointment: mutateContactNumber(
				await prisma.booking.findUnique({
					where: {
						id: req.headers["x-booking-id"] as string,
					},
					include: bookingIncludeParam,
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
