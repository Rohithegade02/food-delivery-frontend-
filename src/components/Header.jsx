import { assets } from '../assets/assets';

const Header = () => {
	return (
		<div className='relative px-20 h-[55vh]'>
			<div className='absolute '>
				<img src={assets.header_img} alt='' className='h-[60vh] w-[90vw] ' />
			</div>
			<div className=' animate-[fadeIn 4s] absolute flex flex-col gap-5 items-start left-[10%] top-[50%]'>
				<h2 className='text-white font-bold text-5xl'>
					Choose your fav food here
				</h2>
				<p className='text-white text-m max-w-[70%]'>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged.
				</p>
				<button className='border-none text-[#747474] font-semibold px-[15px] py-[10px] bg-white text-[20px] rounded-[50px] '>
					View Menu
				</button>
			</div>
		</div>
	);
};

export default Header;
