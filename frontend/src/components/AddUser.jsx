import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/features/user/userSlice';
import clienteAxios from '../config/Axios'
import UpdateUser from './UpdateUser';

const FormUser = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state) => state.user.users)
    const openModal = useSelector((state) => state.user.isUpdate)

    const [name, setName] = useState(" ")
    const [identification, setIdentification] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: name,
            identification: identification
        }
        console.log(newUser)
        clienteAxios.post('user/save', newUser)
            .then(res => {
                dispatch(addUser([...stateUser, res.data]))
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
                    <input type="text" name="name" value={name} onChange={(e => setName(e.target.value))} />
                </label>
                <label>
                    Person identification:
                    <input type="text" name="identification" value={identification} onChange={(e => setIdentification(e.target.value))} />
                </label>
                <button type="submit">Add</button>
            </form>

        </>
    )
}

export default FormUser