import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import {async} from '@firebase/util';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Mostrar = () => {

    //configuración de los hook de mostrar
    const UsuariosCollection = collection(db, "Usuarios");

    const [usuarios, setUsuarios] = useState([]);

    

    //Asincronismo

    const getUsuarios = async ()=> { 
        const data = await getDocs(UsuariosCollection); 
        console.log(data.docs);
 
        setUsuarios(
           data.docs.map((doc)=>({...doc.data(), id:doc.id}))
        ); 
       
    }
    useEffect(()=>{
        getUsuarios();
        
    }, [ ])

    //declaración función delete para eliminar registros
    console.log(usuarios);
    const deleteUsuario = async (id)=>{
        const usuarioDoc = doc(db, "Usuarios", id);
        await deleteDoc(usuarioDoc);
        getUsuarios();
    }

    //configuración sweetalert
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Vas a eliminar el usuario?',
            text: "Seguro de querer eliminarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
            deleteUsuario(id);
            Swal.fire(
                'Borrado',
                'El usuario fue eliminado.',
                'Listo'
            )
            }
        })

    }

  
 

    //mostrar datos en estructura

  return (
            <div className='row'>
                <div className='col'>
                    <legend className="mb-2 text-center m-2 text-uppercase">Usuarios</legend>
                    <div className='row'>
                        <Link to="/Registrarse" className='btn btn-outline-light btn-lg mt-1 mb-4 w-25 text-black fw-semibold px-2 col-md-6 col mx-auto'>Registrar Usuario <i className="fa-solid fa-plus"></i></Link>
                    </div>
                    <Table striped bordered hover responsive="xl" variant="dark">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Email</th>
                                <th>Pais</th>
                                <th>Ciudad</th>
                                <th>Provincia</th>
                                <th>Barrio</th>
                                <th>Domicilio</th>
                                <th>Postal</th>
                                <th>Teléfono</th>
                                <th>Password</th>
                                <th>Reppassword</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody className='text-light bg-primary'>
                            { usuarios.map((usuari)=>(
                                <tr key={usuari.id}>
                                    <td key={usuari.Nombre} className='text-light'>{usuari.Nombre || ''}</td>
                                    <td key={usuari.Apellido} className='text-light'>{usuari.Apellido || ''}</td>
                                    <td key={usuari.Edad} className='text-light'>{usuari.Edad || ''} </td>
                                    <td key={usuari.Email} className='text-light'>{usuari.Email || ''}</td>
                                    <td key={usuari.Pais} className='text-light'>{usuari.Pais || ''}</td>
                                    <td key={usuari.Ciudad} className='text-light'>{usuari.Ciudad || ''} </td>
                                    <td key={usuari.Provincia} className='text-light'>{usuari.Provincia || ''} </td>
                                    <td key={usuari.Barrio} className='text-light'>{usuari.Barrio || ''} </td>
                                    <td key={usuari.Domicilio} className='text-light'>{usuari.Domicilio || ''} </td>
                                    <td key={usuari.Postal} className='text-light'>{usuari.Postal || ''}</td>
                                    <td key={usuari.Telefono} className='text-light'>{usuari.Telefono || ''}</td>
                                    <td key={usuari.Password} className='text-light'>{usuari.Password || ''}</td>
                                    <td key={usuari.Reppassword} className='text-light'>{usuari.Reppassword || ''} </td>
                                    <td key={usuari.rol} className='text-light'>{usuari.rol || ''} </td>
                                    <td>
                                        <Link to={`/editarusuario/${usuari.id}`} ><FontAwesomeIcon icon={faPenToSquare} size="lg" className='mx-4'/><label className='mx-3 text-center'>Editar</label></Link> 
                                        <br /> 
                                        <button onClick={()=>{confirmDelete(usuari.id)}} ><FontAwesomeIcon icon={faTrash}  /><label className='mx-1 text-center'>Eliminar</label></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
  )
}

export default Mostrar;