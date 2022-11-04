import Head from "next/head"
import HospitalList from "@components/app/HospitalList"
import Image from "next/image"
import Link from "next/link"
import $ from "jquery"

import { prisma } from "@functionalities/DB/prismaInstance"
import { useEffect, useState } from "react"
import { Links } from "@app"
import { vacant_bed_log } from ".prisma/client"
import Loader from "@components/Loader"

export const getStaticProps = async () => {
	const latestVacantBedInfoSet: HomeProps = await prisma.$queryRaw`
		SELECT vacant_bed_log.registration_no, hospital_name, image_source, last_updated, ward, special_ward, cabin, icu, ccu, covidu
		FROM vacant_bed_log, hospital
		WHERE last_updated IN 
		(
			SELECT MAX(last_updated) "last_updated"
			FROM vacant_bed_log vbl, hospital h
			WHERE vbl.registration_no = h.registration_no AND h.status <> 'private' AND h.status <> 'deleted'
			GROUP BY h.registration_no
			ORDER BY h.registration_no ASC
		)
        AND vacant_bed_log.registration_no = hospital.registration_no
        ORDER BY vacant_bed_log.registration_no;
	`

	return {
		props: {
			latestVacantBedInfoSet: JSON.stringify(latestVacantBedInfoSet),
		},
		revalidate: 90 /* returning revalidate property enables the ISR that rebuilds on data change */,
	}
}

export interface HospitalInfo extends vacant_bed_log {
	hospital_name: string
}

export interface HomeProps {
	latestVacantBedInfoSet: string
}

// export const search = ()

const Home: React.FC<HomeProps> = ({ latestVacantBedInfoSet }) => {
	const parsedLatestVacantBedInfoSet = JSON.parse(latestVacantBedInfoSet),
		[hospitalList, setHospitalList] = useState(parsedLatestVacantBedInfoSet),
		[loading, setLoading] = useState(false)

	useEffect(function onFirstMount() {
		$("#callToAction").height(
			$("#heroImage").children("div").innerHeight() as number
		)

		$(window).on("resize", () => {
			$("#callToAction").height(
				$("#heroImage").children("div").innerHeight() as number
			)
		})
	}, [])

	return (
		<>
			<Head>
				<title>Home | Quick Hospitalization</title>
			</Head>
			{loading ? <Loader /> : null}
			<main>
				<section className="row mx-0 pb-4 pb-sm-0">
					<div className="col-12 col-md-6 px-0" id="heroImage">
						<Image
							src="/media/slider-image-2.jpg"
							width={1280}
							height={720}
							priority
						/>
					</div>
					<div
						className="col-12 col-md-6 px-0 row row-cols-1 row-cols-sm-2 mx-0 mt-n2 mt-md-0"
						id="callToAction"
					>
						<div
							className="col d-flex flex-column justify-content-center align-items-center"
							style={{ backgroundColor: "#013440" }}
						>
							<Link href={Links.App.booking}>
								<a
									className="d-block text-decoration-none my-2 animate__animated animate__fadeInUp"
								// style={{ top: "100%", position: "relative" }}
								>
									<i className="bi bi-bookmark-plus d-block text-center h3 text-light"></i>
									<span className="text-light h6 fw-light">Book a bed</span>
								</a>
							</Link>
						</div>
						<div
							className="col d-flex flex-column justify-content-center align-items-center"
							style={{ backgroundColor: "#385865" }}
						>
							<Link href={Links.App.appointment}>
								<a
									className="d-block text-decoration-none my-2 animate__animated animate__fadeInUp"
									style={{ animationDelay: "0.3s" }}
								>
									<i className="bi bi-calendar-event d-block text-center h3 text-light"></i>
									<span className="text-light h6 fw-light">
										Take an appointment
									</span>
								</a>
							</Link>
						</div>
						<div
							className="col d-flex flex-column justify-content-center align-items-center"
							style={{ backgroundColor: "#42778C" }}
						>
							<Link href={Links.App.doctor}>
								<a
									className="d-block text-decoration-none my-2 animate__animated animate__fadeInUp"
									style={{ animationDelay: "0.5s" }}
								>
									<i className="bi bi-search d-block text-center h3 text-light"></i>
									<span className="text-light h6 fw-light">Find doctors</span>
								</a>
							</Link>
						</div>
						<div
							className="col d-flex flex-column justify-content-center align-items-center"
							style={{ backgroundColor: "#7EA6BF" }}
						>
							<Link href={Links.App.contact}>
								<a
									className="d-block text-decoration-none my-2 animate__animated animate__fadeInUp"
									style={{ animationDelay: "0.7s" }}
								>
									<i className="bi bi-exclamation-square d-block text-center h3 text-light"></i>
									<span className="text-light h6 fw-light">
										Report an issue
									</span>
								</a>
							</Link>
						</div>
					</div>
				</section>
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

											await fetch("/api/searchhospitals", {
												method: "GET",
												headers: new Headers({
													"content-type": "application/json",
													"x-search-by": $(elem).val() as string,
													"x-search-term": (e.target as HTMLInputElement).value,
												}),
											})
												.then(response => response.json())
												.then(res => {
													setHospitalList(res)
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
											await fetch("/api/searchhospitals", {
												method: "GET",
												headers: new Headers({
													"content-type": "application/json",
													"x-search-by": $(elem).val() as string,
													"x-search-term": (e.target as HTMLInputElement).value,
												}),
											})
												.then(response => response.json())
												.then(res => {
													setHospitalList(res)
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
								value="hospital_name"
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
								value="bed_type"
								onClick={() => {
									$("#search").trigger("focus")
									$("#search").val("")
								}}
							/>
							<label className="form-check-label" htmlFor="searchOption2">
								bed type
							</label>
						</div>
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="radio"
								name="searchOptions"
								id="searchOption3"
								value="hospital_type"
								onClick={() => {
									$("#search").trigger("focus")
									$("#search").val("")
								}}
							/>
							<label className="form-check-label" htmlFor="searchOption3">
								hospital type
							</label>
						</div>
					</div>
				</div>
				{hospitalList.length != 0 ? (
					<div className="container pt-5 pt-md-0">
						<HospitalList hospitalInfo={hospitalList} />
					</div>
				) : (
					<div className="container text-center">
						Search doesn't match any results
					</div>
				)}
			</main>
		</>
	)
}

export default Home
