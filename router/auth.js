const express = require("express"); //we make router here so we need for that express to make express.router//
const router = express.Router();
const Personal = require("../models/userSchema");
const { countries } = require("countries-list");
const { State, Country, City } = require("country-state-city");

router.post("/personal", async (req, res) => {
	try {
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
		} = req.body;

		console.log(req.body);

		// Check if all required fields are provided
		if (
			!firstName ||
			!lastName ||
			!age ||
			!email ||
			!country ||
			!state ||
			!city ||
			!gender ||
			!dateOfBirth
		) {
			return res.status(422).json({ error: "Please enter all required data" });
		}

		const nameRegex = /^[A-Za-z]+$/;
		if (!firstName.match(nameRegex) || !lastName.match(nameRegex)) {
			return res.status(422).json({
				error: "First name and last name should contain alphabets only",
			});
		}

		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!email.match(emailRegex)) {
			return res.status(422).json({ error: "Invalid email format" });
		}

		if (age <= 0) {
			return res.status(422).json({ error: "Age must be a positive number" });
		}

		const today = new Date();
		const dob = new Date(dateOfBirth);
		const ageDiff = today.getFullYear() - dob.getFullYear();
		if (ageDiff < 14) {
			return res.status(422).json({ error: "Age must be older than 14 years" });
		}

		const userExist = await Personal.findOne({ email: email });
		if (userExist) {
			return res
				.status(422)
				.json({ error: "User with this email already exists" });
		}

		const user = new Personal({
			firstName,
			lastName,
			age,
			email,
			country,
			state,
			city,
			gender,
			dateOfBirth,
		});
		await user.save();

		res.status(201).json({ message: "Data saved successfully" });
	} catch (error) {
		// console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// GET route to fetch all user data
router.get("/personal", async (req, res) => {
	try {
		// Fetch all user data from the database
		const users = await Personal.find();

		// Send the data as a response
		res.status(200).json(users);
	} catch (error) {
		// console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// GET route to fetch all countries
router.get("/countries", async (req, res) => {
	try {
		// Get the country names from the countries object
		// const countryNames = Object.values(countries).map(
		// 	(country) => country.name
		// );
		const countryNames = Country.getAllCountries().map((county) => {
			return { country: county.name, isoCode: county.isoCode };
		});
		// console.log(Country.getAllCountries());
		// Send the list of country names as a JSON response
		res.status(200).json(countryNames);
	} catch (error) {
		// console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// GET route to fetch all states of a specific country
router.get("/countries/:countryName/states", async (req, res) => {
	try {
		const { countryName } = req.params;

		const states = State.getStatesOfCountry(countryName);

		if (!states || states.length === 0) {
			return res
				.status(404)
				.json({ error: "States not found for the country" });
		}

		const stateNames = states.map((state) => {
			return { state: state.name, isoCode: state.isoCode };
		});

		res.status(200).json(stateNames);
	} catch (error) {
		// console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// GET route to fetch all cities of a specific country
router.get("/countries/:countryName/:stateName", async (req, res) => {
	try {
		const { countryName, stateName } = req.params;

		console.log(countryName, stateName);

		console.log(countryName);
		const cities = City.getCitiesOfState(countryName, stateName);

		console.log(cities);

		if (!cities || cities.length === 0) {
			return res.status(404).json({ error: "Cities not found for the state" });
		}
		const cityNames = cities.map((city) => city.name);
		res.status(200).json(cityNames);
	} catch (error) {
		// console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
