const isObjectEqual = (object1: object, object2: object) => {
	const keys1 = Object.keys(object1),
		keys2 = Object.keys(object2),
		isObject = (object: object) => {
			return object != null && typeof object === "object"
		}

	if (keys1.length !== keys2.length) return false

	for (const key of keys1) {
		const val1 = object1[key as keyof typeof object1],
			val2 = object2[key as keyof typeof object1],
			areObjects = isObject(val1) && isObject(val2)

		if (
			(areObjects && !isObjectEqual(val1, val2)) ||
			(!areObjects && val1 !== val2)
		)
			return false
	}

	return true
}

export { isObjectEqual }
