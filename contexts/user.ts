import { createContext, Dispatch, SetStateAction } from "react"
import { user } from "@prisma/client"

export const UserContext = createContext<{
	userContext: user
	setUserContext: Dispatch<SetStateAction<user>>
}>(null)
