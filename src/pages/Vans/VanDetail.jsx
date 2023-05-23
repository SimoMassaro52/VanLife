import "../../App.css";

//Params function import
import {
	useParams,
	Link,
	// New hook for receiving the location data
	useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function VanDetail() {
	const params = useParams();
	const location = useLocation();
	// Location is an object with a lot of useful properties. In this case we are going to take advantage of the search object in the state property
	// console.log(location);
	const [van, setVan] = useState(null);
	useEffect(() => {
		fetch(`/api/vans/${params.id}`)
			.then((res) => res.json())
			.then((data) => setVan(data.vans));
		//We want to rerun the fetch request only if the id changes
	}, [params.id]);

	return (
		<>
			<main className="single-van-wrapper">
				<Link
					//We are getting back to the all vans page and if the state has been defined then we will keep the search params. We need to add the question mark
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
				{van ? (
					<div className="van-detail">
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
				) : (
					<h2>Loading...</h2>
				)}
			</main>
		</>
	);
}

export default VanDetail;
