import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import "../../App.css";
//Import of the async function that makes the fetch request in api.js
import { getVans } from "../../api";

export function loader() {
	return getVans();
}

function Vans() {
	// const [vansData, setVansData] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");

	//We won't need to use a useEffect() anymore
	const vansData = useLoaderData();
	let filteredVans = [];
	let vanElements = [];

	if (vansData.length > 0) {
		filteredVans = typeFilter
			? vansData.filter((van) => van.type === typeFilter)
			: vansData;
	}

	if (filteredVans.length > 0) {
		vanElements = filteredVans.map((van) => (
			<Link
				to={van.id}
				key={van.id}
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
	}

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
