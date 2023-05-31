import { redirect } from "react-router";

export async function requireAuth() {
	const isLoggedIn = false;
	if (!isLoggedIn) {
		throw redirect("/login?message=You must log in first");
	}
}
