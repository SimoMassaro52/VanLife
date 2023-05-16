import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
	return (
		<>
			<Navbar />
			{/* The outlet component is used to display the child elements wrapped by the parent route. This is where the bulk of the page will appear and we are using outlet on the Layout parent route to tell it where to show it */}
			<Outlet />
			<Footer />
		</>
	);
}
