import "../../App.css";

import { Suspense } from "react";
import { Link, defer, Await, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { requireAuth } from "../../utils";
import { getHostVans } from "../../api";

export async function loader({ request }) {
	await requireAuth(request);
	return defer({ vans: getHostVans() });
}

function Dashboard() {
	const loaderData = useLoaderData();

	function renderVans(vans) {
		const hostVanElements = vans.map((van) => (
			<div className="dashboard-van-tile" key={van.id}>
				<div className="host-van-tile">
					<div className="host-van-l">
						<img src={van.imageUrl} />
						<div className="host-van-txt">
							<span>{van.name}</span>
							<p>
								${van.price}
								<span>/day</span>
							</p>
						</div>
					</div>

					<div>
						<Link className="dash-links" to={`vans/${van.id}`}>
							Edit
						</Link>
					</div>
				</div>
			</div>
		));
		return <div className="dashboard-van-wrapper">{hostVanElements}</div>;
	}
	return (
		<>
			<section className="dashboard-earnings">
				<div className="dashboard-earnings-info">
					<h1>Welcome!</h1>
					<p>
						Income last <span>30 days</span>
					</p>
					<h2>$2,260</h2>
				</div>
				<Link to="income" className="dash-links">
					Details
				</Link>
			</section>
			<section className="dashboard-reviews">
				<div className="dashboard-reviews-score">
					<h3>Review score</h3>
					<div className="score-num">
						<FontAwesomeIcon className="score-star" icon={faStar} />
						<p>
							<span>5.0</span>/5
						</p>
					</div>
				</div>
				<Link to="reviews" className="dash-links">
					Details
				</Link>
			</section>
			<section className="dashboard-vans">
				<div className="listed-vans-title">
					<h2>Your listed vans</h2>
					<Link to="vans" className="dash-links">
						View all
					</Link>
				</div>
				<Suspense fallback={<h3>Loading...</h3>}>
					<Await resolve={loaderData.vans}>{renderVans}</Await>
				</Suspense>
			</section>
		</>
	);
}

export default Dashboard;
