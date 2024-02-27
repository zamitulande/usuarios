import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../../../config/Axios'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isUpdate: false,
        formEdit: [],
        searchTerm: '',
        messageError: ''
    },   
    reducers:{
        listUser: (state, action )=> {
            state.users= action.payload  
        },
        addUser: (state, action)=>{
            state.users = action.payload
        },
        deleteUser: (state, action)=>{
            state.users = action.payload
        },
        updateUser: (state, action) => {
            state.isUpdate= action.payload
        },
        formUserEdit: (state, action) => {
            state.formEdit = action.payload            
        },
        searhInput: (state, action) => {
            state.searchTerm = action.payload
        },
        errorMessage: (state, action) => {
            state.searchTerm = action.payload
            
            console.log(action.payload)
        }

        
        
       
    }
});

export const { listUser, addUser, deleteUser, updateUser, formUserEdit, searhInput, errorMessage} = userSlice.actions;


export default userSlice.reducer;
