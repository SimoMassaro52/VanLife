import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../App.css";

function Vans() {
	const [vansData, setVansData] = useState([]);

	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter = searchParams.get("type");

	useEffect(() => {
		fetch("/api/vans")
			.then((res) => res.json())
			.then((data) => setVansData(data.vans));
	}, []);

	const filteredVans = typeFilter
		? vansData.filter((van) => van.type === typeFilter)
		: vansData;

	const vanElements = filteredVans.map((van) => (
		<Link
			to={van.id}
			key={van.id}
			// state prop for passing the filter and keep it so that when the user goes back he keeps his filtering. It is of course an object containing the stringified URL query params
			state={{ search: searchParams.toString() }}
		>
			<div className="van-tile">
				<img src={van.imageUrl} />
				<div className="van-info">
					<h3>{van.name}</h3>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`van-type ${van.type}`}>
					{van.type.charAt(0).toUpperCase() + van.type.slice(1)}
				</i>
			</div>
		</Link>
	));

	return (
		<>
			<main className="vans-wrapper">
				<div className="vans-explore-box">
					<h1>Explore our van options</h1>
					<div className="explore-filters-box">
						<button
							onClick={() => setSearchParams({ type: "simple" })}
							className={`filter-sim ${
								typeFilter == "simple" ? "selected" : ""
							}`}
						>
							Simple
						</button>
						<button
							onClick={() => setSearchParams({ type: "luxury" })}
							className={`filter-lux ${
								typeFilter == "luxury" ? "selected" : ""
							}`}
						>
							Luxury
						</button>
						<button
							onClick={() => setSearchParams({ type: "rugged" })}
							className={`filter-rug ${
								typeFilter == "rugged" ? "selected" : ""
							}`}
						>
							Rugged
						</button>
						{typeFilter !== null ? (
							<button className="clear-btn" onClick={() => setSearchParams({})}>
								Clear filters
							</button>
						) : (
							""
						)}
					</div>
				</div>
				<div className="van-tiles-box">{vanElements}</div>
			</main>
		</>
	);
}

export default Vans;
