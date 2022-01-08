import logo from './logo.svg';
import './App.css';

import React, {useEffect, useState} from 'react';

function App() {

	const [reviews, setReviews ] = useState([]);

	const fetchData = async () => {
		const response = await fetch( 'http://localhost:3005/api/reviews', {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
		const data = await response.json();
		setReviews(data);
	}

	useEffect( () => {
		fetchData();
	}, []);

	return (
		<div className="App">
			{reviews.map( (review) => {
				return (
					<div key={review.id}>
						<h1> { review.movie_name} </h1>
						<p> { review.movie_review }</p>
					</div>
				)
			})}
		</div>
	);
}

export default App;
