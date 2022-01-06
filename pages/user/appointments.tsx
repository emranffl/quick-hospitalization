import { UserContext } from "@contexts/user"
import { useContext } from "react"

interface UserAppointmentsProps {}

const UserAccount: React.FC<UserAppointmentsProps> = () => {
	const { userContext } = useContext(UserContext)

	return <div>Please design me</div>
}

export default UserAccount
