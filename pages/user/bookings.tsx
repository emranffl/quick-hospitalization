import { UserContext } from "@contexts/user"
import { useContext } from "react"

interface UserBookingsProps {}

const UserAccount: React.FC<UserBookingsProps> = () => {
	const { userContext } = useContext(UserContext)

	return <div>Please design me</div>
}

export default UserAccount
