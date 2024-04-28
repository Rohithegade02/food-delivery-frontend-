import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const { cartItems, foodlist, removeFromCart, url, getTotalCartAmount } =
		useContext(StoreContext);

	const navigate = useNavigate();
	return (
		<div className='mt-10 flex flex-col justify-center '>
			{foodlist ? (
				<div className='flex  flex-col '>
					<div className='flex justify-between items-center w-[80%] mx-auto px-2 '>
						<p>Items</p>
						<p>Title</p>
						<p>Price</p>
						<p>Quantity</p>
						<p>Total</p>
						<p>Remove</p>
					</div>
					<div className=''>
						{foodlist.map((item, i) => {
							if (cartItems[item._id] > 0) {
								return (
									<div
										key={i}
										className='flex justify-between p-2 items-center w-[80%] mx-auto my-5 border-b-2 border-[#f1f1f1]'>
										<img
											src={url + '/images/' + item.image}
											alt=''
											className='h-[40px] w-[40px]'
										/>
										<p>{item.name}</p>
										<p>{item?.price}</p>
										<p>{cartItems[item._id]}</p>
										<p>{item.price * cartItems[item._id]}</p>
										<p
											onClick={() => removeFromCart(item._id)}
											className='text-[30px] font-bold cursor-pointer'>
											x
										</p>
									</div>
								);
							}
						})}
					</div>
				</div>
			) : (
				''
			)}
			<div className='flex flex-col items-center w-[100%] '>
				<h2 className='font-bold text-[20px] mx-20'>Cart Total</h2>
				<div className='w-[50%] m-5'>
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
							className='text-white p-3 bg-[tomato] w-[100%] rounded-md'
							onClick={() => navigate('/order')}>
							Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
