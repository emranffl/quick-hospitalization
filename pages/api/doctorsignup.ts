// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateDateTimeString } from "@functionalities/mutateObjects"
import {
	doctor,
	doctor_department,
	doctor_sex,
	schedule,
	schedule_day,
} from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { object, string, array } from "yup"

const doctorEmailSchema = object().shape({
		email: string().required().email().max(50),
	}),
	doctorInfoSchema = object().shape({
		name: string().required().min(2).max(50),
		sex: string().oneOf(Object.values(doctor_sex)),
		department: string().oneOf(Object.values(doctor_department)),
		specialization: string().required(),
		chamber: string().optional().max(10),
		bio: string().optional().max(16383),
		password: string().required().min(4).max(25),
	}),
	doctorScheduleSchema = array().of(
		object().shape({
			day: string().required().min(1).max(1).oneOf(Object.values(schedule_day)),
			start_time: string().required(),
			end_time: string().required(),
		})
	),
	updateDoctorWOrWOSchedule = async (email: string, data: SignupData) => {
		data.schedule
			? await prisma.schedule.createMany({
					data: data.schedule,
			  })
			: null

		return await prisma.doctor.update({
			where: { email },
			data: {
				...(data.bio ? { bio: data.bio } : {}),
				...(data.chamber ? { chamber: data.chamber } : {}),
				name: data.name,
				sex: data.sex,
				department: data.department,
				specialization: data.specialization,
				password: data.password,
				status: "Active",
			},
			select: {
				email: true,
			},
		})
	}

interface SignupData extends doctor {
	schedule?: schedule[]
}

// ! entry point of get endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	// revoking other methods
	if (req.method !== "GET")
		if (req.method !== "POST")
			return res.status(405).json({
				message: `Method not allowed! '${req.method}' is abstruse to this endpoint. Server side log.`,
			})

	console.log(req.headers.email, req.headers.step, req.body)

	if (req.headers.step == "0") {
		try {
			await doctorEmailSchema.validate(
				{ email: req.headers.email },
				{
					abortEarly: false,
				}
			)

			let doctor = await prisma.doctor.findUnique({
				where: { email: req.headers.email as string },
				select: {
					id: true,
					password: true,
					hospital: { select: { hospital_name: true } },
				},
			})

			if (!doctor)
				return res.status(200).json({
					message:
						"Your work email does not match from the system. Contact your hospital admin to enroll your profile first!",
				})

			if (doctor.password == "undefined")
				return res.status(200).json({
					message:
						"Your profile is inactive. You can't join with the same email.",
				})

			return res.status(200).json({
				id: doctor.id,
				hospital: { hospital_name: doctor.hospital.hospital_name },
			})
		} catch (error) {
			return res.status(406).json(error)
		}
	} else if (req.headers.step == "1") {
		try {
			await doctorInfoSchema.validate(req.body, {
				abortEarly: false,
			})

			return res.status(200).json({ validated: true })
		} catch (error) {
			return res.status(406).json(error)
		}
	} else if (req.headers.step == "2") {
		try {
			await doctorScheduleSchema.validate(req.body.schedule, {
				abortEarly: false,
			})

			return res.status(200).json(
				// {email: req.headers.email}
				await updateDoctorWOrWOSchedule(
					req.headers.email as string,
					mutateDateTimeString(req.body) as SignupData
				)
			)
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
