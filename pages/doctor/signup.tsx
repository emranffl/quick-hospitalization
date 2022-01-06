import Head from "next/head"
import { useEffect, useState } from "react"
import $ from "jquery"
import { sendEmail, sendOTP } from "@functionalities/emailManager"
import { Toast } from "@functionalities/toast"
import Link from "next/link"
import { Days, Links, Sex } from "@app"
import { doctor_department, doctor_sex, schedule_day } from "@prisma/client"
import { usePreviousState } from "@functionalities/hooks/usePreviousState"
import router from "next/router"

interface SignupPrefetch {
	id: string
	hospital: {
		hospital_name: string
	}
}

interface DoctorSignupProps {}

const DoctorSignup: React.FC<DoctorSignupProps> = () => {
	//* step propagation block
	let [currentTab, setCurrentTab] = useState(0),
		fixStepIndicator = (n: number) => {
			let i,
				x = $(".step")
			for (i = 0; i < currentTab; i++) {
				$(x[i]).removeClass("bg-primary")
				$(x[i]).addClass("complete")
			}

			if (currentTab <= n) $(x[n]).addClass("bg-primary")
			else $(x[n]).removeClass("bg-primary")
		},
		showTab = (n: number) => {
			let x = $("fieldset")
			$(x[n]).removeClass("d-none")

			if (n >= 2) {
				$("#prevBtn").removeClass("d-none")
			} else $("#prevBtn").addClass("d-none")

			if (n == x.length - 1) $("#nextBtn").text("Sign UP")
			else if (n != 0) $("#nextBtn").text("Continue")

			fixStepIndicator(n)
		},
		nextPrev = (n: number) => {
			let x = $("fieldset")

			$(x[currentTab]).addClass("d-none")
			setCurrentTab((currentTab += n))
			if (currentTab >= x.length) {
				$("#title").addClass("d-none")
				$("#stepButtons").addClass("d-none")
				$("#stepIndicator").addClass("d-none")
				$("#successMessage").removeClass("d-none")
			}
			showTab(currentTab)
		},
		//* signup functionality block
		[OTP, setOTP] = useState<number | null>(null),
		[doctor, setDoctor] = useState<SignupPrefetch | null>(null),
		[scheduleCount, setScheduleCount] = useState(1),
		[selectedDays, setSelectedDays] = useState<any[]>([]),
		getSelectedDays = () => {
			return [
				...new Set([
					...$("#schedules")
						.find("input[name=day]")
						.map((ind, day) => {
							if ($(day).is(":checked")) return $(day).val()
						}),
				]),
			]
		},
		[daysToDisable, setDaysToDisable] = useState<any[]>([]),
		previousScheduleCount = usePreviousState(scheduleCount)

	useEffect(() => {
		setSelectedDays(getSelectedDays())
	}, [])

	useEffect(() => {
		// console.log(selectedDays)

		// setting selected days during backward propagation
		if (previousScheduleCount > scheduleCount)
			setSelectedDays(getSelectedDays())
	}, [selectedDays, scheduleCount])

	return (
		<>
			<Head>
				<title>Doctor Signup | Quick Hospitalization</title>
			</Head>
			<main>
				<div className="container my-5">
					<div className="row d-flex justify-content-center align-items-center">
						<div className="col-md-6">
							<form
								className="rounded p-4 p-lg-5 bg-light"
								onSubmit={e => {
									e.preventDefault()
									e.stopPropagation()
								}}
							>
								<h2 id="title">Doctor Sign Up</h2>
								<div
									className="d-flex gap-2 justify-content-center align-items-center my-5"
									id="stepIndicator"
								>
									<span className="step d-inline-block rounded bg-primary" />
									<span className="step d-inline-block rounded" />
									<span className="step d-inline-block rounded" />
								</div>
								<fieldset>
									<div className="form-floating">
										<input
											type="email"
											className="form-control"
											data-parent="doctor"
											id="email"
											placeholder="E.g.: example@domain.com"
										/>
										<label htmlFor="email">Work Email *</label>
									</div>
									<small className="text-danger" id="emailErr"></small>
									{OTP ? (
										<div className="d-non mt-3" id="otpBlock">
											<h6 className="text-center mt-4 mb-3">
												OTP has been sent to your email. Enter it here...
											</h6>
											<div className="d-flex justify-content-center">
												<input
													type="number"
													className="form-control"
													id="d1"
													onInput={e => {
														;(e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.substring(0, 1)

														$("#d2").trigger("focus")
													}}
												/>
												<input
													type="number"
													className="form-control"
													id="d2"
													onInput={e => {
														;(e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.substring(0, 1)

														$("#d3").trigger("focus")
													}}
												/>
												<input
													type="number"
													className="form-control"
													id="d3"
													onInput={e => {
														;(e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.substring(0, 1)

														$("#d4").trigger("focus")
													}}
												/>
												<input
													type="number"
													className="form-control"
													id="d4"
													onInput={e => {
														;(e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.substring(0, 1)

														// error message display with OTP validation
														if (
															OTP?.toString() !=
															((((((($("#d1").val() as string) +
																$("#d2").val()) as string) +
																$("#d3").val()) as string) +
																$("#d4").val()) as string)
														) {
															$("#otpErr").text("Invalid OTP!")
															$("#nextBtn").addClass("disabled")
														} else {
															$("#otpErr").text("")
															$("#nextBtn").removeClass("disabled")
														}
													}}
												/>
											</div>
											<small
												className="text-danger text-center d-block mt-2"
												id="otpErr"
											></small>
										</div>
									) : null}
								</fieldset>
								<fieldset className="d-none">
									<div className="form-floating mb-2">
										<input
											type="text"
											className="form-control disabled"
											id="id"
											placeholder="d123456789"
											defaultValue={doctor?.id}
											readOnly
										/>
										<label htmlFor="id">ID</label>
									</div>
									<div className="form-floating mb-2">
										<input
											type="text"
											className="form-control disabled"
											id="hospitalName"
											placeholder="United Hospital Ltd."
											defaultValue={doctor?.hospital.hospital_name}
											readOnly
										/>
										<label htmlFor="hospitalName">Hospital Name</label>
									</div>
									<div className="form-floating mb-2">
										<input
											type="text"
											className="form-control"
											id="name"
											placeholder="E.g.: Alice Milburn"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 50))
											}
											required
										/>
										<label htmlFor="name">Name *</label>
									</div>
									<small className="text-danger" id="nameErr"></small>
									<div className="form-floating mb-2">
										<select className="form-select" id="sex" required>
											<option hidden>Select Gender...</option>
											{Object.values(doctor_sex).map((el, index) => {
												return (
													<option key={index} value={el}>
														{Sex[el]}
													</option>
												)
											})}
										</select>
										<label htmlFor="sex">Sex *</label>
									</div>
									<small className="text-danger" id="sexErr"></small>
									<div className="form-floating mb-2">
										<select className="form-select" id="department" required>
											<option hidden>Select Department...</option>
											{Object.values(doctor_department).map((el, index) => {
												return (
													<option key={index} value={el}>
														{el.replace(/_/g, " ")}
													</option>
												)
											})}
										</select>
										<label htmlFor="department">Department *</label>
									</div>
									<small className="text-danger" id="departmentErr"></small>
									<div className="form-floating mb-2">
										<input
											type="text"
											className="form-control disabled"
											id="specialization"
											placeholder="E.g.: MSc, FCPS, MBBS"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 512))
											}
											required
										/>
										<label htmlFor="specialization">Specialization *</label>
									</div>
									<small className="text-danger" id="specializationErr"></small>
									<div className="form-floating mb-2">
										<input
											type="text"
											className="form-control disabled"
											id="chamber"
											placeholder="E.g.: D28"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 10))
											}
										/>
										<label htmlFor="chamber">Chamber $</label>
									</div>
									<small className="text-danger" id="chamberErr"></small>
									<div className="form-floating mb-2">
										<textarea
											className="form-control"
											id="bio"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 16383))
											}
										></textarea>
										<label htmlFor="bio">Bio $</label>
									</div>
									<small className="text-danger" id="bioErr"></small>
									<div className="form-floating mb-2">
										<input
											type="text"
											className="form-control disabled"
											id="password"
											placeholder="4 - 25 characters"
											required
										/>
										<label htmlFor="password">Password *</label>
									</div>
									<small className="text-danger" id="passwordErr"></small>
								</fieldset>
								<fieldset className="d-none">
									<div className="d-flex justify-content-between align-items-center">
										<h4>Select Schedule</h4>
										{selectedDays.length != 7 ? (
											<i
												className="bi bi-calendar-plus-fill h5 text-primary"
												data-bs-toggle="tooltip"
												data-bs-placement="bottom"
												title="Add New Schedule"
												onClick={() => {
													setScheduleCount(++scheduleCount)
													setDaysToDisable(getSelectedDays())
												}}
											></i>
										) : null}
									</div>
									<div className="mt-4" id="schedules">
										{/* displaying schedule cards */}
										{[...Array(scheduleCount)].map((el, ind) => {
											return (
												<div className="card mt-4 shadow schedule" key={ind}>
													<div className="card-header py-1 d-flex justify-content-between align-items-center">
														<h6 className="mb-0">Schedule - {ind + 1}</h6>
														{ind != 0 ? (
															<i
																className="bi bi-x-square-fill h5 text-danger mb-0"
																onClick={() => {
																	setScheduleCount(--scheduleCount)
																}}
															/>
														) : null}
													</div>
													<div className="card-body d-flex flex-wrap gap-1 justify-content-lg-between">
														{ind == 0
															? // displaying first card's schedule day checkboxes
															  Object.values(Days).map((dayObj, index) => {
																	return (
																		<div key={index}>
																			<input
																				type="checkbox"
																				className="btn-check"
																				id={`btnCheck${ind}${index}`}
																				name="day"
																				value={Object.keys(Days)[index]}
																				autoComplete="off"
																				defaultChecked={index == ind}
																				onClick={e => {
																					setSelectedDays(getSelectedDays())

																					// reduce to current card on editing day selection after adding next card(s)
																					if (ind + 1 != scheduleCount)
																						setScheduleCount(ind + 1)
																				}}
																			/>
																			<label
																				className={
																					ind % 2 == 0
																						? "btn btn-outline-dark p-2"
																						: "btn btn-outline-secondary p-2"
																				}
																				style={{ fontSize: "0.8rem" }}
																				htmlFor={`btnCheck${ind}${index}`}
																			>
																				{Object.keys(dayObj)
																					.toString()
																					.substring(0, 3)
																					.toUpperCase()}
																			</label>
																		</div>
																	)
															  })
															: // displaying card's schedule day checkboxes with disabled prop
															  Object.values(schedule_day)
																	// .filter(x => !daysToRender.includes(x))
																	.map((dayObj, index) => {
																		return (
																			<div key={index}>
																				<input
																					type="checkbox"
																					className="btn-check"
																					id={`btnCheck${ind}${index}`}
																					name="day"
																					value={dayObj}
																					disabled={(() => {
																						if (
																							Object.values(schedule_day)
																								.filter(
																									x =>
																										!daysToDisable.includes(x)
																								)
																								.filter(x => x == dayObj)
																								.join() == ""
																						)
																							// determining propagation except 1st card
																							return ind + 1 == scheduleCount ||
																								previousScheduleCount >
																									scheduleCount
																								? true
																								: false

																						return false
																					})()}
																					autoComplete="off"
																					// defaultChecked={index == 0}
																					onClick={e => {
																						setSelectedDays(getSelectedDays())

																						// reduce to current card on editing day selection after adding next card(s)
																						if (ind + 1 != scheduleCount)
																							setScheduleCount(ind + 1)
																					}}
																				/>
																				<label
																					className={
																						ind % 2 == 0
																							? "btn btn-outline-dark p-2"
																							: "btn btn-outline-secondary p-2"
																					}
																					style={{ fontSize: "0.8rem" }}
																					htmlFor={`btnCheck${ind}${index}`}
																				>
																					{Object.keys(Days[dayObj])
																						.toString()
																						.substring(0, 3)
																						.toUpperCase()}
																				</label>
																			</div>
																		)
																	})}
													</div>
													<div className="card-footer p-0 row row-cols-1 row-cols-lg-2 mx-0">
														<div className="col p-1 d-flex align-items-center">
															<label className="me-2" htmlFor={`from${ind}`}>
																From:
															</label>
															<input
																className="form-control"
																type="time"
																id={`from${ind}`}
																step="600"
																defaultValue="07:00"
															/>
														</div>
														<div className="col p-1 d-flex align-items-center">
															<label className="me-2" htmlFor={`to${ind}`}>
																To:
															</label>
															<input
																className="form-control"
																type="time"
																id={`to${ind}`}
																step="600"
																defaultValue="23:00"
															/>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</fieldset>
								<div
									className="text-center text-success d-none"
									id="successMessage"
								>
									<i className="bi bi-check2-all fs-1"></i>
									<h3 className="mt-4">You have successfully signed up!</h3>
								</div>
								<div
									className="mt-3 d-flex gap-1 justify-content-end"
									role="group"
									id="stepButtons"
								>
									<button
										type="button"
										className="btn btn-sm btn-dark d-none"
										id="prevBtn"
										onClick={() => nextPrev(-1)}
									>
										<i className="bi bi-arrow-left"></i>
									</button>
									<button
										type="button"
										className="btn btn-sm btn-primary"
										id="nextBtn"
										onClick={async e => {
											const getDoctorInfoData = {
												name: $("#name").val(),
												sex: $("#sex").val(),
												department: $("#department").val(),
												specialization: $("#specialization").val(),
												...($("#bio").val() == ""
													? null
													: { bio: $("#bio").val() }),
												...($("#chamber").val() == ""
													? null
													: { chamber: $("#chamber").val() }),
												password: $("#password").val(),
											}
											console.log(currentTab)
											//* email verification tab
											if (
												currentTab == 0 &&
												e.currentTarget.innerText == "Send OTP"
											) {
												await fetch("/api/doctorsignup", {
													method: "GET",
													headers: {
														"content-type": "application/json",
														email: $("#email").val() as string,
														step: currentTab.toString(),
													},
												})
													.then(response => response.json())
													.then(async res => {
														console.log(res)

														if (res.message)
															return $("#emailErr").text(res.message)

														$("#emailErr").text("")

														$(e.target).addClass("disabled")

														//* OTP sending block
														let otp = Math.floor(
															Math.random() * (9999 - 1001) + 1001
														)
														console.log(otp)
														setOTP(otp)
														$(e.target).text("Continue")
														setDoctor(res)

														if (
															await sendOTP(
																$("#email").val() as string,
																"Doctor Signup Email Verification",
																otp
															)
														) {
															setOTP(otp)
															setDoctor(res)
															$(e.target).text("Continue")
														} else
															Toast(
																"Couldn't send OTP at the moment, please try again later.",
																"danger",
																false
															)
													})
													.catch(err => console.error(err))
											} else if (
												//* OTP verification block
												currentTab == 0 &&
												e.currentTarget.innerText == "Continue" &&
												OTP?.toString() ==
													((((((($("#d1").val() as string) +
														$("#d2").val()) as string) +
														$("#d3").val()) as string) +
														$("#d4").val()) as string)
											)
												nextPrev(1)
											else if (currentTab == 1) {
												//* doctor info collection tab
												await fetch("/api/doctorsignup", {
													method: "POST",
													headers: {
														"content-type": "application/json",
														email: "emranffl4@gmail.com",
														// email: $("#email").val() as string,
														step: currentTab.toString(),
													},
													body: JSON.stringify(getDoctorInfoData),
												})
													.then(response => response.json())
													.then(async ({ errors, inner, validated }) => {
														const Err = {
															name: false,
															sex: false,
															department: false,
															specialization: false,
															password: false,
														}

														interface Inner {
															path: keyof typeof Err
															message: string
														}

														if (errors) {
															;(inner as Inner[]).map((el: Inner, ind) => {
																if (el.path == "sex")
																	$("#" + el.path + "Err").text(
																		"select a gender"
																	)
																else if (el.path == "department")
																	$("#" + el.path + "Err").text(
																		"select a department"
																	)
																else $("#" + el.path + "Err").text(el.message)
																Err[el.path] = true
															})
														} else if (validated) nextPrev(1)

														Object.keys(Err).map((el, ind) => {
															if (!Err[el as keyof typeof Err])
																$("#" + el + "Err").text("")
														})
													})
													.catch(err => console.error(err))
											} else if (currentTab == 2) {
												//* schedule tab
												await fetch("/api/doctorsignup", {
													method: "POST",
													headers: {
														"content-type": "application/json",
														// email: "emranffl4@gmail.com",
														email: $("#email").val() as string,
														step: currentTab.toString(),
													},
													body: JSON.stringify({
														...getDoctorInfoData,
														schedule: [
															...$("#schedules")
																.children(".schedule")
																.map((scheduleCount, schedule) => {
																	return [
																		...$(schedule)
																			.find("input[name=day]")
																			.map((ind, day) => {
																				if ($(day).is(":checked")) {
																					return {
																						doctor_id: doctor?.id,
																						day: $(day).val(),
																						start_time: `1970-01-01 ${$(
																							"#from" + scheduleCount
																						).val()}`,
																						end_time: `1970-01-01 ${$(
																							"#to" + scheduleCount
																						).val()}`,
																					}
																				}
																			}),
																	]
																}),
														],
													}),
												})
													.then(response => response.json())
													.then(async res => {
														if (res.email)
															router.replace(
																`${Links.Doctor.dashboard}?doctor=${res.email}`,
																Links.Doctor.dashboard
															)
													})
													.catch(err => console.error(err))
											}
										}}
									>
										Send OTP
									</button>
								</div>
								<div className="d-flex gap-2 mt-2">
									<small className="text-secondary">* - required</small>
									<small className="text-secondary">$ - optional</small>
								</div>
								<div className="text-secondary mt-2 text-center">
									<small>
										Already have an account?
										<Link href={Links.Doctor.login}>
											<a className="text-decoration-none fw-bold">
												&nbsp;Login
											</a>
										</Link>
									</small>
								</div>
							</form>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default DoctorSignup
