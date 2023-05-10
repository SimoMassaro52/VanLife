import "../App.css";

//Params function import
import { useParams } from "react-router-dom";

function VanDetail() {
	const params = useParams();
	console.log(params);
	return (
		<>
			<main className="single-van-wrapper">Van details</main>
		</>
	);
}

export default VanDetail;
