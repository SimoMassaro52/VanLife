import "../App.css";

function About() {
	return (
		<>
			<main className="about-wrapper">
				<section className="about-hero"></section>
				<section className="about-txt-box">
					<div className="about-txt-wrapper">
						<h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
						<p>
							Our mission is to enliven your road trip with the perfect travel
							van rental. Our vans are recertified before each trip to ensure
							your travel plans can go off without a hitch. (Hitch costs extra
							😉)
						</p>
						<p>
							Our team is full of vanlife enthusiasts who know firsthand the
							magic of touring the world on 4 wheels.
						</p>
					</div>
					<div className="about-explore-box">
						<p>Your destination is waiting.</p>
						<p>Your van is ready.</p>
						<button className="explore-btn">Explore our vans</button>
					</div>
				</section>
			</main>
		</>
	);
}

export default About;
