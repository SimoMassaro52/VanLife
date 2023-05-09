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
					<Link to="/about">About</Link>
					<span>Vans</span>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
