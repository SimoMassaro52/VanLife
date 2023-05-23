import "./App.css";
import {
	Routes,
	Route,
	RouterProvider,
	createBrowserRouter,
	//A super useful method for avoiding writing the extensive array of object if we have the route elements already defined is createRoutesFromElements
	createRoutesFromElements,
} from "react-router-dom";

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

const router = createBrowserRouter(
	//This method just turns the classic routes into an array of objects readable by createBrowserRouter()
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
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
			<Route path="*" element={<Error />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
