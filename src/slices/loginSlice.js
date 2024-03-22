import {  createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:'login',
    initialState:{isLoged:localStorage.getItem('token') != undefined ? true : false,user:{}},
    reducers:{
        setIsloged(state){
            state.isLoged = state.isLoged ? false : true
           
        },
        setUser(state,action){
            state.user =action.payload
        }
    },
   

    
})
export default loginSlice.reducer
export  const {setIsloged,setUser} = loginSlice.actions