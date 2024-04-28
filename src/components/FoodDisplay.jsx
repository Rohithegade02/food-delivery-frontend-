import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
	const { foodlist } = useContext(StoreContext);
	return (
		<div className=' mx-20 mt-10'>
			<h1 className='font-bold text-2xl'>Food Display near you</h1>
			<div className='flex flex-wrap items-center justify-between mt-10 '>
				{foodlist.map((food) => {
					if (category == 'All' || category === food.category) {
						return <FoodItem key={food._id} id={food._id} {...food} />;
					}
				})}
			</div>
		</div>
	);
};

export default FoodDisplay;
