import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Errorpage from "./components/Errorpage";
import Form from "./components/Form";
import FormDetails from "./components/FormDetails";

const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Form />} />
			<Route path="/details" element={<FormDetails />} />
			<Route path="/*" element={<Errorpage />} />
		</Routes>
	);
};

const App = () => {
	return (
		<Fragment>
			<Navbar />
			<Routing />
		</Fragment>
	);
};

export default App;
