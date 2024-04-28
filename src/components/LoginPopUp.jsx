import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const LoginPopUp = ({ setShowLogin }) => {
	const { setToken } = useContext(StoreContext);
	const url = 'https://food-delivery-phdh.onrender.com';
	const [currState, setcurrState] = useState('Sign Up');
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData({
			...data,
			[name]: value,
		});
	};
	const onSubmitHandler = async (event) => {
		event.preventDefault();
		console.log(data);
		let newUrl = `${url}/`;
		if (currState === 'Login') {
			newUrl += 'api/v1/user/login';
		} else {
			newUrl += 'api/v1/user/register';
		}

		const response = await axios.post(newUrl, {
			name: data.name,
			email: data.email,
			password: data.password,
		});
		if (response.data.success) {
			setToken(response.data.token);
			localStorage.setItem('token', response.data.token);
			setShowLogin(false);
		} else {
			toast.error(response.data.message);
		}
		// console.log(response);
	};
	return (
		<div className='absolute z-10 w-[100%] h-[100vh] bg-[#00000090] grid'>
			<form className='flex flex-col bg-white p-5  w-[60%] place-self-center rounded-lg '>
				<div className='flex justify-between items-center'>
					<p className='font-bold text-[16px]'>{currState}</p>
					<img
						onClick={() => setShowLogin(false)}
						src={assets.cross_icon}
						alt=''
						className='cursor-pointer'
					/>
				</div>
				<form onSubmit={onSubmitHandler} className='flex flex-col gap-5 mt-5 '>
					{currState === 'Login' ? (
						<></>
					) : (
						<input
							type='text'
							placeholder='Your name'
							name='name'
							onChange={onChangeHandler}
							value={data.name}
							required
							className=' border border-[#f1f1f1] px-2 py-2 rounded-md'
						/>
					)}
					<input
						type='email'
						placeholder='Your email'
						name='email'
						value={data.email}
						onChange={onChangeHandler}
						required
						className=' border border-[#f1f1f1] px-2 py-2 rounded-md'
					/>
					<input
						type='password'
						placeholder='Password'
						value={data.password}
						name='password'
						onChange={onChangeHandler}
						required
						className=' border border-[#f1f1f1] px-2 py-2 rounded-md'
					/>
					<button
						className='p-2 mt-5 bg-[tomato] text-white rounded-lg '
						type='submit'
						onClick={onSubmitHandler}>
						{currState === 'Sign Up' ? 'Create Account' : 'Login'}
					</button>
				</form>

				<div className='flex gap-2'>
					<input type='checkbox' required />
					<p>By Continuing,i agree to terms of use & privacy policy</p>
				</div>
				<div className='mt-2 flex justify-center'>
					{currState === 'Login' ? (
						<p>
							Create a new Account?{' '}
							<span
								className='text-[#FF6347] underline cursor-pointer'
								onClick={() => setcurrState('Sign Up')}>
								Click here
							</span>
						</p>
					) : (
						<p>
							Already have an account?
							<span
								className='text-[#FF6347] underline cursor-pointer'
								onClick={() => setcurrState('Login')}>
								Login here
							</span>
						</p>
					)}
				</div>
			</form>
		</div>
	);
};

export default LoginPopUp;
