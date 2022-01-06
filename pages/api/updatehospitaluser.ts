// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { staff } from "@prisma/client"
import { updatedDiff } from "deep-object-diff"
import { mutateContactNumber } from "@functionalities/mutateObjects"

const hospitalUserSchema = object().shape({
		name: string().required().min(2).max(50),
		mobile_no: string().required().min(11).max(11),
		email: string().required().email().max(50),
	}),
	hospitalUserPasswordSchema = object().shape({
		email: string().required().email(),
		newPassword: string().required(),
	}),
	updateUser = async (email: string, userData: staff) => {
		return await prisma.staff.update({
			where: {
				email,
			},
			data: userData,
		})
	},
	updatePassword = async (email: string, password: string) => {
		return await prisma.staff.update({
			where: {
				email,
			},
			data: { password },
		})
	}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "POST")
		return res.status(405).json({
			message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
		})

	console.log(
		req.body,
		updatedDiff(req.body.userData, req.body.newUserData),
		req.headers["x-action-update-password"]
	)

	try {
		req.headers["x-action-update-password"]
			? await hospitalUserPasswordSchema.validate(req.body, {
					abortEarly: false,
			  })
			: await hospitalUserSchema.validate(req.body.newUserData, {
					abortEarly: false,
			  })
	} catch (error) {
		return res.status(406).json(error)
	}

	if (req.headers["x-action-update-password"])
		await updatePassword(req.body.email, req.body.newPassword)
	else {
		const data = mutateContactNumber(updatedDiff(req.body.userData, req.body.newUserData), true)
		
		if ((data as staff).email != undefined) {
			if (
				(await prisma.staff.findUnique({
					where: { email: req.body.newUserData.email },
				})) != null
			)
				return res.status(406).json({
					errors: [
						"email cannot be duplicate, another user found with the provided email",
					],
				})
		} else await updateUser(req.body.userData.email, data as staff)
	}

	return res.status(200).json({ updated: true })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
