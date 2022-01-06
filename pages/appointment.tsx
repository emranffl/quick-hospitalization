import Head from "next/head"
import { prisma } from "@functionalities/DB/prismaInstance"
import {
	address,
	appointment,
	appointment_for,
	appointment_sex,
	doctor,
	schedule,
} from "@prisma/client"
import Image from "next/image"
import React, { useState, useEffect, useContext } from "react"
import Link from "next/link"
import $ from "jquery"
import { Days, Links, Sex } from "@app"
import Loader from "@components/Loader"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { appointmentIncludeParam } from "@api/fetchappointment"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { UserContext } from "@contexts/user"
import router from "next/router"

export const getServerSideProps = async ({ query }: any) => {
	if (query.id == null || query.id == undefined)
		return { props: { retrievedData: null } }

	let retrievedData: appointment | null | any =
		await prisma.appointment.findUnique({
			where: { id: query.id },
			include: appointmentIncludeParam,
		})

	return {
		props: {
			retrievedData: JSON.stringify(mutateContactNumber(retrievedData)),
		},
	}
}

interface Doctor extends doctor {
	schedule: schedule[]
}

interface AppointmentInfo extends appointment {
	doctor: Doctor
	hospital: {
		address: address
		hospital_name: string
	}
}

export interface AppointmentProps {
	retrievedData: string
}

const Doctor: React.FC<AppointmentProps> = ({ retrievedData }) => {
	const [appointmentInfo, setAppointmentInfo] =
			useState<AppointmentInfo | null>(JSON.parse(retrievedData)),
		[appointmentIsInvalid, setAppointmentIsInvalid] = useState(false),
		[loading, setLoading] = useState(false),
		// edit mode
		[editMode, setEditMode] = useState(false),
		[appointmentForSelf, setAppointmentForSelf] = useState(
			appointmentInfo?.for == "Self"
		),
		// schedule and date time
		[selectedSchedule, setSelectedSchedule] = useState(0),
		getSelectableDates = () => {
			let date = new Date(),
				month = 12 - (new Date().getMonth() + 1),
				days = [],
				day: any

			appointmentInfo
				? (day = Object.values(
						Days[
							appointmentInfo?.doctor.schedule[selectedSchedule]
								.day as keyof typeof Days
						]
				  )[0])
				: (day = 0)

			// Get the first day in the month
			while (date.getDay() != day) date.setDate(date.getDate() + 1)

			// Get all the other days in the month
			while (date.getMonth() != month) {
				days.push(new Date(date.getTime()))
				date.setDate(date.getDate() + 7)
			}

			return days
		},
		getSelectableTime = (
			startTime: any = appointmentInfo?.doctor.schedule[selectedSchedule]
				.start_time,
			endTime: any = appointmentInfo?.doctor.schedule[selectedSchedule]
				.end_time,
			step: number = 15
		) => {
			const selectableTimeArray = []
			startTime = new Date(startTime)
			endTime = new Date(endTime)

			while (startTime.getTime() <= endTime.getTime() - step * 60) {
				let time = startTime.getTime()
				selectableTimeArray.push(new Date(time))
				startTime.setMinutes(startTime.getMinutes() + step)
			}
			return selectableTimeArray
		},
		[selectableDays, setSelectableDays] = useState(getSelectableDates()),
		[selectableTime, setSelectableTime] = useState(getSelectableTime()),
		[selectedDateTime, setSelectedDateTime] = useState<Date | null | undefined>(
			appointmentInfo ? new Date(appointmentInfo.time) : null
		),
		{ userContext } = useContext(UserContext)

	useEffect(() => {
		if (!userContext) {
			router.push(
				`${Links.App.login}?redirect=${router.asPath}`,
				Links.App.login
			)
			return
		}
		if (editMode) return setSelectedDateTime(appointmentInfo?.time)

		setSelectableDays(getSelectableDates())
		setSelectableTime(getSelectableTime())
	}, [selectedSchedule, editMode, userContext])

	console.log(appointmentInfo)

	return (
		<>
			<Head>
				<title>Appointment | Quick Hospitalization</title>
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
								defaultValue={appointmentInfo ? appointmentInfo.id : ""}
								onKeyUp={async e => {
									if (e.key !== "Enter") return

									setLoading(true)

									await fetch("/api/fetchappointment", {
										method: "GET",
										headers: {
											"content-type": "application/json",
											"x-appointment-id": (e.target as HTMLInputElement).value,
										},
									})
										.then(response => response.json())
										.then(res => {
											setLoading(false)
											setAppointmentInfo(res.appointment as AppointmentInfo)
											setEditMode(false)

											if (!res.appointment) setAppointmentIsInvalid(true)
											else setAppointmentIsInvalid(false)
										})

										.catch(err => console.error(err))

									setLoading(false)
								}}
							/>
							<label htmlFor="id">Appointment ID</label>
						</div>
					</fieldset>
					{appointmentInfo ? (
						<fieldset>
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
													`?id=${appointmentInfo.id}&amp;size=200x200`
													// "&amp;size=200x200"
												}
												alt="appointment qr code"
												layout="fill"
												priority
											/>
										) : null}
									</div>
									<p
										className="m-3 px-2 d-grid"
										style={{ overflowWrap: "break-word" }}
									>
										To verify this appointment please visit&nbsp;
										<span className="font-monospace">
											www.quickhospitalization.org/appointment
										</span>
										&nbsp;or&nbsp;
										<strong>scan the QR code.</strong>
									</p>
								</div>
								<div className="col-12 col-lg-7 h-auto  card rounded-0 px-0 d-flex flex-column justify-content-center">
									<div className="card-header h5 text-center">
										Appointment Info
									</div>
									<div className="card-body">
										<div className="row mx-0 row-cols-1 row-cols-sm-2 border border-primary rounded">
											<div className="col px-2 py-1">
												<small className="text-secondary">ID:&nbsp;</small>
												<span className="font-monospace">
													{appointmentInfo.id}
												</span>
											</div>
											<div className="col px-2 py-1">
												<small className="text-secondary">Status:&nbsp;</small>
												<span className="fst-italic">
													{appointmentInfo.status}
												</span>
											</div>
											{editMode ? (
												<div className="col px-2 py-1">
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
																	$("#patientSex").val(appointmentInfo.sex)
																	$("#patientName").val(userContext.name)
																} else setAppointmentForSelf(false)
															}}
															defaultValue={appointmentInfo.for as string}
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
												</div>
											) : appointmentInfo.for != appointment_for.Self ? (
												<div className="col px-2 py-1">
													<small className="text-secondary">
														Appointment For:&nbsp;
													</small>
													<span className="">{appointmentInfo.for}</span>
												</div>
											) : null}
											{editMode ? (
												<div className="col px-2 py-1">
													<div className="form-floating">
														<input
															type="text"
															className="form-control"
															id="patientName"
															placeholder="Patient's Name"
															defaultValue={appointmentInfo.name}
															disabled={appointmentForSelf ? true : false}
															readOnly={appointmentForSelf ? true : false}
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
													<span className="fw-bold">
														{appointmentInfo.name}
													</span>
												</div>
											)}
											{editMode ? (
												<div className="col px-2 py-1">
													<div className="form-floating">
														<select
															className="form-select"
															id="patientSex"
															defaultValue={
																appointmentForSelf
																	? userContext.sex
																	: appointmentInfo.sex
															}
															disabled={appointmentForSelf ? true : false}
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
													<span className="">{Sex[appointmentInfo.sex]}</span>
												</div>
											)}
											<div className="col px-2 py-1">
												<small className="text-secondary">Mobile:&nbsp;</small>
												<span className="">
													{appointmentInfo.user_mobile_no}
												</span>
											</div>
											{editMode ? (
												<>
													<div className="col-12 px-2 py-1">
														<label
															htmlFor="doctorSchedule"
															className="text-secondary"
														>
															Schedule
														</label>
														<div
															className="btn-group d-block animate__animated animate__fadeIn animate__zoomIn "
															id="doctorSchedule"
															role="group"
														>
															{appointmentInfo?.doctor.schedule.map(
																(elem, index) => {
																	return (
																		<React.Fragment key={index}>
																			<input
																				type="radio"
																				className="btn-check"
																				name="btnScheduleRadio"
																				id={"schedule" + index}
																				autoComplete="off"
																				defaultChecked={
																					Object.keys(
																						Days[elem.day as keyof typeof Days]
																					)[0].includes(
																						new Date(appointmentInfo.time)
																							.toString()
																							.substring(0, 3)
																					)
																						? true
																						: false
																				}
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
																				}}
																			>
																				<span className="d-block text-center">
																					{Object.keys(
																						Days[elem.day as keyof typeof Days]
																					)}
																				</span>
																				{/* <div>
																				{Object.keys(
																					Days[elem.day as keyof typeof Days]
																				)[0].includes(
																					new Date(appointmentInfo.time)
																						.toString()
																						.substring(0, 3)
																				)
																					? "true"
																					: "false"}
																			</div> */}
																				<small className="d-inline">
																					{new Date(
																						elem.start_time
																					).toLocaleTimeString([], {
																						timeStyle: "short",
																					})}
																				</small>
																				{" - "}
																				<small className="d-inline">
																					{new Date(
																						elem.end_time
																					).toLocaleTimeString([], {
																						timeStyle: "short",
																					})}
																				</small>
																			</label>
																		</React.Fragment>
																	)
																}
															)}
														</div>
													</div>
													<div className="col-12 px-2 py-1">
														<label
															htmlFor="dateTime"
															className="text-secondary d-block"
														>
															Date &amp; Time
														</label>
														{selectedSchedule != -1 ? (
															<DatePicker
																className="form-control"
																id="dateTime"
																placeholderText="Select date and time"
																autoComplete="off"
																onChange={(date: Date) =>
																	setSelectedDateTime(date)
																}
																selected={selectedDateTime}
																dateFormat="dd-MM-yyyy | p"
																showTimeSelect
																includeTimes={selectableTime}
																// minTime={
																// 	new Date(doctor.schedule[selectedSchedule].start_time)
																// }
																// maxTime={
																// 	new Date(doctor.schedule[selectedSchedule].end_time)
																// }
																timeIntervals={15}
																useWeekdaysShort
																calendarStartDay={6}
																includeDates={selectableDays}
																wrapperClassName="clamp-mw-50"
																required
															/>
														) : null}
													</div>
												</>
											) : (
												<div className="col px-2 py-1">
													<small className="text-secondary">Date:&nbsp;</small>
													<span className="fw-bold">
														{(() => {
															let date = new Date(appointmentInfo.time)
																	.toLocaleString("en-GB")
																	.replace(/\//g, "-"),
																time = new Date(
																	appointmentInfo.time
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
											)}
										</div>
										<div className="row mx-0 row-cols-1 row-cols-sm-2 border border-secondary rounded mt-2">
											<div className="col px-2 py-1">
												<small className="text-secondary">
													Doctor Name:&nbsp;
												</small>
												<span className="">
													<Link
														href={`/doctor/${appointmentInfo.doctor.email}`}
													>
														<a className="text-decoration-none">
															{appointmentInfo.doctor.name}
														</a>
													</Link>
												</span>
											</div>
											<div className="col px-2 py-1">
												<small className="text-secondary">
													Specification:&nbsp;
												</small>
												<span className="fw-bold">
													{appointmentInfo.doctor.specialization}
												</span>
											</div>
											<div className="col px-2 py-1">
												<small className="text-secondary">
													Department:&nbsp;
												</small>
												<span className="fw-bold">
													{appointmentInfo.doctor.department.replace(/_/g, " ")}
												</span>
											</div>
											{appointmentInfo.doctor.chamber ? (
												<div className="col px-2 py-1">
													<small className="text-secondary">
														Chamber:&nbsp;
													</small>
													<span className="fw-bold">
														{appointmentInfo.doctor.chamber}
													</span>
												</div>
											) : null}
										</div>
										<div className="row mx-0 row-cols-1 border border-info rounded mt-2">
											<div className="col px-2 py-1">
												<small className="text-secondary">
													Hospital Name:&nbsp;
												</small>
												<span className="">
													<Link
														href={`/${appointmentInfo.doctor.registration_no}`}
													>
														<a target="_blank" className="text-decoration-none">
															{appointmentInfo.hospital.hospital_name}
														</a>
													</Link>
												</span>
											</div>
											<div className="col px-2 py-1">
												<small className="text-secondary">Address:&nbsp;</small>
												<span className="fw-bold">
													{`${appointmentInfo.hospital.address.street_address}, ${appointmentInfo.hospital.address.district}, ${appointmentInfo.hospital.address.division}`}
												</span>
											</div>
										</div>
										{appointmentInfo.remarks ? (
											<div className="border border-warning rounded mt-2 px-2 py-1">
												<small className="text-secondary">Remarks:&nbsp;</small>
												<span className="">{appointmentInfo.remarks}</span>
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
											{appointmentInfo.status == "Requested" ||
											appointmentInfo.status == "Confirmed" ? (
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
						</fieldset>
					) : null}
				</form>
				{appointmentIsInvalid ? (
					<div className="text-center text-danger font-monospace m-4">
						Invalid appointment ID
					</div>
				) : null}
			</main>
		</>
	)
}

export default Doctor
