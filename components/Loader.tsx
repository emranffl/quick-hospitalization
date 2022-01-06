import { css } from "@emotion/react"
import FadeLoader from "react-spinners/FadeLoader"

export interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
	return (
		<div
			className={"d-flex xd"}
			style={{
				position: "fixed",
				height: "100vh",
				width: "100vw",
				background:
					"linear-gradient(0deg, rgba(72,216,217,0.7) 0%, rgba(52,58,64,0.9) 96%)",
				zIndex: 1100,
				backdropFilter: "blur(3px)",
			}}
		>
			<FadeLoader
				css={css`
					margin: auto auto;
				`}
				speedMultiplier={2}
				color="white"
			/>
		</div>
	)
}

export default Loader
