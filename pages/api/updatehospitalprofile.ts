// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { NextApiRequest, NextApiResponse } from "next"
import { object, string } from "yup"
import { address, hospital } from "@prisma/client"
import { updatedDiff } from "deep-object-diff"
import { mutateContactNumber } from "@functionalities/mutateObjects"

interface Data {
	address: address
	hospital: hospital
}

const hospitalProfileSchema = object().shape({
		hospital: object().shape({
			hospital_name: string().required().min(10).max(100),
			hospital_type: string().required().oneOf(["Public", "Private"]),
			website: string().optional().url().nullable(),
		}),
		address: object().shape({
			phone_no: string().optional().min(9).max(11).nullable(),
			mobile_no: string().optional().min(11).max(11).nullable(),
			latitude: string().optional().min(-90).max(90),
			longitude: string().optional().min(-180).max(180),
			street_address: string().required(),
			district: string().required(),
			division: string().required(),
		}),
	}),
	updateProfile = async (updatedData: Data, registration_no: string) => {
		if (updatedData["address"] != undefined) {
			await prisma.address.update({
				where: {
					registration_no,
				},
				data: updatedData["address"],
			})
		}

		if (updatedData["hospital"] != undefined) {
			await prisma.hospital.update({
				where: {
					registration_no,
				},
				data: updatedData["hospital"],
			})
		}
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
		updatedDiff(req.body.profileData, req.body.newProfileData)
	)

	try {
		await hospitalProfileSchema.validate(req.body.newProfileData, {
			abortEarly: false,
		})
	} catch (error) {
		return res.status(406).json(error)
	}

	const data = mutateContactNumber(
		updatedDiff(req.body.profileData, req.body.newProfileData),
		true
	)

	// check hospital name uniqueness
	if (
		(data as Data).hospital &&
		(data as Data).hospital.hospital_name != undefined
	)
		if (
			(await prisma.hospital.findUnique({
				where: {
					hospital_name: req.body.newProfileData.hospital.hospital_name,
				},
			})) != null
		)
			return res.status(406).json({
				errors: [
					"hospital.hospital_name cannot be duplicate, another hospital with the same name exists",
				],
			})

	await updateProfile(
		data as Data,
		req.body.profileData.hospital != undefined
			? req.body.profileData.address.registration_no
			: req.body.profileData.hospital.registration_no
	)

	return res.status(200).json({ updated: true })
}

// ! allowing client side promise resolving & suppressing false NO RESPONSE SENT alert, do not delete
export const config = {
	api: {
		externalResolver: true,
	},
}
