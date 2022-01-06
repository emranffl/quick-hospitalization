import { prisma } from "@functionalities/DB/prismaInstance"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { address, appointment_sex, booking } from "@prisma/client"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { Links, Sex } from "@app"
import Loader from "@components/Loader"
import { bookingIncludeParam } from "@api/fetchbooking"
import router from "next/router"
import { UserContext } from "@contexts/user"

export const getServerSideProps = async ({ query }: any) => {
	if (query.id == null || query.id == undefined)
		return { props: { retrievedData: null } }

	let retrievedData: booking | null | any = await prisma.booking.findUnique({
		where: { id: query.id },
		include: bookingIncludeParam,
	})

	return {
		props: { retrievedData: JSON.stringify(mutateContactNumber(retrievedData)) },
	}
}

interface BookingInfo extends booking {
	hospital: {
		address: address
		hospital_name: string
		registration_no: string
	}
}

export interface BookingProps {
	retrievedData: string
}

const Booking: React.FC<BookingProps> = ({ retrievedData }) => {
	const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(
			JSON.parse(retrievedData)
		),
		[bookingIsInvalid, setBookingIsInvalid] = useState(false),
		[loading, setLoading] = useState(false),
		// edit mode
		[editMode, setEditMode] = useState(false),
		{ userContext } = useContext(UserContext)

	useEffect(() => {
		if (!userContext) {
			router.push(
				`${Links.App.login}?redirect=${router.asPath}`,
				Links.App.login
			)
			return
		}
	}, [userContext])

	console.log(bookingInfo)

	return (
		<>
			<Head>
				<title>Booking | Quick Hospitalization</title>
			</Head>
			{loading ? <Loader /> : null}
			<main className="container">
				<form
					className=""
					onSubmit={e => {
						e.stopPropagation()
						e.preventDefault()
					}}
				>
					<fieldset>
						<div className="form-floating d-print-none">
							<input
								type="search"
								className="form-control"
								id="floatingInput"
								placeholder="a67*D9f8*5"
								defaultValue={bookingInfo ? bookingInfo.id : ""}
								onKeyUp={async e => {
									if (e.key !== "Enter") return

									setLoading(true)

									await fetch("/api/fetchbooking", {
										method: "GET",
										headers: {
											"content-type": "application/json",
											"x-booking-id": (e.target as HTMLInputElement).value,
										},
									})
										.then(response => response.json())
										.then(res => {
											setLoading(false)
											setBookingInfo(res.appointment as BookingInfo)
											setEditMode(false)

											if (!res.appointment) setBookingIsInvalid(true)
											else setBookingIsInvalid(false)
										})

										.catch(err => console.error(err))

									setLoading(false)
								}}
							/>
							<label htmlFor="id">Booking ID</label>
						</div>
					</fieldset>
					{bookingInfo ? (
						<fieldset>
							<div className="">
								<div className="row mx-0 bg-light mt-4">
									<div className="col-12 col-lg-5 d-flex flex-column justify-content-center align-items-center mt-3 mt-lg-0">
										<div
											className="position-relative mt-3"
											style={{ width: "200px", height: "200px" }}
										>
											{typeof window != "undefined" ? (
												<Image
													className="m-auto"
													src={
														"https://api.qrserver.com/v1/create-qr-code/?data=" +
														window.location.href +
														`?id=${bookingInfo.id}&amp;size=200x200`
														// "&amp;size=200x200"
													}
													alt="booking qr code"
													layout="fill"
													priority
												/>
											) : null}
										</div>
										<p
											className="m-3 px-2 d-grid"
											style={{ overflowWrap: "break-word" }}
										>
											To verify this booking please visit&nbsp;
											<span className="font-monospace">
												www.quickhospitalization.org/booking
											</span>
											&nbsp;or&nbsp;
											<strong>scan the QR code.</strong>
										</p>
									</div>
									<div className="col-12 col-lg-7 h-auto card rounded-0 px-0 d-flex flex-column justify-content-center">
										<div className="card-header h5 text-center">
											Booking Info
										</div>
										<div className="card-body">
											<div className="row mx-0 row-cols-1 row-cols-sm-2 border border-primary rounded">
												<div className="col px-2 py-1">
													<small className="text-secondary">ID:&nbsp;</small>
													<span className="font-monospace">
														{bookingInfo.id}
													</span>
												</div>
												<div className="col px-2 py-1">
													<small className="text-secondary">
														Status:&nbsp;
													</small>
													<span className="fst-italic">
														{bookingInfo.status}
													</span>
												</div>
												{editMode ? (
													<div className="col px-2 py-1">
														<div className="form-floating">
															<input
																type="text"
																className="form-control"
																id="patientName"
																placeholder="Patient's Name"
																defaultValue={bookingInfo.name as string}
																required
															/>
															<label htmlFor="patientName">Patient Name</label>
															<small className="ml-1 text-danger invalid-feedback"></small>
														</div>
													</div>
												) : (
													<div className="col px-2 py-1">
														<small className="text-secondary">
															Patient Name:&nbsp;
														</small>
														<span className="fw-bold">{bookingInfo.name}</span>
													</div>
												)}
												{editMode ? (
													<div className="col px-2 py-1">
														<div className="form-floating">
															<select
																className="form-select"
																id="patientSex"
																// defaultValue={
																// 	appointmentForSelf
																// 		? userContext.sex
																// 		: bookingInfo.sex
																// }
																// disabled={appointmentForSelf ? true : false}
																required
															>
																<option value="null" hidden>
																	Select Gender...
																</option>
																{Object.keys(appointment_sex).map(
																	(elem, index) => {
																		return (
																			<option key={index} value={elem}>
																				{Sex[elem as keyof typeof Sex]}
																			</option>
																		)
																	}
																)}
															</select>
															<label htmlFor="patientSex">Sex</label>
															<small className="ml-1 text-danger invalid-feedback"></small>
														</div>
													</div>
												) : (
													<div className="col px-2 py-1">
														<small className="text-secondary">Sex:&nbsp;</small>
														<span className="">{Sex[bookingInfo.sex]}</span>
													</div>
												)}
												<div className="col px-2 py-1">
													<small className="text-secondary">
														Mobile:&nbsp;
													</small>
													<span className="">{bookingInfo.user_mobile_no}</span>
												</div>

												<div className="col px-2 py-1">
													<small className="text-secondary">
														Booked At:&nbsp;
													</small>
													<span className="fw-bold">
														{(() => {
															let date = new Date(bookingInfo.booked_at)
																	.toLocaleString("en-GB")
																	.replace(/\//g, "-"),
																time = new Date(
																	bookingInfo.booked_at
																).toLocaleString("en-US")
															// return time
															return (
																date.substring(0, date.length - 10) +
																" | " +
																time.substring(
																	time.length - 11,
																	time.length - 6
																) +
																time.substring(time.length, time.length - 3)
															)
														})()}
													</span>
												</div>
											</div>
											<div className="row mx-0 row-cols-1 border border-info rounded mt-2">
												<div className="col px-2 py-1">
													<small className="text-secondary">
														Hospital Name:&nbsp;
													</small>
													<span className="">
														<Link
															href={`/${bookingInfo.hospital.registration_no}`}
														>
															<a
																target="_blank"
																className="text-decoration-none"
															>
																{bookingInfo.hospital.hospital_name}
															</a>
														</Link>
													</span>
												</div>
												<div className="col px-2 py-1">
													<small className="text-secondary">
														Address:&nbsp;
													</small>
													<span className="fw-bold">
														{`${bookingInfo.hospital.address.street_address}, ${bookingInfo.hospital.address.district}, ${bookingInfo.hospital.address.division}`}
													</span>
												</div>
											</div>
											{bookingInfo.remarks ? (
												<div className="border border-warning rounded mt-2 px-2 py-1">
													<small className="text-secondary">
														Remarks:&nbsp;
													</small>
													<span className="">{bookingInfo.remarks}</span>
												</div>
											) : null}
										</div>
										<div className="card-footer p-0">
											<div
												className="btn-group btn-group-sm d-flex align-items-center d-print-none"
												role="group"
												aria-label="Controls"
											>
												{!editMode ? (
													<button
														type="button"
														className="btn btn-primary"
														onClick={() => {
															window.print()
														}}
													>
														Print
													</button>
												) : null}
												{bookingInfo.status == "Requested" ||
												bookingInfo.status == "Booked" ? (
													<>
														<button
															type="button"
															className={
																editMode
																	? "btn btn-outline-primary"
																	: "btn btn-outline-dark"
															}
															onClick={() => {
																if (!editMode) return setEditMode(true)
															}}
														>
															{editMode ? "Save" : "Edit"}
														</button>
														<button
															type="button"
															className="btn btn-outline-danger"
															onClick={() => {
																if (editMode) return setEditMode(false)
															}}
														>
															Cancel
														</button>
													</>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</div>
						</fieldset>
					) : null}
				</form>
				{bookingIsInvalid ? (
					<div className="text-center text-danger font-monospace m-4">
						Invalid booking ID
					</div>
				) : null}
			</main>
		</>
	)
}

export default Booking
