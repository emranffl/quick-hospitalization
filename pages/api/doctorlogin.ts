// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { doctor } from "@prisma/client"

const userLoginSchema = object().shape({
		email: string().required().max(50).email(),
		password: string().required().min(4).max(25),
	}),
	findUser = async (email: string) => {
		return await prisma.doctor.findUnique({
			where: { email },
		})
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	try {
		// console.log(req.body.data)

		// form data type validation
		// await userLoginSchema.validate(req.body.data, {
		// 	abortEarly: false,
		// })
		const data = req.body.data as doctor
		const doctor = await findUser(data["email"])

		console.log(doctor, data)

		// user existence
		if (!doctor)
			return res.status(200).json({ doctor: "Doctor not found! Try Sign Up." })

		// inactive user
		if (doctor.password == "undefined")
			return res.status(200).json({
				doctor:
					"Your profile is inactive. If this is a mistake, contact your admin.",
			})

		// credential check
		if (doctor.password == data.password)
			// todo redirect user with session
			return res.status(200).json(mutateContactNumber(doctor))
		else if (doctor.password != data.password)
			return res.status(200).json({ pass: "Password not valid!" })

		return res.status(406).json({ message: "Invalid data format!" })
	} catch (error) {
		return res.status(406).json(error)
	}
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
