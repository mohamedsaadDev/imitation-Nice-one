import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from "cookie-universal"
const cookie = Cookie()
export const loginUser =createAsyncThunk('user/add',async(user)=>{
        try{
        const res = await fetch('https://tradition-nice-one-api.vercel.app/api/users/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        const data = await res.json()
        cookie.set('cookie-user', data.data.token)
        return data.data.id
        }catch(err){
        console.log(err)
        throw err
        }
})
export const authSlice = createSlice({
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userdata = action.payload;
                state.loading = false;
                state.isLoggedIn = true;
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userid", state.userdata);
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
}
)
export const authaction = authSlice.actions;
export const authReducer = authSlice.reducer;
