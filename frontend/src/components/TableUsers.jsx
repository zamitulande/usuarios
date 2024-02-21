import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formUserEdit, listUser, searhInput, updateUser } from '../redux/features/user/userSlice';
import clienteAxios from '../config/Axios';
import Swal from 'sweetalert2';

const TableUsers = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state) => state.user.users)
    const openModal = useSelector((state) => state.user.isUpdate)
    const searchTerm = useSelector((state) => state.user.searchTerm)

    const [messageNotFound, setMessageNotFound] = useState('')
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleOnChange = (e) => {
        dispatch(searhInput(e.target.value));
    }

    useEffect(() => {
        if (!searchTerm) {
            clienteAxios.get(`user/?page=${currentPage}&size=10`)
                .then(res => {
                    dispatch(listUser(res.data.content));
                    setTotalPages(res.data.totalPages);
                })
                .catch(error => {
                    console.log("error fetching user data " + error)
                })
        } else {
            clienteAxios.get(`user/find/identification/${searchTerm}?page=${currentPage}&size=10`)
                .then(res => {
                    dispatch(listUser(res.data.content));
                    setTotalPages(res.data.totalPages);                    
                })
                .catch(error => {
                    setMessageNotFound(error.response.data.message);
                    Swal.fire({
                        icon: "error",
                        title: "El usuario no se encontro.",
                        text: "Revisa tu busqueda"
                    });
                    dispatch(searhInput(''))
                })
        }

    }, [currentPage, searchTerm])

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
                const userFilter = stateUser.filter(user => user.id !== id);
                Swal.fire({
                    title: "Estas seguro?",
                    text: "Esta accion no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, Eliminar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Borrado!",
                            text: "El usuario ha sido borrado",
                            icon: "success"
                        });
                        dispatch(listUser(userFilter));
                        dispatch(searhInput(''))
                    }
                });
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

    return (
        <>
            <form >
                <label>
                    search
                    <input type="text" name="shareUser" value={searchTerm} onChange={handleOnChange} />
                </label>
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
            <button onClick={prevPage} disabled={currentPage === 0}>Previous Page</button>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next Page</button>
        </>
    )
}

export default TableUsers