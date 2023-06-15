import "../../App.css";

import { Suspense } from "react";
import { Link, defer, Await, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { requireAuth } from "../../utils";
import { getHostVans } from "../../api";

function Dashboard() {
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
				<div className="top">
					<h2>Your listed vans</h2>
					<Link to="vans">View all</Link>
				</div>
				<Suspense fallback={<h3>Loading...</h3>}>
					<Await></Await>
				</Suspense>
			</section>
		</>
	);
}

export default Dashboard;
