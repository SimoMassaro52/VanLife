import { redirect } from "react-router";

export async function requireAuth(request) {
	const pathname = new URL(request.url).pathname;
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	if (isLoggedIn === false || !isLoggedIn) {
		return redirect(
			`/login?message=You must log in first&redirectTo=${pathname}`
		);
	}
	return null;
}
