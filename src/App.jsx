import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { useState } from 'react';
import LoginPopUp from './components/LoginPopUp';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	const [showLogin, setShowLogin] = useState(false);
	return (
		<>
			<ToastContainer />
			{showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
			<div className=''>
				<Navbar setShowLogin={setShowLogin} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/order' element={<PlaceOrder />} />
				</Routes>
				<Footer />
			</div>
		</>
	);
}

export default App;
