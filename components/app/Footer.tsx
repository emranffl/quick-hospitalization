import { Links } from "@app"
import Link from "next/link"

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
	return (
		<footer
			className="text-white mt-5 d-print-none"
			style={{ background: "linear-gradient(to bottom, #005254, #00292a)" }}
		>
			<section className="container-fluid row d-flex justify-content-center">
				<div className="col-12 col-sm-6 col-lg-4 col-xl-4 my-4">
					<h3 className="text-center text-lg-start">Quick Hospitalization</h3>

					<p className="mt-4 mx-auto ms-lg-0 w-75">
						It is a platform where one can search and book for available
						hospital beds, ICU beds, cabin, etc. at the time of their
						needs to admit a patient.
					</p>
				</div>

				<hr className="w-100 d-sm-none" />

				<div className="col-12 col-sm-6 col-lg-2 col-xl-2 my-4">
					<h3 className="text-center">Site Link</h3>

					<ul className="list-unstyled text-center mt-4">
						<li className="pb-1">
							<Link href={Links.App.about}>
								<a className="text-white">About Us</a>
							</Link>
						</li>
						<li className="pb-1">
							<Link href={Links.App.contact}>
								<a className="text-white">Contact Us</a>
							</Link>
						</li>
						<li className="pb-1">
							<Link href={Links.App.privacy}>
								<a className="text-white">Privacy Policy</a>
							</Link>
						</li>
						<li className="pb-1">
							<Link href={Links.App.terms}>
								<a className="text-white">Terms of Service</a>
							</Link>
						</li>
					</ul>
				</div>

				<hr className="w-100 d-sm-none" />

				<div className="col-12 col-sm-6 col-lg-3 col-xl-3 my-4">
					<h3 className="text-center">Center Info</h3>

					<ul className="list-unstyled text-center mt-4">
						<li className="pb-1">Dhaka: 0123456789</li>
						<li className="pb-1">Sylhet: 0123456789</li>
						<li className="pb-1">Mymensing: 0123456789</li>
						<li className="pb-1">Barisal: 0123456789</li>
						<li className="pb-1">Khulna: 0123456789</li>
					</ul>
				</div>

				<hr className="w-100 d-sm-none" />

				<div className="col-12 col-sm-6 col-lg-3 col-xl-2 my-4">
					<h3 className="text-center">Follow Us</h3>

					<div className="d-flex justify-content-center mt-4">
						<a className="btn btn-outline-primary mx-1 hvr-float" href="#">
							<i className="bi bi-facebook h5"></i>
						</a>
						<a className="btn btn-outline-primary mx-1 hvr-float" href="#">
							<i className="bi bi-twitter h5"></i>
						</a>
						<a className="btn btn-outline-primary mx-1 hvr-float" href="#">
							<i className="bi bi-instagram h5"></i>
						</a>
						<a className="btn btn-outline-primary mx-1 hvr-float" href="#">
							<i className="bi bi-linkedin h5"></i>
						</a>
					</div>
				</div>
			</section>
			<hr />
			<section className="text-center mb-2">
				<small>Copyright &copy; All rights reserved</small>
			</section>
		</footer>
	)
}

export default Footer
