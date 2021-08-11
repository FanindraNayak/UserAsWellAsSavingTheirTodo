import React, { useState } from "react";
import axios from "axios";
function App() {
	const [createUser, setCreateUser] = useState({
		email: "",
		password: "",
	});

	const [userDataGot, setUserDataGot] = useState({
		userId: Number,
		email: "dsf",
		password: "",
	});

	const [messages, setMessages] = useState([]);
	const clear = () => {
		setCreateUser({
			email: "",
			password: "",
		});
	};
	const [page, setPage] = useState(0);

	const [massageToBePosted, setMassageToBePosted] = useState({
		userId: Number,
		message: "",
	});
	// console.log(userDataGot);
	// console.log(massageToBePosted);
	const handelChange = (e) => {
		setCreateUser({ ...createUser, [e.target.name]: e.target.value });
	};
	const handelSubmit = async (e) => {
		e.preventDefault();
		const url = `http://localhost:3012/api/userData/post`;
		await axios.post(url, createUser);
		clear();
	};

	const handelLoginSubmit = async (e) => {
		e.preventDefault();
		const url = `http://localhost:3012/api/userData/${createUser.email}`;
		const res = await axios.get(url);
		// console.log(res.data.length);
		if (res.data.length === 1) {
			const data = res.data[0];
			if (
				createUser.email === data.email &&
				createUser.password === data.password
			) {
				setUserDataGot({
					...userDataGot,
					userId: data.userId,
					email: data.email,
					password: data.password,
				});
				clear();
				gettingMessages(data.userId);

				setPage(2);
			} else if (
				createUser.email !== data.email ||
				createUser.password !== data.password
			) {
				clear();
				setPage(0);
				// console.log("hi");
			}
			// console.log(data);
		} else if (res.data.length === 0) {
			clear();
			setPage(0);
		}
	};

	const postMessages = async (e) => {
		e.preventDefault();
		const url = `http://localhost:3012/api/message/post`;
		await axios.post(url, massageToBePosted);
		setMassageToBePosted({
			message: "",
		});
		gettingMessages(userDataGot.userId);
	};

	const handelMessageChange = (e) => {
		setMassageToBePosted({
			...massageToBePosted,
			userId: userDataGot.userId,
			message: e.target.value,
		});
	};

	const gettingMessages = async (userId) => {
		// console.log(userDataGot.userId);
		const url1 = `http://localhost:3012/api/message/get/${userId}`;
		const response = await axios.get(url1);
		const data = response.data;
		// console.log(data);
		setMessages(data);
	};

	const registerForm = () => {
		return (
			<form>
				<input
					type="text"
					value={createUser.email}
					name="email"
					onChange={handelChange}
				/>
				<br />
				<br />
				<input
					type="text"
					value={createUser.password}
					name="password"
					onChange={handelChange}
				/>
				<br />
				<button onClick={handelSubmit}>RegisterUser</button>
			</form>
		);
	};

	const loginPage = () => {
		return (
			<form>
				<input
					type="text"
					value={createUser.email}
					name="email"
					onChange={handelChange}
				/>
				<br />
				<br />
				<input
					type="text"
					value={createUser.password}
					name="password"
					onChange={handelChange}
				/>
				<br />
				<button onClick={handelLoginSubmit}>LoginUser</button>
			</form>
		);
	};

	const messagePage = () => {
		return (
			<div>
				{messages.map((massageValue, i) => {
					return <div key={i + 1}>{massageValue.message}</div>;
				})}
				{messageForm()}
			</div>
		);
	};

	const messageForm = () => {
		return (
			<form>
				<input
					type="text"
					value={massageToBePosted.message}
					name="message"
					onChange={handelMessageChange}
				/>

				<br />
				<button onClick={postMessages}>postMessages</button>
			</form>
		);
	};

	return (
		<div className="App">
			<button onClick={() => setPage(1)}>Register</button>
			<button onClick={() => setPage(0)}>Login</button>
			{page === 0 ? loginPage() : page === 1 ? registerForm() : messagePage()}
		</div>
	);
}

export default App;
