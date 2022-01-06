import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { doctor } from ".prisma/client"
import { prisma } from "@functionalities/DB/prismaInstance"
import { Links } from "@app"
import { useState, useEffect } from "react"
import $ from "jquery"
import Loader from "@components/Loader"

export const getServerSideProps = async ({ query }: any) => {
	const retrievedData: any = await prisma.$queryRaw`
	SELECT id, email, registration_no, name, sex, department, specialization, chamber, bio, image_source, joined_on, status
	FROM doctor
	WHERE joined_on IN 
		(
			SELECT MAX(joined_on) "joined_on"
			FROM doctor
			WHERE status <> "Inactive"
			GROUP BY  doctor.id
			ORDER BY doctor.id ASC
		)
	ORDER BY doctor.id
	LIMIT 12;
	`
	return { props: { retrievedData: JSON.stringify(retrievedData) } }
}

export interface DoctorProps {
	retrievedData: string
}

const Doctor: React.FC<DoctorProps> = ({ retrievedData }) => {
	const [doctors, setNewDoctors] = useState(
			JSON.parse(retrievedData) as doctor[]
		),
		[loading, setLoading] = useState(false),
		[loadingCounter, setLoadingCounter] = useState(1)

	console.log(doctors)

	// useEffect(() => {})

	return (
		<>
			<Head>
				<title>Doctors | Quick Hospitalization</title>
			</Head>
			{loading ? <Loader /> : null}
			<section className="doctor-banner"></section>
			<div className="container row my-5 mx-auto pt-5 pt-sm-0">
				<div className="col-12 col-md-6 col-lg-7">
					<form
						className="animate__animated animate__fadeInDown"
						style={{ flex: "auto" }}
						onSubmit={event => {
							event.preventDefault()
							event.stopPropagation()
						}}
					>
						<input
							className="form-control mx-auto rounded"
							id="search"
							style={{ maxWidth: "512px" }}
							type="search"
							placeholder="Search Hospitals"
							onKeyUp={async e => {
								if (e.key != "Enter") return

								$("input[name=searchOptions]").map(async (index, elem) => {
									if ($(elem).is(":checked")) {
										setLoading(true)

										await fetch("/api/searchdoctors", {
											method: "GET",
											headers: new Headers({
												"content-type": "application/json",
												"x-search-by": $(elem).val() as string,
												"x-search-term": (e.target as HTMLInputElement).value,
											}),
										})
											.then(response => response.json())
											.then(res => {
												setNewDoctors(res)
											})
											.catch(err => console.error(err))

										setLoading(false)
									}
								})
							}}
							onInput={async e => {
								if ((e.target as HTMLInputElement).value != "") return

								$("input[name=searchOptions]").map(async (index, elem) => {
									if ($(elem).is(":checked")) {
										await fetch("/api/searchdoctors", {
											method: "GET",
											headers: new Headers({
												"content-type": "application/json",
												"x-search-by": $(elem).val() as string,
												"x-search-term": (e.target as HTMLInputElement).value,
											}),
										})
											.then(response => response.json())
											.then(res => {
												setNewDoctors(res)
											})
											.catch(err => console.error(err))
									}
								})
							}}
						/>
					</form>
				</div>
				<div className="col-12 col-md-6 col-lg-5 mt-3 mt-md-0 d-flex justify-content-center justify-content-lg-start align-items-center animate__animated animate__fadeInUp">
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="searchOptions"
							id="searchOption1"
							value="name"
							onClick={() => {
								$("#search").trigger("focus")
								$("#search").val("")
							}}
							defaultChecked
						/>
						<label className="form-check-label" htmlFor="searchOption1">
							name
						</label>
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="searchOptions"
							id="searchOption2"
							value="specialization"
							onClick={() => {
								$("#search").trigger("focus")
								$("#search").val("")
							}}
						/>
						<label className="form-check-label" htmlFor="searchOption2">
							specialization
						</label>
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="searchOptions"
							id="searchOption3"
							value="department"
							onClick={() => {
								$("#search").trigger("focus")
								$("#search").val("")
							}}
						/>
						<label className="form-check-label" htmlFor="searchOption3">
							department
						</label>
					</div>
				</div>
			</div>
			<main className="container">
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3 mt-5">
					{doctors.map((doctor, index) => {
						return (
							<div className="col" key={index}>
								<div
									className="card h-100 rounded shadow-sm"
									// style={{ backgroundColor: "transparent" }}
								>
									<Link href={`${Links.App.doctor}/${doctor.email}`}>
										<a className="text-decoration-none">
											<div className="card-img-top d-flex justify-content-center align-items-center">
												<Image
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
													width={480}
													height={320}
												/>
											</div>
										</a>
									</Link>
									<div className="card-body">
										<Link href={`${Links.App.doctor}/${doctor.email}`}>
											<a className="card-title text-decoration-none text-dark h5">
												{doctor.name}
											</a>
										</Link>
										<div className="mt-3">
											<div className="d-flex align-items-center">
												<i
													className="bi bi-diagram-3-fill me-2 mb-0 h4"
													data-bs-toggle="tooltip"
													data-bs-placement="bottom"
													title="Department"
												></i>
												<span className="text-secondary fst-italic">
													{doctor.department}
												</span>
											</div>
											<div className="mt-3">
												<p className="text-truncate">{doctor.bio}</p>
											</div>
										</div>
									</div>
									<div className="card-footer py-1">
										<Link href={`${Links.App.doctor}/${doctor.email}`}>
											<a className="d-block text-decoration-none text-info text-center">
												More&nbsp;&rarr;
											</a>
										</Link>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<section className="d-flex justify-content-center align-items-center mt-5">
					<button
						className="btm btn-sm btn-outline-dark"
						onClick={async () => {
							setLoading(true)

							await fetch("/api/getdoctorsinfo", {
								method: "POST",
								body: JSON.stringify({ offset: 12 * loadingCounter }),
								headers: {
									"content-type": "application/json",
								},
							})
								.then(response => response.json())
								.then(res => {
									setNewDoctors([...doctors, ...res.doctors])
									setLoadingCounter(loadingCounter + 1)
								})
								.catch(err => console.error(err))

							setLoading(false)
						}}
					>
						More Doctors
					</button>
				</section>
			</main>
		</>
	)
}

export default Doctor
