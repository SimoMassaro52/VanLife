import "../App.css";
import { loginUser } from "../api";
import { useState } from "react";
import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";

//Code has been refactored after implementing action

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const data = await loginUser({ email, password });
	//To make a "better" fake auth we are going to save a boolean to local storage and check for it in requireAuth
	localStorage.setItem("isLoggedIn", true);

	console.log(data);
	const response = redirect("/host");
	response.body = true;
	return response;
}

export default function Login() {
	const message = useLoaderData();

	//This status state will be used to disable the log in button until the login actually happens
	const [status, setStatus] = useState("idle");

	//We are also setting an error state in order to display an error message if the user is not present in the database
	const [error, setError] = useState(null);

	//We are going to use the useNavigate() hook to redirect the user to the host page if the log in is successfull (switch isLoggedIn to true in utils.js)
	const navigate = useNavigate();

	// function handleSubmit(e) {
	// 	setStatus("submitting");
	// 	e.preventDefault();
	// 		.then((data) => navigate("/host"))
	// 		.catch((err) => setError(err))
	// 		.finally(() => setStatus("idle"));
	// 	setError(null);
	// }

	return (
		<>
			<main className="login-wrapper">
				{message !== null ? (
					<h2>You must log in first</h2>
				) : (
					<h2>Sign in to your account</h2>
				)}
				{error && <h3>{error.message}</h3>}
				<Form
					method="post"
					className="login-form"
					// If the user logs in and presses the back button, he's going to end back to the log in page. To avoid that we want to remove the page from the history stack. Since the Form is considered a navigation instance as well we need to add the replace prop to clear the history stack
					replace
				>
					<input type="email" placeholder="Email address" name="email" />
					<input type="password" placeholder="Password" name="password" />
					{/* Disabling the button depending on the state of the form submission */}
					<button id="login-btn" disabled={status === "submitting"}>
						{status === "submitting" ? "Logging in..." : "Log in"}
					</button>
				</Form>
				<div>
					<p className="create-now">
						Don’t have an account? <span>Create one now</span>
					</p>
				</div>
			</main>
		</>
	);
}
