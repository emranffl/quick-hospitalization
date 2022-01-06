// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"
import { updatedDiff } from "deep-object-diff"
import { capacity } from ".prisma/client"

const updateCapacity = async (
	registration_no: string,
	updatedCapacity: capacity,
	bed_type: string
) => {
	return prisma.$transaction([
		prisma.capacity.update({
			where: {
				registration_no,
			},
			data: updatedCapacity,
		}),
		prisma.hospital.update({
			where: { registration_no },
			data: { bed_type },
		}),
	])
}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.body, updatedDiff(req.body.capacity, req.body.newCapacity))

	const bedTypes = {
			ward: "Ward",
			special_ward: "Special Ward",
			cabin: "Cabin",
			vip_cabin: "VIP Cabin",
			icu: "ICU",
			ccu: "CCU",
			hdu: "HDU",
			hfncu: "HFNCU",
			emergency: "Emergency",
			covidu: "COVIDU",
			extra: "Extra",
		},
		newBedTypes: string[] = []

	Object.keys(req.body.newCapacity)
		.filter((el: string) => el.indexOf("registration_no") == -1)
		.filter((el: string) => el.indexOf("total_capacity") == -1)
		.map((el: string) => {
			if (req.body.newCapacity[el] != null) {
				newBedTypes.push(bedTypes[el as keyof typeof bedTypes])
			}
		})

	return res
		.status(200)
		.json(
			await updateCapacity(
				req.body.capacity.registration_no,
				updatedDiff(req.body.capacity, req.body.newCapacity) as capacity,
				newBedTypes.join(",")
			)
		)
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
