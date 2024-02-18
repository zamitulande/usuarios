import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, formUserEdit, listUser, updateUser } from '../redux/features/user/userSlice';
import clienteAxios from '../config/Axios'

const TableUsers = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state) => state.user.users)
    const openModal = useSelector((state) => state.user.isUpdate)

    const [shareUser, setShareUser] = useState('');
    const [messageNotFound, setMessageNotFound] = useState('')
    const [foud, setFound] = useState({})


    useEffect(() => {
        clienteAxios.get('user/')
            .then(res => {
                const userData = res.data;
                dispatch(listUser(userData));
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
                dispatch(deleteUser(newUsers))
                dispatch(listUser(stateUser));
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

    const handleSubmit = (e)=>{
        e.preventDefault();
        clienteAxios.get(`user/find/identification/${shareUser}`)
        .then(res => {
            const filtrado = stateUser.filter(user => user.identification == shareUser);
            if(filtrado){
                dispatch(listUser(filtrado));
            }
           
        })
        .catch(error => {
           const notFound = error.response.data;
           const {message} = notFound;
           setMessageNotFound(message)
        })
    }
    
    return (
        <>
             <form onSubmit={handleSubmit}>
                <span style={{backgroundColor:'red'}}>{messageNotFound}</span>
                <label>
                    search
                    <input type="text" name="shareUser" value={shareUser} onChange={(e => setShareUser(e.target.value))} />
                </label>
                <button type="submit">search</button>
            </form>
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
        </table>
        </>
    )
}

export default TableUsers