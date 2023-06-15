import "../../App.css";
import { Suspense } from "react";
import {
	Link,
	Outlet,
	NavLink,
	useLoaderData,
	Await,
	defer,
} from "react-router-dom";

//Code has been refactored to accomodate loaders

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getSingleVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
	await requireAuth(request);
	const hostVansPromise = getSingleVan(params.id);
	return defer({ vans: hostVansPromise });
}

export default function HostVanDetail() {
	const loadedVans = useLoaderData();
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
				<Suspense callback={<h1>Loading...</h1>}>
					<Await resolve={loadedVans.vans}>
						{(loadedData) => {
							const van = loadedData;
							return (
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
											className={(obj) =>
												obj.isActive ? "link-selected" : null
											}
										>
											Details
										</NavLink>
										<NavLink
											to="pricing"
											className={(obj) =>
												obj.isActive ? "link-selected" : null
											}
										>
											Pricing
										</NavLink>
										<NavLink
											to="photos"
											className={(obj) =>
												obj.isActive ? "link-selected" : null
											}
										>
											Photos
										</NavLink>
									</nav>
									{/* To pass data to the child route we can use something similar to prop passing called the "context" attribute by passing the desired state */}
									<Outlet context={[van]} />
								</div>
							);
						}}
					</Await>
				</Suspense>
			</section>
		</>
	);
}
