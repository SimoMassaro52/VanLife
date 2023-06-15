import "../../App.css";

function Income() {
	const transactionsData = [
		{ amount: 720, date: "Jan 3, '23", id: "1" },
		{ amount: 560, date: "Dec 12, '22", id: "2" },
		{ amount: 980, date: "Dec 3, '22", id: "3" },
	];
	return (
		<>
			<section className="host-income">
				<div className="host-income-header">
					<h1>Income</h1>
					<p>
						Last <span>30 days</span>
					</p>
					<h2>$2,260</h2>
				</div>

				<img />
				<div className="transactions-box">
					<div className="transactions-header">
						<h2>Your transactions (3)</h2>
						<p>
							Last <span>30 days</span>
						</p>
					</div>
					<div className="transactions-wrapper">
						{transactionsData.map((item) => (
							<div key={item.id} className="transaction">
								<h3>${item.amount}</h3>
								<p>{item.date}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Income;
