import { prisma } from "@functionalities/DB/prismaInstance"
import {
	address,
	appointment_for,
	appointment_sex,
	doctor,
	hospital,
	schedule,
	user,
} from "@prisma/client"
import Image from "next/image"
import Head from "next/head"
import React, { useState, useEffect, useContext } from "react"
import Link from "next/link"
import $ from "jquery"
import { Days, Links, Sex } from "@app"
import Loader from "@components/Loader"
import Crypto from "crypto"

import router from "next/router"
import { UserContext } from "@contexts/user"
declare var bootstrap: any

export const getServerSideProps = async ({ params }: any) => {
	let retrievedData: doctor | null | any = await prisma.doctor.findUnique({
		where: { email: params.doctor_email },
		select: {
			bio: true,
			chamber: true,
			specialization: true,
			department: true,
			email: true,
			id: true,
			image_source: true,
			joined_on: true,
			name: true,
			registration_no: true,
			sex: true,
			hospital: {
				select: {
					hospital_name: true,
					address: { select: { district: true } },
				},
			},
			schedule: true,
			_count: { select: { appointment: true } },
		},
	})

	if (retrievedData == null)
		return {
			redirect: {
				destination: "/404",
				permanent: false,
			},
		}

	return {
		props: {
			doctorInfo: JSON.stringify(retrievedData),
		},
	}
}

interface HospitalInfo extends hospital {
	address: address
}

interface DoctorInfo extends doctor {
	hospital: HospitalInfo
	schedule: schedule[] | []
	_count: { appointment: number }
}

export interface DoctorInfoProps {
	doctorInfo: string
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ doctorInfo }) => {
	const doctor: DoctorInfo = JSON.parse(doctorInfo),
		[loading, setLoading] = useState(false),
		// modal
		[selectedSchedule, setSelectedSchedule] = useState<number>(-1),
		getSelectableDates = () => {
			if (selectedSchedule != -1) {
				let date = new Date(),
					month = ((new Date().getMonth() + 1) % 12) + 1,
					days = [],
					day: any = Object.values(
						Days[doctor.schedule[selectedSchedule].day as keyof typeof Days]
					)[0]

				// Get the first day in the month
				while (date.getDay() != day) date.setDate(date.getDate() + 1)

				// Get all the other days in the month
				while (date.getMonth() != month) {
					days.push(new Date(date.getTime()))
					date.setDate(date.getDate() + 7)
				}

				return days
			}
		},
		getSelectableTime = (
			startTime: string | Date = doctor.schedule[selectedSchedule]?.start_time,
			endTime: string | Date = doctor.schedule[selectedSchedule]?.end_time,
			step: number = 30
		) => {
			if (selectedSchedule != -1) {
				const selectableTimeArray = []
				startTime = new Date(startTime)
				endTime = new Date(endTime)

				while (startTime.getTime() <= endTime.getTime() - step * 60) {
					let time = startTime.getTime()
					selectableTimeArray.push(new Date(time))
					startTime.setMinutes(startTime.getMinutes() + step)
				}
				return selectableTimeArray
			}
		},
		[selectableDays, setSelectableDays] = useState(
			doctor.schedule.length != 0 ? getSelectableDates?.() : undefined
		),
		[selectableTime, setSelectableTime] = useState(
			doctor.schedule.length != 0 ? getSelectableTime?.() : undefined
		),
		[selectedDateTime, setSelectedDateTime] = useState<Date | null>(null),
		[appointmentForSelf, setAppointmentForSelf] = useState(false),
		{ userContext } = useContext(UserContext),
		[userHasAppointment, setUserHasAppointment] = useState<boolean | null>(null)

	// console.log()

	useEffect(() => {
		if (doctor.schedule.length != 0) {
			setSelectableDays(getSelectableDates())
			setSelectableTime(getSelectableTime())
		}

		userContext
			? //* active appointment fetching
			  fetch("/api/getuserappointmentlist", {
					method: "GET",
					headers: {
						"content-type": "application/json",
						"x-user": userContext.mobile_no,
						"x-doctor": doctor.email,
					},
			  })
					.then(response => response.json())
					.then(res => setUserHasAppointment(res.length > 0))

					.catch(err => console.error(err))
			: //* to show appointment button for no user context
			  setUserHasAppointment(false)
	}, [selectedSchedule])

	return (
		<>
			<Head>
				<title>{doctor.name + " | Quick Hospitalization"}</title>
			</Head>
			{doctor.schedule.length != 0 &&
			userHasAppointment == false &&
			userContext ? (
				<section
					className="modal fade"
					id="appointmentModal"
					tabIndex={-1}
					data-bs-backdrop={false}
					data-bs-keyboard="false"
				>
					<div className="modal-dialog modal-dialog-centered modal-lg">
						<div
							className="modal-content"
							style={{
								backgroundColor: "rgba(256, 256, 256, 0.85)",
								backdropFilter: "blur(8px)",
							}}
						>
							<div className="modal-header py-1">
								<h5 className="modal-title">Appointment</h5>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<form
									className="appointment-form container"
									onSubmit={e => {
										e.stopPropagation()
										e.preventDefault()
									}}
								>
									<fieldset>
										<div className="row g-2">
											{/* <div className="col-lg">
													<div className="form-floating">
														<select
															className="form-select"
															id="appointmentFor"
															onInput={e => {
																if (
																	(e.target as HTMLSelectElement).value ==
																	appointment_for.Self
																) {
																	setAppointmentForSelf(true)
																	$("#patientName").val(userContext.name)
																	$("#patientSex").val(userContext.sex)
																} else {
																	setAppointmentForSelf(false)
																	$("#patientName").val("")
																	$("#patientSex").val("null")
																}
															}}
															required
														>
															{Object.keys(appointment_for).map(
																(elem, index) => {
																	return (
																		<option
																			key={index}
																			value={
																				appointment_for[
																					elem as keyof typeof appointment_for
																				]
																			}
																		>
																			{
																				appointment_for[
																					elem as keyof typeof appointment_for
																				]
																			}
																		</option>
																	)
																}
															)}
														</select>
														<label htmlFor="appointmentFor">
															Appointment For
														</label>
													</div>
												</div> */}
											<div className="col-lg-7">
												<div className="form-floating">
													<input
														type="text"
														className="form-control"
														id="patientName"
														placeholder="Patient's Name"
														defaultValue={
															appointmentForSelf ? userContext.name : ""
														}
														disabled={appointmentForSelf ? true : false}
														readOnly={appointmentForSelf ? true : false}
														required
													/>
													<label htmlFor="patientName">Patient Name</label>
													<small className="ml-1 text-danger invalid-feedback"></small>
												</div>
											</div>
											<div className="col-lg">
												<div className="form-floating">
													<select
														className="form-select"
														id="patientSex"
														// defaultValue={userContext.sex}
														disabled={appointmentForSelf ? true : false}
														required
													>
														<option value="null" hidden>
															Select Gender...
														</option>
														{Object.keys(appointment_sex).map((elem, index) => {
															return (
																<option key={index} value={elem}>
																	{Sex[elem as keyof typeof Sex]}
																</option>
															)
														})}
													</select>
													<label htmlFor="patientSex">Sex</label>
													<small className="ml-1 text-danger invalid-feedback"></small>
												</div>
											</div>
										</div>
										<label
											htmlFor="doctorSchedule"
											className="text-secondary mt-2"
										>
											Schedule
										</label>
										<div
											className="btn-group d-block animate__animated animate__fadeInUp"
											id="doctorSchedule"
											role="group"
										>
											{doctor.schedule.map((elem, index) => {
												return (
													<React.Fragment key={index}>
														<input
															type="radio"
															className="btn-check"
															name="btnScheduleRadio"
															id={"schedule" + index}
															autoComplete="off"
															defaultChecked={index == selectedSchedule}
														/>
														<label
															htmlFor={"schedule" + index}
															className={
																index % 2 == 0
																	? "btn btn-sm mx-0 my-1 rounded-0 btn-outline-secondary"
																	: "btn btn-sm mx-0 my-1 rounded-0 btn-outline-dark"
															}
															onClick={() => {
																setSelectedSchedule(index)
																setSelectedDateTime(null)

																if (
																	!$("#confirmAppointment").hasClass("disabled")
																)
																	$("#confirmAppointment").addClass("disabled")
															}}
														>
															<span className="d-block text-center">
																{Object.keys(
																	Days[elem.day as keyof typeof Days]
																)}
															</span>
															<small className="d-inline">
																{new Date(elem.start_time).toLocaleTimeString(
																	[],
																	{
																		timeStyle: "short",
																	}
																)}
															</small>
															{" - "}
															<small className="d-inline">
																{new Date(elem.end_time).toLocaleTimeString(
																	[],
																	{
																		timeStyle: "short",
																	}
																)}
															</small>
														</label>
													</React.Fragment>
												)
											})}
										</div>
										{selectableDays ? (
											<>
												<label
													htmlFor="dateSelection"
													className="text-secondary mt-2 d-block"
												>
													Select Date
												</label>
												<div
													className="my-2 d-flex flex-wrap gap-1 animate__animated animate__fadeInUp"
													id="dateSelection"
													role="group"
												>
													{selectableDays.map(
														(selectableDayDateTime, index) => {
															return (
																<React.Fragment key={index}>
																	<input
																		type="radio"
																		name="btnDateRadio"
																		className="btn-check"
																		id={"date" + index}
																	/>
																	<label
																		className={
																			index % 2 == 0
																				? "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-dark"
																				: "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-secondary"
																		}
																		htmlFor={"date" + index}
																		onClick={() => {
																			let dateTime = selectableDayDateTime

																			// if date is changed after time selected
																			// the datetime is adjusted
																			$("#timeSelection")
																				.children("input[type=radio]")
																				.is(":checked")
																				? $("#timeSelection")
																						.children("input[type=radio]")
																						.map((ind, timeBtn) => {
																							if ($(timeBtn).is(":checked")) {
																								dateTime = new Date(
																									dateTime.setHours(
																										new Date(
																											$(timeBtn).attr(
																												"data-time"
																											) as string
																										).getHours()
																									)
																								)
																								dateTime = new Date(
																									dateTime.setMinutes(
																										new Date(
																											$(timeBtn).attr(
																												"data-time"
																											) as string
																										).getMinutes()
																									)
																								)
																							}
																						})
																				: null

																			setSelectedDateTime(dateTime)
																		}}
																	>
																		{selectableDayDateTime
																			.toLocaleDateString("en-GB")
																			.replace(/\//g, "-")}
																	</label>
																</React.Fragment>
															)
														}
													)}
												</div>
											</>
										) : null}
										{selectedDateTime ? (
											<>
												<label
													htmlFor="timeSelection"
													className="text-secondary mt-2 d-block"
												>
													Select Time
												</label>
												<div
													className="my-1 d-flex flex-wrap gap-1 animate__animated animate__fadeInUp"
													id="timeSelection"
													role="group"
												>
													{selectableTime?.map((el, ind) => {
														let time = el.toLocaleTimeString("en-US")
														time =
															time.substring(0, time.length - 6) +
															time.substring(time.length - 3, time.length)

														return (
															<React.Fragment key={ind}>
																<input
																	type="radio"
																	name="btnTimeRadio"
																	className="btn-check"
																	id={"time" + ind}
																	data-time={el.toISOString()}
																/>
																<label
																	className={
																		ind % 2 == 0
																			? "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-secondary"
																			: "btn btn-sm shadow-sm border rounded-2 font-monospace btn-outline-dark"
																	}
																	htmlFor={"time" + ind}
																	onClick={() => {
																		let time

																		time = new Date(
																			(selectedDateTime as Date).setHours(
																				el.getHours()
																			)
																		)
																		time = new Date(
																			(selectedDateTime as Date).setMinutes(
																				el.getMinutes()
																			)
																		)

																		setSelectedDateTime(time)

																		$("#confirmAppointment").removeClass(
																			"disabled"
																		)
																	}}
																>
																	{time}
																</label>
															</React.Fragment>
														)
													})}
												</div>
											</>
										) : null}
									</fieldset>
								</form>
							</div>
							<div className="modal-footer py-1">
								<button
									type="button"
									className="btn btn-sm btn-primary disabled"
									id="confirmAppointment"
									onClick={async () => {
										setLoading(true)

										await fetch("/api/registerappointment", {
											method: "POST",
											body: JSON.stringify({
												id:
													"a" +
													Crypto.randomBytes(5)
														.toString("hex")
														.toUpperCase()
														.substring(0, 9),
												user_mobile_no: userContext.mobile_no,
												name: $("#patientName").val()?.toString().trim(),
												sex: $("#patientSex").val(),
												// for: $("#appointmentFor").val(),
												doctor_id: doctor.id,
												time: selectedDateTime,
												status: "Requested",
												registration_no: doctor.registration_no,
											}),
											headers: {
												"content-type": "application/json",
											},
										})
											.then(response => response.json())
											.then(res => {
												setLoading(false)
												router.push(`/appointment?id=${res.id}`, `/appointment`)
											})

											.catch(err => console.error(err))

										setLoading(false)
									}}
								>
									Confirm Appointment
								</button>
							</div>
						</div>
					</div>
				</section>
			) : null}
			{loading ? <Loader /> : null}
			<main className="container doctor">
				<div className="row flex-column-reverse flex-lg-row">
					<div className="col-12 col-lg-7 d-flex justify-content-start align-items-center info h-auto">
						<div className="ms-2 ms-sm-5 my-3 text-white">
							<span className="fw-light">
								<i className="bi bi-geo-alt m-0 h6"></i>&nbsp;
								<small className="font-monospace">
									{doctor.hospital.address.district}
								</small>
							</span>
							<h2 className="mt-3">
								{doctor.name}&nbsp;
								<span
									className="text-info"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title={
										doctor.sex == "M" || doctor.sex == "T" ? "Male" : "Female"
									}
								>
									<i
										className={
											doctor.sex == "M" || doctor.sex == "T"
												? "bi bi-gender-male m-0"
												: "bi bi-gender-female m-0"
										}
									></i>
								</span>
							</h2>
							<span className="d-block h6 fst-italic fw-light mb-4">
								{doctor.specialization}
							</span>
							<span className="d-block h5">
								Department:&nbsp;
								<small className="fst-italic fw-light">
									{doctor.department}
								</small>
							</span>
							<span className="d-block h5">
								Hospital:&nbsp;
								<Link href={Links.App.home + doctor.registration_no}>
									<a className="text-info" target="_blank">
										<small className="fst-italic fw-light">
											{doctor.hospital.hospital_name}
										</small>
									</a>
								</Link>
							</span>
							{doctor.chamber == null ? null : (
								<span className="d-block h5">
									Chamber:&nbsp;
									<small className="fst-italic fw-light">
										{doctor.chamber}
									</small>
								</span>
							)}
							{doctor.schedule.length != 0 && userHasAppointment != null ? (
								//* on data fetch
								!userHasAppointment ? (
									//* if there are no active appointments
									<>
										<span className="d-block h5 mt-2 ">
											Appointment Count:&nbsp;
											<small className="fst-italic fw-light">
												{doctor._count.appointment}
											</small>
										</span>
										<button
											className="btn btn-outline-light rounded-pill mt-3 fw-light animate__animated animate__fadeInUp"
											data-bs-toggle={userContext ? "modal" : null}
											data-bs-target={userContext ? "#appointmentModal" : null}
											onClick={() => {
												userContext
													? null
													: router.push(
															`${Links.App.login}?redirect=${router.asPath}`,
															Links.App.login
													  )
											}}
										>
											Make An Appointment
										</button>
									</>
								) : (
									//* if there are active appointments
									<Link href={Links.App.User.appointments}>
										<button className="btn btn-outline-light rounded-pill mt-3 fw-light animate__animated animate__fadeInUp">
											View Appointment
										</button>
									</Link>
								)
							) : //* on first mount
							null}
						</div>
					</div>
					<div className="col-12 col-lg-5 d-flex mt-3 mt-lg-0">
						<Image
							className="m-auto"
							src={
								doctor.sex == "M" || doctor.sex == "T"
									? "/media/doctor-profile-male.png"
									: "/media/doctor-profile-female.png"
							}
							alt={
								doctor.sex == "M" || doctor.sex == "T"
									? "doctor-profile-male - doctor image"
									: "doctor-profile-female - doctor image"
							}
							width={576}
							height={576}
							priority
						/>
					</div>
				</div>
				<div className="container-fluid my-5">
					<h3 className="">Bio</h3>
					<p className="fw-light">{doctor.bio ?? "Not Provided"}</p>
				</div>
			</main>
		</>
	)
}

export default DoctorInfo
