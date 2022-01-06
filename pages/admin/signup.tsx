import Head from "next/head"
import $ from "jquery"
import { useEffect } from "react"
import router from "next/router"
import Link from "next/link"
import { Links } from "@app"
import { Toast } from "@functionalities/toast"
import AnnotationToggler from "@components/AnnotationToggler"
import BedTypeInputFields from "@components/BedTypeInputFields"

export interface HospitalSignUpProps {}

const HospitalSignUp: React.FC<HospitalSignUpProps> = () => {
	let validated = false,
		base64image = "default"

	const validateStepOne = async (
			event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
		) => {
			if (
				$("#public").is(":checked") === false &&
				$("#private").is(":checked") === false
			)
				$("#hospitalTypeErr").text("Please select a type!")
			else $("#hospitalTypeErr").text("")

			// * backend validation if all fields meet the required conditions
			if ($("#public").is(":checked") || $("#private").is(":checked")) {
				const data = {
					hospitalName: $("#hospitalName").val(),
					registrationNo: $("#registrationNo").val(),
				}

				await fetch("/api/hospitalstaffsignup", {
					method: "POST",
					headers: new Headers({ "content-type": "application/json" }),
					body: JSON.stringify({
						step: "hospital info",
						data,
					}),
					redirect: "follow",
				})
					.then(response => response.json())
					.then(res => {
						let errorTypes = {
								hospitalName: "Name",
								registrationNo: "Registration",
							},
							flaggedError = {
								hospitalName: false,
								registrationNo: false,
							}

						// error handling
						if (res.error != undefined) {
							$("#hospitalNameErr").text(res.error)
							flaggedError.hospitalName = true
						}
						// * hospital info server side validation error block
						else if (res.name != undefined) {
							res.errors.map((msg: string) => {
								// * displaying hospital info validation error message
								Object.keys(errorTypes).forEach(errorName => {
									if (msg.includes(errorName)) {
										$("#" + errorName + "Err").text(
											msg.replace(
												errorName,
												errorTypes[errorName as keyof typeof errorTypes]
											)
										)

										flaggedError[errorName as keyof typeof flaggedError] = true
									}
								})
							})
						} else if (res.name == undefined) validated = true

						// * removing hospital info server side validation error message
						Object.keys(flaggedError).forEach(errorName => {
							if (flaggedError[errorName as keyof typeof flaggedError] == false)
								$("#" + errorName + "Err").text("")
						})
					})
					.catch(error => console.error(error))
			}
		},
		validateStepTwo = async (
			event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
		) => {
			if ($("#phone").val() == "" && $("#mobile").val() == "")
				$("#numberErr").text("Please provide at least either of the numbers!")
			else $("#numberErr").text("")

			if (
				$("#division").children(":selected").val() == "null" ||
				$("#district").children(":selected").val() == "null"
			)
				$("#addressErr").text("Please select appropriate address!")
			else $("#addressErr").text("")

			if ($("#thana").val() == "") $("#thanaErr").text("Field cannot be empty!")
			else $("#thanaErr").text("")

			if ($("#area").val() == "") $("#areaErr").text("Field cannot be empty!")
			else $("#areaErr").text("")

			if (
				($("#lat").val() != "" && $("#lon").val() == "") ||
				($("#lat").val() == "" && $("#lon").val() != "")
			)
				return $("#lat").val() == ""
					? $("#coordinateErr").text("Latitude field cannot be empty")
					: $("#coordinateErr").text("Longitude field cannot be empty")
			else $("#coordinateErr").text("")

			// * backend validation if all fields meet the required conditions
			if (
				($("#phone").val() != "" || $("#mobile").val() != "") &&
				$("#division").children(":selected").val() != "null" &&
				$("#district").children(":selected").val() != "null" &&
				$("#thana").val() != "" &&
				$("#area").val() != ""
			) {
				const address = () => {
						let street_address = ""

						street_address +=
							$("#building").val() == "" ? "" : $("#building").val() + ", "

						street_address += $("#area").val() + ", " + $("#thana").val() + ", "

						street_address +=
							$("#city").val() == "" ? "" : $("#city").val() + ", "

						street_address +=
							$("#upazilla").val() == "null" ? "" : $("#upazilla").val()

						return street_address
					},
					data = {
						phone: $("#phone").val() == "" ? null : $("#phone").val(),
						mobile: $("#mobile").val() == "" ? null : $("#mobile").val(),
						website: $("#website").val() == "" ? null : $("#website").val(),
						street_address: address(),
						district: $("#district").children(":selected").text(),
						division: $("#division").children(":selected").text(),
					}

				await fetch("/api/hospitalstaffsignup", {
					method: "POST",
					headers: new Headers({ "content-type": "application/json" }),
					body: JSON.stringify({
						step: "address info",
						data,
					}),
					redirect: "follow",
				})
					.then(response => response.json())
					.then(res => {
						let errorTypes = {
								phone: "Number",
								mobile: "Number",
								website: "Website",
							},
							flaggedError = {
								phone: false,
								mobile: false,
								website: false,
							}

						// * address info validation error block
						if (res.name != undefined) {
							res.errors.map((msg: string) => {
								// * displaying hospital info validation error message
								Object.keys(errorTypes).forEach(errorName => {
									if (msg.includes(errorName)) {
										$(
											"#" +
												errorTypes[
													errorName as keyof typeof errorTypes
												].toLowerCase() +
												"Err"
										).text(
											msg.replace(
												errorName,
												errorTypes[errorName as keyof typeof errorTypes]
											)
										)
										// todo separate phone and mobile error msg display
										flaggedError[errorName as keyof typeof flaggedError] = true
									}
								})
							})
						} else if (res.name == undefined) validated = true

						// * removing address info validation error message
						Object.keys(flaggedError).forEach((errorName, index) => {
							if (!flaggedError[errorName as keyof typeof errorTypes])
								$(
									"#" +
										errorTypes[
											errorName as keyof typeof errorTypes
										].toLowerCase() +
										"Err"
								).text("")
						})
					})
					.catch(error => console.error(error))
			}
		},
		validateStepFive = async (
			event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
		) => {
			const data = {
				adminName: $("#adminName").val(),
				adminEmail: $("#adminEmail").val(),
				adminMobile: $("#adminMobile").val(),
				adminPassword: $("#adminPassword").val(),
			}

			await fetch("/api/hospitalstaffsignup", {
				method: "POST",
				headers: new Headers({ "content-type": "application/json" }),
				body: JSON.stringify({
					step: "admin info",
					data,
				}),
				redirect: "follow",
			})
				.then(response => response.json())
				.then(res => {
					let errorTypes = {
							adminName: "Name",
							adminEmail: "Email",
							adminMobile: "Number",
							adminPassword: "Password",
						},
						flaggedError = {
							adminName: false,
							adminEmail: false,
							adminMobile: false,
							adminPassword: false,
						}

					// * admin info validation error block
					if (res.name != undefined) {
						res.errors.map((msg: string) => {
							// * displaying hospital info validation error message
							Object.keys(errorTypes).forEach(errorName => {
								if (msg.includes(errorName)) {
									$("#" + errorName + "Err").text(
										msg.replace(
											errorName,
											errorTypes[errorName as keyof typeof errorTypes]
										)
									)

									flaggedError[errorName as keyof typeof flaggedError] = true
								}
							})
						})
					} else if (res.name == undefined) {
						validated = true
						onSubmit()
					}

					// * removing admin info validation error message
					Object.keys(flaggedError).forEach((errorName, index) => {
						if (flaggedError[errorName as keyof typeof flaggedError] == false)
							$("#" + errorName + "Err").text("")
					})
				})
				.catch(error => console.error(error))
		},
		onSubmit = async () => {
			const bedType = () => {
					let arr: any[] = []
					$("#bedTypes")
						.find("input")
						.map((index, checkbox) => {
							if ($(checkbox).is(":checked")) {
								arr.push($(checkbox).attr("value"))
							}
						})
					return arr.join()
				},
				address = () => {
					let street_address = ""

					street_address +=
						$("#building").val() == "" ? "" : $("#building").val() + ", "

					street_address += $("#area").val() + ", " + $("#thana").val() + ", "

					street_address +=
						$("#upazilla").val() == "null" ? "" : $("#upazilla").val()

					return street_address
				},
				totalCapacity = () => {
					let sum = 0
					$("#bedTypes")
						.find("input[type=number]")
						.map((ind, elem) => {
							sum += parseInt($(elem).val() as string)
						})
					return sum
				},
				data = {
					hospital: {
						registration_no: $("#registrationNo").val(),
						hospital_name: $("#hospitalName").val(),
						description:
							$("#description").val() == "" ? null : $("#description").val(),
						hospital_type: $("#public").is(":checked") ? "Public" : "Private",
						bed_type: bedType(),
						image_source: base64image,
						website: $("#website").val() == "" ? null : $("#website").val(),
					},
					address: {
						registration_no: $("#registrationNo").val(),
						street_address: address(),
						district: $("#district").children(":selected").text(),
						division: $("#division").children(":selected").text(),
						phone_no: $("#phone").val() == "" ? null : $("#phone").val(),
						mobile_no: $("#mobile").val() == "" ? null : $("#mobile").val(),
						latitude:
							$("#lat").val() == ""
								? null
								: parseFloat($("#lat").val() as string),
						longitude:
							$("#lon").val() == ""
								? null
								: parseFloat($("#lon").val() as string),
					},
					capacity: {
						registration_no: $("#registrationNo").val(),
						total_capacity: totalCapacity(),
						ward: $("#ward").is(":checked")
							? parseInt($("#wardCount").val() as string)
							: null,
						special_ward: $("#specialWard").is(":checked")
							? parseInt($("#specialWardCount").val() as string)
							: null,
						cabin: $("#cabin").is(":checked")
							? parseInt($("#cabinCount").val() as string)
							: null,
						icu: $("#icu").is(":checked")
							? parseInt($("#icuCount").val() as string)
							: null,
						ccu: $("#ccu").is(":checked")
							? parseInt($("#ccuCount").val() as string)
							: null,
						covidu: $("#covidu").is(":checked")
							? parseInt($("#covidCount").val() as string)
							: null,
					},
					vacant_bed_log: {
						registration_no: $("#registrationNo").val(),
						ward: $("#ward").is(":checked")
							? parseInt($("#wardCount").val() as string)
							: null,
						special_ward: $("#specialWard").is(":checked")
							? parseInt($("#specialWardCount").val() as string)
							: null,
						cabin: $("#cabin").is(":checked")
							? parseInt($("#cabinCount").val() as string)
							: null,
						icu: $("#icu").is(":checked")
							? parseInt($("#icuCount").val() as string)
							: null,
						ccu: $("#ccu").is(":checked")
							? parseInt($("#ccuCount").val() as string)
							: null,
						covidu: $("#covidu").is(":checked")
							? parseInt($("#covidCount").val() as string)
							: null,
					},
					staff: {
						mobile_no: $("#adminMobile").val(),
						password: $("#adminPassword").val(),
						name: $("#adminName").val(),
						email: $("#adminEmail").val(),
						role: "Admin",
						status: "Active",
						registration_no: $("#registrationNo").val(),
					},
					log: {
						registration_no: $("#registrationNo").val(),
						task: "signed up",
						mobile_no: $("#adminMobile").val(),
						role: "Admin",
					},
				}

			await fetch("/api/hospitalstaffsignup", {
				method: "POST",
				headers: new Headers({ "content-type": "application/json" }),
				body: JSON.stringify({ step: "submit", data }),
				redirect: "follow",
			})
				.then(response => response.json())
				.then(({ reg, user }) => {
					console.log(reg, user)

					Toast(
						"Signup successful! You now have administrator privilege.",
						"primary",
						5000
					)

					// redirecting after signup
					router.replace(
						`/admin/dashboard?reg=${reg}&user=${user}`,
						`/admin/dashboard`
					)
				})
				.catch(error => console.error(error))
		}

	useEffect(function onFirstMount() {
		let current_fs: any,
			next_fs: any,
			previous_fs: any,
			opacity,
			current = 1,
			steps = $("fieldset").length

		setProgressBar(current)

		$(".next").on("click", async function (event) {
			if (event.target.id == "btn-step-1") {
				await validateStepOne(event)
			} else if (event.target.id == "btn-step-2") {
				await validateStepTwo(event)
			} else if (event.target.id == "btn-step-3") {
				if ($("#bedTypes").find("input").is(":checked") === false)
					return $("#bedTypeErr").text(
						"Please select at least one of bed types!"
					)

				$("#bedTypes")
					.find("input[type=checkbox]")
					.each((ind, elem) => {
						if (
							$(elem).is(":checked") &&
							$("#" + $(elem).attr("id") + "Count").val() == 0
						) {
							$("#bedTypeErr").text("Selected bed type's capacity cannot be 0!")
							validated = false
							return false
						} else {
							$("#bedTypeErr").text("")
							validated = true
						}
					})
			} else if (event.target.id == "btn-step-4") {
				validated = true
			} else if (event.target.id == "btn-step-5") {
				await validateStepFive(event)
			}

			if (validated) {
				current_fs = $(this).parent()
				next_fs = $(this).parent().next()

				//Add Class Active
				$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active")

				//show the next fieldset
				next_fs.show()

				//hide the current fieldset with style
				current_fs.animate(
					{ opacity: 0 },
					{
						step: function (now: number) {
							// for making fieldset appear animation
							opacity = 1 - now

							current_fs.css({
								display: "none",
								position: "relative",
							})
							next_fs.css({ opacity: opacity })
						},
						duration: 500,
					}
				)
				setProgressBar(++current)
				validated = false
			}
		})

		$(".previous").on("click", function () {
			// validated = false

			current_fs = $(this).parent()
			previous_fs = $(this).parent().prev()

			//Remove class active
			$("#progressbar li")
				.eq($("fieldset").index(current_fs))
				.removeClass("active")

			//show the previous fieldset
			previous_fs.show()

			//hide the current fieldset with style
			current_fs.animate(
				{ opacity: 0 },
				{
					step: function (now: number) {
						// for making fieldset appear animation
						opacity = 1 - now

						current_fs.css({
							display: "none",
							position: "relative",
						})
						previous_fs.css({ opacity: opacity })
					},
					duration: 500,
				}
			)
			setProgressBar(--current)
		})

		function setProgressBar(curStep: number) {
			let percent: any = parseFloat((100 / steps).toString()) * curStep
			percent = percent.toFixed()
			$(".progress-bar").css("width", percent + "%")
		}

		// * populating division select list from api call
		$.ajax({
			async: true,
			crossDomain: true,
			url: "https://bdapi.p.rapidapi.com/v1.1/divisions",
			method: "GET",
			headers: {
				"x-rapidapi-key": process.env.NEXT_PUBLIC_BDAPI_KEY,
				"x-rapidapi-host": "bdapi.p.rapidapi.com",
			},
		}).done(function (response) {
			let html = `<option value="null" hidden="true">Select Division...</option>`
			response.data.map((elem: any, index: number) => {
				html += `<option value="${elem._id}">${elem.division}</option>`
			})
			$("#division").html(html)
		})

		$("#bedTypes")
			.find("input[type=checkbox]")
			.on("click", event => {
				if ($(event.target).is(":checked")) {
					$("#" + event.target.id + "Count").removeAttr("disabled")
				} else {
					$("#" + event.target.id + "Count").attr("disabled", "true")
					$("#" + event.target.id + "Count").val(0)
				}
			})
	}, [])

	return (
		<>
			<Head>
				<title>Sign Up | Admin Panel</title>
			</Head>
			<main
				className="container d-flex flex-column hospital_signup_form"
				style={{ minHeight: "100vh" }}
			>
				<div className="row mx-0 justify-content-center my-5">
					<div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5 px-3 px-md-4 px-lg-5 card shadow-lg rounded-3">
						<div className="card-body px-0">
							<h2 className="text-primary text-center">Sign Up</h2>
							<form
								className="d-flex flex-column mt-3"
								id="msform"
								onSubmit={async event => {
									event.preventDefault()
									event.stopPropagation()
								}}
							>
								<ul
									className="d-flex justify-content-between w-75 mx-auto mt-3"
									id="progressbar"
									style={{ zIndex: +1 }}
								>
									<li className="d-inline-block active">
										<div
											className="bg-light border border-primary rounded-circle d-flex justify-content-center align-items-center h6"
											style={{ width: "30px", height: "30px" }}
										>
											1
										</div>
									</li>
									<li className="d-inline-block ms-1 ms-sm-3 ms-md-4">
										<div
											className="bg-light border border-primary rounded-circle d-flex justify-content-center align-items-center h6"
											style={{ width: "30px", height: "30px" }}
										>
											2
										</div>
									</li>
									<li className="d-inline-block ms-1 ms-sm-3 ms-md-4">
										<div
											className="bg-light border border-primary rounded-circle d-flex justify-content-center align-items-center h6"
											style={{ width: "30px", height: "30px" }}
										>
											3
										</div>
									</li>
									<li className="d-inline-block ms-1 ms-sm-3 ms-md-4">
										<div
											className="bg-light border border-primary rounded-circle d-flex justify-content-center align-items-center h6"
											style={{ width: "30px", height: "30px" }}
										>
											4
										</div>
									</li>
									<li className="d-inline-block ms-1 ms-sm-3 ms-md-4">
										<div
											className="bg-light border border-primary rounded-circle d-flex justify-content-center align-items-center h6"
											style={{ width: "30px", height: "30px" }}
										>
											5
										</div>
									</li>
								</ul>
								<div className="progress mt-n5 mb-5">
									<div
										className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
										role="progressbar"
									></div>
								</div>
								{/*
								<!-- progressbar -->
								*/}
								<fieldset>
									<div className="form-card">
										<div className="row">
											<div className="col-7">
												<h2 className="fs-title">Hospital Info</h2>
											</div>
											<div className="col-5">
												<h2 className="steps">Step 1/5</h2>
											</div>
										</div>
										<label className="text-secondary">Name: *</label>
										<input
											type="text"
											name="hospitalName"
											placeholder="E.g.: United Hospital Ltd."
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 100))
											}
											className="form-control"
											id="hospitalName"
											required
										/>
										<small
											className="d-block text-danger mt-n3 mb-2"
											id="hospitalNameErr"
										></small>
										<label className="text-secondary">Registration: *</label>
										<input
											type="text"
											name="registrationNo"
											placeholder="E.g.: 1*2*3*4*5*"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 10))
											}
											className="form-control"
											id="registrationNo"
											required
										/>
										<small
											className="d-block text-danger mt-n3 mb-2"
											id="registrationNoErr"
										></small>
										<label className="text-secondary">Type: *</label>
										<div
											className="row mx-0 mt-2 mb-4 text-primary"
											id="hospitalType"
										>
											<div className="form-check col">
												<input
													className="form-check-input my-auto"
													type="radio"
													name="hospitalType"
													id="public"
													value="Public"
													style={{ cursor: "pointer" }}
												/>
												<label
													className="form-check-label ms-2 me-auto"
													style={{ cursor: "pointer" }}
													htmlFor="public"
												>
													Public
												</label>
											</div>
											<div className="form-check col">
												<input
													className="form-check-input my-auto"
													type="radio"
													name="hospitalType"
													id="private"
													value="Private"
													style={{ cursor: "pointer" }}
												/>
												<label
													className="form-check-label ms-2 me-auto"
													style={{ cursor: "pointer" }}
													htmlFor="private"
												>
													Private
												</label>
											</div>
										</div>
										<small
											className="d-block text-danger mt-n1 mb-3"
											id="hospitalTypeErr"
										></small>
									</div>
									<button
										className="btn btn-primary next action-button w-50"
										id="btn-step-1"
									>
										Next
									</button>
									<div className="mt-3 text-secondary">
										<small className="me-4 mb-1">* - required</small>
									</div>
									<div className="mt-3 text-secondary text-center">
										<small>
											Already have an account?
											<Link href={Links.Admin.login}>
												<a className="text-decoration-none fw-bold">
													&nbsp;Login
												</a>
											</Link>
										</small>
									</div>
								</fieldset>
								<fieldset>
									<div className="form-card">
										<div className="row">
											<div className="col-7">
												<h2 className="fs-title">Address Info</h2>
											</div>
											<div className="col-5">
												<h2 className="steps">Step 2/5</h2>
											</div>
										</div>
										<label className="text-secondary">Phone: #</label>
										<div className="row">
											<div className="form-group mb-0 col-4">
												<input
													type="tel"
													className="form-control"
													value="+88"
													disabled
												/>
											</div>
											<div className="form-group mb-0 col-8">
												<input
													type="tel"
													name="phone"
													className="form-control"
													placeholder="E.g.: 021234567"
													onInput={e =>
														((e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.slice(0, 11))
													}
													id="phone"
												/>
											</div>
										</div>
										<label className="text-secondary">Mobile: #</label>
										<div className="row">
											<div className="form-group mb-0 col-4">
												<input
													type="tel"
													className="form-control"
													value="+88"
													disabled
												/>
											</div>
											<div className="form-group mb-0 col-8">
												<input
													type="tel"
													name="mobile"
													className="form-control"
													placeholder="E.g.: 01*********"
													onInput={e =>
														((e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.slice(0, 11))
													}
													id="mobile"
												/>
											</div>
										</div>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="numberErr"
										></small>
										<label className="text-secondary">Website: $</label>
										<input
											type="url"
											className="form-control"
											id="website"
											placeholder="E.g.: www.example.com"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 255))
											}
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="websiteErr"
										></small>
										<label className="text-secondary">Address:</label>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<label
													className="input-group-text text-secondary"
													htmlFor="division"
												>
													Division: *
												</label>
											</div>
											<select
												className="form-select"
												id="division"
												defaultValue="Select Division..."
												onChange={event => {
													$.ajax({
														async: true,
														crossDomain: true,
														url: `https://bdapi.p.rapidapi.com/v1.1/division/${event.target.value}`,
														method: "GET",
														headers: {
															"x-rapidapi-key":
																process.env.NEXT_PUBLIC_BDAPI_KEY,
															"x-rapidapi-host": "bdapi.p.rapidapi.com",
														},
													}).done(function (response) {
														let optionsHtml = `<option value="null" hidden selected>Select District...</option>`
														response.data.map((element: any) => {
															optionsHtml += `<option value="${element._id}">${element.district}</option>`
														})
														$("#district").html(optionsHtml)

														$("#district").removeAttr("disabled")
													})
												}}
											>
												<option value="null" hidden>
													Select Division...
												</option>
											</select>
										</div>
										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<label
													className="input-group-text text-secondary"
													htmlFor="district"
												>
													District: *
												</label>
											</div>
											<select
												className="form-select"
												id="district"
												defaultValue="Select District..."
												disabled
												onChange={event => {
													$.ajax({
														async: true,
														crossDomain: true,
														url: `https://bdapi.p.rapidapi.com/v1.1/division/${$(
															"#division"
														).val()}`,
														method: "GET",
														headers: {
															"x-rapidapi-key":
																process.env.NEXT_PUBLIC_BDAPI_KEY,
															"x-rapidapi-host": "bdapi.p.rapidapi.com",
														},
													}).done(function (response) {
														let optionsHtml = `<option value="null" hidden selected>Select Upazilla...</option>`
														response.data.map((element: any) => {
															if (element._id === $("#district").val()) {
																element.upazilla.map((upazilla: any) => {
																	optionsHtml += `<option value="${upazilla}">${upazilla}</option>`
																})
																$("#upazilla").html(optionsHtml)
																$("#upazilla").removeAttr("disabled")
															}
														})
													})
												}}
											>
												<option value="null" hidden>
													Select District...
												</option>
											</select>
										</div>

										<div className="input-group mb-3">
											<div className="input-group-prepend">
												<label
													className="input-group-text text-secondary"
													htmlFor="upazilla"
												>
													Upazilla: $
												</label>
											</div>
											<select
												className="form-select"
												id="upazilla"
												defaultValue="Select Upazilla..."
												disabled
											>
												<option value="null" hidden>
													Select Upazilla...
												</option>
											</select>
										</div>
										<small
											className="d-block text-danger mt-n2 mb-1"
											id="addressErr"
										></small>
										<label className="text-secondary">City: $</label>
										<input
											type="text"
											name="city"
											className="form-control"
											id="city"
											placeholder="E.g.: Mirpur"
										/>
										<label className="text-secondary">Thana: *</label>
										<input
											type="text"
											name="thana"
											className="form-control"
											id="thana"
											placeholder="E.g.: Kafrul"
											required
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="thanaErr"
										></small>
										<label className="text-secondary">
											Block/Area/Village: *
										</label>
										<input
											type="text"
											name="area"
											className="form-control"
											id="area"
											placeholder="E.g.: Senpara Parbata"
											required
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="areaErr"
										></small>
										<label className="text-secondary">Building/Floor:</label>
										<input
											type="text"
											name="building"
											className="form-control"
											id="building"
											placeholder="E.g.: 123/A, Twin Tower"
										/>
										<label className="text-secondary">
											Coordinates: $&nbsp;
											<AnnotationToggler
												textColor="text-warning"
												textContent={
													<>
														You must be signing up from the hospital building in
														order to get the <strong>correct</strong>&nbsp;
														coordinates automatically.
													</>
												}
											/>
										</label>
										<div className="row mx-0 mb-3">
											<div className="col-7 col-sm-8 px-0">
												<input
													type="number"
													min="-90"
													max="90"
													step="0.00000001"
													onInput={e =>
														((e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.slice(0, 10))
													}
													name="lat"
													placeholder="Latitude"
													className="mb-0 me-1 form-control d-inline-block"
													style={{ width: "45%" }}
													id="lat"
												/>
												<input
													type="number"
													min="-180"
													max="180"
													step="0.00000001"
													onInput={e =>
														((e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.slice(0, 10))
													}
													name="lon"
													placeholder="Longitude"
													className="mb-0 form-control d-inline-block"
													style={{ width: "50%" }}
													id="lon"
												/>
											</div>
											<div className="col-5 col-sm-4 d-flex flex-column">
												<button
													type="button"
													className="btn btn-sm btn-dark m-auto"
													style={{ fontSize: "0.85rem" }}
													onClick={event => {
														navigator.geolocation
															? navigator.geolocation.getCurrentPosition(
																	position => {
																		$("#lat").val(
																			position.coords.latitude
																				.toString()
																				.slice(0, 10)
																		)
																		$("#lon").val(
																			position.coords.longitude
																				.toString()
																				.slice(0, 10)
																		)
																	},
																	error =>
																		$("#coordinateErr").html(error.message)
															  )
															: $("#coordinateErr").html(
																	`Your browser doesn\'t support geolocation. Try inputting manually.`
															  )
													}}
												>
													<i className="bi bi-geo-alt"></i>
													&nbsp;Get Position
												</button>
											</div>
											<small
												className="d-block text-danger ps-1"
												id="coordinateErr"
											></small>
										</div>
									</div>
									<button
										type="button"
										className="btn btn-dark previous action-button-previous me-2"
									>
										<i className="bi bi-arrow-left"></i>
									</button>
									<button
										className="btn btn-primary next action-button w-50"
										id="btn-step-2"
									>
										Next
									</button>
									<div className="mt-4 text-secondary text-center">
										<small className="me-2 mb-1">* - required</small>
										<small className="me-2 mb-1">
											# - either one is required
										</small>
										<small className="mb-1">$ - optional</small>
									</div>
								</fieldset>
								<fieldset>
									<div className="form-card">
										<div className="row">
											<div className="col-7">
												<h2 className="fs-title">Bed Info</h2>
											</div>
											<div className="col-5">
												<h2 className="steps">Step 3/5</h2>
											</div>
										</div>
										<label className="text-secondary">
											Offered Bed Types: *
										</label>
										<div
											className="row row-cols-2 mx-0 mt-n1 mb-2 text-primary"
											id="bedTypes"
										>
											<BedTypeInputFields />
										</div>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="bedTypeErr"
										></small>
									</div>
									<button
										type="button"
										className="btn btn-dark previous action-button-previous me-2"
									>
										<i className="bi bi-arrow-left"></i>
									</button>
									<button
										type="button"
										className="btn btn-primary next action-button w-50"
										id="btn-step-3"
									>
										Next
									</button>
									<div className="mt-3 text-secondary text-center">
										<small className="me-4 mb-1">* - required</small>
									</div>
								</fieldset>
								<fieldset>
									<div className="form-card">
										<div className="row">
											<div className="col-7">
												<h2 className="fs-title">Image &amp; Description</h2>
											</div>
											<div className="col-5">
												<h2 className="steps">Step 4/5</h2>
											</div>
										</div>
										<label className="text-secondary">
											Upload Hospital Front View: $
										</label>
										<input
											type="file"
											name="image"
											accept="image/jpeg, image/png"
											onChange={event => {
												if (event.target.files?.length == 1) {
													$("#imageErr").text("")

													const file = event.target.files[0],
														reader = new FileReader()

													reader.readAsDataURL(file)
													reader.onloadend = () =>
														(base64image = reader.result as string)
												} else {
													$("#imageErr").text(
														"No image file chosen, default image will be displayed!"
													)
													base64image = "default"
												}
											}}
											className="form-control"
											id="image"
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="imageErr"
										>
											No image file chosen, default image will be displayed!
										</small>
										<label className="text-secondary">
											Hospital Description: $
										</label>
										<textarea
											className="form-control"
											id="description"
											placeholder="Provide a brief description of the hospital."
										/>
									</div>
									<button className="btn btn-dark previous action-button-previous me-2">
										<i className="bi bi-arrow-left"></i>
									</button>
									<button
										className="btn btn-primary next action-button w-50"
										id="btn-step-4"
									>
										Next
									</button>
									<div className="mt-4 text-secondary text-center">
										<small className="mb-1">$ - optional</small>
									</div>
								</fieldset>
								<fieldset>
									<div className="form-card">
										<div className="row">
											<div className="col-7">
												<h2 className="fs-title">Admin Info</h2>
											</div>
											<div className="col-5">
												<h2 className="steps">Step 5/5</h2>
											</div>
										</div>
										<label className="text-secondary">Name: *</label>
										<input
											type="text"
											className="form-control"
											id="adminName"
											placeholder="E.g.: Alice Milburn"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 50))
											}
											required
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="adminNameErr"
										></small>
										<label className="text-secondary">Email: *</label>
										<input
											type="email"
											className="form-control"
											id="adminEmail"
											placeholder="E.g.: example@domain.com"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 50))
											}
											required
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="adminEmailErr"
										></small>
										<label className="text-secondary">Mobile: *</label>
										<div className="row">
											<div className="form-group mb-0 col-4">
												<input
													type="tel"
													className="form-control"
													placeholder="+88"
													disabled
												/>
											</div>
											<div className="form-group mb-0 col-8">
												<input
													type="tel"
													name="adminMobile"
													id="adminMobile"
													className="form-control"
													placeholder="E.g.: 01*********"
													onInput={e =>
														((e.target as HTMLInputElement).value = (
															e.target as HTMLInputElement
														).value.slice(0, 11))
													}
													required
												/>
											</div>
										</div>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="adminMobileErr"
										></small>
										<label className="text-secondary">Password: *</label>
										<input
											type="password"
											className="form-control"
											id="adminPassword"
											placeholder="4 - 25 characters"
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 25))
											}
											required
										/>
										<small
											className="d-block text-danger mt-n1 mb-2"
											id="adminPasswordErr"
										></small>
									</div>
									<button
										type="button"
										className="btn btn-dark previous action-button-previous me-2"
									>
										<i className="bi bi-arrow-left"></i>
									</button>
									<button
										type="button"
										className="btn btn-primary next action-button w-50"
										id="btn-step-5"
									>
										Submit
									</button>
									<div className="mt-3 text-secondary text-center">
										<small className="me-4 mb-1">* - required</small>
									</div>
								</fieldset>
								<fieldset>
									<div className="form-card">
										<h2 className="text-success text-center">
											<strong>SUCCESS!</strong>
										</h2>

										<div className="row justify-content-center">
											<div className="col-3">
												<i className="bi bi-check2-all text-success display-1"></i>
											</div>
										</div>

										<h6 className="text-center text-info">
											You have successfully signed up
										</h6>
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default HospitalSignUp
