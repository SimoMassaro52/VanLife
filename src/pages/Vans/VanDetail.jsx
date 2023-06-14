import "../../App.css";

//Code has been refactored to accomodate loader functions
import { getVans } from "../../api";
import {
	useParams,
	Link,
	useLocation,
	useLoaderData,
	defer,
	Await,
} from "react-router-dom";
import { Suspense } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//Since we need access to the vans id we want to display, loaders has access to an object called params that receives the data from the parent route
export function loader({ params }) {
	const vanPromise = getVans(params.id);
	return defer({ van: vanPromise });
}

export default function VanDetail() {
	const location = useLocation();
	const loadedVan = useLoaderData();

	function displayedVan(van) {
		return (
			<div className="van-detail">
				{/* We can also get rid of the ternary since we are 100% sure the page will check if it has the correct data before actually rendering*/}
				<img src={van.imageUrl} />
				<div className="van-detail-txt">
					<div>
						<i className={`van-type ${van.type}`}>
							{van.type.charAt(0).toUpperCase() + van.type.slice(1)}
						</i>
					</div>
					<h2>{van.name}</h2>
					<p className="van-price">
						${van.price}
						<span>/day</span>
					</p>
					<p>{van.description}</p>
					<button className="home-btn">Rent this van</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<main className="single-van-wrapper">
				<Link
					to={`..${
						location.state.search !== "" ? "?" + location.state.search : ""
					}`}
					relative="path"
					className="back-to"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					<p>
						Back to{" "}
						{location.state.search !== ""
							? location.state.search.slice(5, location.state.search.length)
							: "all"}{" "}
						vans
					</p>
				</Link>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={loadedVan.van}>{displayedVan}</Await>
				</Suspense>
			</main>
		</>
	);
}
