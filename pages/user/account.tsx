import { UserContext } from "@contexts/user"
import { useContext } from "react"

interface UserAccountProps {}

const UserAccount: React.FC<UserAccountProps> = () => {
	const { userContext } = useContext(UserContext)

	return <div>Please design me</div>
}

export default UserAccount
