import getTimeSpan from "@lib/time-span"
import Link from "next/link"
import Image from "next/image"
import { Links } from "@app"
import React from "react"
import { HospitalInfo } from "@pages/index"

export interface HospitalListProps {
	hospitalInfo: HospitalInfo[]
}

export const amenityIconClassName = {
	atm: "bi bi-credit-card-2-front",
	baby_corner: "las la-baby",
	cafeteria: "bi bi-shop-window",
	gift_shop: "bi bi-gift",
	locker: "bi bi-safe",
	parking: "las la-car-side",
	pharmacy: "las la-pills",
	prayer_area: "las la-mosque",
	wheelchair: "lab la-accessible-icon",
	wifi: "bi bi-wifi",
}

const HospitalList: React.FC<HospitalListProps> = ({ hospitalInfo }) => {
	console.log(hospitalInfo)

	let key = 0,
		bedTypes = Object.keys(hospitalInfo[0])

	// filtering array from non bed type names
	for (const elem of [
		"registration_no",
		"hospital_name",
		"last_updated",
		"image_source",
		"amenity",
		"bed_type",
		"hospital_type"
	])
		bedTypes = bedTypes.filter((el: any) => el.indexOf(elem) == -1)

	return (
		<>
			<div className="row">
				{hospitalInfo.map((vacantBedTuple, index) => (
					<React.Fragment key={index}>
						{index == 6 ? (
							<>
								<div
									className="col-12 col-md-6 col-lg-8 col-xl-6 mb-4 px-2 d-flex"
									key={key++}
								>
									<div className="card d-flex mx-auto rounded shadow-lg m-auto">
										<div className="card-image m-auto p-3">
											<Image
												className="img-fluid rounded-circle"
												src="/media/doctor-testimonial.jpg"
												width={400}
												height={400}
											/>
										</div>
										<div className="card-body">
											<h4 className="card-title">Dr. Petro Gilbert</h4>
											<p
												className="card-text mx-auto"
												style={{ maxWidth: "98%" }}
											>
												<i className="bi bi-blockquote-left h2 text-info"></i>
												Lorem ipsum dolor sit amet, consectetuer adipiscing
												elit. Aenean commodo ligula eget dolor. Aenean massa.
												Nam quam nunc, blandit vel, luctus pulvinar, hendrerit
												Maecenas nec odio et ante tincidunt tempus Duis leo.
												Donec sodales sagittis magna id, lorem.
												<i className="bi bi-blockquote-right h2 text-info align-text-top"></i>
											</p>
										</div>
										<div className="card-footer text-center">
											<small>
												Petro, CEO,&nbsp;<a href="#">United Hospital Ltd.</a>
											</small>
										</div>
									</div>
								</div>
							</>
						) : null}
						<div
							className={
								index < 4
									? index <= 1
										? "col-12 col-md-6 col-lg-4 col-xl-3 mb-4 px-2 animate__animated animate__fadeInUp"
										: "col-12 col-md-6 col-lg-4 col-xl-3 mb-4 px-2 animate__animated animate__fadeInUp"
									: "col-12 col-md-6 col-lg-4 col-xl-3 mb-4 px-2"
							}
							style={
								index < 4
									? index == 0
										? { animationDelay: "0.47s" }
										: index == 1
										? { animationDelay: "0.67s" }
										: index == 2
										? { animationDelay: "0.87s" }
										: index == 3
										? { animationDelay: "0.97s" }
										: {}
									: {}
							}
							id={vacantBedTuple.registration_no}
							key={key++}
						>
							<div className="card h-100 rounded-3 bg-light shadow animate_animated animate__fadeInLeft">
								<Link href={Links.App.home + vacantBedTuple.registration_no}>
									<a className="text-decoration-none">
										<div className="card-img-top d-flex justify-content-center align-items-center">
											<Image
												src={
													// todo fix path
													"/media/hospital-building-" +
													Math.floor(Math.random() * (7 - 1 + 1) + 1) +
													".jpg"
												}
												alt={
													vacantBedTuple.hospital_name + " - institute image"
												}
												width={480}
												height={320}
												// priority={index <= 3 ? true : false}
											/>
										</div>
									</a>
								</Link>
								<div className="card-body d-flex flex-column px-md-2 px-lg-3">
									<Link href={Links.App.home + vacantBedTuple.registration_no}>
										<a className="card-title text-decoration-none">
											{vacantBedTuple.hospital_name}
										</a>
									</Link>
									<ul className="list-group list-group-flush my-auto">
										{bedTypes.map((bedType, index) => {
											return vacantBedTuple[
												bedType as keyof typeof vacantBedTuple
											] == null ? null : (
												<li
													className="
											list-group-item
											d-flex
											justify-content-between
											align-items-center
										"
													style={{ fontSize: "0.9rem" }}
													key={index}
												>
													{
														bedType.split("_").join(" ").toUpperCase()
														// .replace(/(?:^\w|[a-z]|\b\w)/g, (ltr, idx) =>
														// 	ltr.toUpperCase()
														// )
													}
													<span
														className={
															(vacantBedTuple[
																bedType as keyof typeof vacantBedTuple
															] as number) <= 5
																? vacantBedTuple[
																		bedType as keyof typeof vacantBedTuple
																  ] == 0
																	? "badge bg-danger fs-6 fw-light px-2"
																	: "badge bg-warning text-dark fs-6 fw-light px-2"
																: "badge bg-primary fs-6 fw-light px-2"
														}
													>
														{
															vacantBedTuple[
																bedType as keyof typeof vacantBedTuple
															]
														}
													</span>
												</li>
											)
										})}
									</ul>
								</div>
								{/* <div className="d-flex justify-content-center px-2 flex-wrap">
									{Object.keys(vacantBedTuple.amenity)
										.filter(el => el.indexOf("registration_no") == -1)
										.map((amenity, key) => {
											return vacantBedTuple.amenity[
												amenity as keyof typeof vacantBedTuple.amenity
											] ? (
												<div
													className="d-flex justify-content-center align-items-center px-1 pt-2 pb-1 hvr-float"
													key={key}
													data-bs-toggle="tooltip"
													data-bs-placement="bottom"
													title={amenity.replace("_", " ").toUpperCase()}
												>
													<i
														className={
															"h5 text-info m-0 " +
															amenityIconClassName[
																amenity as keyof typeof amenityIconClassName
															]
														}
													></i>
												</div>
											) : null
										})}
								</div> */}
								<div className="card-footer text-center py-0">
									<small className="text-muted font-monospace">
										Last updated {getTimeSpan(vacantBedTuple.last_updated)}
									</small>
								</div>
							</div>
						</div>
					</React.Fragment>
				))}
			</div>
		</>
	)
}

export default HospitalList
