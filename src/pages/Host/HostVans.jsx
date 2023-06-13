import "../../App.css";

//Code has been refactored to accomodate loaders

import { Suspense } from "react";

import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

//In order for the authentication check to work in a component that receives data, we need to import the functiojn and tell the loader to await it and after that return the data
export async function loader({ request }) {
	await requireAuth(request);
	const hostVansPromise = getHostVans();

	return defer({ hostVans: hostVansPromise });
}

export default function HostVans() {
	const loadedHostVans = useLoaderData();
	return (
		<>
			<section className="host-vans-wrapper">
				<h1>Your listed vans</h1>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={loadedHostVans.hostVans}>
						{(loadedHostVans) => {
							const vanElements = loadedHostVans.map((van) => (
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

							return <div className="host-vans-box">{vanElements}</div>;
						}}
					</Await>
				</Suspense>
			</section>
		</>
	);
}
