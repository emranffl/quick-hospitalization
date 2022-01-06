import Head from "next/head"

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
	return (
		<>
			<Head>
				<title>About | Quick Hospitalization</title>
			</Head>
			<main className="container">Please design me</main>
		</>
	)
}

export default About
