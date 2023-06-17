import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
function Reviews() {
	const reviewsData = [
		{
			stars: 4,
			user: "Elliot",
			date: "Dec 1, 2023",
			text: "The beach bum is such as awesome van! Such as comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
			id: "1",
		},
		{
			stars: 5,
			user: "Sandy",
			date: "Nov 23, 2022",
			text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
			id: "2",
		},
	];

	function generateStars(num) {
		const starArr = [];
		const starDisp = <FontAwesomeIcon className="score-star" icon={faStar} />;
		for (let i = 0; i < num; i++) {
			starArr.push(starDisp);
		}
		return starArr;
	}

	return (
		<>
			<section className="host-reviews-wrapper">
				<div className="reviews-title">
					<h1>Your reviews</h1>
					<p>
						last <span>30 days</span>
					</p>
				</div>
				<img />
				<div className="reviews-box">
					<h3>Reviews ({reviewsData.length})</h3>
					<div className="reviews-wrapper">
						{reviewsData.map((item) => (
							<div key={item.id} className="single-review">
								<div className="review-stars">{generateStars(item.stars)}</div>
								<div className="review-title">
									<span className="review-user">{item.user}</span>
									<span className="review-date">{item.date}</span>
								</div>
								<p className="review-desc">{item.text}</p>
								<hr />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Reviews;
