import "../App.css";

//In the case we are given more useful information in our error response, we can use a hook called useRouteError() to access an object with the info we want to display such as the status, type of error etc.
import { useRouteError } from "react-router-dom";

function Error() {
	const error = useRouteError();
	console.log({ error });
	return (
		<>
			<main>
				<h1>An error has occured!</h1>
				<p>
					<strong>Error: </strong>
					{error.message}
				</p>
				<p>
					<strong>Status: </strong>
					{error.statusText} - {error.status}
				</p>
			</main>
		</>
	);
}

export default Error;
