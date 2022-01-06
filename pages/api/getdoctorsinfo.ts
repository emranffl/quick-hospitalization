// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.body)

	if (req.body.offset == undefined || typeof req.body.offset != "number")
		return res.status(406).json({ message: "Invalid data format!" })

	return res.status(200).json({
		doctors: await prisma.$queryRaw`
		SELECT id, email, registration_no, name, sex, department, specialization, chamber, bio, image_source, joined_on, status
		FROM doctor
		WHERE joined_on IN 
			(
				SELECT MAX(joined_on) "joined_on"
				FROM doctor
				WHERE status <> "Inactive"
				GROUP BY  doctor.id
				ORDER BY doctor.id ASC
			)
		ORDER BY doctor.id
		LIMIT 12
		OFFSET ${req.body.offset};
		`,
	})
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
