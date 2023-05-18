import "../../../App.css";

import { useOutletContext } from "react-router-dom";

function HostVanInfo() {
	//On the receiving end (the child route) we just need to assign the method to a dummy "state" and we can use it with ease like in the parent. The namespace doesn't even need to be the same
	const [van, setVan] = useOutletContext();
	return (
		<>
			<div className="host-van-info-box">
				<p>
					Name: <span>{van.name}</span>
				</p>
				<p>
					Category:{" "}
					<span>{van.type.charAt(0).toUpperCase() + van.type.slice(1)}</span>
				</p>
				<p>
					Description: <span>{van.description}</span>
				</p>
				<p>
					Visibility: <span>Public</span>
				</p>
			</div>
		</>
	);
}

export default HostVanInfo;
