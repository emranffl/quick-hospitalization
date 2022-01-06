import Head from "next/head"
import Link from "next/link"
import { Links } from "@app"
import $ from "jquery"
import { DoctorContext } from "@contexts/doctor"
import { useContext, useEffect } from "react"
import router from "next/router"

export interface DoctorLoginProps {}

const DoctorLogin: React.FC<DoctorLoginProps> = () => {
	const { setDoctorContext } = useContext(DoctorContext)

	return (
		<>
			<Head>
				<title>Doctor Login | Quick Hospitalization</title>
			</Head>
			<main className="card m-auto shadow-lg" style={{ maxWidth: "330px" }}>
				<i className="bi bi-person mx-auto mt-5 mb-2 h3 text-success"></i>
				<h6 className="mx-auto">Login</h6>
				<div className="card-body">
					<form
						className="d-flex flex-column"
						onSubmit={event => {
							event.preventDefault()
							event.stopPropagation()
						}}
					>
						<div className="form-group">
							<label className="text-secondary" htmlFor="mobile">
								Email *
							</label>
							<input
								type="email"
								className="form-control"
								placeholder="E.g.: doctor@example.com"
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
						<div className="form-group mt-1">
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
							className="btn btn-sm btn-success mx-auto"
							onClick={async event => {
								const data = {
									email: $("#email").val(),
									password: $("#password").val(),
								}

								await fetch("/api/doctorlogin", {
									method: "POST",
									headers: new Headers({ "content-type": "application/json" }),
									body: JSON.stringify({
										data,
									}),
									redirect: "follow",
								})
									.then(response => response.json())
									.then(res => {
										console.log(res)
										let flaggedError = {
											email: false,
											password: false,
										}

										if (res.doctor != undefined) {
											$("#emailErr").text(res.doctor)
											flaggedError.email = true
										} else if (res.pass != undefined) {
											$("#passwordErr").text(res.pass)
											flaggedError.password = true
										} else {
											// * login

											setDoctorContext(res)

											router.replace(
												Links.Doctor.dashboard + `?doctor=${res.email}`,
												Links.Doctor.dashboard
											)
										}

										Object.keys(flaggedError).map(keyName => {
											if (
												flaggedError[keyName as keyof typeof flaggedError] ==
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
								<Link href={Links.Doctor.signup}>
									<a className="text-decoration-none fw-bold">
										&nbsp;Sign Up&nbsp;
									</a>
								</Link>
								<strong>|</strong>
								<Link href={Links.App.recover + "?account=doctor"}>
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

export default DoctorLogin
