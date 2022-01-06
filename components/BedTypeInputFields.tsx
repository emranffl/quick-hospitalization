import AnnotationToggler from "@components/AnnotationToggler"

export interface BedTypeInputFieldsProps {}

const BedTypeInputFields: React.FC<BedTypeInputFieldsProps> = () => {
	return (
		<>
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="ward"
					id="ward"
					value="Ward"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="ward"
				>
					Ward
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="ward"
					className="form-control"
					id="wardCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div>
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="special_ward"
					id="specialWard"
					value="Special Ward"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="specialWard"
				>
					Special Ward
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="special_ward"
					className="form-control"
					id="specialWardCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div>
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="cabin"
					id="cabin"
					value="Cabin"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="cabin"
				>
					Cabin
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="cabin"
					className="form-control"
					id="cabinCount"
					defaultValue="0"
					min="0"
					max="255"
					disabled
				/>
			</div>
			{/* <div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="vip_cabin"
					id="vipCabin"
					value="VIP Cabin"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="vipCabin"
				>
					VIP Cabin
				</label>
			</div> 
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="vip_cabin"
											className="form-control"
					id="vipCabinCount"
					defaultValue="0"
					min="0"
					max="255"
					disabled
				/>
			</div> */}
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="icu"
					id="icu"
					value="ICU"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="icu"
				>
					ICU&nbsp;
					<AnnotationToggler
						textColor="text-info"
						textContent={
							<>
								<strong>Intensive Care Unit</strong>, input total capacity of
								all types of ICUs.
							</>
						}
					/>
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="icu"
					className="form-control"
					id="icuCount"
					defaultValue="0"
					min="0"
					max="255"
					disabled
				/>
			</div>
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="ccu"
					id="ccu"
					value="CCU"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="ccu"
				>
					CCU&nbsp;
					<AnnotationToggler
						textColor="text-info"
						textContent={
							<>
								<strong>Critical Care Unit</strong>, input total capacity of all
								types of CCUs.
							</>
						}
					/>
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="ccu"
					className="form-control"
					id="ccuCount"
					defaultValue="0"
					min="0"
					max="255"
					disabled
				/>
			</div>
			{/* <div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="hdu"
					id="hdu"
					value="HDU"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="hdu"
				>
					HDU&nbsp;
					<AnnotationToggler
						textColor="text-info"
						textContent={
							<>
								<strong>High Dependency Unit</strong>, input total capacity of
								all types of HDUs.
							</>
						}
					/>
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="hdu"
											className="form-control"
					id="hduCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div>
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="hfncu"
					id="hfncu"
					value="HFNCU"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="hfncu"
				>
					HFNCU&nbsp;
					<AnnotationToggler
						textColor="text-info"
						textContent={
							<>
								<strong>High Flow Nasal Cannula Unit</strong>, input total
								capacity of all types of HFNCUs.
							</>
						}
					/>
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="hfncu"
											className="form-control"
					id="hfncuCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div>
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="emergency"
					id="emergency"
					value="Emergency"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="emergency"
				>
					Emergency
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="emergency"
											className="form-control"
					id="emergencyCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div> */}
			<div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="covidu"
					id="covidu"
					value="COVIDU"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="covidu"
				>
					COVIDU&nbsp;
					<AnnotationToggler
						textColor="text-info"
						textContent={
							<>
								<strong>COVID Unit</strong>, input total capacity of dedicated
								COVID treatment units.
							</>
						}
					/>
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="covidu"
					className="form-control"
					id="covidCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div>
			{/* <div className="form-check col px-0 d-flex align-items-center">
				<input
					className="form-check-input mx-3"
					style={{ cursor: "pointer" }}
					type="checkbox"
					data-name="extra"
					id="extra"
					value="Extra"
				/>
				<label
					className="form-check-label mt-n2"
					style={{ cursor: "pointer" }}
					htmlFor="extra"
				>
					Extra
				</label>
			</div>
			<div className="form-check col px-0 w-5">
				<input
					type="number"
					data-name="extra"
											className="form-control"
					id="extraCount"
					defaultValue="0"
					min="0"
					max="65535"
					disabled
				/>
			</div> */}
		</>
	)
}

export default BedTypeInputFields
