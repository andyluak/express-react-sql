const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const db = mysql.createConnection({
	host: 'localhost',
	socketPath: '/tmp/mysql.sock',
	user: 'root',
	password: '',
	database: 'CRUDDB',
	insecureAuth: true,
});

const app = express();
app.use(cors());
app.use( bodyParser.urlencoded({ extended: false }) );
//Get all reviews
app.get('/api/reviews', (req, res) => {
	let sqlInsert =
		'INSERT INTO movie_review (movie_name, movie_review) VALUES ("Terminator", "Terminator is a great movie")';
	sqlInsert = "SELECT * FROM movie_review";
	// Display all the data from the table
	db.query(sqlInsert, (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.send(results);
		}
	});
});

//Get a single review
app.get('/api/reviews/:id', (req, res) => {
	let sqlInsert = 'SELECT * FROM movie_review WHERE id = ?';
	db.query(sqlInsert, [req.params.id], (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.send(results);
		}
	});
} )

// Create a new review
app.post('/api/reviews', (req, res) => {
	let sqlInsert = 'INSERT INTO movie_review (movie_name, movie_review) VALUES (?, ?)';
	db.query(sqlInsert, [req.body.movie_name, req.body.movie_review], (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.send(results);
		}
	});
});

// Delete a review
app.delete('/api/reviews/:id', (req, res) => {
	let sqlInsert = 'DELETE FROM movie_review WHERE id = ?';
	db.query(sqlInsert, [req.params.id], (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.send(results);
		}
	});
});

// Update a review
app.put('/api/reviews/:id', (req, res) => {
	let sqlInsert = 'UPDATE movie_review SET movie_name = ?, movie_review = ? WHERE id = ?';
	db.query(sqlInsert, [req.body.movie_name, req.body.movie_review, req.params.id], (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.send(results);
		}
	});
});




app.listen(3005, () => {
	console.log('Server is running on port 3005');
});
