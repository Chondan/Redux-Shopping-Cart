import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const cartAdapter = createEntityAdapter();
const initialState = cartAdapter.getInitialState({
	totalPrice: 0
});

const getTotalPrice = (state) => {
	let totalPrice = 0;
	state.ids.forEach(id => totalPrice += (state.entities[id].price * state.entities[id].amount));
	return totalPrice;
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		itemAdded: {
			reducer(state, action) {
				const { id } = action.payload;
				cartAdapter.addOne(state, action.payload);
				state.entities[id].amount++;
				state.totalPrice = getTotalPrice(state);
			},
			prepare(item) {
				return {
					payload: {
						...item
					}
				}
			}
		},
		addAmount: (state, action) => {
			state.entities[action.payload].amount++;
			state.totalPrice = getTotalPrice(state);
		},
		subtractAmount: (state, action) => {
			state.entities[action.payload].amount--;
			state.totalPrice = getTotalPrice(state);
			if (state.entities[action.payload].amount === 0) {
				cartAdapter.removeOne(state, action.payload);
			}
		},
		removeItem: (state, action) => {
			cartAdapter.removeOne(state, action.payload);
			state.totalPrice = getTotalPrice(state);
		},
		clearCart: (state) => {
			cartAdapter.removeAll(state);
			state.totalPrice = 0;
		}
	},
	extraReducers: {},
});

const { reducer, actions } = cartSlice;
export const { itemAdded, addAmount, subtractAmount, removeItem, clearCart } = actions;
export default reducer;
export const {
	selectAll: selectAllItemsInCart,
	selectById: selectCartItemById,
	selectIds: selectCartItemIds
} = cartAdapter.getSelectors(state => state.cart);
