import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
	const { cartItems, addToCart, removeFromCart, url } =
		useContext(StoreContext);

	return (
		<div
			key={id}
			className='relative p-5 border border-[#f1f1f1] cursor-pointer hover:scale-105 hover:duration-500 mb-10 rounded-[24px] shadow-sm shadow-slate-400'>
			<div>
				<img
					src={url + '/images/' + image}
					alt=''
					className='h-[300px] w-[300px] rounded-full'
				/>
				<div className='absolute right-[15%] top-[55%]'>
					{!cartItems[id] ? (
						<img
							onClick={() => addToCart(id)}
							src={assets.add_icon_white}
							className='h-[40px] w-[40px]'
						/>
					) : (
						<div className='flex gap-5 items-center bg-white rounded-[24px] p-1'>
							<img
								onClick={() => removeFromCart(id)}
								src={assets.remove_icon_red}
								className='h-[30px] w-[30px]'
							/>
							<p>{cartItems[id]}</p>
							<img
								onClick={() => addToCart(id)}
								src={assets.add_icon_green}
								className='h-[30px] w-[30px]'
							/>
						</div>
					)}
				</div>
			</div>
			<div className='flex justify-between mt-2'>
				<p className='text-[16px] font-bold'>{name}</p>
				<img src={assets.rating_starts} alt='' className='w-[100px]' />
			</div>
			<p className='text-[12px] '>{description}</p>
			<p>${price}</p>
		</div>
	);
};

export default FoodItem;
