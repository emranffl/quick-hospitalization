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

	console.log(req.headers["x-search-by"], req.headers["x-search-term"])

	if (
		req.headers["x-search-by"] != undefined &&
		req.headers["x-search-term"] != undefined
	)
		return res.status(200).json(
			await prisma.$queryRawUnsafe(`
		SELECT vacant_bed_log.registration_no, hospital_name, image_source, last_updated, ward, special_ward, cabin, icu, ccu, covidu, bed_type, hospital_type
			FROM vacant_bed_log, hospital, address
			WHERE last_updated IN
			(
					SELECT MAX(last_updated) "last_updated"
					FROM vacant_bed_log vbl, hospital h
					WHERE vbl.registration_no = h.registration_no AND h.status <> 'private' AND h.status <> 'deleted'
					GROUP BY h.registration_no
					ORDER BY h.registration_no ASC
			)
        AND vacant_bed_log.registration_no = hospital.registration_no
        AND address.registration_no = hospital.registration_no
		HAVING hospital.${req.headers["x-search-by"]} LIKE "%${req.headers["x-search-term"]}%"
		ORDER BY vacant_bed_log.registration_no;
	`)
		)

	return res.status(406).json({ message: "Invalid data format!" })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
