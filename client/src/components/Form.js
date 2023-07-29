import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FormImage } from "../imagesfile/ImageFile";
import axios from "axios";

const Form = () => {
	const navigate = useNavigate();

	const [allCountries, setAllCountries] = useState([]);
	const [allStates, setAllStates] = useState([]);
	const [allCities, setAllCities] = useState([]);

	const [country, setCountry] = useState("");
	const [state, setState] = useState("");

	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		country: "",
		state: "",
		city: "",
		gender: "",
		dateOfBirth: "",
		age: "",
	});

	useEffect(() => {
		axios
			.get("/countries")
			.then((response) => {
				setAllCountries(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		if (country) {
			axios
				.get(`/countries/${country}/states`)
				.then((response) => {
					setAllStates(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
		// Fetch cities
	}, [country]);

	useEffect(() => {
		if (state) {
			axios
				.get(`/countries/${country}/${state}`)
				.then((response) => {
					setAllCities(response.data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
		// Fetch cities
	}, [state]);

	let name, value;

	const handleInputes = (e) => {
		console.log(e);
		name = e.target.name;
		value = e.target.value;

		setUser({
			...user,
			[name]: value,
		});
	};

	const postData = async (e) => {
		e.preventDefault();
		const {
			firstName,
			lastName,
			age,
			email,
			country,
			state,
			city,
			gender,
			dateOfBirth,
		} = user;
		const res = await fetch("/personal", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				country,
				state,
				city,
				gender,
				dateOfBirth,
				age,
			}),
		});

		const data = await res.json();

		if (res.status === 201) {
			alert("Data saved successfully");
			navigate("/details");
		} else {
			console.log(res, data);
			alert(data?.error);
		}
	};

	return (
		<>
			<section className="first">
				<div className="first-t">
					<div className="first-form">
						<h2 className="form-title">Personal Details</h2>
						<form method="POST" className="register-form" id="register-form">
							<div className="form-group">
								<label htmlFor="firstName">
									<i class="zmdi zmdi-account"></i>
								</label>

								<input
									type="text"
									name="firstName"
									id="firstName"
									autoComplete="off"
									placeholder="First Name"
									value={user.firstName}
									onChange={handleInputes}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="lastName">
									<i class="zmdi zmdi-account"></i>
								</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									autoComplete="off"
									placeholder="Last Name"
									value={user.lastName}
									onChange={handleInputes}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">
									<i class="zmdi zmdi-email"></i>
								</label>
								<input
									type="text"
									name="email"
									id="email"
									autoComplete="off"
									placeholder="Your Email"
									value={user.email}
									onChange={handleInputes}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="country">
									<i className="zmdi zmdi-globe"></i>
								</label>
								<select
									name="country"
									id="country"
									value={user.country}
									onChange={(e) => {
										handleInputes(e);
										const county = allCountries.filter(
											(item) => item.country === e.target.value
										);
										setCountry(county[0].isoCode);
									}}
								>
									<option
										value=""
										disabled
										selected
										className="placeholder-option"
									>
										Select Country
									</option>
									{allCountries.map((country) => (
										<option key={country.country} value={country.country}>
											{country.country}
										</option>
									))}
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="state">
									<i className="zmdi zmdi-pin"></i>
								</label>
								<select
									name="state"
									id="state"
									value={user.state}
									onChange={(e) => {
										handleInputes(e);
										const state = allStates.filter(
											(item) => item.state === e.target.value
										);
										setState(state[0].isoCode);
									}}
								>
									<option
										value=""
										disabled
										selected
										className="placeholder-option"
									>
										Select State
									</option>
									{allStates.map((state) => (
										<option key={state.state} value={state.state}>
											{state.state}
										</option>
									))}
								</select>
							</div>
							{/* Other form fields */}
							<div className="form-group">
								<label htmlFor="city">
									<i className="zmdi zmdi-city"></i>
								</label>
								<select
									name="city"
									id="city"
									value={user.city}
									onChange={handleInputes}
								>
									<option
										value=""
										disabled
										selected
										className="placeholder-option"
									>
										Select City
									</option>
									{allCities.map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="dateOfBirth">
									<i className="zmdi zmdi-calendar"></i>
								</label>
								<input
									type="date"
									name="dateOfBirth"
									id="dateOfBirth"
									value={user.dateOfBirth}
									onChange={handleInputes}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="age">
									<i class="zmdi zmdi-male"></i>
								</label>

								<input
									type="number"
									name="age"
									id="age"
									autoComplete="off"
									placeholder="Age"
									value={user.age}
									onChange={handleInputes}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="gender">Gender:</label>
								<div className="radio-group" style={{ display: "flex" }}>
									<label>
										<input
											type="radio"
											name="gender"
											value="male"
											checked={user.gender === "male"}
											onChange={handleInputes}
										/>
										Male
									</label>
									<label>
										<input
											type="radio"
											name="gender"
											value="female"
											checked={user.gender === "female"}
											onChange={handleInputes}
										/>
										Female
									</label>
									<label>
										<input
											type="radio"
											name="gender"
											value="other"
											checked={user.gender === "other"}
											onChange={handleInputes}
										/>
										Other
									</label>
								</div>
							</div>

							<div className="form-button">
								<input
									type="submit"
									name="first"
									id="first"
									className="form-submit"
									value="Save"
									onClick={postData}
								/>
							</div>
						</form>
					</div>

					<div className="first-image">
						<figure>
							<img src={FormImage} alt="pic" width="400px" />
						</figure>
						<NavLink to="/details" className="first-image-link">
							I am already done
						</NavLink>
					</div>
				</div>
			</section>
		</>
	);
};

export default Form;
