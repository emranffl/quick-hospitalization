// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@functionalities/DB/prismaInstance"

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	if (req.headers["x-service-type"] === "amenity") {
		console.log(req.headers["x-service-type"], req.body)
		// todo implement updatedDiff
		return res.status(200).json(
			await prisma.amenity.update({
				where: {
					registration_no: req.body["registration_no"],
				},
				data: req.body,
			})
		)
	}

	return res.status(406).json({ message: "Invalid data format!" })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
