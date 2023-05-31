import "../App.css";
import { loginUser } from "../api";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export default function Login() {
	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
	});

	const message = useLoaderData();

	//This status state will be used to disable the log in button until the login actually happens
	const [status, setStatus] = useState("idle");

	//We are also setting an error state in order to display an error message if the user is not present in the database
	const [error, setError] = useState(null);

	//We are going to use the useNavigate() hook to redirect the user to the host page if the log in is successfull (switch isLoggedIn to true in utils.js)
	const navigate = useNavigate();

	function handleSubmit(e) {
		setStatus("submitting");
		e.preventDefault();
		loginUser(loginFormData)
			.then((data) => navigate("/host"))
			.catch((err) => setError(err))
			.finally(() => setStatus("idle"));
		setError(null);
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<>
			<main className="login-wrapper">
				{message !== null ? (
					<h2>You must log in first</h2>
				) : (
					<h2>Sign in to your account</h2>
				)}
				{error && <h3>{error.message}</h3>}
				<form className="login-form" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email address"
						name="email"
						onChange={handleChange}
						value={loginFormData.email}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={loginFormData.password}
					/>
					{/* Disabling the button depending on the state of the form submission */}
					<button id="login-btn" disabled={status === "submitting"}>
						{status === "submitting" ? "Logging in..." : "Log in"}
					</button>
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
