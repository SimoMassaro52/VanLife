import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<>
			<nav>
				<div className="nav-logo">
					<Link to="/">#VANLIFE</Link>
				</div>
				<div className="nav-links">
					<Link to="/host">Host</Link>
					<Link to="/about">About</Link>
					<Link to="/vans">Vans</Link>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
