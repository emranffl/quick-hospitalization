import Head from "next/head"

import AppNavbar from "@components/app/AppNavbar"
import Footer from "@components/app/Footer"

export interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = ({ children }: any) => {
	const headerVariables = {
		url: "",
		title: "Quick Hospitalization",
		description: "",
		twitterDescription: "",
		imgUrl: "",
	}

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<title>{headerVariables.title}</title>
				{/* <link
					rel="shortcut icon"
					href="/media/assets/favicon.png"
					type="image/x-icon"
				/> */}

				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="url" content={headerVariables.url} />
				<meta name="title" content={headerVariables.title} />
				<meta name="description" content={headerVariables.description} />
				<meta name="image" content={headerVariables.imgUrl} />
				<meta name="robots" content="index, follow" />
				<meta name="language" content="English" />
				<meta name="keywords" content="" />

				{/* <!-- primary --> */}

				<meta property="og:type" content="website" />
				<meta property="og:url" content={headerVariables.url} />
				<meta property="og:title" content={headerVariables.title} />
				<meta property="og:description" content={headerVariables.description} />
				<meta property="og:image" content={headerVariables.imgUrl} />
				<meta property="og:image:type" content="image/jpeg" />

				{/* <!-- Open Graph => Facebook - LinkedIn --> */}

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:url" content={headerVariables.url} />
				<meta name="twitter:title" content={headerVariables.title} />
				<meta
					name="twitter:description"
					content={headerVariables.twitterDescription}
				/>
				<meta name="twitter:image" content={headerVariables.imgUrl} />

				{/* <!-- Twitter --> */}
			</Head>

			<AppNavbar />

			{children}

			<Footer />
		</>
	)
}

export default AppLayout
