import "../App.css";
import { loginUser } from "../api";
import {
	useLoaderData,
	useNavigate,
	Form,
	redirect,
	useActionData,
	useNavigation,
} from "react-router-dom";

//Code has been refactored after implementing action

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const path = new URL(request.url).searchParams.get("redirectTo") || "/host";
	try {
		//To make a "better" fake auth we are going to save a boolean to local storage and check for it in requireAuth
		localStorage.setItem("isLoggedIn", true);
		return redirect(path);
	} catch (err) {
		return err.message;
	}
}

export default function Login() {
	//To show the login title according to where the loader loads from
	const message = useLoaderData();
	//To show some kind of error message if the log in fails
	const errorMsg = useActionData();
	//To show that the form is submitting the data
	const navigation = useNavigation();
	return (
		<>
			<main className="login-wrapper">
				{message !== null ? (
					<h2>You must log in first</h2>
				) : (
					<h2>Sign in to your account</h2>
				)}
				{errorMsg && <h3>{errorMsg}</h3>}
				<Form
					method="post"
					className="login-form"
					// If the user logs in and presses the back button, he's going to end back to the log in page. To avoid that we want to remove the page from the history stack. Since the Form is considered a navigation instance as well we need to add the replace prop to clear the history stack
					replace
				>
					<input type="email" placeholder="Email address" name="email" />
					<input type="password" placeholder="Password" name="password" />
					{/* Disabling the button depending on the state of the form submission */}
					<button id="login-btn" disabled={navigation.state === "submitting"}>
						{navigation.state === "submitting" ? "Logging in..." : "Log in"}
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
