import "../../../App.css";

import { useOutletContext } from "react-router-dom";

function HostVanPricing() {
	const [van, setVan] = useOutletContext();

	return (
		<>
			<div className="host-van-pricing-box">
				<p>
					${van.price}.00
					<span>/day</span>
				</p>
			</div>
		</>
	);
}

export default HostVanPricing;
