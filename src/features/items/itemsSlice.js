import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

// ids, entities
const itemsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.price - b.price
});

const initialState = itemsAdapter.getInitialState({
	status: "idle",
});

const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20');
	const datas = await response.json();
	datas.forEach(data => {
		data.price = random(300, 1000);
		data.amount = 0;
	});
	return datas;
});

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchItems.fulfilled]: (state, action) => {
			itemsAdapter.setAll(state, action);
			state.status = "succeeded";
			console.log("fulfilled");
		},
		[fetchItems.pending]: () => console.log("pending"),
		[fetchItems.rejected]: (state, action) => console.log(action.error.message),
	},
});

const { reducer } = itemsSlice;
export default reducer;
export const { 
	selectAll: selectAllPhotos, 
	selectById: selectPhotoById,
	selectIds: selectPhotoIds,
} = itemsAdapter.getSelectors(state => state.items);