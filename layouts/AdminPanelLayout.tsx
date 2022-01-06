import Head from "next/head"
import { useRouter } from "next/router"

import AdminPanelNavbar from "@components/admin/AdminPanelNavbar"
import { PopupProvider } from "react-hook-popup"

export interface AdminPanelLayoutProps {}

const AdminPanelLayout: React.FC<AdminPanelLayoutProps> = ({
	children,
}: any) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="robots" content="noindex, nofollow, noarchive" />

				<title>Admin Panel | Quick Hospitalization</title>
				{/* <link
					rel="shortcut icon"
					href="/media/assets/favicon.png"
					type="image/x-icon"
				/> */}
			</Head>

			{/* <AdminPanelNavbar /> */}

			{/* <PopupProvider>{children}</PopupProvider> */}
			{children}
		</>
	)
}

export default AdminPanelLayout
