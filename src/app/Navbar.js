import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllItemsInCart } from '../features/cart/cartSlice';

export const Navbar = () => {
	const cart = useSelector(selectAllItemsInCart);
	const numItems = cart.reduce((nextItem, item) => nextItem + item.amount, 0);
	return (
		<nav>
			<ul className="navbar-container">
				<li><Link to="/Redux-Shopping-Cart">Items</Link></li>
				<li><Link to="/Redux-Shopping-Cart/cart">Cart</Link> {numItems}</li>
			</ul>
		</nav>
	);
}
