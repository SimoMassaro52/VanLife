import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";

import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";

import HostVanDetail from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/Hostvan/HostVanInfo";
import HostVanPricing from "./pages/Host/Hostvan/HostVanPricing";
import HostVanPhotos from "./pages/Host/Hostvan/HostVanPhotos";

//The App component will be dedicated exclusively to the Browser Router so we are going to take out of it any actual components and use the Layout nested route to be our page layout blueprint

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* Generally, nesting is used to avoid repetition or to display recurring UI elements such as nav elements*/}
					<Route path="/" element={<Layout />}>
						{/* To display a sort of default route as the first element present in a given parent route, we need to add the index prop to that route and it will know to appear before anything else following the parent's path */}
						<Route index element={<Home />} />

						<Route path="about" element={<About />} />
						<Route path="vans" element={<Vans />} />
						<Route path="vans/:id" element={<VanDetail />} />

						<Route path="host" element={<HostLayout />}>
							<Route index element={<Dashboard />} />
							<Route path="income" element={<Income />} />
							<Route path="vans" element={<HostVans />} />
							<Route path="vans/:id" element={<HostVanDetail />}>
								<Route index element={<HostVanInfo />} />
								<Route path="pricing" element={<HostVanPricing />} />
								<Route path="photos" element={<HostVanPhotos />} />
							</Route>
							<Route path="reviews" element={<Reviews />} />
						</Route>
						{/* We will set up a "chat-all" or splat route for the 404 page. It will be a child of the layout route so it keeps header and footer*/}
						<Route path="*" element={<Error />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
