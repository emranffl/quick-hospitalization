// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"
import { getDoctorList } from "@api/getdoctorlist"

const findDoctor = async (email: string) => {
		return await prisma.doctor.findUnique({
			where: {
				email,
			},
		})
	},
	createDoctor = async (id: string, email: string, registration_no: string) => {
		await prisma.$queryRawUnsafe(`
			INSERT INTO doctor(
				id,
				password,
				email,
				registration_no,
				name,
				sex,
				department,
				specialization,
				status
			)
			VALUES(
				'${id}',
				'',
				'${email}',
				'${registration_no}',
				'undefined',
				'M',
				'ENT',
				'',
				'Inactive'
			)
		`)

		return await getDoctorList(registration_no)
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(req.body, req.headers["x-registration-no"])

	if (await findDoctor(req.body.email))
		return res.status(200).json({ message: "Email already in use!" })

	return res
		.status(200)
		.json(
			await createDoctor(
				req.body.id,
				req.body.email,
				req.headers["x-registration-no"] as string
			)
		)
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
