import "../App.css";
import { useLoaderData } from "react-router-dom";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export default function Login() {
	const message = useLoaderData();
	return (
		<>
			<main className="login-wrapper">
				{message !== null ? (
					<h2>You must log in first</h2>
				) : (
					<h2>Sign in to your account</h2>
				)}
				<form className="login-form">
					<input type="email" placeholder="Email address" />
					<input type="password" placeholder="Password" />
					<button>Login</button>
				</form>
				<div>
					<p className="create-now">
						Don’t have an account? <span>Create one now</span>
					</p>
				</div>
			</main>
		</>
	);
}
