import { createContext, Dispatch, SetStateAction } from "react"
import { doctor } from "@prisma/client"

export const DoctorContext = createContext<{
	doctorContext: doctor
	setDoctorContext: Dispatch<SetStateAction<doctor>>
}>({})
