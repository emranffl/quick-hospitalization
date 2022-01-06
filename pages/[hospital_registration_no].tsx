import { prisma } from "@functionalities/DB/prismaInstance"
import {
	address,
	booking_bed_type,
	booking_booked_for,
	booking_sex,
	capacity,
	hospital,
	user,
	vacant_bed_log,
} from "@prisma/client"
import Image from "next/image"
import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import $ from "jquery"
import router from "next/router"
import { BedTypes, Links, Sex } from "@app"
import Crypto from "crypto"
import Loader from "@components/Loader"
import { mutateContactNumber } from "@functionalities/mutateObjects"
import { UserContext } from "@contexts/user"

export const getServerSideProps = async ({ params }: any) => {
	let retrievedData: hospital | null | any = await prisma.hospital.findUnique({
		where: { registration_no: params.hospital_registration_no },
		include: {
			address: true,
			capacity: true,
			vacant_bed_log: { orderBy: { last_updated: "desc" }, take: 1 },
		},
	})

	if (retrievedData == null)
		return {
			redirect: {
				destination: "/404",
				permanent: false,
			},
		}

	retrievedData = {
		...retrievedData,
		vacant_bed_log: retrievedData.vacant_bed_log[0],
	}

	return {
		props: {
			hospitalInfo: JSON.stringify(mutateContactNumber(retrievedData)),
		},
	}
}

interface HospitalInfo {
	registration_no: string
	hospital_name: string
	description: string
	hospital_type: string
	bed_type: string
	image_source: string
	joined_on: string
	address: address
	capacity: capacity
	vacant_bed_log: vacant_bed_log
}

export interface HospitalInfoProps {
	hospitalInfo: string
}

const HospitalInfo: React.FC<HospitalInfoProps> = ({ hospitalInfo }) => {
	const hospital: HospitalInfo = JSON.parse(hospitalInfo),
		[loading, setLoading] = useState(false),
		placeModeMapSrc =
			!hospital.address.latitude || !hospital.address.longitude
				? // when either (or both) of them is null, search by name
				  "https://www.google.com/maps/embed/v1/place?key=" +
				  process.env.NEXT_PUBLIC_GMAPS_KEY +
				  "&q=" +
				  hospital.hospital_name.replace(/ /g, "+") +
				  "&zoom=16"
				: "https://www.google.com/maps/embed/v1/place?key=" +
				  process.env.NEXT_PUBLIC_GMAPS_KEY +
				  "&q=" +
				  hospital.address.latitude +
				  "," +
				  hospital.address.longitude +
				  "&zoom=16",
		[mapSrc, setMapSrc] = useState(placeModeMapSrc),
		[bookingForSelf, setBookingForSelf] = useState(true),
		[selectedBedType, setSelectedBedType] = useState<booking_bed_type | null>(
			null
		),
		{ userContext } = useContext(UserContext)

	console.log(hospital.address, placeModeMapSrc)

	return (
		<>
			<Head>
				<title>{hospital.hospital_name + " | Quick Hospitalization"}</title>
			</Head>
			{userContext ? (
				<section
					className="modal fade"
					id="bookingModal"
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
								<h5 className="modal-title">Booking</h5>
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
											<div className="col-lg">
												<div className="form-floating">
													<select
														className="form-select"
														id="bookingFor"
														onInput={e => {
															if (
																(e.target as HTMLSelectElement).value ==
																booking_booked_for.Self
															) {
																setBookingForSelf(true)
																$("#patientName").val(userContext.name)
																$("#patientSex").val(userContext.sex)
															} else {
																setBookingForSelf(false)
																$("#patientName").val("")
																$("#patientSex").val("null")
															}
														}}
														required
													>
														{Object.keys(booking_booked_for).map(
															(elem, index) => {
																return (
																	<option
																		key={index}
																		value={
																			booking_booked_for[
																				elem as keyof typeof booking_booked_for
																			]
																		}
																	>
																		{
																			booking_booked_for[
																				elem as keyof typeof booking_booked_for
																			]
																		}
																	</option>
																)
															}
														)}
													</select>
													<label htmlFor="bookingFor">Booking For</label>
												</div>
											</div>
											<div className="col-lg-5">
												<div className="form-floating">
													<input
														type="text"
														className="form-control"
														id="patientName"
														placeholder="Patient's Name"
														defaultValue={
															bookingForSelf ? userContext.name : ""
														}
														disabled={bookingForSelf ? true : false}
														readOnly={bookingForSelf ? true : false}
														required
													/>
													<label htmlFor="patientName">Name</label>
													<small className="ml-1 text-danger invalid-feedback"></small>
												</div>
											</div>
											<div className="col-lg">
												<div className="form-floating">
													<select
														className="form-select"
														id="patientSex"
														defaultValue={userContext.sex}
														disabled={bookingForSelf ? true : false}
														required
													>
														<option value="null" hidden>
															Select Gender...
														</option>
														{Object.keys(booking_sex).map((elem, index) => {
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
									</fieldset>
								</form>
							</div>
							<div className="modal-footer py-1">
								<button
									type="button"
									className="btn btn-sm btn-primary"
									onClick={async () => {
										setLoading(true)

										await fetch("/api/registerbooking", {
											method: "POST",
											body: JSON.stringify({
												id:
													"b" +
													Crypto.randomBytes(5)
														.toString("hex")
														.toUpperCase()
														.substring(0, 9),
												user_mobile_no: userContext.mobile_no,
												name: $("#patientName").val(),
												sex: $("#patientSex").val(),
												bed_type: selectedBedType,
												booked_for: $("#bookingFor").val(),
												registration_no: hospital.registration_no,
												status: "Requested",
											}),
											headers: {
												"content-type": "application/json",
											},
										})
											.then(response => response.json())
											.then(res => {
												setLoading(false)
												router.push(`/booking?id=${res.id}`, `/booking`)
											})

											.catch(err => console.error(err))

										setLoading(false)
									}}
								>
									Confirm Booking
								</button>
							</div>
						</div>
					</div>
				</section>
			) : null}
			{loading ? <Loader /> : null}
			<main className="container">
				<div className="row">
					<div className="col-12 col-md-5">
						<Image
							src={"/media/hospital-building-2.jpg"}
							width="390"
							height="220"
							layout="responsive"
							priority
						/>
					</div>
					<div className="col-12 col-md-7">
						<h3>{hospital.hospital_name}</h3>
						<div className="mt-4 d-grid gap-2">
							<div>
								<span
									className="fw-light h5 me-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="Type"
								>
									<i className="bi bi-info-lg"></i>
								</span>
								<span className="text-secondary">{hospital.hospital_type}</span>
							</div>
							<div>
								<span
									className="fw-light h6 me-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="Address"
								>
									<i className="bi bi-geo-alt-fill"></i>
								</span>
								<span className="text-secondary">
									{`${hospital.address.street_address}, ${hospital.address.district}, ${hospital.address.division}`}
								</span>
							</div>
							<div>
								<span
									className="fw-light h6 me-2"
									data-bs-toggle="tooltip"
									data-bs-placement="bottom"
									title="Contacts"
								>
									<i className="bi bi-telephone-fill"></i>
								</span>
								<span className="text-secondary">
									{hospital.address.phone_no == null
										? hospital.address.mobile_no
										: hospital.address.mobile_no == null
										? hospital.address.phone_no
										: `${hospital.address.mobile_no}, ${hospital.address.phone_no}`}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<h4>Book now</h4>
					{/* // todo show booking status for booked */}
					<div className="mt-2 mx-0 row row-cols-2 row-cols-md-3 row-cols-lg-4">
						{[
							"ward",
							"special_ward",
							"cabin",
							"vip_cabin",
							"icu",
							"ccu",
							"hdu",
							"hfncu",
							"emergency",
							"covidu",
							"extra",
						].map((bedType, key) => {
							return hospital.vacant_bed_log[
								bedType as keyof typeof hospital.vacant_bed_log
							] == null ? null : (
								<div
									className="
											d-flex
											justify-content-center
											align-items-center
											col
											p-1
										"
									key={key}
								>
									<button
										className={
											(hospital.vacant_bed_log[
												bedType as keyof typeof hospital.vacant_bed_log
											] as number) <= 5
												? hospital.vacant_bed_log[
														bedType as keyof typeof hospital.vacant_bed_log
												  ] == 0
													? "btn btn-outline-danger w-100 disabled"
													: "btn btn-outline-warning text-dark w-100"
												: "btn btn-outline-primary w-100"
										}
										data-bs-toggle={userContext ? "modal" : null}
										data-bs-target={userContext ? "#bookingModal" : null}
										onClick={() => {
											userContext
												? setSelectedBedType(
														BedTypes[
															bedType as keyof typeof BedTypes
														] as typeof selectedBedType
												  )
												: router.push(
														`${Links.App.login}?redirect=${router.asPath}`,
														Links.App.login
												  )
										}}
									>
										{bedType.replace("_", " ").toUpperCase()}
										<span className="d-block">
											{
												hospital.vacant_bed_log[
													bedType as keyof typeof hospital.vacant_bed_log
												]
											}
										</span>
									</button>
								</div>
							)
						})}
					</div>
				</div>
				<div className="mt-4 shadow rounded bg-white">
					<nav className="position-relative">
						<div
							className="nav nav-tabs justify-content-start justify-content-md-center"
							id="nav-tab"
							role="tablist"
						>
							<a
								className="nav-link border-0 mb-0 active"
								data-bs-toggle="tab"
								href="#nav-location"
								role="tab"
								aria-selected="false"
							>
								Location
							</a>
							<a
								className="nav-link border-0"
								data-bs-toggle="tab"
								href="#nav-description"
								role="tab"
								aria-selected="false"
							>
								Description
							</a>
						</div>
						<div
							className="form-check form-switch position-absolute top-0 end-0 ps-0 mt-2 me-2"
							style={{
								backgroundColor: "rgba(256, 256, 256, 0.85)",
								backdropFilter: "blur(8px)",
							}}
						>
							<input
								className="form-check-input"
								type="checkbox"
								role="switch"
								id="mode"
								onChange={e => {
									navigator.geolocation
										? navigator.geolocation.getCurrentPosition(
												position => {
													// switching map views
													e.target.checked
														? setMapSrc(
																!hospital.address.latitude ||
																	!hospital.address.longitude
																	? // when either (or both) of them is null, search by name
																	  "https://www.google.com/maps/embed/v1/directions?key=" +
																			process.env.NEXT_PUBLIC_GMAPS_KEY +
																			"&origin=" +
																			position.coords.latitude +
																			"," +
																			position.coords.longitude +
																			"&destination=" +
																			hospital.hospital_name.replace(
																				/ /g,
																				"+"
																			) +
																			"&mode=driving&units=metric"
																	: "https://www.google.com/maps/embed/v1/directions?key=" +
																			process.env.NEXT_PUBLIC_GMAPS_KEY +
																			"&origin=" +
																			position.coords.latitude +
																			"," +
																			position.coords.longitude +
																			"&destination=" +
																			hospital.address.latitude +
																			"," +
																			hospital.address.longitude +
																			"&mode=driving&units=metric"
														  )
														: setMapSrc(placeModeMapSrc)
												},
												error => $("#map").html(error.message)
										  )
										: $("#map").text(
												`Your browser doesn\'t support geolocation. Try inputting manually.`
										  )
								}}
							/>
							<label
								className="form-check-label font-monospace d-none d-md-inline-block"
								htmlFor="mode"
							>
								Directions Mode
							</label>
						</div>
					</nav>
					<div className="tab-content" id="nav-tabContent">
						<div
							className="tab-pane fade active show"
							id="nav-location"
							role="tabpanel"
						>
							<div>
								<iframe
									id="map"
									width="100%"
									height="450px"
									frameBorder={0}
									style={{ border: "0" }}
									allowFullScreen
									src={mapSrc}
								></iframe>
							</div>
						</div>
						<div className="tab-pane fade" id="nav-description" role="tabpanel">
							<div className="container py-3">
								{hospital.description == null
									? "Not provided"
									: hospital.description}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default HospitalInfo
