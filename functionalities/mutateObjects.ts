const mutateContactNumber = (object: any, subtractive = false) => {
		if (object == null) return null

		Object.keys(object).map(key => {
			if (
				typeof object[key] != "object" &&
				(key == "mobile_no" || key == "phone_no" || key == "user_mobile_no")
			)
				subtractive
					? (object[key] = object[key].substring(1, object[key].length))
					: (object[key] = `0${object[key]}`)
			else if (typeof object[key] == "object")
				mutateContactNumber(object[key], subtractive)
		})
		return object as object
	},
	mutateDateTimeString = (object: any) => {
		if (object == null) return null

		Object.keys(object).map(key => {
			if (
				typeof object[key] != "object" &&
				(key == "start_time" || key == "end_time")
			)
				object[key] = new Date(object[key])
			else if (typeof object[key] == "object") mutateDateTimeString(object[key])
		})
		return object as object
	}

export { mutateContactNumber, mutateDateTimeString }
