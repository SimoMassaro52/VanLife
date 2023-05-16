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

//The App component will be dedicated exclusively to the Browser Router so we are going to take out of it any actual components and use the Layout nested route to be our page layout blueprint

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/vans" element={<Vans />} />
						<Route path="/vans/:id" element={<VanDetail />} />

						<Route path="/host" element={<Dashboard />} />
						<Route path="/host/income" element={<Income />} />
						<Route path="/host/reviews" element={<Reviews />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
