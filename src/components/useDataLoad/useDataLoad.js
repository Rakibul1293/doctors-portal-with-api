import { useEffect, useState } from 'react';

export const useDataLoad = () => {
	const [foodItems, setFoodItems] = useState([]);
	useEffect(() => {
	    fetch("http://localhost:4200/foodItems")
	    // fetch("https://powerful-ridge-26100.herokuapp.com/foodItems")
	        .then(res => res.json())
	        .then(data => {
	             // console.log('Data From Database', data);
	             setFoodItems(data);
	        })
	}, [])
	return foodItems;
}
