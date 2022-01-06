import { useEffect, useRef } from "react"

const usePreviousState = (value: any) => {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current as typeof value
}

export { usePreviousState }
