import { redirect } from "react-router";

export async function requireAuth(request) {
	const pathname = new URL(request.url).pathname;
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	if (isLoggedIn === false || !isLoggedIn) {
		//This is a workaround as suggested in https://github.com/scrimba/learn-react-router-6#april-21-2023 to make the redirect work when using the MirageJS library
		return redirect(
			`/login?message=You must log in first&redirectTo=${pathname}`
		);
	}
	return null;
}
