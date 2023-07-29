import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../imagesfile/logo.svg";

const Navbar = () => {
	return (
		<div
			className="navbar"
			style={{ display: "flex", justifyContent: "space-between" }}
		>
			<div>
				<img src={logo} alt="" width="80px" height="80" />
			</div>
			<div style={{ display: "flex" }}>
				<div>
					<NavLink to="/" className="nav-link">
						Form
					</NavLink>
				</div>
				<div>
					<NavLink to="/details" className="nav-link">
						Form Details
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
