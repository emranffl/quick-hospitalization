import { Email } from "@lib/smtp"

const sendEmail = async (To: string, Subject: string, Body: string) => {
		return await send(To, Subject, Body)
	},
	sendOTP = async (To: string, Subject: string, OTP: number) => {
		return await send(
			To,
			Subject,
			`This email is automatically generated from internal system of Quick Hospitalization, do not reply. 
            Your OTP is: ${OTP}. If you haven't requested for the OTP, take necessary steps immediately!`
		)
	},
	send = async (To: string, Subject: string, Body: string) => {
		const mailServerRes = await Email.send({
			Host: process.env.NEXT_PUBLIC_MAIL_SERVER_HOST,
			Username: process.env.NEXT_PUBLIC_MAIL_SERVER_USERNAME,
			Password: process.env.NEXT_PUBLIC_MAIL_SERVER_PASSWORD,
			From: process.env.NEXT_PUBLIC_MAIL_SERVER_USERNAME,
			To,
			Subject,
			Body,
		})

		if (mailServerRes === "OK") return true
		else return false
	}

export { sendEmail, sendOTP }
