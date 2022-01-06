import Head from "next/head"
import Link from "next/link"
import { Links } from "@app"
import $ from "jquery"
import { UserContext } from "@contexts/user"
import { useContext, useEffect } from "react"
import router from "next/router"

export interface UserLoginProps {}

const UserLogin: React.FC<UserLoginProps> = () => {
	const { setUserContext } = useContext(UserContext)

	return (
		<>
			<Head>
				<title>Login | Quick Hospitalization</title>
			</Head>
			<div className="card m-auto shadow-lg" style={{ maxWidth: "330px" }}>
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
								Mobile *
							</label>
							<input
								type="tel"
								className="form-control"
								style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
								placeholder="E.g.: 01*********"
								onInput={e =>
									((e.target as HTMLInputElement).value = (
										e.target as HTMLInputElement
									).value.slice(0, 11))
								}
								required
								id="mobile"
							/>
							<small id="mobileErr" className="form-text text-danger"></small>
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
									mobile_no: $("#mobile").val(),
									password: $("#password").val(),
								}

								await fetch("/api/userlogin", {
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
											mobile: false,
											password: false,
										}

										if (res.user != undefined) {
											$("#mobileErr").text(res.user)
											flaggedError.mobile = true
										} else if (res.pass != undefined) {
											$("#passwordErr").text(res.password)
											flaggedError.password = true
										} else {
											// * login
											console.log(res)

											setUserContext(res)

											router.query.redirect
												? router.replace(router.query.redirect as string)
												: router.replace(Links.App.home)
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
								<Link href={Links.App.signup}>
									<a className="text-decoration-none fw-bold">
										&nbsp;Sign Up&nbsp;
									</a>
								</Link>
								<strong>|</strong>
								<Link href={Links.App.recover + "?account=user"}>
									<a className="text-decoration-none fw-bold">
										&nbsp;Forgot Password?
									</a>
								</Link>
							</small>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default UserLogin
