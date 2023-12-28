import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "cookie-universal"
const cookie = Cookie()
export const registerUser =createAsyncThunk('user/register',async(formData)=>{
        try{
        const res = await fetch('https://tradition-nice-one-api.vercel.app/api/users/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        cookie.set('cookie-user', data.data.token)
        console.log(data)
        return data.data._id
        }catch(err){
        console.log(err)
        throw err
        }
})
export const registerSlice = createSlice({
    name: "user",
    initialState:{
        userdata:{
            id:""
        },
        loading: null,
        error:false,
        isLoggedIn:false
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userdata = action.payload;
                state.loading = false;
                state.isLoggedIn = true;
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userid", state.userdata);
            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
}
)
export const registeraction = registerSlice.actions;
export const registerReducer = registerSlice.reducer;
