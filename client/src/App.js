import './App.css';
import products from './assets/data/products.json';

import React, { useEffect, useState } from 'react';

function App() {
	const [reviews, setReviews] = useState([]);
	console.log(products);
	const fetchData = async () => {
		const response = await fetch('http://localhost:3005/api/reviews', {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		const data = await response.json();
		setReviews(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			<div className="grid">
				{products.map((product, index) => {
					return (
						<div key={index} className="product-container">
							<div className="product">
								<div
									className="product-image"
									style={{
										backgroundImage: `url(${product.image})`,
									}}
								/>
								<div className="product-info">
									<h1> {product.title} </h1>
									<p> {product.price}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
