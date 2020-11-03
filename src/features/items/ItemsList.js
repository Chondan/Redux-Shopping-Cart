import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, selectPhotoIds, selectPhotoById } from './itemsSlice';
import styles from './itemsList.module.css';
import { itemAdded, selectCartItemIds } from '../cart/cartSlice.js';

function Item({ photoId, isInCart }) {
	const photo = useSelector(state => selectPhotoById(state, photoId));
	const dispatch = useDispatch();
	let itemRef;
	const handleClick = itemRef => {
		dispatch(itemAdded(photo));
		itemRef.style.transform = `scale(0.8)`;
		setTimeout(() => {
			itemRef.style.transform = `scale(1)`;
		}, 300);
	}
	return (
		<div 
			ref={node => itemRef = node}
			onClick={() => handleClick(itemRef)}
			title={photo.title} 
			className={styles["item"]}
			style={{ borderColor: isInCart ? "black" : "#ddd" }}
		>
			<h4>{photo.title.length > 30 ? photo.title.substring(0, 30) + "..." : photo.title}</h4>
			<img alt={photo.title} src={photo.url} />
			<div>Price: ${photo.price}</div>
		</div>
	);
}
//

function ItemsList() {
	const dispatch = useDispatch();
	const photoIds = useSelector(selectPhotoIds).slice(0, 20);
	const cartItemIds = useSelector(selectCartItemIds);
	const requestStatus = useSelector(state => state.items.status);
	useEffect(() => {
		if (requestStatus === "idle") {
			dispatch(fetchItems());
		}
	}, [dispatch, requestStatus]);
	const renderedItems = photoIds.map(photoId => (
		<Item key={photoId} photoId={photoId} isInCart={cartItemIds.includes(photoId)} />
	));
	const [width, setWidth] = useState(window.innerWidth);
	const handleWindowResize = () => {
		setWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		}
	});
	const generateColumns = () => {
		const columns = Math.min(Math.floor(width / 200), 5);
		let columnsStyle = '';
		for (let i = 0; i < columns; i++) {
			columnsStyle += " auto";
		}
		return columnsStyle;
	}
	const gridStyle = {
		gridTemplateColumns: generateColumns()
	}
	return (
		<div>
			{ !photoIds ? "Loading..." : <div style={gridStyle} className={styles["photos-list"]}>{renderedItems}</div> }
		</div>
	);
}

export default ItemsList;