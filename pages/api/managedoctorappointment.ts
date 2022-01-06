// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "PUT")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.body)

	await prisma.appointment.update({
		where: {
			id: req.body.id,
		},
		data: {
			status: req.body.status,
		},
	})

	return res.status(200).json(
		await prisma.doctor.findUnique({
			where: {
				email: req.body.email,
			},
			include: {
				hospital: {
					select: {
						hospital_name: true,
					},
				},
				appointment: {
					orderBy: {
						status: "asc",
					},
				},
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
