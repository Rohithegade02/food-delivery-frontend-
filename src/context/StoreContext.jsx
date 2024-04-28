import { createContext, useEffect, useState } from 'react';
import { food_list } from '../assets/assets';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [cartItems, setCartItems] = useState({});
	const [token, setToken] = useState('');
	const [foodlist, setFoodList] = useState([]);
	const url = 'https://food-delivery-phdh.onrender.com';
	const addToCart = async (itemId) => {
		if (!cartItems[itemId]) {
			setCartItems({ ...cartItems, [itemId]: 1 });
		} else {
			setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
		}
		if (token) {
			await axios.post(
				url + '/api/v1/cart/add',
				{ itemId },
				{ headers: { token } }
			);
		}
	};
	const removeFromCart = async (itemId) => {
		setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
		if (token) {
			await axios.post(
				url + '/api/v1/cart/remove',
				{ itemId },
				{ headers: { token } }
			);
		}
	};
	const loadCartData = async (token) => {
		const response = await axios.post(
			url + '/api/v1/cart/get',
			{},
			{ headers: { token } }
		);
		setCartItems(response.data.cart);
	};
	const fetchFoodList = async () => {
		const response = await axios.get(url + '/api/v1/food/get');
		setFoodList(response.data.foodItems);
	};

	const getTotalCartAmount = () => {
		let total = 0;
		for (let key in cartItems) {
			if (cartItems[key] > 0) {
				let itemInfo = foodlist.find((product) => product._id === key);
				total += itemInfo.price * cartItems[key];
			}
		}
		return total;
	};
	useEffect(() => {
		// console.log(cartItems);
	}, [cartItems]);
	useEffect(() => {
		async function loadData() {
			await fetchFoodList();
			if (localStorage.getItem('token')) {
				setToken(localStorage.getItem('token'));
				await loadCartData(localStorage.getItem('token'));
			}
		}
		loadData();
	}, []);
	const contextValue = {
		food_list,
		cartItems,
		addToCart,
		removeFromCart,
		setCartItems,
		getTotalCartAmount,
		token,
		setToken,
		foodlist,
		url,
	};

	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
