import { useState, useEffect } from "react";
import "../App.css";

function Vans() {
	const [vansData, setVansData] = useState([]);

	useEffect(() => {
		fetch("api/vans")
			.then((res) => res.json())
			.then((data) => setVansData(data.vans));
	}, []);

	const vanElements = vansData.map((van) => (
		<div key={van.id} className="van-tile">
			<img src={van.imageUrl} />
			<div className="van-info">
				<h3>{van.name}</h3>
				<p>
					${van.price}
					<span>/day</span>
				</p>
			</div>
			<i className={`van-type ${van.type} selected`}>
				{van.type.charAt(0).toUpperCase() + van.type.slice(1)}
			</i>
		</div>
	));

	return (
		<>
			<main className="vans-wrapper">
				<div className="vans-explore-box">
					<h1>Explore our van options</h1>
					<div className="explore-filters-box">
						<button>Simple</button>
						<button>Luxury</button>
						<button>Rugged</button>
						<p>Clear filters</p>
					</div>
				</div>
				<div className="van-tiles-box">{vanElements}</div>
			</main>
		</>
	);
}

export default Vans;
