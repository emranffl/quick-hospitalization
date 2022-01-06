// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { prisma } from "@functionalities/DB/prismaInstance"
import { user } from "@prisma/client"
import { mutateContactNumber } from "@functionalities/mutateObjects"

const userEmailSchema = object().shape({
		email: string().required().email().max(50),
	}),
	userInfoSchema = object().shape({
		name: string().required().min(2).max(50),
		document_id: string().optional().min(9).max(17),
		mobile_no: string().required().min(11).max(11),
		password: string().required().min(4).max(25),
	}),
	checkUserExistence = async (type: string, value: string) => {
		if (type === "email")
			return await prisma.user.findUnique({
				where: {
					email: value,
				},
			})
		else if (type === "mobile")
			return await prisma.user.findUnique({
				where: {
					mobile_no: value,
				},
			})
		else if (type === "documentID")
			return await prisma.user.findUnique({
				where: {
					document_id: value,
				},
			})
	},
	createUser = async (user: user) => {
		// return await prisma.$queryRaw(``)
		console.log(user)

		return await prisma.user.create({
			data: user,
		})
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	if (req.body.step === "user email") {
		try {
			console.log(req.body.data)

			// check if the user is not already signed up
			if ((await checkUserExistence("email", req.body.data.email)) == null)
				return res.status(200).json(
					await userEmailSchema.validate(req.body.data, {
						abortEarly: false,
					})
				)

			return res.status(200).json({
				error:
					"A user with the provided email already exists! Try with another email.",
			})
		} catch (error) {
			return res.status(406).json(error)
		}
	} else if (req.body.step === "user info") {
		try {
			console.log(req.body.data)

			// throws error upon invalid data
			await userInfoSchema.validate(req.body.data, {
				abortEarly: false,
			})

			// duplicate mobile number validation
			if (
				(await checkUserExistence(
					"mobile",
					(mutateContactNumber(req.body.data, true) as user).mobile_no
				)) != null
			)
				return res.status(200).json({
					error: {
						mobile_no:
							"A user with the provided mobile already exists! Try with another mobile.",
					},
				})

			// duplicate document id validation
			if (
				(await checkUserExistence("documentID", req.body.data.document_id)) !=
				null
			)
				return res.status(200).json({
					error: {
						document_id:
							"A user with the provided document ID already exists! Try with another ID.",
					},
				})

			// * create new user
			// return res
			// 	.status(200)
			// 	.json(
			// 		mutateContactNumber(
			// 			await createUser(mutateContactNumber(req.body.data, true) as user)
			// 		)
			// 	)
			return res.status(200).json(req.body.data)
		} catch (error) {
			return res.status(406).json(error)
		}
	}

	return res.status(406).json({ message: "Invalid data format!" })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
