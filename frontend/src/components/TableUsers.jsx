import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formUserEdit, listUser, updateUser } from '../redux/features/user/userSlice';
import clienteAxios from '../config/Axios'

const TableUsers = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state) => state.user.users)
    const openModal = useSelector((state) => state.user.isUpdate)

    const [messageNotFound, setMessageNotFound] = useState('')
    const [found, setFound] = useState([])

    useEffect(() => {
        clienteAxios.get('user/')
            .then(res => {
                setFound(res.data);
                dispatch(listUser(res.data));
            })
            .catch(error => {
                console.log("error fetching user data " + error)
            })

    }, [])

    const handleDelete = async (id) => {
        try {
            const response = await clienteAxios.delete(`user/delete/${id}`);
            if (response.status === 200) {
                const newUsers = stateUser.filter(user => user.id !== id);
                dispatch(listUser(newUsers));
            } else {
                console.log('failed to delete user')
            }
        } catch (error) {
            console.error('error deleting user' + error)
        }
    }

    const handleOpenModal = (user) => {
        dispatch(updateUser(user))
        dispatch(formUserEdit(user))
        dispatch(updateUser(!openModal))

    }

    const searchIdentification = async (searchTerm) => {
        if (searchTerm.length > 0) {
            try {
                const response = await clienteAxios.get(`user/find/identification/${searchTerm}`);
                dispatch(listUser(response.data));
                if (messageNotFound) {
                    setMessageNotFound('')
                }
            } catch (error) {
                setMessageNotFound(error.response.data.message);
            }
        }
    }

    const onChange = (e) => {
        searchIdentification(e.target.value);
        if (e.target.value.trim() === "") {
            dispatch(listUser(found));
        }
    }
    return (
        <>
            <form >

                <label>
                    search
                    <input type="text" name="shareUser" onChange={onChange} />
                </label>
            </form>
            {messageNotFound ?
                <span>{messageNotFound}</span>
                :
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Identification</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateUser.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.identification}</td>
                                <td><button onClick={() => handleDelete(user.id)}>delete</button></td>
                                <td><button onClick={() => handleOpenModal(user)}>update</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </>
    )
}

export default TableUsers