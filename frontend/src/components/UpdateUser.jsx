import React, { useEffect, useState } from 'react'
import { Box, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import clienteAxios from '../config/Axios'
import { addUser, updateUser } from '../redux/features/user/userSlice';
import Swal from 'sweetalert2';

const UpdateUser = () => {

  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.user.isUpdate)
  const formEditar = useSelector((state) => state.user.formEdit)
  const onEdit = useSelector((state) => state.user.onEdit)
  const stateUser = useSelector((state) => state.user.users)

  const [user, setUser] = useState({
    name: '',
    identification: ''
  })

  const [changesMade, setChangesMade] = useState(false);

  const handleCloseModal = () => {
    dispatch(updateUser(!openModal))
  }

  useEffect(() => {    
      setUser(onEdit);
  }, [onEdit])

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if(value){
      setChangesMade(true)
    }
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }
  
  const handleUpdate = (e) => {
    e.preventDefault();    
    const updatedUser = { ...user }; 
    updatedUser.name = user.name || formEditar.name; 
    updatedUser.identification = user.identification || formEditar.identification;

    clienteAxios.put(`user/update/${formEditar.id}`, updatedUser)
      .then((res) => {
        const editdUser = res.data;
        const updatedUsers = stateUser.map(users => {
          if (users.id === editdUser.id) {
            return editdUser;
          } else {
            return users;
          }
        });
        Swal.fire({
          title: "Quieres guardar los cambios?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          denyButtonText: `No guardar`,
          cancelButtonText: "Calcelar",
          allowOutsideClick: false,
          allowEnterKey: false,
          customClass: {
            container: 'my-swal' 
          }
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Guardado!", "", "success");
            dispatch(addUser(updatedUsers));
            handleCloseModal();
          } else if (result.isDenied) {
            Swal.fire("Cambios no guardados", "", "info");
            handleCloseModal();
          } else if( result.isDismissed){
            handleCloseModal();
          }
        });
      })
      .catch(error => {
        console.log("error fetching user data " + error)
      })
  }

  return (
    <Modal
      open={openModal}
      style={{ margin: '25%', zIndex: 999999 }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box>
        <span>Editando</span>
        <form onSubmit={handleUpdate}>
          <label>
            Person Name:
            <input type="text" name="name" defaultValue={formEditar.name} onChange={handleOnChange} />
          </label>
          <label>
            Person identification:
            <input type="text" name="identification" defaultValue={formEditar.identification} onChange={handleOnChange} />
          </label>
          <button type="submit" disabled={!changesMade}>Update</button>
        </form>
        <Button onClick={() => handleCloseModal()}>cerrar</Button>
      </Box>
    </Modal>
  )
}

export default UpdateUser