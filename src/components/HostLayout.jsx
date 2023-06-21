import "../App.css";
import { Outlet, NavLink, redirect, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

function HostLayout() {
	const navigate = useNavigate();
	async function logOut() {
		await logoutUser();
		console.log(localStorage.getItem("isLoggedIn"));
		navigate("/login");
		return null;
	}
	return (
		<>
			<main>
				<nav className="host-nav">
					<div className="nav-links">
						<NavLink
							//To link to the route we are currently on we can use dots much like in terminal directory commands
							to="."
							// By adding the end keyword we tell the browser router to stop the matching on this particular route (this fixes the always atctive nested index route bug)
							end
							className={(obj) => (obj.isActive ? "link-selected" : null)}
						>
							Dashboard
						</NavLink>
						<NavLink
							to="income"
							className={(obj) => (obj.isActive ? "link-selected" : null)}
						>
							Income
						</NavLink>
						<NavLink
							to="vans"
							className={(obj) => (obj.isActive ? "link-selected" : null)}
						>
							Vans
						</NavLink>
						<NavLink
							to="reviews"
							className={(obj) => (obj.isActive ? "link-selected" : null)}
						>
							Reviews
						</NavLink>
						<button onClick={logOut}>Log out</button>
					</div>
				</nav>
				<Outlet />
			</main>
		</>
	);
}

export default HostLayout;
