import "../App.css";

export default function Login() {
	return (
		<>
			<main className="login-wrapper">
				<h2>Sign in to your account</h2>
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
