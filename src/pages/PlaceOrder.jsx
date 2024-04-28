import { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
	const { getTotalCartAmount, token, food_list, cartItems, url } =
		useContext(StoreContext);
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zipcode: '',
		country: '',
		phone: '',
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData({
			...data,
			[name]: value,
		});
	};
	const placeOrder = async (event) => {
		event.preventDefault();
		let orderItems = [];
		food_list.map((item) => {
			if (cartItems[item._id] > 0) {
				let itemInfo = item;
				itemInfo['quantity'] = cartItems[item._id];
				orderItems.push(itemInfo);
			}
		});
		let orderData = {
			address: data,
			items: orderItems,
			amount: getTotalCartAmount() + 1,
		};
		let response = await axios.post(url + '/api/v1/order/place', orderData, {
			headers: { token },
		});
		console.log(response.data);
		if (response.data.success) {
			const { session_url } = response.data;
			window.location.replace(session_url);
		} else {
			alert('Error');
		}
	};
	return (
		<form onSubmit={placeOrder} className='flex w-[90%] justify-between'>
			<div>
				<div>
					<p>Delivery Information</p>
				</div>
				<div className='flex flex-col '>
					<input
						type='text'
						name='firstName'
						onChange={onChangeHandler}
						value={data.firstName}
						placeholder='first name'
						className='p-2 m-1 border border-[#f1f1f1] w-[100%]'
						required
					/>
					<input
						type='text'
						name='lastName'
						onChange={onChangeHandler}
						value={data.lastName}
						placeholder='last name'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>
					<input
						type='email'
						name='email'
						onChange={onChangeHandler}
						value={data.email}
						placeholder='Email address'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>
					<input
						type='text'
						name='street'
						onChange={onChangeHandler}
						value={data.street}
						placeholder='street address'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>
					<input
						type='text'
						name='city'
						onChange={onChangeHandler}
						value={data.city}
						placeholder='city'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>
					<input
						type='text'
						name='state'
						onChange={onChangeHandler}
						value={data.state}
						placeholder='state'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>
					<input
						type='number'
						name='zipcode'
						onChange={onChangeHandler}
						value={data.zipcode}
						placeholder='Zip code'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>
					<input
						type='country'
						name='country'
						onChange={onChangeHandler}
						value={data.country}
						placeholder='Country'
						className='p-2 m-1 border border-[#f1f1f1]'
						required
					/>

					<input
						type='number'
						name='phone'
						onChange={onChangeHandler}
						value={data.phone}
						placeholder='Phone number'
						className='p-2 mb-12 border border-[#f1f1f1]'
						required
					/>
				</div>
			</div>
			<div>
				<div className='flex flex-col justify-center mt-20'>
					<div>
						<h2 className='font-bold text-[20px] ml-10'>Cart Total</h2>
						<div className='w-[100%] m-5'>
							<div className='flex m-5 justify-between'>
								<p>Subtotal</p>
								<p>${getTotalCartAmount()}</p>
							</div>
							<div className='flex m-5 justify-between'>
								<p>Delivery fee</p>
								<p>{1}</p>
							</div>
							<div className='flex m-5 justify-between'>
								<p>Total</p>
								<p>${getTotalCartAmount() + 1}</p>
							</div>
							<div className='flex m-5 justify-between'>
								<button
									type='submit'
									className='text-white p-3 bg-[tomato] w-[100%] rounded-md'>
									Proceed to Payment
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default PlaceOrder;
