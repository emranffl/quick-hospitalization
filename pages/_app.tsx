import AppLayout from "@layouts/AppLayout"
import AdminPanelLayout from "@layouts/AdminPanelLayout"
import { UserContext } from "@contexts/user"
import { DoctorContext } from "@contexts/doctor"

import "@styles/styles.css"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Head from "next/head"
import { useEffect, useState } from "react"
import { doctor, user } from "@prisma/client"
declare var bootstrap: any

export const Links = {
		Admin: {
			booking: "/booking",
			dashboard: "/admin/dashboard",
			login: "/admin",
			signup: "/admin/signup",
		},
		App: {
			404: "/404",
			500: "/500",
			about: "/about",
			appointment: "/appointment",
			booking: "/booking",
			contact: "/contact",
			doctor: "/doctor",
			home: "/",
			login: "/login",
			privacy: "/privacy",
			recover: "/recover",
			signup: "/signup",
			terms: "/terms",
			User: {
				account: "/user/account",
				appointments: "/user/appointments",
				bookings: "/user/bookings",
			},
		},
		Doctor: {
			dashboard: "/doctor/dashboard",
			login: "/doctor/login",
			signup: "/doctor/signup",
		},
	},
	Days = {
		A: { Saturday: 6 },
		S: { Sunday: 0 },
		M: { Monday: 1 },
		T: { Tuesday: 2 },
		W: { Wednesday: 3 },
		R: { Thursday: 4 },
		F: { Friday: 5 },
	},
	Sex = {
		M: "Male",
		F: "Female",
		T: "Trans",
		S: "Sis",
	},
	BedTypes = {
		ward: "Ward",
		special_ward: "Special_Ward",
		cabin: "Cabin",
		vip_cabin: "VIP_Cabin",
		icu: "ICU",
		ccu: "CCU",
		hdu: "HDU",
		hfncu: "HFNCU",
		emergency: "Emergency",
		covidu: "COVIDU",
		extra: "Extra",
	}

export default function AppMain({ Component, pageProps }: AppProps) {
	const isRouteRootAdmin = () => {
			return useRouter().asPath.includes("admin")
		},
		isRouteRootDoctorManagement = () => {
			return (
				useRouter().asPath.includes(Links.Doctor.dashboard) ||
				useRouter().asPath.includes(Links.Doctor.login) ||
				useRouter().asPath.includes(Links.Doctor.signup)
			)
		},
		[userContext, setUserContext] = useState<user>(
			// {
			// mobile_no: "01676987366",
			// password: "1234",
			// name: "Emran H",
			// sex: "M",
			// dob: new Date("1997-05-02"),
			// email: "emranffl4@google.com",
			// document_id: "19975628204000005",
			// joined_on: new Date(),
			// }
		),
		[doctorContext, setDoctorContext] = useState<doctor>()

	useEffect(() => {
		// activating tooltips
		var tooltipList = [].slice
			.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
			.map(tooltipTriggerEl => {
				return new bootstrap.Tooltip(tooltipTriggerEl)
			})
	})

	return (
		<>
			<Head>
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
					crossOrigin="anonymous"
				/>
				<script
					defer
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
					crossOrigin="anonymous"
				></script>

				{/* <!-- bootstrap 5.0 --> */}

				<link rel="stylesheet" href="/lib/animate.min.css" />

				{/* <!-- animate 4.1.1 - animation library --> */}

				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
				/>
				{/* <!-- bootstrap icons --> */}

				<link
					rel="stylesheet"
					href="https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css"
					crossOrigin="anonymous"
				/>

				{/* <!-- iconmonstr icons --> */}

				<link
					rel="stylesheet"
					href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
				/>

				{/* <!-- LINE AWESOME icons --> */}
			</Head>

			{isRouteRootAdmin() ? (
				<AdminPanelLayout>
					<Component {...pageProps} />
				</AdminPanelLayout>
			) : isRouteRootDoctorManagement() ? (
				<DoctorContext.Provider value={{ doctorContext, setDoctorContext }}>
					<Component {...pageProps} />
				</DoctorContext.Provider>
			) : (
				<UserContext.Provider value={{ userContext, setUserContext }}>
					<AppLayout>
						<Component {...pageProps} />
					</AppLayout>
				</UserContext.Provider>
			)}
		</>
	)
}
