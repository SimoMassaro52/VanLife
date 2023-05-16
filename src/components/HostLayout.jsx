import "../App.css";
import { Link, Outlet } from "react-router-dom";

function HostLayout() {
	return (
		<>
			<main>
				<nav className="host-nav">
					<div className="nav-links">
						<Link to="/host">Dashboard</Link>
						<Link to="/host/income">Income</Link>
						<Link to="/host/reviews">Reviews</Link>
					</div>
				</nav>
				<Outlet />
			</main>
		</>
	);
}

export default HostLayout;
