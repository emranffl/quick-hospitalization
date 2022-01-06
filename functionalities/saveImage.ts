const base64ToImage = require("base64-to-image")

const saveImage = (base64Data: string, directory: string, id: string) => {
	// todo correct pathname as per prod env
	const path = `D:/Workspace/smart-medicare/public/uploads/${directory}/`,
		optionalObj = {
			fileName:
				directory == "hospitals"
					? "profile-image-" + id + "-" + Math.floor(Math.random() * 10)
					: "NID",
			type: base64Data.substring(
				"data:image/".length,
				base64Data.indexOf(";base64")
			),
		}

	return path + base64ToImage(base64Data, path, optionalObj)["fileName"]
}

export { saveImage }
