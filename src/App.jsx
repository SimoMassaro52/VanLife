import "./App.css";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	//A super useful method for avoiding writing the extensive array of object if we have the route elements already defined is createRoutesFromElements
	createRoutesFromElements,
} from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Login from "./pages/Login";

//We can import the loader function and change its name in the context of the master component App.jsx to be more specific
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/Vans/VanDetail";

import Error from "./components/Error";

import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";

import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, {
	loader as hostVanDetailLoader,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/Hostvan/HostVanInfo";
import HostVanPricing from "./pages/Host/Hostvan/HostVanPricing";
import HostVanPhotos from "./pages/Host/Hostvan/HostVanPhotos";

//Since we want to check for authentication in multiple routes, we can create a utility function that will check if the user is logged in and paste it in each route. We are going to store our utility function in a separate JS file to avoid bulky code
import { requireAuth } from "./utils";

export default function App() {
	const router = createBrowserRouter(
		//This method just turns the classic routes into an array of objects readable by createBrowserRouter()
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />

				<Route path="about" element={<About />} />
				<Route path="login" element={<Login />} />

				<Route
					path="vans"
					element={<Vans />}
					loader={vansLoader}
					//Error element attribute
					errorElement={<Error />}
				/>
				<Route
					path="vans/:id"
					element={<VanDetail />}
					loader={vanDetailLoader}
				/>

				<Route path="host" element={<HostLayout />}>
					<Route
						index
						element={<Dashboard />}
						loader={async () => await requireAuth()}
					/>
					<Route path="income" element={<Income />} />
					<Route path="vans" element={<HostVans />} loader={hostVansLoader} />
					<Route
						path="vans/:id"
						element={<HostVanDetail />}
						loader={hostVanDetailLoader}
					>
						<Route index element={<HostVanInfo />} />
						<Route path="pricing" element={<HostVanPricing />} />
						<Route path="photos" element={<HostVanPhotos />} />
					</Route>
					<Route path="reviews" element={<Reviews />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);
	return <RouterProvider router={router} />;
}
