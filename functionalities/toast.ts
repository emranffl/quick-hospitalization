import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const color = {
		warning: "tomato",
		danger: "red",
		primary: "#007BFF",
	},
	customId = "custom-id-yes"

const Toast = (
	content: string | object | HTMLElement,
	type: keyof typeof color = "primary",
	autoClose: number | false = 4000
) => {
	toast(content, {
		autoClose,
		position: toast.POSITION.BOTTOM_RIGHT,
		style: {
			backgroundColor: color[type],
			backdropFilter: "blur(3px)",
			boxShadow: "0 .5rem 1rem rgba(0,0,0,0.75)!important",
		},
		bodyClassName: "text-light",
		bodyStyle: {
			font: "status-bar",
		},
		hideProgressBar: true,
		// toastId: customId, // disables multiple toast bursts 
	})
}

export { Toast }
