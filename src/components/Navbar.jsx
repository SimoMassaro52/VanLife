import "../App.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

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
					<NavLink
						to="/login"
						className={(obj) =>
							`user-ico-nav ${obj.isActive ? "link-selected" : ""}`
						}
					>
						<FontAwesomeIcon icon={faCircleUser} />
					</NavLink>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
