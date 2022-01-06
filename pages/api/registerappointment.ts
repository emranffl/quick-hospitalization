// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { appointment } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	const appointmentData = mutateContactNumber(req.body, true) as appointment

	console.log(appointmentData)

	return res.status(200).json(
		await prisma.appointment.upsert({
			create: appointmentData,
			update: appointmentData,
			where: {
				id: appointmentData.id,
			},
		})
	)

	return res.status(406).json({ message: "Invalid data format!" })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
