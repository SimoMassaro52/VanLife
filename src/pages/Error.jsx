import "../App.css";

import { Link } from "react-router-dom";

function Error() {
	return (
		<>
			<main className="error-wrapper">
				<div>
					<h1>Sorry, the page you were looking for was not found.</h1>
					<Link to="/" className="error-btn">
						Return to home
					</Link>
				</div>
			</main>
		</>
	);
}

export default Error;
