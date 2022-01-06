import Link from "next/link"
import router, { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import $ from "jquery"
import { Links } from "@app"
import { prisma } from "@functionalities/DB/prismaInstance"
import { UserContext } from "@contexts/user"
import { user } from "@prisma/client"

export interface AppNavbarProps {}

const AppNavbar: React.FC<AppNavbarProps> = () => {
	const isRouteHome = () => {
			return router.asPath == "/"
		},
		{ userContext, setUserContext } = useContext(UserContext)

	useEffect(function onEveryMount() {
		// adds active class to nav on every page change
		$("nav > div > div > ul")
			.children("li")
			.map((index, element) => {
				if (
					$(element).children("a").attr("href") === window.location.pathname &&
					!$(element).children("a").hasClass("active")
				) {
					$(element).children("a").addClass("active")
				} else {
					if (
						$(element).children("a").attr("href") !==
							window.location.pathname &&
						$(element).children("a").hasClass("active")
					) {
						$(element).children("a").removeClass("active")
					}
				}
			})

		// closes nav menu on click inside
		$("#nav-div .nav-item, #nav-div > .nav-item a")
			.children()
			.on("click", () => {
				$("#nav-div").hasClass("show")
				$("#nav-div").removeClass("show")
			})
	})

	return (
		<>
			<nav className="navbar navbar-expand-xl navbar-light bg-light shadow sticky-top mb-3 justify-content-center bg-faded">
				<div className="container">
					<Link href="/">
						<a className="navbar-brand">Quick Hospitalization</a>
					</Link>

					<button
						className="navbar-toggler ms-auto d-print-none"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#nav-div"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse text-center" id="nav-div">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<Link href={Links.App.home}>
									<a className="nav-link">Home</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href={Links.App.doctor}>
									<a className="nav-link">Doctors</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href={Links.App.booking}>
									<a className="nav-link">Booking</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href={Links.App.appointment}>
									<a className="nav-link">Appointment</a>
								</Link>
							</li>
							<li className="nav-item">
								<Link href={Links.App.about}>
									<a className="nav-link">About</a>
								</Link>
							</li>
						</ul>

						{useRouter().pathname == Links.App.login ||
						useRouter().pathname == Links.App.signup ? null : userContext ? (
							<div
								className="nav-item d-inline dropdown"
								style={{ cursor: "pointer" }}
							>
								<span
									className="me-2 font-monospace dropdown-toggle"
									data-bs-toggle="dropdown"
								>
									{(userContext as user).name}
								</span>
								<div className="dropdown-menu pb-0">
									<Link href={Links.App.User.account}>
										<span className="dropdown-item">Profile</span>
									</Link>
									<Link href={Links.App.User.appointments}>
										<span className="dropdown-item">My Appointments</span>
									</Link>
									<Link href={Links.App.User.bookings}>
										<span className="dropdown-item mb-2">My Bookings</span>
									</Link>
									<span
										className="dropdown-item border-top"
										onClick={() => {
											// logout fn
											setUserContext(null)
										}}
									>
										Logout
									</span>
								</div>
							</div>
						) : (
							<div className="nav-item d-inline">
								<Link href={Links.App.login}>
									<a className="text-decoration-none ps-2 pe-1 py-2">
										<small>Login</small>
									</a>
								</Link>
								<strong>|</strong>
								<Link href={Links.App.signup}>
									<a className="text-decoration-none ps-1 pe-2 py-2">
										<small>Sign Up</small>
									</a>
								</Link>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	)
}

export default AppNavbar
