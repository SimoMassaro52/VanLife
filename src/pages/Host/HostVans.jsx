import "../../App.css";
import { requireAuth } from "../../utils";

//Code has been refactored to accomodate loaders

import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";

export async function loader() {
	await requireAuth();
	return getHostVans();
}

export default function HostVans() {
	const vansData = useLoaderData();

	const vanElements = vansData.map((van) => (
		<Link to={van.id} key={van.id}>
			<div className="host-van-tile">
				<img src={van.imageUrl} />
				<div className="host-van-txt">
					<span>{van.name}</span>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
			</div>
		</Link>
	));

	return (
		<>
			<section className="host-vans-wrapper">
				<h1>Your listed vans</h1>
				<div className="host-vans-box">{vanElements}</div>
			</section>
		</>
	);
}
