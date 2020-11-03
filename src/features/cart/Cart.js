import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllItemsInCart, selectCartItemById, addAmount, subtractAmount, removeItem, clearCart } from './cartSlice';
import styles from './cart.module.css';

const Item = ({
	itemId, add, subtract
}) => {
	const item = useSelector(state => selectCartItemById(state, itemId));
	const dispatch = useDispatch();
	return (
		<div className={styles["cart-item"]}>

			<div className={styles["cart-item-info"]}>
				<img alt={item.title} src={item.url} />
				<div className={styles["item-info"]}>
					<div>{item.title}</div>
					<div>Price: ${item.price}</div>
					<div className={styles["item-adjustment"]}>
					<button className={styles["adjust-button"]} onClick={() => subtract(itemId)}>-</button>
					<div className={styles["amount"]}>{item.amount}</div>
					<button className={styles["adjust-button"]} onClick={() => add(itemId)}>+</button>
					<button className={styles["adjust-button"]} onClick={() => dispatch(removeItem(itemId))}>x</button>
					</div>
				</div>
			</div>
	
		</div>
	);
}

const Cart = () => {
	const cartItems = useSelector(selectAllItemsInCart);
	const dispatch = useDispatch();
	const totalPrice = useSelector(state => state.cart.totalPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD', });
	const add = (itemId) => {
		dispatch(addAmount(itemId));
	}
	const subtract = (itemId) => {
		dispatch(subtractAmount(itemId));
	}
	return (
		<div>
			{cartItems.length > 0 ? (
				<div>
					<div onClick={() => dispatch(clearCart())} className={styles["clear-cart-button"]}>Clear Cart</div>
					<div className={styles["total-price-info"]}>Total Price: {totalPrice}</div>
				</div>
			) : ""}
			{cartItems ? cartItems.map(item => (
				<Item key={item.id} itemId={item.id} add={add} subtract={subtract}/>
			)) : "Loading..."}
		</div>
	);
}

export default Cart;