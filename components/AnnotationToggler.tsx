export interface AnnotationTogglerProps {
	textColor?: string
	textContent: any
}

const AnnotationToggler: React.FC<AnnotationTogglerProps> = ({
	textColor = "text-secondary",
	textContent,
}) => {
	return (
		<>
			<div className="btn-group dropright">
				<i
					className={`bi bi-patch-question-fill dropdown-toggle h5 px-2 ${textColor}`}
					style={
						textColor === "text-warning"
							? { cursor: "pointer", color: "darkorange!important" }
							: { cursor: "pointer" }
					}
					data-bs-toggle="dropdown"
					aria-expanded="false"
				></i>
				<small
					className="dropdown-menu mt-n5 p-2"
					style={{
						boxSizing: "border-box",
						fontSize: "0.9rem",
					}}
				>
					{textContent}
				</small>
			</div>
		</>
	)
}

export default AnnotationToggler
