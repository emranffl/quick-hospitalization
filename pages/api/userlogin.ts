// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { user } from "@prisma/client"

const userLoginSchema = object().shape({
		mobile_no: string().required().min(11).max(11),
		password: string().required().min(4).max(25),
	}),
	findUser = async (mobile_no: string) => {
		return await prisma.user.findUnique({
			where: { mobile_no },
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
		const data = mutateContactNumber(req.body.data, true) as user
		const user = await findUser(data["mobile_no"])
		console.log(user, data)
		// user existence
		if (user == null)
			return res.status(200).json({ user: "User not found! Try Sign Up." })

		// credential check
		if (user.password == data.password)
			// todo redirect user with session
			return res.status(200).json(mutateContactNumber(user))
		else if (user.password != data.password)
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
