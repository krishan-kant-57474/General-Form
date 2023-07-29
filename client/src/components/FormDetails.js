import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormDetails.css";
import userImg from "../imagesfile/user.svg";

const FormDetails = () => {
	const [userData, setUserData] = useState([]);
	const [user, setUser] = useState({});
	const [selectUser, setSelectUser] = useState("");

	useEffect(() => {
		console.log(selectUser);
		const data = userData.filter((item) => item.firstName === selectUser);
		setUser(data[0]);
	}, [selectUser]);

	const navigate = useNavigate();

	const callAboutPage = async () => {
		try {
			const res = await fetch("/personal", {
				method: "GET",
				headers: {
					Accept: "appllication/json",
					"Content-type": "application/json",
				},
				credentials: "include",
			});

			const data = await res.json();
			setUserData(data);
			setUser(data[0]);

			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		callAboutPage();
	}, []);

	// Helper function to format the date
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString(); // Customize the date format as needed
	};

	return (
		<>
			<div className="box">
				<div className="box-div">
					<select
						id="selectField"
						value={selectUser}
						onChange={(e) => {
							setSelectUser(e.target.value);
						}}
					>
						<option value="">Select user</option>
						{/* Render the options dynamically */}
						{userData &&
							userData?.map((option) => (
								<option key={option?.firstName} value={option?.firstName}>
									{option?.firstName}
								</option>
							))}
					</select>
					{user && (
						<div key={user._id} className="userData-card">
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center",
								}}
							>
								<img src={userImg} alt="" width="80px" height="80px" />
								<h1>{`${user.firstName} ${user.lastName}`}</h1>
							</div>
							<br />
							<br />
							<div
								style={{
									display: "flex",
									justifyContent: "space-around",
									alignItems: "center",
								}}
							>
								<div>
									<h3>Email: </h3>
									<h3>Country:</h3>
									<h3>State:</h3>
									<h3>City:</h3>
									<h3>Gender:</h3>
									<h3>Date of Birth:</h3>
								</div>

								<div style={{ color: "#FFA500" }}>
									<h3>{user.email}</h3>
									<h3>{user.country}</h3>
									<h3>{user.state}</h3>
									<h3>{user.city}</h3>
									<h3>{user.gender}</h3>
									<h3>{formatDate(user.dateOfBirth)}</h3>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default FormDetails;
