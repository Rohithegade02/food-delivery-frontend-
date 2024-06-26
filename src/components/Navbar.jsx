import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
const Navbar = ({ setShowLogin }) => {
	const [menu, setMenu] = useState('Home');
	const [showicon, setShowIcon] = useState(false);
	const { token, setToken } = useContext(StoreContext);
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem('token');
		setToken('');
		navigate('/');
	};

	return (
		<div className='flex justify-between max-w-[100vw]  items-center my-10 px-20'>
			<div>
				<Link to='/'>
					<img src={assets.logo} alt='' className='h-[100%] w-[100%]' />
				</Link>
			</div>
			<div className='flex justify-between gap-5'>
				<div
					onClick={() => setMenu('Home')}
					className={
						menu === 'Home'
							? 'pb-[5px] border-b  border-[tomato] cursor-pointer'
							: ''
					}>
					<p className='cursor-pointer'>Home</p>
				</div>
				<div
					onClick={() => setMenu('Menu')}
					className={
						menu === 'Menu'
							? 'pb-[5px] border-b  border-[tomato] cursor-pointer'
							: ''
					}>
					<p className='cursor-pointer'>Menu</p>
				</div>
				<div
					onClick={() => setMenu('App')}
					className={
						menu === 'App'
							? 'pb-[5px] border-b  border-[tomato] cursor-pointer'
							: ''
					}>
					<p className='cursor-pointer'>Mobile App</p>
				</div>
				<div
					onClick={() => setMenu('Contact')}
					className={
						menu === 'Contact'
							? 'pb-[5px] border-b  border-[tomato] cursor-pointer'
							: ''
					}>
					<p className='cursor-pointer'>Contact Us</p>
				</div>
			</div>
			<div className='flex items-center gap-5'>
				<div>
					<img src={assets.search_icon} alt='' className='cursor-pointer' />
				</div>
				<div>
					<Link to='/cart'>
						<img
							src={assets.basket_icon}
							alt=''
							className='relative cursor-pointer'
						/>
					</Link>
				</div>
				<div>
					{!token ? (
						<button
							onClick={() => setShowLogin(true)}
							className='bg-transparent text-[16px] text-[#49557e] border  border-[tomato] px-[30px] py-[10px] rounded-3xl cursor-pointer transition-[0.3] hover:bg-[#fff4f2]'>
							Sign In
						</button>
					) : (
						<div className='relative'>
							<img
								src={assets.profile_icon}
								alt=''
								onClick={() => setShowIcon(!showicon)}
								className='cursor-pointer'
							/>
							{showicon ? (
								<ul className='absolute bg-[white] z-10 p-5 rounded-lg '>
									<li className='cursor-pointer'>
										<img src={assets.bag_icon} alt='' />
										<p>Orders</p>
									</li>
									<li className='cursor-pointer'>
										<img src={assets.logout_icon} alt='' onClick={logout} />
										<p>Logout</p>
									</li>
								</ul>
							) : (
								''
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Navbar;
