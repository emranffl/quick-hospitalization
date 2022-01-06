import Head from "next/head"
import {
	useState,
	useCallback,
	useRef,
	useEffect,
	useMemo,
	useContext,
} from "react"
import $ from "jquery"
import { sendOTP } from "@functionalities/emailManager"
import Link from "next/link"

import ImageCapture from "react-image-data-capture"

import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Toast } from "@functionalities/toast"
import { Links, Sex } from "@app"
import { user_sex } from "@prisma/client"
import router from "next/router"
import { UserContext } from "@contexts/user"

export interface UserSignupProps {}

const UserSignup: React.FC<UserSignupProps> = () => {
	let current_fs: JQuery<HTMLElement>,
		next_fs: JQuery<HTMLElement>,
		previous_fs: JQuery<HTMLElement>,
		left,
		opacity,
		scale, //fieldset properties which we will animate
		animating: boolean, //flag to prevent quick multi-click glitches
		OTP: number,
		validated = false

	const { setUserContext } = useContext(UserContext),
		[showCodeGroup, setShowCodeGroup] = useState(false),
		sendUserSignupOTP = async () => {
			await fetch("/api/usersignup", {
				method: "POST",
				headers: new Headers({ "content-type": "application/json" }),
				body: JSON.stringify({
					step: "user email",
					data: {
						email: $("#email").val(),
					},
				}),
				redirect: "follow",
			})
				.then(response => response.json())
				.then(async res => {
					// error message displaying
					if (res.message != undefined)
						$("#emailErr").text(res.message.replace("email ", "Email "))
					else if (res.error != undefined) $("#emailErr").text(res.error)
					else {
						$("#emailErr").text("")

						$("#otpBtnSpinner").removeClass("d-none")
						$("#otp").html(`<span
								className="spinner-border spinner-border-sm me-2"
								id="otpBtnSpinner"></span>Continue`)
						$("#otp").attr("disabled", "true")

						OTP = Math.floor(1000 + Math.random() * 9000)

						if (
							await sendOTP(
								$("#email").val() as string,
								"User Signup Email Verification",
								OTP
							)
						) {
							$("#otpBtnSpinner").addClass("d-none")
							$("#otp").removeAttr("disabled")
							setShowCodeGroup(true)
						} else {
							$("#otpBtnSpinner").addClass("d-none")

							Toast(
								`Couldn't send OTP at the moment. Check your internet connectivity, please try again later.`,
								"warning",
								5000
							)
						}
					}
				})
				.catch(error => console.error(error))
		},
		setDate = () => {
			return new Date(new Date().setFullYear(new Date().getFullYear() - 13))
				.toISOString()
				.split("T")[0]
		},
		validateAndSubmitUserInfo = async () => {
			await fetch("/api/usersignup", {
				method: "POST",
				headers: new Headers({ "content-type": "application/json" }),
				body: JSON.stringify({
					step: "user info",
					data: {
						mobile_no: $("#mobile").val(),
						password: $("#password").val(),
						name: $("#name").val(),
						sex: $("#sex").val(),
						dob: $("#dob").val(),
						email: $("#email").val(),
						...($("#documentID").val() != "" && {
							document_id: $("#documentID").val(),
						}),
					},
				}),
				redirect: "follow",
			})
				.then(response => response.json())
				.then(res => {
					let collection = {
							name: "Name",
							document_id: "Document ID",
							mobile_no: "Mobile",
							password: "Password",
						},
						flaggedError = {
							name: false,
							document_id: false,
							mobile_no: false,
							password: false,
						}

					// error message displaying
					if ($("#sex").val() == "null")
						$("#sexErr").text("Gender must be selected")
					else $("#sexErr").text("")

					// duplicate mobile number error display
					if (res.error?.mobile_no != undefined) {
						$("#mobileErr").text(res.error.mobile_no)
						flaggedError.mobile_no = true
					}
					// duplicate document id error display
					else if (res.error?.document_id != undefined) {
						$("#documentIDErr").text(res.error.document_id)
						flaggedError.document_id = true
					} else if (res.errors != undefined) {
						res.errors.map((errorMsg: any) => {
							Object.keys(collection).map(keyName => {
								if (errorMsg.includes(keyName)) {
									if (keyName == "mobile_no")
										$("#mobileErr").text(
											errorMsg.replace(keyName, collection[keyName])
										)
									else if (keyName == "document_id")
										$("#documentIDErr").text(
											errorMsg.replace(keyName, collection[keyName])
										)
									else
										$("#" + keyName + "Err").text(
											errorMsg.replace(
												keyName,
												collection[keyName as keyof typeof collection]
											)
										)

									flaggedError[keyName as keyof typeof flaggedError] = true
								}
							})
						})
					} else {
						// todo handle routing
						// console.log(res)
						setUserContext(res)
						router.replace(Links.App.home)
					}

					Object.keys(flaggedError).map(keyName => {
						if (flaggedError[keyName as keyof typeof flaggedError] == false)
							if (keyName == "mobile_no") $("#mobileErr").text("")
							else if (keyName == "document_id") $("#documentIDErr").text("")
							else $("#" + keyName + "Err").text("")
					})
				})
				.catch(error => console.error(error))
		}

	useEffect(function onFirstMount() {
		$(".next").on("click", async function (event) {
			if (event.target.id === "otp" && event.target.innerText == "Send OTP")
				await sendUserSignupOTP()
			else if (
				event.target.id === "otp" &&
				event.target.innerText == "Continue"
			) {
				// validate OTP and continue
				let otpCharArr: any = []
				$(".code_group")
					.children("input")
					.each((index, eachInput) => {
						otpCharArr.push($(eachInput).val())
					})

				if (OTP == otpCharArr.join("")) {
					validated = true // validated with no errors
					$("#otpErr").text("")
				} else $("#otpErr").text("Invalid OTP!")
			} else if (event.target.id === "skip") validated = true
			else if (event.target.id === "info") await validateAndSubmitUserInfo()

			if (!validated) return
			validated = false

			if (animating) return
			animating = true

			current_fs = $(this).parent()
			next_fs = $(this).parent().next()

			//activate next step on progressbar using the index of next_fs
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active")

			//show the next fieldset
			next_fs.show()
			//hide the current fieldset with style
			current_fs.animate(
				{
					opacity: 0,
				},
				{
					step: function (now, mx) {
						//as the opacity of current_fs reduces to 0 - stored in "now"
						//1. scale current_fs down to 80%
						scale = 1 - (1 - now) * 0.2
						//2. bring next_fs from the right(50%)
						left = now * 50 + "%"
						//3. increase opacity of next_fs to 1 as it moves in
						opacity = 1 - now
						current_fs.css({
							transform: "scale(" + scale + ")",
							position: "absolute",
						})
						next_fs.css({
							left: left,
							opacity: opacity,
						})
					},
					duration: 500,
					complete: function () {
						current_fs.hide()
						animating = false
					},
					//this comes from the custom easing plugin
					easing: "swing",
				}
			)
		})

		$(".previous").on("click", function () {
			validated = false

			if (animating) return false
			animating = true

			current_fs = $(this).parent()
			previous_fs = $(this).parent().prev()

			//de-activate current step on progressbar
			$("#progressbar li")
				.eq($("fieldset").index(current_fs))
				.removeClass("active")

			//show the previous fieldset
			previous_fs.show()
			//hide the current fieldset with style
			current_fs.animate(
				{
					opacity: 0,
				},
				{
					step: function (now, mx) {
						//as the opacity of current_fs reduces to 0 - stored in "now"
						//1. scale previous_fs from 80% to 100%
						scale = 0.8 + (1 - now) * 0.2
						//2. take current_fs to the right(50%) - from 0%
						left = (1 - now) * 50 + "%"
						//3. increase opacity of previous_fs to 1 as it moves in
						opacity = 1 - now
						current_fs.css({
							left: left,
						})
						previous_fs.css({
							transform: "scale(" + scale + ")",
							opacity: opacity,
						})
					},
					duration: 500,
					complete: function () {
						current_fs.hide()
						animating = false
					},
					//this comes from the custom easing plugin
					easing: "swing",
				}
			)
		})

		$("input[name=docType]").on("click", () => {
			setDocTypeSelected(true)
		})
	}, [])

	// * document capture analyzer block
	const [upImg, setUpImg] = useState(""),
		imgRef = useRef(null),
		previewCanvasRef = useRef(null),
		[crop, setCrop] = useState({ unit: "%", width: 100, height: 100 }),
		[completedCrop, setCompletedCrop] = useState(null),
		// view image with crop functionality on image select
		onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files.length > 0) {
				$("#crop-btn").removeAttr("hidden")

				const reader = new FileReader()
				reader.readAsDataURL(e.target.files[0])
				reader.addEventListener("load", () => {
					setUpImg(reader.result as string)
				})
			}
		},
		onLoad = useCallback(img => {
			imgRef.current = img
		}, []),
		ocrApiCall = async (canvas: any, crop: any) => {
			if (!crop || !canvas) {
				return
			}

			// showing spinner
			$("#crop-btn-spinner").removeClass("d-none")

			await fetch(
				`https://api.microblink.com/v1/recognizers/${$(
					"input[name='docType']:checked"
				).val()}`,
				{
					method: "POST",
					body: `{
  							"returnFullDocumentImage": false,
 							"returnFaceImage": false,
							"returnSignatureImage": false,
							"allowBlurFilter": false,
							"allowUnparsedMrzResults": false,
							"allowUnverifiedMrzResults": true,
							"validateResultCharacters": true,
						 	"anonymizationMode": "FULL_RESULT",
							"anonymizeImage": true,
							"ageLimit": 0,
							"imageSource": "${canvas.toDataURL()}",
							"scanCroppedDocumentImage": false
							}`,
					headers: {
						"content-type": "application/json",
						Accept: "application/json",
						Authorization: process.env
							.NEXT_PUBLIC_MICROLABLINK_BEARER_TOKEN as string,
					},
				}
			)
				.then(function (res) {
					return res.json()
				})
				.then(function ({ result }) {
					// hide spinner and button
					$("#crop-btn-spinner").addClass("d-none")
					$("#crop-btn").attr("hidden", "true")

					// * response after analyzing the document
					if (result.processingStatus === "SUCCESS") {
						// form data value autocompletion
						$("#name").val(result.firstName + " " + result.lastName)
						$("#sex")
							.children()
							.map((ind, options) => {
								if ($(options).attr("value") == result.sex)
									$("#sex").val(result.sex)
							})
						$("#documentID").val(result.documentNumber)
						$("#dob").val(
							result.dateOfBirth.year +
								"-" +
								(`${result.dateOfBirth.month}`.length === 1
									? "0" + result.dateOfBirth.month
									: result.dateOfBirth.month) +
								"-" +
								(`${result.dateOfBirth.day}`.length === 1
									? "0" + result.dateOfBirth.day
									: result.dateOfBirth.day)
						)

						// disabling input fields upon autocomplete
						new Array("#name", "#sex", "#documentID", "#dob").map(id => {
							$(id).attr("disabled", "true")
						})

						$("#skip").text("Continue")

						Toast("Info retrieved! Continue to next step.")
					} else if (
						result.processingStatus == "UNSUPPORTED_CLASS" ||
						result.processingStatus == "DETECTION_FAILED"
					) {
						Toast(
							"Could not retrieve data! Provided picture possibly doesn't have MRZ information. Please try again with correct picture.",
							"warning",
							false
						)
					} else
						Toast(
							"Could not retrieve data! Please try again.",
							"warning",
							false
						)
				})
		},
		[showImgCapture, setShowImgCapture] = useState(false),
		config = useMemo(() => ({ video: { facingMode: "environment" } }), []),
		/*
    	{ video: true } - Default Camera View
    	{ video: { facingMode: environment } } - Back Camera
   	 	{ video: { facingMode: "user" } } - Front Camera
 		 */

		onCapture = (imageData: any) => {
			// read as webP
			setUpImg(imageData.webP)
			// Unmount component to stop the video track and release camera
			setShowImgCapture(false)

			// show crop button
			$("#crop-btn").removeAttr("hidden")
		},
		onError = useCallback(error => {
			console.error(error)
		}, []),
		[docTypeSelected, setDocTypeSelected] = useState(false)

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
			return
		}

		const image: any = imgRef.current,
			canvas: any = previewCanvasRef.current,
			crop: any = completedCrop,
			scaleX = image.naturalWidth / image.width,
			scaleY = image.naturalHeight / image.height,
			ctx = canvas.getContext("2d"),
			pixelRatio = window.devicePixelRatio

		canvas.width = crop.width * pixelRatio
		canvas.height = crop.height * pixelRatio

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
		ctx.imageSmoothingQuality = "high"

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		)
	}, [completedCrop])

	return (
		<>
			<Head>
				<title>Sign Up | Quick Hospitalization</title>
				{/* <!-- Icons CSS --> */}
				<link
					rel="stylesheet"
					href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
				/>
			</Head>
			<main className="user_signup_form">
				<form
					className="bg-transparent"
					id="msform"
					onSubmit={event => {
						event.preventDefault()
						event.stopPropagation()
					}}
				>
					<div className="title text-center">
						<h2>Sign Up</h2>
						<h6 className="fst-italic text-secondary">It's quick and easy</h6>
					</div>
					<div className="text-center">
						<ul id="progressbar">
							<li className="active">Verify Email</li>
							<li>Upload Documents</li>
							<li>Personal Details</li>
						</ul>
					</div>
					<fieldset>
						<div className="d-flex">
							<div className="form-floating mb-2 mx-auto">
								<input
									type="email"
									className="form-control"
									id="email"
									placeholder="E.g.: name@example.com"
									style={{ minWidth: "35ch" }}
									onInput={e =>
										((e.target as HTMLInputElement).value = (
											e.target as HTMLInputElement
										).value.slice(0, 50))
									}
									required
								/>
								<label htmlFor="email">Email *</label>
							</div>
							<small className="text-danger ps-1" id="emailErr"></small>
						</div>
						{showCodeGroup ? (
							<>
								<div className="done_text mt-4 text-center">
									<a href="#" className="done_icon">
										<i className="ion-android-done"></i>
									</a>
									<h6>OTP sent! Enter it here...</h6>
								</div>
								<div className="code_group d-flex justify-content-center">
									<input
										type="number"
										className="form-control"
										min="0"
										max="9"
										onInput={e => {
											;(e.target as HTMLInputElement).value.length == 1
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
											;(e.target as HTMLInputElement).value.length == 1
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
											;(e.target as HTMLInputElement).value.length == 1
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
									/>
								</div>
								<span
									className="text-danger d-block mt-2 mb-5"
									id="otpErr"
								></span>
							</>
						) : null}
						<button
							type="button"
							className="btn btn-sm rounded next action-button mt-2 d-flex mx-auto"
							id="otp"
						>
							Send OTP
						</button>
						<div className="text-secondary d-flex justify-content-center">
							<small>
								Already have an account?
								<Link href={Links.App.login}>
									<a className="text-decoration-none fw-bold">&nbsp;Login</a>
								</Link>
							</small>
						</div>
					</fieldset>
					<fieldset>
						<h5
							className="w-75 mx-auto text-center"
							style={{ lineHeight: "1.3" }}
						>
							Upload any of these documents to proceed with form autocompletion
							or skip to input manually
						</h5>
						<div className="input-group justify-content-center my-4">
							<div className="form-check form-check-inline me-4">
								<input
									className="form-check-input"
									type="radio"
									name="docType"
									id="documentIDRadio"
									value="mrz-id"
								/>
								<label
									className="form-check-label text-primary fw-bold"
									htmlFor="documentIDRadio"
								>
									New NID Card (Back)
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="docType"
									id="passportRadio"
									value="passport"
								/>
								<label
									className="form-check-label text-primary fw-bold"
									htmlFor="passportRadio"
								>
									Passport
								</label>
							</div>
						</div>
						{docTypeSelected ? (
							<>
								<div className="d-flex justify-content-center align-items-center">
									<input
										className="form-control"
										style={{ maxWidth: "28ch" }}
										type="file"
										id="document"
										accept="image/jpeg, image/png"
										name="document"
										onChange={(
											changeEvent: React.ChangeEvent<HTMLInputElement>
										) => {
											onSelectFile(changeEvent)
										}}
									/>
									<small className="d-block mx-2 text-muted">OR</small>
									<button
										type="button"
										className="btn btn-sm btn-primary"
										onClick={e => {
											showImgCapture
												? setShowImgCapture(false)
												: setShowImgCapture(true)
										}}
									>
										<i className="bi bi-camera-fill h6"></i>
									</button>
								</div>
								<small
									className={
										!completedCrop?.width || !completedCrop?.height
											? "d-none"
											: "text-info text-center d-block mt-4"
									}
								>
									Crop to fit the document
								</small>
								<div className="w-75 mx-auto mt-4 mb-3 text-center">
									{showImgCapture && (
										<div>
											<ImageCapture
												onCapture={onCapture}
												onError={onError}
												width={300}
												userMediaConfig={config}
											/>
										</div>
									)}
									{upImg && (
										<>
											<ReactCrop
												src={upImg}
												onImageLoaded={onLoad}
												crop={crop}
												onChange={c => setCrop(c)}
												onComplete={c => setCompletedCrop(c)}
											/>
											<canvas
												ref={previewCanvasRef}
												// Rounding is important so the canvas width and height matches/is a multiple for sharpness.
												style={{
													width: Math.round(completedCrop?.width ?? 0),
													height: Math.round(completedCrop?.height ?? 0),
													display: "none",
												}}
											/>
											<span className="d-block">
												<button
													type="button"
													className="btn btn-sm btn-secondary my-2 rounded"
													hidden={
														!completedCrop?.width || !completedCrop?.height
													}
													onClick={() =>
														ocrApiCall(previewCanvasRef.current, completedCrop)
													}
													id="crop-btn"
												>
													<span
														className="spinner-border spinner-border-sm d-none"
														id="crop-btn-spinner"
													></span>
													&nbsp;Crop &amp; Upload
												</button>
											</span>
										</>
									)}
								</div>
							</>
						) : null}
						<button
							type="button"
							className="btn btn-sm rounded next action-button d-flex mx-auto"
							id="skip"
						>
							Skip
						</button>
					</fieldset>
					<fieldset>
						<h5 className="text-center">
							Provide the following information in order to proceed
						</h5>
						<div className="mx-auto text-left" style={{ maxWidth: "320px" }}>
							<div className="form-floating">
								<input
									type="text"
									className="form-control"
									id="name"
									placeholder="E.g.: William Smith"
									onInput={e =>
										((e.target as HTMLInputElement).value = (
											e.target as HTMLInputElement
										).value.slice(0, 50))
									}
									required
								/>
								<label htmlFor="name">Name *</label>
							</div>
							<small id="nameErr" className="text-danger ms-1"></small>

							<div className="form-floating">
								<select
									className="form-select"
									id="sex"
									aria-label="Floating label select example"
								>
									<option value="null" hidden>
										Select Gender
									</option>
									{Object.keys(user_sex).map((gender, index) => {
										return (
											<option key={index} value={gender}>
												{Sex[gender as keyof typeof Sex]}
											</option>
										)
									})}
								</select>
								<label htmlFor="sex">Sex *</label>
							</div>
							<small id="sexErr" className="text-danger ms-1"></small>

							<div className="form-floating">
								<input
									type="text"
									className="form-control"
									id="documentID"
									placeholder="E.g.: 5628204001"
									onInput={e =>
										((e.target as HTMLInputElement).value = (
											e.target as HTMLInputElement
										).value.slice(0, 17))
									}
								/>
								<label htmlFor="documentID">NID/Passport $</label>
							</div>
							<small id="documentIDErr" className="text-danger ms-1"></small>
							<div className="form-floating">
								<input
									type="date"
									className="form-control"
									max={setDate()}
									defaultValue={setDate()}
									id="dob"
									placeholder="Password"
									required
								/>
								<label htmlFor="dob">Birth Date *</label>
							</div>
							<small id="dobErr" className="text-danger ms-1"></small>
							<div className="form-floating">
								<input
									type="tel"
									className="form-control"
									id="mobile"
									placeholder="E.g.: 018204****5"
									onInput={e =>
										((e.target as HTMLInputElement).value = (
											e.target as HTMLInputElement
										).value.slice(0, 11))
									}
									required
								/>
								<label htmlFor="mobile">Mobile *</label>
							</div>
							<small id="mobileErr" className="text-danger ms-1"></small>
							<div className="form-floating">
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="4 - 25 characters"
									onInput={e =>
										((e.target as HTMLInputElement).value = (
											e.target as HTMLInputElement
										).value.slice(0, 25))
									}
									required
								/>
								<label htmlFor="password">Password *</label>
							</div>
							<small id="passwordErr" className="form-text text-danger"></small>
						</div>
						<div className="d-flex justify-content-center mt-3">
							<button
								type="button"
								className="btn btn-sm rounded action-button previous previous_button"
							>
								<i className="bi bi-arrow-left h6 m-auto"></i>
							</button>
							<button
								type="button"
								className="btn btn-sm rounded next action-button"
								id="info"
							>
								Sign Up
							</button>
						</div>
						<div className="d-flex justify-content-center mt-2 text-primary">
							<small className="me-3">* - required</small>
							<small>$ - optional</small>
						</div>
					</fieldset>
				</form>
			</main>
		</>
	)
}

export default UserSignup
