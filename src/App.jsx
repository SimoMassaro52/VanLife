import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";

import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";

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
							<Route path="reviews" element={<Reviews />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
