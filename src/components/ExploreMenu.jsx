import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
	return (
		<div className='flex flex-col gap-5 mt-10 mx-20'>
			<h1 className='text-[#262626] text-3xl font-semibold'>
				Explore our menu
			</h1>
			<p className=' columns-[#808080] '>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged.
			</p>
			<div className='flex  justify-between  '>
				{menu_list.map((item, index) => (
					<div
						onClick={() =>
							setCategory((prev) =>
								prev === item.menu_name ? 'All' : item.menu_name
							)
						}
						key={index}
						className='flex flex-col items-center gap-2'>
						<img
							src={item.menu_image}
							alt=''
							className={`w-[100px] h-[100px] ${
								category === item.menu_name
									? 'border-2 border-[tomato] p-1 rounded-[100%] '
									: ''
							}`}
						/>
						<p className='text-[#747474] cursor-pointer'>{item.menu_name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExploreMenu;
