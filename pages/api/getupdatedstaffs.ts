// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@functionalities/DB/prismaInstance"
import { staff } from "@prisma/client"
import { mutateContactNumber } from "@functionalities/mutateObjects"

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "GET")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.headers["x-registration-no"], req.headers["x-user-email"])

	const staff = mutateContactNumber(
		await prisma.staff.findMany({
			where: {
				registration_no: req.headers["x-registration-no"] as string,
				email: { not: req.headers["x-user-email"] as string },
			},
			select: {
				mobile_no: true,
				name: true,
				email: true,
				role: true,
				status: true,
				joined_on: true,
				last_updated: true,
			},
			orderBy: {
				joined_on: "desc",
			},
		})
	)

	return res.status(200).json(staff)
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
