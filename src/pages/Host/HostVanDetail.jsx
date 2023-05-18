import "../../App.css";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function HostVanDetail() {
	const params = useParams();
	const [van, setVan] = useState(null);
	useEffect(() => {
		fetch(`/api/host/vans/${params.id}`)
			.then((res) => res.json())
			.then((data) => setVan(...data.vans));
	}, [params.id]);

	return (
		<>
			<section className="single-host-van-wrapper">
				<Link
					to=".."
					//  Our links will take the route as their anchor and not the path so in order to make this back to button one step before and make it work properly without using absolute paths we can specify how to treat the anchored relative
					relative="path"
					className="back-to"
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					<p>Back to all your vans</p>
				</Link>
				{van ? (
					<div className="host-van-detail">
						<div className="host-van-img-box">
							<img src={van.imageUrl} />
							<div className="host-van-detail-box">
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
							</div>
						</div>
						<nav className="detail-navbar">
							<NavLink
								to="."
								end
								className={(obj) => (obj.isActive ? "link-selected" : null)}
							>
								Details
							</NavLink>
							<NavLink
								to="pricing"
								className={(obj) => (obj.isActive ? "link-selected" : null)}
							>
								Pricing
							</NavLink>
							<NavLink
								to="photos"
								className={(obj) => (obj.isActive ? "link-selected" : null)}
							>
								Photos
							</NavLink>
						</nav>
						{/* To pass data to the child route we can use something similar to prop passing called the "context" attribute by passing the desired state */}
						<Outlet context={[van, setVan]} />
					</div>
				) : (
					<h2>Loading...</h2>
				)}
			</section>
		</>
	);
}

export default HostVanDetail;
