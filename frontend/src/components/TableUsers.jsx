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

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        clienteAxios.get(`user/?page=${currentPage}&size=10`)
            .then(res => {
                setFound(res.data.content);
                dispatch(listUser(res.data.content));
                setTotalPages(res.data.totalPages);
            })
            .catch(error => {
                console.log("error fetching user data " + error)
            })

    }, [currentPage])

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

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

    const searchIdentification = (searchTerm) => {

        clienteAxios.get(`user/find/identification/${searchTerm}?page=${currentPage}&size=10`)
            .then(res => {
                dispatch(listUser(res.data.content));
                setTotalPages(res.data.totalPages);
                if (messageNotFound) {
                    setMessageNotFound('')
                }
            })
            .catch(error => {
                setMessageNotFound(error.response.data.message);
            })
    }

    const onChange = (e) => {
        searchIdentification(e.target.value);
        if (e.target.value.trim() === "") {
            dispatch(listUser(found));
            console.log('quedo vacio')
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
            <button onClick={prevPage} disabled={currentPage === 0}>Previous Page</button>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next Page</button>
        </>
    )
}

export default TableUsers