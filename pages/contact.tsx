import Head from "next/head"

export interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
	return (
		<>
			<Head>
				<title>About | Quick Hospitalization</title>
			</Head>
			<main className="container">
				<form action="" className="mt-5 px-4 pt-4 bg-light">
					<h3>Form</h3>
					<div className="mb-3">
						<label htmlFor="Text" className="form-label">
							Your Name
						</label>
						<input type="text" className="form-control" id="Text" />
					</div>

					<div className="mb-3">
						<label htmlFor="Email" className="form-label">
							Email
						</label>
						<input type="email" className="form-control" id="Email" />
					</div>

					<div className="mb-3">
						<label htmlFor="Select" className="form-label">
							Select Menu
						</label>
						<select className="form-select" id="Select">
							<option>.....</option>
							<option>One</option>
							<option selected>Two</option>
							<option>Three</option>
							<option>Four</option>
						</select>
					</div>

					<div className="mb-3">
						<label htmlFor="Password1" className="form-label">
							Password
						</label>
						<input type="password" className="form-control" id="Password1" />
					</div>

					<div className="mb-3">
						<label htmlFor="Select" className="form-label">
							Select Subject
						</label>
						<select className="form-select" id="Select">
							<option>.....</option>
							<option>CSE</option>
							<option>EEE</option>
							<option>ETE</option>
							<option>BBA</option>
						</select>
					</div>

					<div className="mb-3">
						<label htmlFor="textarea" className="form-label">
							Message
						</label>
						<textarea
							className="form-control"
							id="textarea"
							rows="2"
						></textarea>
					</div>

					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</main>
		</>
	)
}

export default Contact
