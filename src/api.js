//This file contains a fetching async function to simulate an API call since we will never pull the data directely from the server in production as we were doing before

export async function getVans() {
	const res = await fetch("/api/vans");
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status,
		};
	}
	const data = await res.json();
	return data.vans;
}
