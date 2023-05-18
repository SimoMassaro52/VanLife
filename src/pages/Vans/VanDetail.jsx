import "../../App.css";

//Params function import
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function VanDetail() {
	const params = useParams();
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
				<Link to={"/vans"} className="back-to">
					<FontAwesomeIcon icon={faArrowLeft} />
					<p>Back to all vans</p>
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
