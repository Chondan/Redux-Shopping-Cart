import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/itemsSlice';
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
	reducer: {
		items: itemsReducer,
		cart: cartReducer,
	}
});

export default store;