import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/features/user/userSlice';
import clienteAxios from '../config/Axios'
import UpdateUser from './UpdateUser';
import Swal from 'sweetalert2';

const FormUser = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state) => state.user.users)
    const openModal = useSelector((state) => state.user.isUpdate)

    const [name, setName] = useState(" ")
    const [identification, setIdentification] = useState("")

    const [user, setUser] = useState({
        name: '',
        identification: ''
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        clienteAxios.post('user/save', user)
            .then(res => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario ha sido guardado",
                    showConfirmButton: false,
                    timer: 2500
                });
                dispatch(addUser([...stateUser, res.data]))
                setUser({
                    name: '',
                    identification: ''
                })
            })
            .catch(error => {
                console.log("error fetching user data " + error)
            })
    }

    return (
        <>
            {openModal ? <UpdateUser /> : null}
            <form onSubmit={handleSubmit}>
                <label>
                    Person Name:
                    <input type="text" name="name" value={user.name} onChange={handleOnChange} />
                </label>
                <label>
                    Person identification:
                    <input type="text" name="identification" value={user.identification} onChange={handleOnChange} />
                </label>
                <button type="submit">Add</button>
            </form>

        </>
    )
}

export default FormUser