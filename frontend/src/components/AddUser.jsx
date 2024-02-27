import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, errorMessage } from '../redux/features/user/userSlice';
import clienteAxios from '../config/Axios'
import UpdateUser from './UpdateUser';
import Swal from 'sweetalert2';

const FormUser = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state) => state.user.users)
    const openModal = useSelector((state) => state.user.isUpdate)
    
    const [user, setUser] = useState({
        name: '',
        identification: ''
    })
    const [errors, setErrors] = useState({})

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const postUser = async () =>{
            try{
                const res = await clienteAxios.post('user/save', user);
                dispatch(addUser([...stateUser, res.data]))
                setUser({
                    name: '',
                    identification: ''
                })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario ha sido guardado",
                    showConfirmButton: false,
                    timer: 2500
                });
            }catch(error){
               setErrors(error.response.data)              
            }
        }
        postUser();
    }
    
    return (
        <>
            {openModal ? <UpdateUser /> : null}
            <form onSubmit={handleSubmit}>
                <label>
                    Person Name:
                    <input type="text" name="name" value={user.name}  onChange={handleOnChange}  />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <label>
                    Person identification:
                    <input type="number" name="identification" value={user.identification}  onChange={handleOnChange} />
                    {errors.identification && <span style={{ color: 'red' }}>{errors.identification}</span>}
                </label>
                <button type="submit">Add</button>
            </form>

        </>
    )
}

export default FormUser