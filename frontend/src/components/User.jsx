import React, { useState } from 'react'
import { useEffect } from 'react'
import clienteAxios from '../config/Axios'
import { Box, Button, Modal } from '@mui/material'

const User = () => {
    const [users, setUsers] = useState([])
    const [name, setName] = useState(" ")
    const [identification, setIdentification] = useState(" ")
    const [openModal, setOpenModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const deleteUser = async (id) => {
        try {
            const response = await clienteAxios.delete(`user/delete/${id}`);
            if (response.status === 200) {
                const newUsers = users.filter(user => user.id !== id);
                setUsers(newUsers)
            } else {
                console.log('failed to delete user')
            }
        } catch (error) {
            console.error('error deleting user' + error)
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const newUser = {
            name: name,
            identification: identification
        }

        clienteAxios.post('user/save', newUser)
            .then(res => {
                console.log(res.data)
                resetForm();
            })
            .catch(error => {
                console.log("error fetching user data " + error)
            })

    }
   
    useEffect(() => {
        clienteAxios.get('user/findall')
            .then(res => {
                const userData = res.data;
                setUsers(userData)
            })
            .catch(error => {
                console.log("error fetching user data " + error)
            })
    }, [handleSubmit])

    const resetForm = () => {
        setName(" ");
        setIdentification(" ");
    }


    const handleOpenModal = (user) => { 
        setSelectedUserId(user.id);
        setName(user.name);
        setIdentification(user.identification);
        setOpenModal(true)
        
     }
    const handleCloseModal = () => { setOpenModal(false)}

    const handleUpdate = async (e) => {
        e.preventDefault();
        const userEdit = {
            name: name,
            identification: identification
        }
        try {
            await clienteAxios.put(`user/update/${selectedUserId}`, userEdit );
            resetForm();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating user: ' + error);
        }
    }
    return (
        <div>
            <div>
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
            </div>
            <div style={{ margin: '25%' }}>
                <Modal
                    open={openModal}
                    style={{ margin: '25%' }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box>
                        <span>Editando</span>
                        <form onSubmit={handleUpdate}>
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
                        <Button onClick={() => handleCloseModal(users)}>cerrar</Button>
                    </Box>

                </Modal>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Identification</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.identification}</td>
                            <td><button onClick={() => deleteUser(user.id)}>delete</button></td>
                            <td><button onClick={() => handleOpenModal(user)}>update</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default User