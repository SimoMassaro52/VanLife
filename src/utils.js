import { redirect } from "react-router-dom";

//We want this function to be async since we check for the user to be authenticated FIRST and then we let the loaders make the fetch requests of their data to the database
export async function requireAuth() {
	const isLoggedIn = false;
	if (!isLoggedIn) {
		throw redirect("/login");
	}
}
