import Head from "next/head"
import $ from "jquery"
import Image from "next/image"
import { prisma } from "@functionalities/DB/prismaInstance"
import React, { useEffect, useState } from "react"
import {
	address,
	booking,
	booking_status,
	capacity,
	doctor,
	hospital,
	log,
	staff,
	vacant_bed_log,
} from "@prisma/client"
import { Toast } from "@functionalities/toast"
import { sendEmail, sendOTP } from "@functionalities/emailManager"
import Crypto from "crypto"
import AnnotationToggler from "@components/AnnotationToggler"
import Loader from "@components/Loader"
import BedTypeInputFields from "@components/BedTypeInputFields"
import { isObjectEqual } from "@functionalities/compareObjects"
import router from "next/router"
import { Links } from "@app"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { doctorSelectParam } from "@api/getdoctorlist"
declare var bootstrap: any

export const getServerSideProps = async ({ query }: any) => {
	// redirect upon error
	if (
		(query.reg == "" || query.reg == undefined) &&
		(query.user == "" || query.user == undefined)
	)
		return {
			redirect: {
				destination: "/admin",
				permanent: false,
			},
		}

	const retrievedData: RetrievedData | any = await prisma.hospital.findUnique({
		where: {
			registration_no: query.reg,
		},
		include: {
			address: true,
			booking: { take: 10, orderBy: { booked_at: "desc" } },
			capacity: true,
			vacant_bed_log: { take: 10, orderBy: { last_updated: "desc" } },
			doctor: {
				select: doctorSelectParam,
			},
			staff: {
				where: {
					email: {
						not: query.user,
					},
				},
				select: {
					email: true,
					joined_on: true,
					last_updated: true,
					mobile_no: true,
					name: true,
					role: true,
					status: true,
				},
				orderBy: {
					joined_on: "desc",
				},
			},
			log: {
				take: 10,
				orderBy: { logged_at: "desc" },
				include: {
					staff: { select: { name: true, email: true, status: true } },
				},
			},
		},
	})

	if (query.user)
		retrievedData["user"] = (await prisma.staff.findUnique({
			where: {
				email: query.user,
			},
		})) as staff
	else
		retrievedData["user"] = {
			email: "lixnj2@example.com",
			joined_on: "2017-06-06T10:45:13.000Z",
			last_updated: "2009-02-12T03:24:54.000Z",
			mobile_no: "1557465755",
			name: "Ginger Lynch",
			role: "DB_Manager",
			status: "Active",
		}

	retrievedData["count"] = {
		["booking"]: {
			requested: 0,
			booked: 0,
			served: 0,
			cancelled: 0,
		},
	}

	for (const status of ["Requested", "Booked", "Served", "Cancelled"]) {
		retrievedData.count.booking[
			status.toLowerCase() as keyof typeof retrievedData.count.booking
		] = await prisma.booking.count({
			where: {
				registration_no: query.reg,
				AND: {
					status: status as booking_status,
				},
			},
		})
	}

	return {
		props: { retrievedData: JSON.stringify(mutateContactNumber(retrievedData)) },
	}
}

interface Log extends log {
	staff: { name: string; email: string; status: string }
}

interface RetrievedData extends hospital {
	address: address
	booking: booking[]
	capacity: capacity
	count: {
		booking: {
			requested: number
			booked: number
			served: number
			cancelled: number
		}
	}
	doctor: doctor[]
	log: Log[]
	staff: staff[]
	user: staff
	vacant_bed_log: vacant_bed_log[]
}

export interface DashboardProps {
	retrievedData: string
}

const Dashboard: React.FC<DashboardProps> = ({ retrievedData }) => {
	let hospital: RetrievedData = JSON.parse(retrievedData)

	const [loading, setLoading] = useState(false)

	console.log(hospital)

	// * employee management
	const [staff, setStaff] = useState(hospital.staff),
		filterStaff = (status: string = "Active") => {
			return staff.filter(el => {
				return el.status.indexOf(status) != -1
			})
		},
		[filteredStaff, setFilteredStaff] = useState(filterStaff()),
		[filteredStaffOnSearch, setFilteredStaffOnSearch] = useState(filterStaff()),
		[searchFieldName, setSearchFieldName] = useState("name"),
		[showAddStaff, setShowAddStaff] = useState(false),
		[OTP, setOTP] = useState(""),
		getStaffInputFieldData = (submit: boolean = false) => {
			let data: object = submit
				? {
						registration_no: hospital.registration_no,
						status: "Active",
						password: Crypto.randomBytes(5).toString("hex"), // 10 characters
				  }
				: {}

			$("#staffDataRow")
				.find("input[type=text], input[type=tel], input[type=email], select")
				.map((index, elem) => {
					submit
						? $(elem).attr("data-name") == "mobile_no"
							? (data[$(elem).attr("data-name")] = $(elem).val() as string)
							: (data[$(elem).attr("data-name")] = $(elem).val())
						: $(elem).attr("id") == "staffMobile"
						? (data[$(elem).attr("id")] = $(elem).val() as string)
						: (data[$(elem).attr("id")] = $(elem).val())
				})
			return data
		},
		[editStaffTuple, setEditStaffTuple] = useState(""),
		getStaffEditFieldData = (tupleId: string, email: string) => {
			let data: object = { email }

			$(`#${tupleId} input, #${tupleId} select`).map((ind, elem) => {
				$(elem).attr("data-name") == "role"
					? (data[$(elem).attr("data-name")] = $(elem).val().replace(" ", "_"))
					: (data[$(elem).attr("data-name")] = $(elem).val())
			})

			return data
		},
		populateStaffRow = (tr: staff, index: number) => {
			const populateForActiveStaffs = () => {
				return (
					<React.Fragment key={index}>
						{["name", "mobile_no", "email", "role", "status", "joined_on"].map(
							(td: string, index) => {
								return (
									<td
										className={td == "joined_on" ? "ps-0" : undefined}
										key={index}
									>
										{td == "joined_on" || td == "last_updated" ? (
											new Date(tr[td]).toUTCString()
										) : td == "name" ? (
											editStaffTuple == tr.mobile_no ? (
												<>
													<input
														type="text"
														className="w-100"
														placeholder="E.g.: Alice Milburn"
														onInput={e =>
															((e.target as HTMLInputElement).value = (
																e.target as HTMLInputElement
															).value.slice(0, 50))
														}
														onChange={e => {
															$(e.target).attr("value") == e.target.value
																? $("#btn_save_" + tr.mobile_no).addClass(
																		"disabled"
																  )
																: $("#btn_save_" + tr.mobile_no).removeClass(
																		"disabled"
																  )
														}}
														required
														data-name={td}
														defaultValue={tr[td as keyof staff] as string}
													/>
													<small
														className="d-block text-danger text-left mt-1 ps-1 fst-italic"
														style={{ fontSize: "0.73rem" }}
														id={tr.mobile_no + "_nameErr"}
													></small>
												</>
											) : (
												tr[td as keyof staff]
											)
										) : td == "mobile_no" ? (
											editStaffTuple == tr.mobile_no ? (
												<>
													<input
														type="tel"
														className="w-100"
														placeholder="E.g.: 01*********"
														onInput={e =>
															((e.target as HTMLInputElement).value = (
																e.target as HTMLInputElement
															).value.slice(0, 11))
														}
														onChange={e => {
															$(e.target).attr("value") == e.target.value
																? $("#btn_save_" + tr.mobile_no).addClass(
																		"disabled"
																  )
																: $("#btn_save_" + tr.mobile_no).removeClass(
																		"disabled"
																  )
														}}
														required
														data-name={td}
														defaultValue={tr[td as keyof staff] as string}
													/>
													<small
														className="d-block text-danger text-left mt-1 ps-1 fst-italic"
														style={{ fontSize: "0.73rem" }}
														id={tr.mobile_no + "_mobile_noErr"}
													></small>
												</>
											) : (
												tr[td as keyof staff]
											)
										) : td == "email" ? (
											// editTuple == tr.mobile_no ? (
											// 	<>
											// 		<input
											// 			type="email"
											// 			className="w-100"
											// 			placeholder="E.g.: 01*********"
											// 			onInput={e =>
											// 				(e.target.value = e.target.value.slice(0, 14))
											// 			}
											// 			required
											// 			data-name={td}
											// 			defaultValue={tr[td as keyof staff].toString()}
											// 		/>
											// 		<small
											// 			className="d-block text-danger text-left mt-1 ps-1"
											// 			id={tr.mobile_no + "_staffEmailErr"}
											// 		></small>
											// 	</>
											// ) : (
											tr[td as keyof staff]
										) : // )
										td == "role" ? (
											editStaffTuple == tr.mobile_no ? (
												<select
													className="form-select"
													defaultValue={tr[td as keyof staff] as string}
													data-name={td}
													onChange={e => {
														tr.role == e.target.value
															? $("#btn_save_" + tr.mobile_no).addClass(
																	"disabled"
															  )
															: $("#btn_save_" + tr.mobile_no).removeClass(
																	"disabled"
															  )
													}}
												>
													<option value="Admin">Admin</option>
													<option value="DB Manager">DB Manager</option>
													<option value="Moderator">Moderator</option>
												</select>
											) : (
												(tr[td as keyof staff] as string).replace("_", " ")
											)
										) : td == "status" ? (
											editStaffTuple == tr.mobile_no ? (
												<>
													<select
														className="form-select"
														defaultValue={tr[td as keyof staff] as string}
														data-name={td}
														onChange={e => {
															tr.status == e.target.value
																? $("#btn_save_" + tr.mobile_no).addClass(
																		"disabled"
																  )
																: $("#btn_save_" + tr.mobile_no).removeClass(
																		"disabled"
																  )
														}}
													>
														<option value="Active">Active</option>
														<option value="Inactive">Inactive</option>
													</select>
													<small
														className="text-danger fst-italic"
														style={{ fontSize: "0.73rem" }}
													>
														# irreversible change
													</small>
												</>
											) : (
												tr[td as keyof staff]
											)
										) : null}
									</td>
								)
							}
						)}
						<td className="ps-0 pe-2">
							<div className="btn-group w-100 animate__animated animate__fadeIn animate__slow">
								<button
									className="btn btn-sm btn-dark d-inline-block hvr-float"
									onClick={e => {
										setEditStaffTuple(
											editStaffTuple == tr.mobile_no ? "" : tr.mobile_no
										)
										$(".btn-save").addClass("disabled")
									}}
								>
									<i className="bi bi-pencil-square"></i>&nbsp;Edit
								</button>
								<button
									className={
										"btn btn-sm btn-primary d-inline-block hvr-float btn-save disabled"
									}
									id={"btn_save_" + tr.mobile_no}
									onClick={async e => {
										if ($(e.target).hasClass("disabled")) return

										// * update staff info block
										setLoading(true)
										await fetch("/api/updatehospitalstaff", {
											method: "POST",
											body: JSON.stringify(
												getStaffEditFieldData(tr.mobile_no, tr.email)
											),
											headers: {
												"content-type": "application/json",
											},
										})
											.then(response => response.json())
											.then(async res => {
												const fields = {
													name: false,
													mobile_no: false,
												}

												if (res.updated) {
													$(e.target).addClass("disabled")

													$("#btn_refresh").trigger("click")
												} else if (res.errors != undefined) {
													res.errors.map((error: string) => {
														fields[error.split(" ")[0] as keyof typeof fields] =
															true

														$(
															`#${tr.mobile_no}_${error.split(" ")[0]}Err`
														).text(error.replace("_no", ""))
													})
												}

												Object.keys(fields).map(error => {
													!fields[error as keyof typeof fields]
														? $(
																`#${tr.mobile_no}_${error.split(" ")[0]}Err`
														  ).text("")
														: null
												})
											})
											.catch(err => console.error(err))
										setLoading(false)
									}}
								>
									<i className="bi bi-file-earmark-check"></i>&nbsp;Save
								</button>
							</div>
						</td>
					</React.Fragment>
				)
			}

			return typeof window != "undefined"
				? $("#active input[type=radio]").is(":checked")
					? populateForActiveStaffs()
					: // * populate thead - inactive
					  [
							"name",
							"mobile_no",
							"email",
							"role",
							"joined_on",
							"last_updated",
							"action",
					  ].map((td: string, index) => {
							return (
								<td key={index}>
									{td == "joined_on" || td == "last_updated" ? (
										new Date(tr[td]).toUTCString()
									) : td == "role" ? (
										tr[td as keyof staff].toString().replace("_", " ")
									) : td == "action" ? (
										<button
											className="btn btn-sm btn-dark hvr-float animate__animated animate__fadeIn animate__slow"
											onClick={async e => {
												setLoading(true)

												await fetch("/api/deletehospitalstaff", {
													method: "POST",
													headers: { "content-type": "application/json" },
													body: JSON.stringify({ email: tr.email }),
												})
													.then(response => response.json())
													.then(res => {
														if (res.deleted) {
															$("#btn_refresh").trigger("click")

															Toast("Staff deleted", "primary", 1800)
														} else {
															Toast(
																"Could not delete staff! Try again.",
																"primary",
																1800
															)
														}
													})
													.catch(err => console.error(err))

												setLoading(false)
											}}
										>
											<i className="bi bi-trash"></i>&nbsp;Delete
										</button>
									) : (
										tr[td as keyof staff]
									)}
								</td>
							)
					  })
				: populateForActiveStaffs()
		}

	// * amenities & services management
	// const [amenity, setAmenity] = useState(hospital.amenity),
	// 	[newAmenity, setNewAmenity] = useState(hospital.amenity),
	// 	[generalService, setGeneralService] = useState(hospital.general_service),
	// 	[newGeneralService, setNewGeneralService] = useState(
	// 		hospital.general_service
	// 	),
	// 	[bloodAnalyticalService, setBloodAnalyticalService] = useState(
	// 		hospital.blood_analytical_service
	// 	),
	// 	[newBloodAnalyticalService, setNewBloodAnalyticalService] = useState(
	// 		hospital.blood_analytical_service
	// 	),
	// 	[diagnosticImagingService, setDiagnosticImagingService] = useState(
	// 		hospital.diagnostic_imaging_service
	// 	),
	// 	[newDiagnosticImagingService, setNewDiagnosticImagingService] = useState(
	// 		hospital.diagnostic_imaging_service
	// 	)

	// useEffect(() => {
	// 	const unsavedAmenity = !isObjectEqual(amenity, newAmenity),
	// 		unsavedGeneralService = !isObjectEqual(generalService, newGeneralService),
	// 		unsavedBloodAnalyticalService = !isObjectEqual(
	// 			bloodAnalyticalService,
	// 			newBloodAnalyticalService
	// 		),
	// 		unsavedDiagnosticImagingService = !isObjectEqual(
	// 			diagnosticImagingService,
	// 			newDiagnosticImagingService
	// 		)

	// 	// enabling save button if changes are made
	// 	if (!unsavedAmenity) $("#btn_amenity").addClass("disabled")
	// 	else if (unsavedAmenity) $("#btn_amenity").removeClass("disabled")

	// 	if (!unsavedGeneralService) $("#btn_general_service").addClass("disabled")
	// 	else if (unsavedGeneralService)
	// 		$("#btn_general_service").removeClass("disabled")

	// 	if (!unsavedBloodAnalyticalService)
	// 		$("#btn_blood_analytical_service").addClass("disabled")
	// 	else if (unsavedBloodAnalyticalService)
	// 		$("#btn_blood_analytical_service").removeClass("disabled")

	// 	if (!unsavedDiagnosticImagingService)
	// 		$("#btn_diagnostic_imaging_service").addClass("disabled")
	// 	else if (unsavedDiagnosticImagingService)
	// 		$("#btn_diagnostic_imaging_service").removeClass("disabled")

	// 	// // removing navigation event listener if changes are reverted
	// 	// if (
	// 	// 	!unsavedAmenity ||
	// 	// 	!unsavedGeneralService ||
	// 	// 	!unsavedBloodAnalyticalService ||
	// 	// 	!unsavedDiagnosticImagingService
	// 	// ) {
	// 	// 	$(
	// 	// 		"#offcanvasStart a, #offcanvasStart li, #offcanvasStart span, #offcanvasStart i"
	// 	// 	).off("click.new")
	// 	// }

	// 	// // adding event listener on unsaved changes and stopping navigation
	// 	// $("#offcanvasStart li").on("click.new", event => {
	// 	// 	if (
	// 	// 		unsavedAmenity ||
	// 	// 		unsavedGeneralService ||
	// 	// 		unsavedBloodAnalyticalService ||
	// 	// 		unsavedDiagnosticImagingService
	// 	// 	) {
	// 	// 		event.stopImmediatePropagation()

	// 	// 		Toast(
	// 	// 			"Unsaved changes persist! To proceed further, save them first or revert changes.",
	// 	// 			"warning",
	// 	// 			false
	// 	// 		)
	// 	// 	}
	// 	// })
	// }, [
	// 	newAmenity,
	// 	newGeneralService,
	// 	newBloodAnalyticalService,
	// 	newDiagnosticImagingService,
	// ]) // detecting changes

	useEffect(() => {
		// showing indeterminate in custom checkbox of services if null
		$("#amenities-and-services")
			.find("input[type=checkbox]")
			.map((index, elem) =>
				hospital[$(elem).attr("data-parent")][$(elem).attr("id")] == null
					? $(elem).prop("indeterminate", true)
					: null
			)
	}, [])

	// * doctors and schedule
	const [doctorList, setDoctorList] = useState(hospital.doctor)

	// * settings
	let base64image = "default"

	useEffect(() => {
		// * profile view handler
		// hospital profile view data generator
		const getProfileViewData = () => {
			let data = {
				hospital: {
					registration_no: hospital.registration_no,
				},
				address: { registration_no: hospital.registration_no },
			}

			$("#hospital_profile")
				.find("input, select")
				.map((index, elem) => {
					data[$(elem).attr("data-parent")][$(elem).attr("name")] =
						$(elem).val() == "" ? null : $(elem).val()
				})

			return data as typeof profileViewData
		}

		$("#hospital_profile")
			.find("input, select")
			.on("input", e => {
				setNewProfileData(getProfileViewData())
			})

		// populating division select list from api call
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
			let optionsHtml = `<option value="null" hidden>Select Division...</option>`
			response.data.map((elem: any, index: number) => {
				optionsHtml += `<option value="${elem.division}" ${
					elem.division == hospital.address.division ? "selected" : null
				}>${elem.division}</option>`
			})
			$("#hospital_division").html(optionsHtml)
		})

		// populating district select list from api call
		$.ajax({
			async: true,
			crossDomain: true,
			url: `https://bdapi.p.rapidapi.com/v1.1/division/${hospital.address.division}`,
			method: "GET",
			headers: {
				"x-rapidapi-key": process.env.NEXT_PUBLIC_BDAPI_KEY,
				"x-rapidapi-host": "bdapi.p.rapidapi.com",
			},
		}).done(function (response) {
			let optionsHtml = `<option value="null" hidden selected>Select District...</option>`
			response.data.map((element: any) => {
				optionsHtml += `<option value="${element.district}" ${
					element.district == hospital.address.district ? "selected" : null
				}>${element.district}</option>`
			})
			$("#hospital_district").html(optionsHtml)
		})

		// * capacity view handler
		// capacity checkbox checked/unchecked setter
		$("#hospital_capacity")
			.find("input[type=checkbox]")
			.map((index, elem) => {
				$(elem).attr(
					"checked",
					hospital.capacity[$(elem).attr("data-name") as keyof capacity]
				)
			})

		// capacity value & enabled/disabled setter
		$("#hospital_capacity")
			.find("input[type=number]")
			.map((index, elem) => {
				$(elem).val(
					hospital.capacity[
						$(elem).attr("data-name") as keyof capacity
					] as number
				)

				$(elem).attr("min", "1")

				$(elem).parent().prev().children("input[type=checkbox]").is(":checked")
					? $(elem).removeAttr("disabled")
					: null
			})

		// enable/disable input fields on checkbox click
		$("#hospital_capacity")
			.find("input[type=checkbox]")
			.on("click", e => {
				const inputField = $(e.target)
					.parent()
					.next()
					.children("input[type=number]")

				if ($(e.target).is(":checked")) {
					$(inputField).removeAttr("disabled")
					$(inputField).val("1")
				} else {
					$(inputField).attr("disabled", "true")
					$(inputField).val("")
				}

				$(inputField).trigger("input")
			})

		// hospital capacity view data generator
		const getCapacityViewData = () => {
			let data = {
				registration_no: hospital.registration_no,
				total_capacity: (() => {
					let sum = 0
					$("#hospital_capacity")
						.find("input[type=number]")
						.map((ind, elem) => {
							sum += parseInt(
								$(elem).val() == "" ? "0" : ($(elem).val() as string)
							)
						})
					return sum
				})(),
			}

			$("#hospital_capacity")
				.find("input[type=number]")
				.map((index, elem) => {
					data[$(elem).attr("data-name")] =
						$(elem).val() == "" ? null : parseInt($(elem).val() as string)
				})

			return data as capacity
		}

		$("#hospital_capacity")
			.find("input[type=number]")
			.on("input", e => {
				setNewCapacity(getCapacityViewData())
			})

		// * user view handler
		// hospital profile view data generator
		const getUserViewData = () => {
			let data = {
				registration_no: hospital.registration_no,
			}

			$("#hospital_user")
				.find("input")
				.map((index, elem) => {
					if (!$(elem).attr("disabled") && !$(elem).attr("readonly"))
						// excluding uneditable fields
						$(elem).attr("name") == "password"
							? $(elem).hasClass("is-valid")
								? (data[$(elem).attr("name")] = $(elem).val())
								: null
							: $(elem).attr("name") == "mobile_no"
							? (data[$(elem).attr("name")] = $(elem).val() as string)
							: (data[$(elem).attr("name")] =
									$(elem).val() == "" ? null : $(elem).val())
				})

			return data
		}

		$("#hospital_user")
			.find("input")
			.on("input", e => {
				setNewUserData(getUserViewData() as typeof userViewData)
			})

		$("#offcanvasStartContent > ul > li").on("click", e => {
			var bsOffcanvas = new bootstrap.Offcanvas(
				document.getElementById("offcanvasStart")
			)

			bsOffcanvas.hide()
		})
	}, [])

	const profileViewData = {
			hospital: {
				registration_no: hospital.registration_no,
				hospital_name: hospital.hospital_name,
				hospital_type: hospital.hospital_type,
				website: hospital.website,
			},
			address: {
				registration_no: hospital.registration_no,
				street_address: hospital.address.street_address,
				district: hospital.address.district,
				division: hospital.address.division,
				phone_no: hospital.address.phone_no,
				mobile_no: hospital.address.mobile_no,
				latitude: hospital.address.latitude,
				longitude: hospital.address.longitude,
			},
		},
		[profileData, setProfileData] = useState(profileViewData),
		[newProfileData, setNewProfileData] = useState(profileViewData),
		[capacity, setCapacity] = useState(hospital.capacity),
		[newCapacity, setNewCapacity] = useState(hospital.capacity),
		[passwordChangeViewIsVisible, setPasswordChangeViewIsVisible] =
			useState(false),
		userViewData = {
			registration_no: hospital.registration_no,
			name: hospital.user.name,
			email: hospital.user.email,
			mobile_no: hospital.user.mobile_no,
			// role: hospital.user.role,
		},
		[userData, setUserData] = useState(userViewData),
		[newUserData, setNewUserData] = useState(userViewData)

	useEffect(() => {
		isObjectEqual(profileData, newProfileData)
			? $("#btn_profile").addClass("disabled")
			: $("#btn_profile").removeClass("disabled")

		isObjectEqual(capacity, newCapacity)
			? $("#btn_capacity").addClass("disabled")
			: $("#btn_capacity").removeClass("disabled")

		isObjectEqual(userData, newUserData)
			? $("#btn_user").addClass("disabled")
			: $("#btn_user").removeClass("disabled")
	}, [newProfileData, newCapacity, newUserData])

	return (
		<>
			<Head>
				<title>Dashboard | Admin Panel</title>
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

									router.replace(`/admin`)
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
						<div className="mt-2 text-white text-center h3">Admin Panel</div>
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
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft"
										href="#employees"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "200ms" }}
									>
										<i className="bi bi-people-fill h4 me-2 my-auto"></i>
										Employees
									</a>
								</li>
								{/* <li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft"
										href="#amenities-and-services"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "300ms" }}
									>
										<i className="bi bi-tools h4 my-auto"></i>
										<i
											className="bi bi-shop-window h5 me-2 mb-n3"
											style={{ zIndex: -1, marginLeft: "-7px" }}
										></i>
										Amenities &amp; Services
									</a>
								</li> */}
								<li className="nav-item bg-dark">
									<a
										className="nav-link d-flex justify-content-start align-items-center rounded-0 border-right-0 animate__animated animate__fadeInLeft active"
										href="#doctors-and-schedule"
										data-bs-toggle="tab"
										role="tab"
										style={{ animationDelay: "400ms" }}
									>
										<i className="bi bi-person-bounding-box h4 my-auto"></i>
										<i
											className="bi bi-calendar2-week h5 me-2 mb-n3"
											style={{ zIndex: -1, marginLeft: "-7px" }}
										></i>
										Doctors &amp; Schedule
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
								{/* <li
									className="nav-item bg-dark"
									data-bs-toggle="modal"
									data-bs-target="#logoutModal"
								>
									<span
										className="nav-link d-flex justify-content-start align-items-center animate__animated animate__fadeInLeft"
										style={{ animationDelay: "600ms" }}
										id="btn-logout"
									>
										<i className="bi bi-box-arrow-right h4 me-2 my-auto"></i>
										Logout
									</span>
								</li> */}
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
									{hospital.hospital_name} | Admin Panel
								</h6>
							</div>
							<div className="mx-auto mx-md-0 mt-3 mt-md-0 ps-2">
								<small className="">{hospital.user.name}</small>
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
							<div
								className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 mx-0 mt-n3 px-2 py-4"
								style={{ backgroundColor: "aliceblue" }}
							>
								{Object.keys(hospital.count.booking).map((elem, index) => {
									return (
										<React.Fragment key={index}>
											<div className="col p-1">
												<div className="card card-stats shadow border rounded">
													<div className="card-body">
														<div className="row">
															<div className="col-5 col-md-4 p-0 d-flex justify-content-center align-items-center">
																<div className="h1 text-center text-info">
																	{index == 0 ? (
																		<i className="bi bi-journal-medical"></i>
																	) : index == 1 ? (
																		<i className="bi bi-journal-bookmark-fill"></i>
																	) : index == 2 ? (
																		<i className="bi bi-journal-check"></i>
																	) : (
																		<i className="bi bi-journal-x"></i>
																	)}
																</div>
															</div>
															<div className="col-7 col-md-8 text-center">
																<h5 className="card-title">
																	{elem.replace(
																		/(?:^\w|[A-Z]|\b\w)/g,
																		(ltr, idx) => ltr.toUpperCase()
																	)}
																</h5>
																<span className="fs-1 fw-light">
																	{
																		hospital.count.booking[
																			elem as keyof typeof hospital.count.booking
																		]
																	}
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</React.Fragment>
									)
								})}
							</div>
						</div>
						<div className="tab-pane fade" id="employees" role="tabpanel">
							<div className="container">
								<div className="d-flex">
									<div
										className="btn-group btn-group-sm btn-group-toggle d-flex"
										style={{ flex: "auto" }}
										role="group"
										data-bs-toggle="buttons"
									>
										<label
											className="btn btn-primary animate__animated animate__zoomIn active"
											id="active"
											onClick={e => {
												setFilteredStaff(filterStaff())
												setFilteredStaffOnSearch(filterStaff())

												setEditStaffTuple("")
											}}
										>
											<input
												className="btn-check"
												type="radio"
												name="options"
												defaultChecked={true}
											/>
											Active
										</label>
										<label
											className="btn btn-warning animate__animated animate__zoomIn"
											id="inactive"
											onClick={e => {
												setFilteredStaff(filterStaff("Inactive"))
												setFilteredStaffOnSearch(filterStaff("Inactive"))
											}}
										>
											<input
												className="btn-check"
												type="radio"
												name="options"
											/>
											Inactive
										</label>
									</div>
									<div className="">
										<button
											className="btn btn-sm btn-info ms-1 hvr-grow"
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title="Refresh List"
											onClick={async e => {
												// * refresh button action
												$("#btn_refresh_employee_spinner").addClass("rotate")

												await fetch("/api/getupdatedstaffs", {
													method: "GET",
													headers: {
														"content-type": "application/json",
														"x-registration-no": hospital.registration_no,
														"x-user-email": hospital.user.email,
													},
												})
													.then(response => response.json())
													.then(res => {
														setStaff(res)

														$("#inactive input[type=radio]").is(":checked")
															? $("#inactive").trigger("click")
															: $("#active").trigger("click")

														$("#btn_refresh_employee_spinner").removeClass(
															"rotate"
														)

														Toast(`Staff list refreshed!`, "primary", 1800)
													})
													.catch(err => console.error(err))
											}}
										>
											<i
												className="bi bi-arrow-repeat h6 d-inline-block mb-0"
												id={"btn_refresh_employee_spinner"}
											></i>
										</button>
										<button
											className="btn btn-sm btn-dark ms-1 hvr-grow"
											id="addStaff"
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title="Add New Staff"
											onClick={() => {
												setShowAddStaff(!showAddStaff)
												setOTP("")
											}}
										>
											<i className="bi bi-person-plus-fill h6"></i>
										</button>
									</div>
								</div>
								<div className="my-3">
									<form
										onSubmit={e => {
											e.stopPropagation()
											e.preventDefault()
										}}
									>
										<div className="form-group row">
											<div className="col-12 col-lg-6 col-xl-7 animate__animated animate__fadeInDown">
												<input
													type="search"
													placeholder="Search employees"
													className={
														hospital.staff.length == 0
															? "form-control form-control-sm disabled"
															: "form-control form-control-sm"
													}
													id="searchStaffs"
													onChange={event => {
														setFilteredStaffOnSearch(
															filteredStaff.filter(staff => {
																return searchFieldName == "joined_on"
																	? new Date(
																			staff[
																				searchFieldName as keyof typeof staff
																			]
																	  )
																			.toUTCString()
																			.toLowerCase()
																			.indexOf(
																				event.target.value.toLowerCase()
																			) != -1
																	: staff[searchFieldName as keyof typeof staff]
																			.toString()
																			.toLowerCase()
																			.indexOf(
																				event.target.value.toLowerCase()
																			) != -1
															})
														)
													}}
													onClick={() => {
														// resetting table tuple if in edit mode
														setEditStaffTuple("")
														$(".btn-save").addClass("disabled")
													}}
												/>
											</div>
											<div
												className="col-12 col-lg-6 col-xl-5 animate__animated animate__fadeInUp mt-2 mt-lg-0 d-flex justify-content-around"
												id="searchType"
											>
												<div className="form-check form-check-inline">
													<input
														type="radio"
														id="name"
														name="radioInline"
														className="form-check-input"
														onClick={e => {
															setSearchFieldName(
																(e.target as HTMLInputElement).id
															)
															$("#searchStaffs").trigger("focus")
														}}
														defaultChecked={true}
													/>
													<label
														className="form-check-label ms-1"
														htmlFor="name"
													>
														name
													</label>
												</div>
												<div className="form-check form-check-inline">
													<input
														type="radio"
														id="mobile_no"
														name="radioInline"
														className="form-check-input"
														onClick={e => {
															setSearchFieldName(
																(e.target as HTMLInputElement).id
															)
															$("#searchStaffs").trigger("focus")
														}}
													/>
													<label
														className="form-check-label ms-1"
														htmlFor="mobile_no"
													>
														mobile
													</label>
												</div>
												<div className="form-check form-check-inline">
													<input
														type="radio"
														id="email"
														name="radioInline"
														className="form-check-input"
														onClick={e => {
															setSearchFieldName(
																(e.target as HTMLInputElement).id
															)
															$("#searchStaffs").trigger("focus")
														}}
													/>
													<label
														className="form-check-label ms-1"
														htmlFor="email"
													>
														email
													</label>
												</div>
												<div className="form-check form-check-inline">
													<input
														type="radio"
														id="joined_on"
														name="radioInline"
														className="form-check-input"
														onClick={e => {
															setSearchFieldName(
																(e.target as HTMLInputElement).id
															)
															$("#searchStaffs").trigger("focus")
														}}
													/>
													<label
														className="form-check-label ms-1"
														htmlFor="joined_on"
													>
														joined on
													</label>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							{showAddStaff ? (
								<div className="table-responsive mt-5 mb-5 px-lg-5 px-md-3 px-2 animate__animated animate__fadeIn">
									<h5>Add New Staff</h5>
									<table className="table">
										<thead className="thead-dark text-center">
											<tr>
												<th>Name *</th>
												<th>Mobile *</th>
												<th>Email *</th>
												<th>Role *</th>
												{OTP != "" ? (
													<th className="animate__animated animate__fadeIn">
														OTP *
													</th>
												) : null}
												<th>Action</th>
											</tr>
										</thead>
										<tbody className="text-center">
											<tr id="staffDataRow">
												<td>
													<input
														type="text"
														className="w-100"
														id="staffName"
														placeholder="E.g.: Alice Milburn"
														onInput={e =>
															((e.target as HTMLInputElement).value = (
																e.target as HTMLInputElement
															).value.slice(0, 50))
														}
														required
														data-name="name"
													/>
													<small
														className="d-block text-danger text-left mt-1 ps-1"
														id="staffNameErr"
													></small>
												</td>
												<td>
													<input
														type="tel"
														className="w-100"
														id="staffMobile"
														placeholder="E.g.: 01*********"
														onInput={e =>
															((e.target as HTMLInputElement).value = (
																e.target as HTMLInputElement
															).value.slice(0, 11))
														}
														required
														data-name="mobile_no"
													/>
													<small
														className="d-block text-danger text-left mt-1 ps-1"
														id="staffMobileErr"
													></small>
												</td>
												<td>
													<input
														type="email"
														className="w-100"
														id="staffEmail"
														placeholder="E.g.: example@domain.com"
														onInput={e =>
															((e.target as HTMLInputElement).value = (
																e.target as HTMLInputElement
															).value.slice(0, 50))
														}
														required
														data-name="email"
													/>
													<small
														className="d-block text-danger text-left mt-1 ps-1"
														id="staffEmailErr"
													></small>
												</td>
												<td className="input-group input-group-sm">
													<select
														className="form-select"
														id="staffRole"
														onChange={e => {
															$("#btn_addStaff").removeClass("disabled")
														}}
														data-name="role"
													>
														<option value={"null"} hidden>
															Choose...
														</option>
														<option value="Admin">Admin</option>
														<option value="DB_Manager">DB Manager</option>
														<option value="Moderator">Moderator</option>
													</select>
												</td>
												{OTP != "" ? (
													<td className="animate__animated animate__fadeIn">
														<div className="code_group">
															<input
																type="number"
																className="form-control"
																min="0"
																max="9"
																id="d-1"
																onInput={e => {
																	;(e.target as HTMLInputElement).value
																		.length == 1
																		? $("#d-2").trigger("focus")
																		: null
																}}
															/>
															<input
																type="number"
																className="form-control"
																min="0"
																max="9"
																id="d-2"
																onInput={e => {
																	;(e.target as HTMLInputElement).value
																		.length == 1
																		? $("#d-3").trigger("focus")
																		: null
																}}
															/>
															<input
																type="number"
																className="form-control"
																min="0"
																max="9"
																id="d-3"
																onInput={e => {
																	;(e.target as HTMLInputElement).value
																		.length == 1
																		? $("#d-4").trigger("focus")
																		: null
																}}
															/>
															<input
																type="number"
																className="form-control"
																min="0"
																max="9"
																id="d-4"
																onChange={async e => {
																	const enteredOTP =
																		($("#d-1").val() as string) +
																		$("#d-2").val() +
																		$("#d-3").val() +
																		$("#d-4").val()

																	if (OTP == enteredOTP) {
																		setOTP("")
																		$("#otpErr").text("")

																		// * new staff addition block
																		await fetch("/api/addhospitalstaff", {
																			method: "POST",
																			body: JSON.stringify(
																				getStaffInputFieldData(true)
																			),
																			headers: {
																				"content-type": "application/json",
																				"x-fields-validated": "true",
																			},
																		})
																			.then(response => response.json())
																			.then(async res => {
																				// * on new staff addition success
																				if (res != null) {
																					// loading spinner
																					setLoading(true)

																					if (
																						await sendEmail(
																							res.email,
																							"Staff Login Credentials",
																							`This email is automatically generated from internal system of Quick Hospitalization, do not reply. 
           																					An account has been created for you as '${res.role.replace(
																											"_",
																											" "
																										)}' to access the dashboard functionalities
																							at https://${window.location.host}/admin. Mobile '${
																								res.mobile_no
																							}' & password '${res.password}'
																							are your login credentials. You are advised to change your password immediately after login.`
																						)
																					) {
																						// * on new staff addition & credentials sent success
																						Toast(
																							"Staff added and the credentials have been sent to the provided email.",
																							"primary",
																							5000
																						)

																						// resetting input fields & enabling 'Add Staff' button
																						$("#staffDataRow")
																							.find(
																								"input[type=text], input[type=tel], input[type=email], select"
																							)
																							.map((index, elem) => {
																								$(elem).attr("id") ==
																								"staffRole"
																									? $(elem).html($(elem).html())
																									: $(elem).val("")
																							})
																						$("#btn_addStaff").removeClass(
																							"disabled"
																						)
																					}
																					// * on new staff addition success but credentials sending failure
																					else {
																						Toast(
																							`Staff added but the credentials could not send to the provided email. 
																							Recovering the staff's password is advised.`,
																							"warning",
																							5000
																						)
																					}

																					setLoading(false)
																				}
																				// * on new staff addition failure
																				else {
																					Toast(
																						"Could not add the staff! Please try again.",
																						"warning"
																					)
																					$("#btn_addStaff").removeClass(
																						"disabled"
																					)
																				}
																			})
																			.catch(err => console.error(err))
																	} else {
																		$("#otpErr").text("Invalid OTP!")
																	}
																}}
															/>
														</div>
														<small
															className="d-block text-danger text-left mt-1 ps-1"
															id="otpErr"
														></small>
													</td>
												) : null}
												<td>
													<button
														className="btn btn-sm btn-primary disabled"
														id="btn_addStaff"
														onClick={async e => {
															if ($("#btn_addStaff").hasClass("disabled"))
																return

															let otp

															// field data validation
															await fetch("/api/addhospitalstaff", {
																method: "POST",
																body: JSON.stringify(getStaffInputFieldData()),
																headers: {
																	"content-type": "application/json",
																},
															})
																.then(response => response.json())
																.then(async res => {
																	const fieldHasError = {}

																	Object.keys(getStaffInputFieldData()).map(
																		fieldName => {
																			fieldHasError[fieldName] = false
																		}
																	)

																	// show error text
																	if (res.errors != undefined) {
																		res.errors.map((error: string) => {
																			$(
																				"#" +
																					Object.keys(
																						getStaffInputFieldData()
																					).filter(el => {
																						return (
																							el.indexOf(error.split(" ")[0]) !=
																							-1
																						)
																					})[0] +
																					"Err"
																			).text(error.replace("staff", ""))

																			fieldHasError[error.split(" ")[0]] = true
																		})
																	}

																	// hide error text upon validation
																	Object.keys(getStaffInputFieldData()).map(
																		fieldName => {
																			if (!fieldHasError[fieldName])
																				$("#" + fieldName + "Err").text("")
																		}
																	)

																	// * send OTP upon server side validation
																	if (res.validated) {
																		$("#btn_addStaff_spinner").removeClass(
																			"d-none"
																		)

																		otp = Math.floor(
																			1000 + Math.random() * 9000
																		)

																		setOTP(otp.toString())
																		console.log(otp)

																		if (
																			await sendOTP(
																				$("#staffEmail").val() as string,
																				"Staff Email Verification",
																				otp
																			)
																		) {
																			setOTP(otp.toString())

																			Toast(
																				`An OTP has been sent to the provided staff email, input OTP and verify.`,
																				"primary",
																				7000
																			)

																			$("#btn_addStaff").addClass("disabled")
																		} else {
																			Toast(
																				`Couldn't send OTP at the moment. Check your internet connectivity, please try again later.`,
																				"warning",
																				5000
																			)
																		}

																		$("#btn_addStaff_spinner").addClass(
																			"d-none"
																		)
																	}
																})
																.catch(err => console.error(err))
														}}
													>
														<span
															className="spinner-border spinner-border-sm d-none"
															id="btn_addStaff_spinner"
														></span>
														&nbsp;Add Staff
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							) : null}
							<div className="table-responsive px-lg-5 px-md-3 px-2 animate__animated animate__fadeIn animate__slow">
								<table
									className="table table-striped table-hover bg-light rounded-3 shadow border-primary"
									id="staffDataTable"
								>
									<caption>
										<small>
											<i>
												Showing {filteredStaffOnSearch.length}&nbsp;of&nbsp;
												{filteredStaff.length} entries
											</i>
										</small>
									</caption>
									<thead className="table-dark text-center">
										<tr>
											{typeof window != "undefined"
												? $("#active input[type=radio]").is(":checked")
													? // * populate thead - active
													  [
															"name",
															"mobile_no",
															"email",
															"role",
															"status",
															"joined_on",
															"action",
													  ].map((th: string, index) => {
															return (
																<th key={index}>
																	{th
																		.split("_")
																		.join(" ")
																		.replace(" no", "")
																		.replace(
																			/(?:^\w|[A-Z]|\b\w)/g,
																			(ltr, idx) => ltr.toUpperCase()
																		)}
																</th>
															)
													  })
													: // * populate thead - inactive
													  [
															"name",
															"mobile_no",
															"email",
															"role",
															"joined_on",
															"last_updated",
															"Action",
													  ].map((th: string, index) => {
															return (
																<th key={index}>
																	{th
																		.split("_")
																		.join(" ")
																		.replace(" no", "")
																		.replace(
																			/(?:^\w|[A-Z]|\b\w)/g,
																			(ltr, idx) => ltr.toUpperCase()
																		)}
																</th>
															)
													  })
												: // * populate thead - active
												  [
														"name",
														"mobile_no",
														"email",
														"role",
														"status",
														"joined_on",
														"action",
												  ].map((th: string, index) => {
														return (
															<th key={index}>
																{th
																	.split("_")
																	.join(" ")
																	.replace(" no", "")
																	.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
																		ltr.toUpperCase()
																	)}
															</th>
														)
												  })}
										</tr>
									</thead>
									<tbody className="text-center">
										{filteredStaffOnSearch.map((tr: staff, index: number) => {
											return (
												<tr
													className={
														tr?.status == "Active"
															? "table-active"
															: "table-secondary text-secondary"
													}
													id={tr?.mobile_no}
													key={index}
												>
													{populateStaffRow(tr, index)}
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
						{/* <div
							className="tab-pane fade"
							id="amenities-and-services"
							role="tabpanel"
						>
							<div className="container">
								<div
									className="card rounded-3 shadow mb-5 animate__animated animate__fadeIn"
									style={{ animationDelay: "100ms" }}
								>
									<h5 className="card-header">Amenities</h5>
									<div
										className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 mx-0 card-body"
										id="amenities"
									>
										{Object.keys(hospital.amenity)
											.filter((el: any) => el.indexOf("registration_no") == -1)
											.map((amenityType, index) => {
												return (
													<React.Fragment key={index}>
														<div className="col form-check my-2">
															<input
																type="checkbox"
																className="form-check-input"
																data-parent={"amenity"}
																id={amenityType}
																defaultChecked={
																	hospital.amenity[amenityType as keyof amenity]
																		? true
																		: false
																}
																onClick={e => {
																	const data = {
																		registration_no: hospital.registration_no,
																	}

																	$("#amenities")
																		.find("input[type=checkbox]")
																		.map(
																			(index, elem) =>
																				(data[$(elem).attr("id")] =
																					$(elem).is(":checked"))
																		)

																	setNewAmenity(data as amenity)
																}}
															/>
															<label
																className="form-check-label ms-2"
																htmlFor={amenityType}
															>
																{
																	amenityType.replace("_", " ").toUpperCase()
																	// .replace("_", " ")
																	// .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
																	// 	ltr.toUpperCase()
																	// )
																}
															</label>
														</div>
													</React.Fragment>
												)
											})}
									</div>
									<div className="card-footer d-flex justify-content-end py-1">
										<button
											className="btn btn-sm btn-primary disabled"
											id={"btn_amenity"}
											onClick={async e => {
												//  update hospital amenities
												if ($("#btn_amenity").hasClass("disabled")) return

												$("#btn_amenity_spinner").removeClass("d-none")

												await fetch("/api/updatehospitalamenities", {
													method: "POST",
													body: JSON.stringify(newAmenity),
													headers: {
														"content-type": "application/json",
														"x-service-type": "amenity",
													},
												})
													.then(response => response.json())
													.then(res => {
														if (res["clientVersion"] == undefined) {
															$("#btn_amenity_spinner").addClass("d-none")
															$(e.target).addClass("disabled")

															setAmenity(res)

															Toast("Amenities updated!")
														} else {
															$("#btn_amenity_spinner").addClass("d-none")

															Toast("Amenities update failed!", "danger", false)
														}

														console.table(res)
													})
													.catch(err => console.error(err))
											}}
										>
											<span
												className="spinner-border spinner-border-sm d-none"
												id={"btn_amenity_spinner"}
											></span>
											&nbsp;Save Changes
										</button>
									</div>
								</div>
								{[
									"general_service",
									"blood_analytical_service",
									"diagnostic_imaging_service",
								].map((serviceType: string, serviceTypeIndex) => {
									const annotationDataSet = {
										general_service: {
											emg: "Electromyography",
										},
										blood_analytical_service: {
											cbc: "Complete Blood Count",
											crp: "C-Reactive Protein",
											esr: "Erythrocyte Sedimentation Rate",
											fobt: "Fecal Occult Blood Test",
											rf: "Rheumatoid Factor",
											sr: "Sedimentation Rate",
										},
										diagnostic_imaging_service: {
											cta: "Computed Tomography Angiography",
											ct: "Computed Tomography",
											mra: "Magnetic Resonance Angiography",
											mri: "Magnetic Resonance Imaging",
											mrs: "Magnetic Resonance Spectroscopy",
											pet: "Positron Emission Tomography",
											spect: "Single-Photon Emission Computed Tomography",
										},
									}

									return (
										<React.Fragment key={serviceTypeIndex}>
											<div
												className="card rounded-3 shadow mb-5 animate__animated animate__fadeIn"
												style={
													serviceTypeIndex == 0
														? { animationDelay: "300ms" }
														: serviceTypeIndex == 1
														? { animationDelay: "500ms" }
														: {}
												}
											>
												<h5 className="card-header">
													{serviceType
														.split("_")
														.join(" ")
														// .toUpperCase()
														.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
															ltr.toUpperCase()
														) + "s"}
												</h5>
												<div
													className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 mx-0 card-body"
													id={serviceType}
												>
													{Object.keys(
														hospital[serviceType as keyof typeof hospital]
													)
														.filter(
															(el: any) => el.indexOf("registration_no") == -1
														)
														.map((service, index) => {
															return (
																<React.Fragment key={index}>
																	<div className="col form-check my-2">
																		<input
																			type="checkbox"
																			defaultChecked={
																				hospital[serviceType][service]
																					? true
																					: false
																			}
																			data-parent={serviceType}
																			className="form-check-input"
																			id={service}
																			onClick={e => {
																				const data = {
																					[serviceType]: {
																						registration_no:
																							hospital.registration_no,
																					},
																				}

																				$("#" + $(e.target).attr("data-parent"))
																					.find("input[type=checkbox]")
																					.map(
																						(index, elem) =>
																							(data[serviceType][
																								$(elem).attr("id")
																							] = $(elem).is(":checked"))
																					)

																				if (
																					Object.keys(data)[0] ===
																					"general_service"
																				) {
																					setNewGeneralService(
																						data[serviceType] as general_service
																					)
																				} else if (
																					Object.keys(data)[0] ===
																					"blood_analytical_service"
																				) {
																					setNewBloodAnalyticalService(
																						data[
																							serviceType
																						] as blood_analytical_service
																					)
																				} else if (
																					Object.keys(data)[0] ===
																					"diagnostic_imaging_service"
																				) {
																					setNewDiagnosticImagingService(
																						data[
																							serviceType
																						] as diagnostic_imaging_service
																					)
																				}
																			}}
																		/>
																		<label
																			htmlFor={service}
																			className="form-check-label ms-2"
																		>
																			{service
																				.split("_")
																				.join(" ")
																				.toUpperCase()}
																		</label>

																		{Object.keys(annotationDataSet)[
																			serviceTypeIndex
																		] == serviceType
																			? Object.keys(
																					annotationDataSet[
																						serviceType as keyof typeof annotationDataSet
																					]
																			  ).map((serviceElem, index) => {
																					return serviceElem == service ? (
																						<AnnotationToggler
																							textContent={
																								annotationDataSet[serviceType][
																									service
																								]
																							}
																							textColor="text-info"
																							key={index}
																						/>
																					) : null
																			  })
																			: null}
																	</div>
																</React.Fragment>
															)
														})}
												</div>
												<div className="card-footer d-flex justify-content-end py-1">
													<button
														className="btn btn-sm btn-primary disabled"
														id={"btn_" + serviceType}
														onClick={e => {
															// update hospital services
															if ($("#btn_" + serviceType).hasClass("disabled"))
																return

															const types = {
																	general_service: newGeneralService,
																	blood_analytical_service:
																		newBloodAnalyticalService,
																	diagnostic_imaging_service:
																		newDiagnosticImagingService,
																},
																saveChanges = async (
																	serviceType: string,
																	value:
																		| general_service
																		| blood_analytical_service
																		| diagnostic_imaging_service
																) => {
																	$(
																		"#btn_" + serviceType + "_spinner"
																	).removeClass("d-none")

																	await fetch("/api/updatehospitalservices", {
																		method: "POST",
																		body: JSON.stringify(value),
																		headers: {
																			"content-type": "application/json",
																			"x-service-type": `${serviceType}`,
																		},
																	})
																		.then(response => response.json())
																		.then(res => {
																			if (res["clientVersion"] == undefined) {
																				$(
																					"#btn_" + serviceType + "_spinner"
																				).addClass("d-none")
																				$(e.target).addClass("disabled")

																				if (serviceType === "general_service") {
																					setGeneralService(
																						res as general_service
																					)
																				} else if (
																					serviceType ===
																					"blood_analytical_service"
																				) {
																					setBloodAnalyticalService(
																						res as blood_analytical_service
																					)
																				} else if (
																					serviceType ===
																					"diagnostic_imaging_service"
																				) {
																					setDiagnosticImagingService(
																						res as diagnostic_imaging_service
																					)
																				}

																				Toast(
																					`${
																						serviceType
																							.split("_")
																							.join(" ")
																							.replace(
																								/(?:^\w|[A-Z]|\b\w)/g,
																								(ltr, idx) => ltr.toUpperCase()
																							) + "s"
																					} updated!`
																				)
																			} else {
																				$(
																					"#btn_" + serviceType + "_spinner"
																				).addClass("d-none")

																				Toast(
																					`${
																						serviceType
																							.split("_")
																							.join(" ")
																							.replace(
																								/(?:^\w|[A-Z]|\b\w)/g,
																								(ltr, idx) => ltr.toUpperCase()
																							) + "s"
																					} update failed!`,
																					"danger",
																					false
																				)
																			}

																			console.table(res)
																		})
																		.catch(err => console.error(err))
																}

															for (const type of Object.keys(types)) {
																if (type.match(serviceType)) {
																	saveChanges(
																		type,
																		types[type as keyof typeof types]
																	)
																	break
																}
															}
														}}
													>
														<span
															className="spinner-border spinner-border-sm d-none"
															id={"btn_" + serviceType + "_spinner"}
														></span>
														&nbsp;Save Changes
													</button>
												</div>
											</div>
										</React.Fragment>
									)
								})}
							</div>
						</div> */}
						<div
							className="tab-pane fade show active"
							id="doctors-and-schedule"
							role="tabpanel"
						>
							<div className="container">
								<form
									className="form-floating"
									style={{ maxWidth: "21rem" }}
									onSubmit={e => {
										e.preventDefault()
										e.stopPropagation()
									}}
								>
									<h3>Add a doctor profile</h3>
									<div className="form-floating my-2">
										<input
											type="text"
											className="form-control"
											id="doctor_id"
											placeholder="E.g.: d123456789"
											required
											onFocusCapture={e =>
												((e.target as HTMLInputElement).value = "d")
											}
											onInput={e =>
												((e.target as HTMLInputElement).value =
													"d" +
													(e.target as HTMLInputElement).value.slice(1, 10))
											}
										/>
										<label htmlFor="id">Doctor ID *</label>
									</div>
									<div className="form-floating">
										<input
											type="email"
											className="form-control"
											id="doctor_email"
											placeholder="E.g.: example@domain.com"
											required
											onInput={e =>
												((e.target as HTMLInputElement).value = (
													e.target as HTMLInputElement
												).value.slice(0, 50))
											}
										/>
										<label htmlFor="email">Work Email *</label>
									</div>
									<small className="text-danger" id="addDoctorErr"></small>
									<div className="d-flex justify-content-end">
										<button
											className="btn btn-sm btn-outline-dark mt-2"
											onClick={async () => {
												setLoading(true)

												await fetch("/api/adddoctor", {
													method: "POST",
													headers: {
														"content-type": "application/json",
														"x-registration-no": hospital.registration_no,
													},
													body: JSON.stringify({
														id: $("#doctor_id").val(),
														email: $("#doctor_email").val(),
													}),
												})
													.then(response => response.json())
													.then(async res => {
														console.log(res)
														setLoading(false)

														if (res.message != undefined)
															$("#addDoctorErr").text(res.message)
														else {
															$("#addDoctorErr").text("")

															setDoctorList(res)

															Toast(
																"Profile added to database. Doctor can now signup and update their profile.",
																"primary",
																6000
															)

															// confirmation email sending block
															if (
																await sendEmail(
																	res.email,
																	`Eligible to signup for ${hospital.hospital_name}`,
																	`Your profile has been added to the database of ${hospital.hospital_name} and is currently inactive. 
																You can now signup, set up your schedule and continue curing patients. Head on to https://www.quickhospitalization.org/doctor/signup in order to signup.`
																)
															)
																Toast("Confirmation email sent to the email!")
															else
																Toast(
																	"Confirmation email could not be sent at the moment.",
																	"warning"
																)
														}
													})
													.catch(error => console.error(error))

												setLoading(false)
											}}
										>
											Add Doctor
										</button>
									</div>
								</form>
								<div className="mt-4 mb-2 d-flex justify-content-between align-items-center">
									<h2 className="">Doctors</h2>
									<span className="">
										<button
											className="btn btn-sm btn-info hvr-grow"
											data-bs-toggle="tooltip"
											data-bs-placement="bottom"
											title="Refresh List"
											onClick={async e => {
												// * refresh button action
												$("#btn_refresh_doctor_spinner").addClass("rotate")

												await fetch("/api/getdoctorlist", {
													method: "GET",
													headers: {
														"content-type": "application/json",
														"x-registration-no": hospital.registration_no,
													},
												})
													.then(response => response.json())
													.then(res => {
														setDoctorList(res)

														$("#btn_refresh_doctor_spinner").removeClass(
															"rotate"
														)

														Toast(`Doctor list refreshed!`, "primary", 1800)
													})
													.catch(err => console.error(err))
											}}
										>
											<i
												className="bi bi-arrow-repeat h6"
												id="btn_refresh_doctor_spinner"
											></i>
										</button>
									</span>
								</div>
								<div className="table-responsive">
									<table className="table table-sm table-striped table-bordered table-hover">
										<thead>
											<tr className="text-center">
												<th>ID</th>
												<th>Email</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											{doctorList.map((doctorTuple, index) => {
												return (
													<tr key={index}>
														{["id", "email", "status"].map((key, ind) => {
															if (key == "email") {
																return doctorTuple.status == "Active" ? (
																	<td key={ind}>
																		<a
																			href={`mailto:${doctorTuple[
																				key
																			].toString()}`}
																		>
																			{doctorTuple[key].toString()}
																		</a>
																	</td>
																) : (
																	<td key={ind} className="text-secondary">
																		{doctorTuple[key].toString()}
																	</td>
																)
															} else if (
																doctorTuple.status == "Inactive" &&
																key == "status"
															)
																return (
																	<td key={ind} className="text-secondary">
																		{doctorTuple[key].toString()}
																	</td>
																)
															else if (key == "id")
																return (
																	<td
																		key={ind}
																		className="font-monospace d-flex justify-content-between align-items-center"
																	>
																		<span>{doctorTuple[key].toString()}</span>
																		<button className="btn btn-sm btn-outline-dark px-1 py-0">
																			Details
																		</button>
																	</td>
																)
															else
																return (
																	<td key={ind}>
																		{doctorTuple[key].toString()}
																	</td>
																)
														})}
													</tr>
												)
											})}
										</tbody>
										<tfoot></tfoot>
										<caption>{hospital.doctor.length} entries</caption>
									</table>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="activity" role="tabpanel">
							<div className="table-responsive px-lg-5 px-md-3 px-2 animate__animated animate__fadeIn animate__slow">
								<table
									className="table table-striped table-hover bg-light rounded-3 shadow"
									id="logDataTable"
								>
									<caption>
										<small>
											<i>
												Showing {hospital.log.length}&nbsp;of&nbsp;
												{hospital.log.length} entries
											</i>
										</small>
									</caption>
									<thead className="table-dark text-center">
										<tr>
											<th>Logged At</th>
											<th>Name</th>
											<th>Mobile</th>
											<th>Email</th>
											<th>Role</th>
											<th>Status</th>
											<th>Task</th>
										</tr>
									</thead>
									<tbody className="text-center">
										{hospital.log.map((tr, outerIndex) => {
											return (
												<tr
													className="table-active"
													id={tr.mobile_no}
													key={outerIndex}
												>
													{[
														"logged_at",
														"name",
														"mobile_no",
														"email",
														"role",
														"status",
														"task",
													].map((td, innerIndex) => {
														if (td == "logged_at") {
															return (
																<td key={innerIndex}>
																	{new Date(tr[td]).toUTCString()}
																</td>
															)
														} else if (td == "name" || td == "status") {
															return <td key={innerIndex}>{tr["staff"][td]}</td>
														} else if (td == "email") {
															return (
																<td key={innerIndex}>
																	<a
																		href={`mailto:${tr["staff"][td]}`}
																		target="_blank"
																	>
																		{tr["staff"][td]}
																	</a>
																</td>
															)
														} else if (td == "mobile_no") {
															return (
																<td key={innerIndex}>
																	{tr[td as keyof typeof tr]}
																</td>
															)
														} else if (td == "role") {
															return (
																<td key={innerIndex}>
																	{tr[td as keyof typeof tr]
																		.toString()
																		.replace("_", " ")}
																</td>
															)
														} else {
															return (
																<td key={innerIndex}>
																	{tr[td as keyof typeof tr]}
																</td>
															)
														}
													})}
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="tab-pane fade" id="settings" role="tabpanel">
							<div className="container">
								<form
									onSubmit={e => {
										e.preventDefault()
										e.stopPropagation()
									}}
								>
									<div className="card border-0 mb-5 bg-transparent">
										<fieldset
											className="bg-white shadow-sm rounded animate__animated animate__fadeIn"
											style={{ animationDelay: "100ms" }}
										>
											<h5 className="card-header">Profile</h5>
											<div className="card-body" id="hospital_profile">
												<div className="row row-cols-md-3 row-cols-sm-2 row-cols-1">
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_hospital_name"
														>
															Name *
														</label>
														<input
															type="text"
															className="form-control"
															id="hospital_hospital_name"
															data-parent="hospital"
															name="hospital_name"
															placeholder="E.g.: United Hospital Ltd."
															defaultValue={hospital.hospital_name}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 100))
															}
															required
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_registration_no"
														>
															Registration
														</label>
														<input
															type="text"
															className="form-control"
															id="hospital_registration_no"
															data-parent="hospital"
															name="registration_no"
															placeholder="E.g.: 1*2*3*4*5*"
															defaultValue={hospital.registration_no}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 10))
															}
															disabled
															readOnly
														/>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_hospital_type"
														>
															Type *
														</label>
														<select
															className="form-select"
															id="hospital_hospital_type"
															data-parent="hospital"
															name="hospital_type"
															defaultValue={hospital.hospital_type}
															required
														>
															<option value="Public">Public</option>
															<option value="Private">Private</option>
														</select>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_website"
														>
															Website #
														</label>
														<input
															type="url"
															className="form-control"
															id="hospital_website"
															data-parent="hospital"
															name="website"
															placeholder="E.g.: www.example.com"
															defaultValue={hospital.website}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 255))
															}
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_phone_no"
														>
															Phone #
														</label>
														<input
															type="tel"
															className="form-control"
															id="hospital_phone_no"
															data-parent="address"
															name="phone_no"
															placeholder="E.g.: 023456712"
															defaultValue={
																hospital.address.phone_no == null
																	? ""
																	: hospital.address.phone_no
															}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 11))
															}
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_mobile_no"
														>
															Mobile #
														</label>
														<input
															type="tel"
															className="form-control"
															id="hospital_mobile_no"
															data-parent="address"
															name="mobile_no"
															placeholder="E.g.: 01*********"
															defaultValue={
																hospital.address.mobile_no == null
																	? ""
																	: hospital.address.mobile_no
															}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 11))
															}
														/>
														<small className="invalid-feedback"></small>
													</div>
												</div>
												<div className="row row-cols-3 mb-3">
													<div className="col">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_latitude"
														>
															Latitude $
														</label>
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
															className="form-control"
															id="hospital_latitude"
															data-parent="address"
															name="latitude"
															placeholder="E.g.: 23.80665"
															defaultValue={hospital.address.latitude?.toString()}
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_longitude"
														>
															Longitude $
														</label>
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
															className="form-control"
															id="hospital_longitude"
															data-parent="address"
															name="longitude"
															placeholder="E.g.: 90.679456"
															defaultValue={hospital.address.longitude?.toString()}
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col d-flex">
														<button
															className="btn btn-sm btn-dark mt-auto mb-1 mx-auto mx-md-0"
															style={{ fontSize: "0.85rem" }}
															onClick={() => {
																navigator.geolocation
																	? navigator.geolocation.getCurrentPosition(
																			position => {
																				$("#coordinateErr").text("")
																				$(
																					"#hospital_latitude, #hospital_longitude"
																				)
																					.next("small")
																					.text("")

																				$("#hospital_latitude").val(
																					position.coords.latitude
																						.toString()
																						.slice(0, 10)
																				)
																				$("#hospital_longitude").val(
																					position.coords.longitude
																						.toString()
																						.slice(0, 10)
																				)

																				$("#hospital_latitude").trigger("input")
																			},
																			error =>
																				$("#coordinateErr").html(error.message)
																	  )
																	: $("#coordinateErr").text(
																			`Your browser doesn\'t support geolocation. Try inputting manually.`
																	  )
															}}
														>
															<i className="bi bi-geo-alt"></i>
															&nbsp;Get Position
														</button>
													</div>
													<small
														className="text-danger fst-italic ms-1 mt-1"
														id="coordinateErr"
													></small>
												</div>
												<div className="row mt-n1">
													<div className="col-12 col-md-4 mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_street_address"
														>
															Street Address *
														</label>
														<input
															type="text"
															className="form-control"
															id="hospital_street_address"
															data-parent="address"
															name="street_address"
															placeholder="Street address of the hospital"
															defaultValue={hospital.address.street_address}
															required
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col-6 col-md-4 mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_division"
														>
															Division *
														</label>
														<select
															className="form-select"
															id="hospital_division"
															data-parent="address"
															name="division"
															required
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
																		optionsHtml += `<option value="${element.district}">${element.district}</option>`
																	})
																	$("#hospital_district").html(optionsHtml)
																})
															}}
														>
															<option value="null" hidden>
																Select Division
															</option>
														</select>
													</div>
													<div className="col-6 col-md-4 mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_district"
														>
															District *
														</label>
														<select
															className="form-select"
															id="hospital_district"
															data-parent="address"
															name="district"
															required
														>
															<option value="null" hidden>
																Select District
															</option>
														</select>
													</div>
												</div>
											</div>
											<div className="card-footer d-flex justify-content-end py-1">
												<div className="text-info me-auto pe-2">
													<small className="me-2 mb-1 d-inline-block">
														* - required
													</small>
													<small className="me-2 mb-1 d-inline-block">
														# - either one is required
													</small>
													<small className="me-2 mb-1 d-inline-block">
														$ - optional
													</small>
												</div>
												<button
													className="btn btn-sm btn-primary disabled"
													id="btn_profile"
													onClick={async e => {
														if ($(e.target).hasClass("disabled")) return

														$("#btn_profile_spinner").removeClass("d-none")

														await fetch("/api/updatehospitalprofile", {
															method: "POST",
															headers: { "content-type": "application/json" },
															body: JSON.stringify({
																profileData,
																newProfileData,
															}),
														})
															.then(response => response.json())
															.then(res => {
																$("#hospital_profile")
																	.find("input, select")
																	.map((index, elem) => {
																		if (
																			!$(elem).attr("disabled") &&
																			!$(elem).attr("readonly")
																		)
																			$(elem)
																				.addClass("is-valid")
																				.removeClass("is-invalid")
																	})

																if (res.errors != undefined) {
																	res.errors.map((error: string) => {
																		$(
																			"#hospital_" +
																				error.split(".")[1].split(" ")[0]
																		)
																			.addClass("is-invalid")
																			.removeClass("is-valid")
																			.next("small")
																			.text(
																				error
																					.split(".")[1]
																					.replace("_no", "")
																					.replace("_", " ")
																			)
																	})
																} else if (res.updated) {
																	setProfileData(newProfileData)
																	$("#btn_profile").addClass("disabled")
																	Toast(
																		"Profile updated successfully!",
																		"primary",
																		1800
																	)

																	$("#hospital_profile")
																		.find("input, select")
																		.map((index, elem) => {
																			$(elem).removeClass("is-valid is-invalid")
																		})
																}
															})
															.catch(err => console.error(err))
														$("#btn_profile_spinner").addClass("d-none")
													}}
												>
													<span
														className="spinner-border spinner-border-sm d-none"
														id="btn_profile_spinner"
													></span>
													&nbsp;Save Changes
												</button>
											</div>
										</fieldset>
										<fieldset
											className="mt-5 bg-white shadow-sm rounded animate__animated animate__fadeIn"
											style={{ animationDelay: "300ms" }}
										>
											<h5 className="card-header">Description &amp; Avatar</h5>
											<div className="card-body">
												<div className="row">
													<div className="col mb-3 my-auto">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_image"
														>
															Avatar $
														</label>
														<Image
															// todo fix image path
															// src={hospital.image_source}
															src={"/media/hospital-building-3.jpg"}
															width={1280}
															height={780}
															id="hospital_image"
															priority
														/>

														<div className="input-group">
															<input
																type="file"
																className="form-control"
																id="hospital_image_source"
																data-parent="hospital"
																name="image_source"
																accept="image/jpeg, image/png"
																onChange={event => {
																	if (event.target.files?.length == 1) {
																		$("#imageErr").text("")

																		const file = event.target.files[0],
																			reader = new FileReader()

																		reader.readAsDataURL(file)
																		reader.onloadend = () => {
																			base64image = reader.result as string
																			$("#hospital_image").attr(
																				"srcset",
																				reader.result as string
																			)
																		}
																	} else {
																		$("#imageErr").text(
																			"No image file chosen, default image will be displayed!"
																		)

																		$("#hospital_image").attr(
																			"srcset",
																			hospital.image_source
																		)

																		base64image = "default"
																	}
																}}
															/>
															<label
																className="input-group-text"
																htmlFor="hospital_image_source"
															>
																Upload
															</label>
														</div>
														<small
															className="d-block text-danger ms-1 mt-1"
															id="imageErr"
														></small>
													</div>
													<div className="col m-auto">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="hospital_description"
														>
															Description $
														</label>
														<textarea
															className="form-control"
															style={{ fontSize: "0.85rem" }}
															id="hospital_description"
															data-parent="hospital"
															name="description"
															placeholder="Provide a brief description of the hospital."
															defaultValue={hospital.description}
															rows={7}
															autoComplete="true"
															spellCheck
														></textarea>
														<small className="invalid-feedback"></small>
													</div>
												</div>
											</div>
											<div className="card-footer d-flex justify-content-end py-1">
												<div className="text-info me-auto">
													<small className="me-2 mb-1">$ - optional</small>
												</div>
												<button
													className="btn btn-sm btn-primary disabled"
													id="btn_description"
													onClick={() => {}}
												>
													<span
														className="spinner-border spinner-border-sm d-none"
														id="btn_description_spinner"
													></span>
													&nbsp;Save Changes
												</button>
											</div>
										</fieldset>
										<fieldset className="mt-5 bg-white shadow-sm rounded">
											<h5 className="card-header">Capacity</h5>
											<div className="card-body">
												<div
													className="row row-cols-xl-6 row-cols-md-4 row-cols-2"
													data-parent="capacity"
													id="hospital_capacity"
												>
													<BedTypeInputFields />
												</div>
											</div>
											<div className="card-footer d-flex justify-content-end py-1">
												<div className="text-info me-auto pe-2">
													<small className="me-2 mb-1 d-inline-block">
														Total capacity:&nbsp;
														<span className="fw-bolder">
															{newCapacity.total_capacity}
														</span>
													</small>
												</div>
												<button
													className="btn btn-sm btn-primary disabled"
													id="btn_capacity"
													onClick={async e => {
														if ($(e.target).hasClass("disabled")) return

														$("#btn_capacity_spinner").removeClass("d-none")

														await fetch("/api/updatehospitalcapacity", {
															method: "POST",
															headers: {
																"content-type": "application/json",
															},
															body: JSON.stringify({
																capacity,
																newCapacity,
															}),
														})
															.then(response => response.json())
															.then(res => {
																Toast(
																	"Hospital capacity updated successfully!",
																	"primary",
																	1800
																)

																setCapacity(newCapacity)

																$(e.target).addClass("disabled")
															})
															.catch(err => console.error(err))

														$("#btn_capacity_spinner").addClass("d-none")
													}}
												>
													<span
														className="spinner-border spinner-border-sm d-none"
														id="btn_capacity_spinner"
													></span>
													&nbsp;Save Changes
												</button>
											</div>
										</fieldset>
										<fieldset className="mt-5 bg-white shadow-sm rounded">
											<h5 className="card-header">User</h5>
											<div className="card-body">
												<div
													className="row row-cols-1 row-cols-sm-2"
													id="hospital_user"
												>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="staff_name"
														>
															Name *
														</label>
														<input
															type="text"
															className="form-control"
															id="staff_name"
															data-parent="staff"
															name="name"
															placeholder="E.g.: Alice Milburn"
															defaultValue={hospital.user.name}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 50))
															}
															required
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="staff_email"
														>
															Email *
														</label>
														<input
															type="email"
															className="form-control"
															id="staff_email"
															data-parent="staff"
															name="email"
															placeholder="E.g.: example@domain.com"
															defaultValue={hospital.user.email}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 50))
															}
															required
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="staff_mobile_no"
														>
															Mobile *
														</label>
														<input
															type="tel"
															className="form-control"
															id="staff_mobile_no"
															data-parent="staff"
															name="mobile_no"
															placeholder="E.g.: 01*********"
															defaultValue={hospital.user.mobile_no}
															onInput={e =>
																((e.target as HTMLInputElement).value = (
																	e.target as HTMLInputElement
																).value.slice(0, 11))
															}
															required
														/>
														<small className="invalid-feedback"></small>
													</div>
													<div className="col mb-3">
														<label
															className="text-primary"
															style={{ fontSize: "0.9rem" }}
															htmlFor="staff_role"
														>
															Role
														</label>
														<input
															type="text"
															className="form-control"
															id="staff_role"
															data-parent="staff"
															name="role"
															defaultValue={hospital.user.role.replace(
																"_",
																" "
															)}
															disabled
															readOnly
														/>
														<small className="invalid-feedback"></small>
													</div>
												</div>
												{passwordChangeViewIsVisible ? (
													<div className="row row-cols-1 row-cols-sm-2 mb-1 animate__animated animate__fadeIn">
														<div className="col mb-3">
															<label
																className="text-primary"
																style={{ fontSize: "0.9rem" }}
																htmlFor="staff_password"
															>
																<i className="bi bi-pencil-square"></i>
																&nbsp;Change Password
															</label>
															<input
																type="password"
																className="form-control"
																id="staff_password"
																data-parent="staff"
																name="password"
																placeholder="New password"
																onKeyDown={e => {
																	e.code == "Backspace"
																		? $(e.target).trigger("input")
																		: null
																}}
																onInput={e => {
																	;(e.target as HTMLInputElement).value = (
																		e.target as HTMLInputElement
																	).value.slice(0, 25)

																	if (
																		($(e.target).val() as string)?.length < 4
																	) {
																		$(e.target).addClass("is-invalid")

																		$("#staffPasswordErr").text(
																			"Password too short! Should be between 4 - 25 characters."
																		)
																		return
																	} else {
																		$(e.target).removeClass("is-invalid")
																		$("#staffPasswordErr").text("")
																	}

																	const input = $(e.target)
																		.parent()
																		.next()
																		.children("input[type=password]")
																		.removeClass("is-valid is-invalid")
																		.val("")
																	return
																	if (
																		input.val() ==
																		(e.target as HTMLInputElement).value
																	)
																		$("#btn_save_password").removeClass(
																			"disabled"
																		)
																	else
																		$("#btn_save_password").addClass("disabled")
																}}
															/>
														</div>
														<div className="col mt-auto mb-3">
															<input
																type="password"
																className="form-control"
																data-parent="staff"
																name="password"
																placeholder="Confirm new password"
																onInput={e => {
																	;(e.target as HTMLInputElement).value = (
																		e.target as HTMLInputElement
																	).value.slice(0, 25)

																	const input = $(e.target)
																		.parent()
																		.prev()
																		.children("input[type=password]")

																	if (input.val() == "") return

																	if ((input.val() as string)?.length < 4)
																		return

																	if (
																		input.val() !=
																		(e.target as HTMLInputElement).value
																	) {
																		input.removeClass("is-valid")
																		$(e.target).addClass("is-invalid")

																		$("#staffPasswordErr").text(
																			"Passwords do not match!"
																		)

																		$("#btn_save_password").addClass("disabled")
																	} else {
																		input.addClass("is-valid")
																		$(e.target).removeClass("is-invalid")
																		$(e.target).addClass("is-valid")

																		$("#staffPasswordErr").text("")

																		$("#btn_save_password").removeClass(
																			"disabled"
																		)
																	}
																}}
															/>
														</div>
														<small
															className="text-danger ms-1 mw-100"
															style={{ flex: "none" }}
															id="staffPasswordErr"
														></small>
													</div>
												) : null}
												<button
													className="btn btn-sm btn-dark me-1"
													onClick={e => {
														setPasswordChangeViewIsVisible(
															!passwordChangeViewIsVisible
														)
													}}
												>
													Change Password
												</button>
												{passwordChangeViewIsVisible ? (
													<button
														className="btn btn-sm btn-info disabled animate__animated animate__fadeIn"
														id="btn_save_password"
														onClick={async e => {
															if ($(e.target).hasClass("disabled")) return

															setLoading(true)

															await fetch("/api/updatehospitaluser", {
																method: "POST",
																headers: {
																	"content-type": "application/json",
																	"x-action-update-password": "true",
																},
																body: JSON.stringify({
																	// todo implement encryption
																	newPassword: $("#staff_password").val(),
																	email: userData.email,
																}),
															})
																.then(response => response.json())
																.then(res => {
																	Toast(
																		"User password updated successfully!",
																		"primary",
																		1800
																	)
																	setPasswordChangeViewIsVisible(false)
																})
																.catch(err => console.error(err))

															setLoading(false)
														}}
													>
														Save Password
													</button>
												) : null}
											</div>
											<div className="card-footer d-flex justify-content-end py-1">
												<div className="text-info me-auto">
													<small className="me-2 mb-1">* - required</small>
												</div>
												<button
													className="btn btn-sm btn-primary disabled"
													id="btn_user"
													onClick={async e => {
														if ($(e.target).hasClass("disabled")) return

														$("#btn_user_spinner").removeClass("d-none")

														await fetch("/api/updatehospitaluser", {
															method: "POST",
															headers: { "content-type": "application/json" },
															body: JSON.stringify({
																userData,
																newUserData,
															}),
														})
															.then(response => response.json())
															.then(res => {
																$("#hospital_user")
																	.find("input")
																	.map((index, elem) => {
																		if (
																			!$(elem).attr("disabled") &&
																			!$(elem).attr("readonly")
																		)
																			$(elem)
																				.addClass("is-valid")
																				.removeClass("is-invalid")
																	})

																if (res.errors != undefined) {
																	res.errors.map((error: string) => {
																		$("#staff_" + error.split(" ")[0])
																			.addClass("is-invalid")
																			.removeClass("is-valid")
																			.next("small")
																			.text(
																				error
																					.replace("_no", "")
																					.replace("_", "")
																			)
																	})
																} else if (res.updated) {
																	setUserData(newUserData)
																	$("#btn_user").addClass("disabled")
																	Toast(
																		"User updated successfully!",
																		"primary",
																		1800
																	)

																	$("#hospital_user")
																		.find("input")
																		.map((index, elem) => {
																			$(elem).removeClass("is-valid is-invalid")
																		})
																}
															})
															.catch(err => console.error(err))
														$("#btn_user_spinner").addClass("d-none")
													}}
												>
													<span
														className="spinner-border spinner-border-sm d-none"
														id="btn_user_spinner"
													></span>
													&nbsp;Save Changes
												</button>
											</div>
										</fieldset>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default Dashboard
