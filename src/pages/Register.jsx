import "../App.css";
import { useState } from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import { addNewUser } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export async function action({ request }) {
	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");
	const psw = formData.get("password");
	try {
		addNewUser({ name, email, psw });
		return redirect("/host");
	} catch (err) {
		return err.message;
	}
}

export default function Register() {
	const [checked, setChecked] = useState(false);
	function handleChange() {
		setChecked(!checked);
	}

	const errorMsg = useActionData();
	return (
		<>
			<main className="login-wrapper">
				<h2>Create your Vanlife account</h2>
				{errorMsg && <h3>{errorMsg}</h3>}
				<Form method="post" className="register-form" replace>
					<div className="form-input">
						<label>Username: </label>
						<input type="text" placeholder="Username" name="name" required />
					</div>
					<div className="form-input">
						<label>Email:</label>
						<input
							type="email"
							placeholder="Email address"
							name="email"
							required
						/>
					</div>
					<div className="form-input">
						<label>Password:</label>
						<div className="field-psw-box">
							<input
								type={checked ? "text" : "password"}
								placeholder="Choose a password"
								name="password"
								minLength="6"
								required
							/>
							<FontAwesomeIcon
								icon={checked ? faEye : faEyeSlash}
								className="field-icon"
								onClick={handleChange}
							/>
						</div>
					</div>
					{/* <div className="psw-show">
						<label className="psw-checkbox">
							<span>Show Password</span>
							<input
								type="checkbox"
								checked={checked}
								onChange={handleChange}
							/>
						</label>
					</div> */}
					<button id="login-btn">Sign me up!</button>
				</Form>
			</main>
		</>
	);
}
