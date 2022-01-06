import Head from "next/head"

interface ServerErrorProps {}

const ServerError: React.FC<ServerErrorProps> = () => {
	return (
		<>
			<Head>
				<title>500 | Server Error</title>
			</Head>
			<main className="container row m-auto server-error">
				<div className="col-md-12 align-self-center">
					<h1>500</h1>
					<h2 className="text-warning">Unexpected server side error :(</h2>
				</div>
				<div className="col-md-12 align-self-center mt-5 mt-md- d-none d-sm-block">
					<div className="gears">
						<div className="gear one">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
						<div className="gear two">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
						<div className="gear three">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default ServerError
