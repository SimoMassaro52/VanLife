import "../App.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
	return (
		<>
			<nav className="main-nav">
				<div className="nav-logo">
					<Link to="/">#VANLIFE</Link>
				</div>
				<div className="nav-links">
					<NavLink
						to="/host"
						className={(obj) => (obj.isActive ? "link-selected" : null)}
					>
						Host
					</NavLink>
					<NavLink
						to="/about"
						className={(obj) => (obj.isActive ? "link-selected" : null)}
					>
						About
					</NavLink>
					<NavLink
						to="/vans"
						className={(obj) => (obj.isActive ? "link-selected" : null)}
					>
						Vans
					</NavLink>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
