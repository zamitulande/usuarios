import { createSlice } from '@reduxjs/toolkit';
import clienteAxios from '../../../config/Axios'

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        isUpdate: false,
        formEdit: null,
        onEdit:null
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
        editing: (state, action) => {
            state.onEdit = action.payload
        }
        
       
    }
});

export const { listUser, addUser, deleteUser, updateUser, formUserEdit} = userSlice.actions;


export default userSlice.reducer;
