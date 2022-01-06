// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "GET")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	return res.status(200).json(
		await prisma.appointment.findMany({
			where: {
				user_mobile_no: (req.headers["x-user"] as string).substring(1),
				doctor: {
					email: req.headers["x-doctor"] as string,
				},
				OR: [
					{
						status: "Confirmed",
					},
					{
						status: "Requested",
					},
				],
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
