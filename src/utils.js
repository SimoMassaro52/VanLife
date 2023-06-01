import { redirect } from "react-router";

export async function requireAuth() {
	const isLoggedIn = localStorage.getItem("isLoggedIn");
	if (!isLoggedIn) {
		//This is a workaround as suggested in https://github.com/scrimba/learn-react-router-6#april-21-2023 to make the redirect work when using the MirageJS library
		const response = redirect("/login?message=You must log in first");
		response.body = true;
		return response;
	}
	return null;
}
