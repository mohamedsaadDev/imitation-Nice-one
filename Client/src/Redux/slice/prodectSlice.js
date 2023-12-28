import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getProducts =createAsyncThunk('products/get',async()=>{
    try{
    const res = await fetch('https://tradition-nice-one-api.vercel.app/api/products',{
        method: 'GET',
    })
    const data = await res.json()
    return data.data.prodects
    }catch(err){
        throw err
    }
})
export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products:[],
        loading: null,
        error: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = false;
        })
        .addCase(getProducts.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    },
});
export const productsaction = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
