import "../../App.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HostVans() {
	const [vansData, setVansData] = useState([]);

	useEffect(() => {
		fetch("/api/host/vans")
			.then((res) => res.json())
			.then((data) => setVansData(data.vans));
	}, []);

	const vanElements = vansData.map((van) => (
		<Link to={`/host/vans/${van.id}`} key={van.id}>
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
				{vansData.length > 0 ? (
					<div className="host-vans-box">{vanElements}</div>
				) : (
					<h2>Loading...</h2>
				)}
			</section>
		</>
	);
}

export default HostVans;
