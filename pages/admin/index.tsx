import { Links } from "@app"
import Link from "next/link"
import router from "next/router"
import $ from "jquery"
import Head from "next/head"

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
	return (
		<>
			<Head>
				<title>Staff Login | Admin Panel</title>
			</Head>
			<main className="card m-auto shadow-lg" style={{ maxWidth: "330px" }}>
				<i className="bi bi-building mx-auto mt-5 mb-2 h3 text-primary"></i>
				<h6 className="mx-auto">Administration Login</h6>
				<div className="card-body">
					<form
						className="d-flex flex-column"
						onSubmit={event => {
							event.preventDefault()
							event.stopPropagation()
						}}
					>
						<div>
							<label className="text-secondary" htmlFor="email">
								Email *
							</label>
							<input
								type="tel"
								className="form-control col-10"
								style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
								placeholder="E.g.: example@domain.com"
								onInput={e =>
									((e.target as HTMLInputElement).value = (
										e.target as HTMLInputElement
									).value.slice(0, 50))
								}
								required
								id="email"
							/>
							<small id="emailErr" className="form-text text-danger"></small>
						</div>
						<div>
							<label className="text-secondary" htmlFor="password">
								Password *
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="4 - 25 characters"
								onInput={e =>
									((e.target as HTMLInputElement).value = (
										e.target as HTMLInputElement
									).value.slice(0, 25))
								}
								id="password"
								required
							/>
							<small
								id="passwordErr"
								className="form-text text-danger ps-1"
							></small>
						</div>
						<button
							type="submit"
							className="btn btn-sm btn-primary mx-auto"
							onClick={async event => {
								const data = {
									email: $("#email").val(),
									password: $("#password").val(),
								}

								await fetch("/api/hospitalstafflogin", {
									method: "POST",
									headers: new Headers({ "content-type": "application/json" }),
									body: JSON.stringify({
										data,
									}),
									redirect: "follow",
								})
									.then(response => response.json())
									.then(res => {
										let collection = {
												email: "Email",
												password: "Password",
											},
											flaggedError = {
												email: false,
												password: false,
											}

										if (res.staff != undefined) {
											$("#emailErr").text(res.staff)
											flaggedError.email = true
										} else if (res.error != undefined) {
											$("#passwordErr").text(res.error)
											flaggedError.password = true
										} else if (res.errors != undefined) {
											res.errors.map((errorMsg: any) => {
												Object.keys(collection).map(keyName => {
													if (errorMsg.includes(keyName)) {
														$("#" + keyName + "Err").text(
															errorMsg.replace(
																keyName,
																collection[keyName as keyof typeof collection]
															)
														)

														flaggedError[keyName as keyof typeof collection] =
															true
													}
												})
											})
										} else {
											// todo login staff with session

											router.replace(
												`/admin/dashboard?reg=${res.registration_no}&user=${res.email}`,
												`/admin/dashboard`
											)
										}

										Object.keys(flaggedError).map(keyName => {
											if (
												flaggedError[keyName as keyof typeof collection] ==
												false
											)
												$("#" + keyName + "Err").text("")
										})
									})
									.catch(error => {
										console.error(error)
									})
							}}
						>
							Login
						</button>
						<small className="text-secondary mt-2">* - required</small>
						<div className="text-secondary mt-2 text-center">
							<small>
								Need an account?
								<Link href={Links.Admin.signup}>
									<a className="text-decoration-none fw-bold">
										&nbsp;Sign Up&nbsp;
									</a>
								</Link>
								<strong>|</strong>
								<Link href={Links.App.recover + "?account=staff"}>
									<a className="text-decoration-none fw-bold">
										&nbsp;Forgot Password?
									</a>
								</Link>
							</small>
						</div>
					</form>
				</div>
			</main>
		</>
	)
}

export default Login
