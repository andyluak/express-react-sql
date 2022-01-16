const products =  require('../client/src/assets/data/products.json');
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
app.use(bodyParser.urlencoded({ extended: false }));
//Get all reviews
app.get('/api/reviews', (req, res) => {
	let sqlInsert = 'SELECT * FROM movie_review';
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
});

// Create a new review
app.post('/api/reviews', (req, res) => {
	let sqlInsert =
		'INSERT INTO movie_review (movie_name, movie_review) VALUES (?, ?)';
	db.query(
		sqlInsert,
		[req.body.movie_name, req.body.movie_review],
		(err, results) => {
			if (err) {
				console.log(err);
			} else {
				res.send(results);
			}
		}
	);
});


app.listen(3005, () => {
	console.log('Server is running on port 3005');
});

const addRandomSizes = () => {

	// Generate numbers between 138 and 170
	let sizes = [];
	for( let i = 0; i < 3; i++ ) {
		sizes.push( Math.floor( Math.random() * ( 170 - 138 ) ) + 138 );
	}
	return sizes;

}

// Turn string price with $ into number
const convertPrice = ( price ) => {
	return parseFloat( price.replace( /\$/g, '' ) );
}



const addProductsToDB = ( products ) => {
	let query = "INSERT INTO products (product_brand, product_title, product_description, product_image, product_price, product_sizes, product_category) VALUES  (?, ?, ?, ?, ?, ?, ?)";
	products.map( ( product, index ) => {
		if( product.sizes ) {
		} else {
			product.sizes = addRandomSizes( );
		}
		product.brand = product.title.split(' ')[0];
		product.sizes = JSON.stringify( product.sizes );
		product.price = convertPrice( product.price );
		db.query( query, [product.brand, product.title, product.description, product.image, product.price, product.sizes, product.category ], ( err, results ) => {
			if( err ) {
				console.log( err );
			} else {
				console.log( results );
			}
		});
	})

}

// addProductsToDB(products );


