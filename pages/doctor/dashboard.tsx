import { Links, Sex } from "@app"
import Loader from "@components/Loader"
import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { appointment, appointment_status, doctor } from "@prisma/client"
import Head from "next/head"
import router from "next/router"
import React from "react"
import { useState } from "react"

export const getServerSideProps = async ({ query }: any) => {
	// redirect upon error
	if (query.doctor == "" || query.doctor == undefined)
		return {
			redirect: {
				destination: Links.Doctor.login,
				permanent: false,
			},
		}

	const retrievedData: any = await prisma.doctor.findUnique({
		where: {
			email: query.doctor,
		},
		include: {
			hospital: {
				select: {
					hospital_name: true,
				},
			},
			appointment: {
				orderBy: {
					status: "asc",
				},
			},
		},
	})

	return {
		props: {
			retrievedData: JSON.stringify(mutateContactNumber(retrievedData)),
		},
	}
}

interface DoctorInfo extends doctor {
	hospital: {
		hospital_name: string
	}
	appointment?: appointment[]
}

interface DashboardProps {
	retrievedData: string
}

const Dashboard: React.FC<DashboardProps> = ({ retrievedData }) => {
	const [doctor, setDoctor] = useState<DoctorInfo>(JSON.parse(retrievedData)),
		[loading, setLoading] = useState(false),
		//* appointment block
		manageAppointment = async (id: string, status: appointment_status) => {
			await fetch("/api/managedoctorappointment", {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id,
					status,
					email: doctor.email
				}),
			})
				.then(response => response.json())
				.then(res => {
					// console.log(res)

					setDoctor(res)
				})
				.catch(err => console.error(err))
		}

	return (
		<>
			<Head>
				<title>Dashboard | Doctor Panel</title>
			</Head>

			<section
				className="modal fade"
				id="logoutModal"
				data-bs-backdrop="static"
				data-bs-keyboard="true"
				aria-labelledby="logoutModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body">
							<p>Are you sure you want to logout?</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => {
									// todo handle routing with session

									router.replace(Links.Doctor.login)
								}}
							>
								Yes
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
							>
								No
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* <!-- Modal --> */}

			<main className="dashboard">
				{loading ? <Loader /> : null}
				<div
					className="offcanvas offcanvas-start p-0"
					tabIndex={-1}
					id="offcanvasStart"
					style={{ width: "260px" }}
				>
					<div className="offcanvas-body p-0 bg-dark d-flex flex-column">
						<div className="mt-2 text-white text-center h3">Doctor Panel</div>
						<div className="my-auto" id="offcanvasStartContent">
							<ul
								className="nav nav-tabs flex-column border-0 w-100 bg-light"
								role="tablist"
							>
								<li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft"
										href="#dashboard"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "100ms" }}
										// onClick={e => {
										// 	$("#offcanvasStart").removeClass("show")
										// }}
									>
										<i className="bi bi-house-door-fill h4 me-2 my-auto"></i>
										Dashboard
									</a>
								</li>
								<li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft active"
										href="#appointments"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "200ms" }}
									>
										<i className="bi bi-calendar-week-fill h4 me-2 my-auto"></i>
										Appointments
									</a>
								</li>
								<li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft"
										href="#schedule"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "400ms" }}
									>
										<i className="bi bi-person-bounding-box h4 my-auto"></i>
										<i
											className="bi bi-calendar2-week h5 me-2 mb-n3"
											style={{ zIndex: -1, marginLeft: "-7px" }}
										></i>
										Schedule
									</a>
								</li>
								<li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft"
										href="#activity"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "550ms" }}
									>
										<i className="bi bi-archive-fill h4 me-2 my-auto"></i>
										Activity
									</a>
								</li>
								<li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft"
										href="#settings"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "500ms" }}
									>
										<i className="bi bi-gear-fill h4 me-2 my-auto"></i>
										Settings
									</a>
								</li>
							</ul>
						</div>
						<div className="text-white">
							<hr className="my-0" />
							<div className="m-1 d-flex justify-content-center">
								<small>
									<a
										className="text-decoration-none hvr-float"
										href={Links.App.about}
										target="_blank"
									>
										About
									</a>
								</small>
								<span>&nbsp;&bull;&nbsp;</span>
								<small>
									<a
										className="text-decoration-none hvr-float"
										href={Links.App.contact}
										target="_blank"
									>
										Contact
									</a>
								</small>
								<span>&nbsp;&bull;&nbsp;</span>
								<small>
									<a
										className="text-decoration-none hvr-float"
										href={Links.App.privacy}
										target="_blank"
									>
										Privacy
									</a>
								</small>
								<span>&nbsp;&bull;&nbsp;</span>
								<small>
									<a
										className="text-decoration-none hvr-float"
										href={Links.App.terms}
										target="_blank"
									>
										Terms
									</a>
								</small>
							</div>
						</div>
					</div>
				</div>
				<section className="ms-sm-auto px-0">
					<nav className="navbar navbar-secondary bg-light sticky-top pt-3 pb-2 mb-3 border-bottom animate__animated animate__fadeInDown">
						<div className="container px-0 d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap">
							<div className="d-flex align-items-center">
								<i
									className="bi bi-three-dots navbar-toggler d-inline-block h6 my-auto"
									style={{ fontSize: "1.6rem" }}
									data-bs-toggle="offcanvas"
									data-bs-target="#offcanvasStart"
								></i>
								<h6 className="navbar-brand fw-light text-wrap d-inline-block m-0 p-0">
									{doctor.hospital.hospital_name} | Doctor Panel
								</h6>
							</div>
							<div className="mx-auto mx-md-0 mt-3 mt-md-0 ps-2">
								<small className="">{doctor.name}</small>
								&nbsp;|&nbsp;
								<small
									className="text-primary"
									data-bs-toggle="modal"
									data-bs-target="#logoutModal"
								>
									Logout
								</small>
							</div>
						</div>
					</nav>

					<div className="tab-content" id="nav-tabContent">
						<div className="tab-pane fade" id="dashboard" role="tabpanel">
							Please design me, from dashboard
						</div>
						<div
							className="tab-pane fade container show active"
							id="appointments"
							role="tabpanel"
						>
							{/* <pre>{JSON.stringify(doctor?.appointment?.[0], null, 2)}</pre> */}

							<table className="table table-sm table-hover">
								<thead className="table-dark">
									<tr className="text-center">
										<th>ID</th>
										<th>Mobile</th>
										<th>Name</th>
										<th>Time</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{doctor?.appointment?.map((appointmentTuple, ind) => {
										return (
											<tr
												className={
													appointmentTuple.status == "Requested"
														? "table-active"
														: undefined
												}
												key={ind}
											>
												{Object.keys(appointmentTuple)
													.filter(
														el =>
															![
																"doctor_id",
																"cancelled_at",
																"cancelled_by",
																"sex",
																"for",
																"registration_no",
																"last_updated",
																"remarks",
															].includes(el)
													)
													.map((key, index) => {
														if (key == "id")
															return (
																<React.Fragment key={index}>
																	<td className="d-flex justify-content-between">
																		<span className="font-monospace">
																			{
																				appointmentTuple[
																					key as keyof typeof appointmentTuple
																				]
																			}
																		</span>
																		<small
																			className="text-primary pe-1"
																			style={{ cursor: "pointer" }}
																			data-bs-toggle="modal"
																			data-bs-target={"#modal" + ind}
																		>
																			Details
																		</small>
																		<section
																			className="modal fade"
																			id={"modal" + ind}
																			tabIndex={-1}
																		>
																			<div className="modal-dialog modal-dialog-centered">
																				<div className="modal-content">
																					<div className="modal-header py-1">
																						<h5 className="modal-title">
																							Appointment Details
																						</h5>
																						<button
																							type="button"
																							className="btn-close"
																							data-bs-dismiss="modal"
																							aria-label="Close"
																						></button>
																					</div>
																					<div className="modal-body">
																						<pre>
																							{JSON.stringify(
																								appointmentTuple,
																								null,
																								2
																							)}
																						</pre>
																					</div>
																					<div className="modal-footer py-1">
																						<button
																							type="button"
																							className="btn btn-sm btn-primary"
																							data-bs-dismiss="modal"
																							onClick={() =>
																								manageAppointment(
																									appointmentTuple.id,
																									"Confirmed"
																								)
																							}
																						>
																							Confirm
																						</button>
																						<button
																							type="button"
																							className="btn btn-sm btn-danger"
																							data-bs-dismiss="modal"
																							onClick={() =>
																								manageAppointment(
																									appointmentTuple.id,
																									"Cancelled"
																								)
																							}
																						>
																							Cancel
																						</button>
																					</div>
																				</div>
																			</div>
																		</section>
																	</td>
																</React.Fragment>
															)
														else if (key == "time")
															return (
																<td key={index}>
																	{new Date(
																		appointmentTuple[
																			key as keyof typeof appointmentTuple
																		] as string
																	).toUTCString()}
																</td>
															)
														else
															return (
																<td key={index}>
																	{
																		appointmentTuple[
																			key as keyof typeof appointmentTuple
																		]
																	}
																</td>
															)
													})}
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
						<div className="tab-pane fade" id="schedule" role="tabpanel">
							Please design me, from schedule
						</div>
						<div className="tab-pane fade" id="activity" role="tabpanel">
							Please design me, from activity
						</div>
						<div className="tab-pane fade" id="settings" role="tabpanel">
							Please design me, from activity, from settings
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default Dashboard
