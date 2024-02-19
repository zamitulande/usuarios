import React, { useEffect, useState } from 'react'
import { Box, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import clienteAxios from '../config/Axios'
import { addUser, updateUser } from '../redux/features/user/userSlice';

const UpdateUser = () => {

  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.user.isUpdate)
  const formEditar = useSelector((state) => state.user.formEdit)
  const onEdit = useSelector((state) => state.user.onEdit)
  const stateUser = useSelector((state) => state.user.users)

  const [user, setUser] = useState({
    name: '',
    identification: 0
  })
  const { name, identification, id } = formEditar;

  const handleCloseModal = () => {
    dispatch(updateUser(!openModal))
  }
  

  useEffect(()=>{
    setUser(onEdit)
  }, [onEdit])

  const handleOnChange = (e) => {
        setUser({
      ...formEditar,
      [e.target.name] : e.target.value
    })
  }
 
  const handleUpdate = (e) => {
    e.preventDefault();
    clienteAxios.put(`user/update/${formEditar.id}`, user)
      .then((res) => {
        const editdUser = res.data;
        const updatedUsers = stateUser.map(users => {
          if (users.id === editdUser.id) {
            return editdUser;
          } else {
            return users;
          }
        });
        dispatch(addUser(updatedUsers));
        handleCloseModal();
      })
      .catch(error => {
        console.log("error fetching user data " + error)
      })
  }

  return (
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
            <input type="text" name="name" defaultValue={name} onChange={handleOnChange} />
          </label>
          <label>
            Person identification:
            <input type="text" name="identification" defaultValue={identification} onChange={handleOnChange}/>
          </label>
          <button type="submit">Update</button>
        </form>
        <Button onClick={() => handleCloseModal()}>cerrar</Button>
      </Box>
    </Modal>
  )
}

export default UpdateUser