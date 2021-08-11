const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 3012;
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Mysql Defining

const db = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

// Routes

// Get
app.get("/api/messages", (req, res) => {
	const getAllMessagesQuery = `select * from messages`;
	db.query(getAllMessagesQuery, (error, result) => {
		if (error) console.log(error);
		// console.log(result);
		res.send(result);
	});
});

app.get("/api/userData/:email", (req, res) => {
	// console.log(req.params.email);
	const email = req.params.email;
	const getUserQuery = `select * from user where email = ?`;
	db.query(getUserQuery, [email], (error, result) => {
		if (error) console.log(error);
		// console.log(result);
		res.send(result);
	});
});

app.get("/api/message/get/:userId", (req, res) => {
	// console.log(req.params.userId);
	// console.log(req.body);

	const userIdForMessage = req.params.userId;
	const getMessageInfo = `select * from messages where userId = ?`;
	db.query(getMessageInfo, [userIdForMessage], (error, result) => {
		if (error) console.log(error);
		// console.log(result);
		res.send(result);
	});
});

// Post

app.post("/api/userData/post", (req, res) => {
	console.log(req.params);
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const creatingUserQuery = `insert into user(email,password) values(?,?)`;
	db.query(creatingUserQuery, [email, password], (error, result) => {
		if (error) console.log(error);
		// console.log(result);
		res.send("Create the user");
	});

	// res.send("yes");
});

app.post("/api/message/post", (req, res) => {
	// console.log(req.params);
	// console.log(req.body);
	const userId = req.body.userId;
	const message = req.body.message;
	// console.log(userId);
	const postingMessageQuery = `insert into messages(userId,message) values(?,?)`;
	db.query(postingMessageQuery, [userId, message], (error, result) => {
		if (error) console.log(error);
		// console.log(result);
		res.send("send Message by the user");
	});
});

// Listening

app.listen(port, () => {
	console.log("listing on port no 3012");
});
