import "../../../App.css";

import { useOutletContext } from "react-router-dom";

function HostVanPhotos() {
	const [van, setVan] = useOutletContext();

	return (
		<>
			<div className="host-van-photos-box">
				<img src={van.imageUrl} />
			</div>
		</>
	);
}

export default HostVanPhotos;
