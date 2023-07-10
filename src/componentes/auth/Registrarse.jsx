import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {collection, addDoc, getFirestore} from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebase';
//import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import { Container } from 'react-bootstrap';
import firebaseApp from '../../firebaseConfig/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, setDoc} from "firebase/firestore";
const auth = getAuth (firebaseApp);
const firestore = getFirestore(firebaseApp);
const MySwal = withReactContent(Swal);

function Registrarse(){
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Edad, setEdad] = useState('');
    const [Ciudad, setCiudad] = useState('');
    const [Pais, setPais] = useState('');
    const [Provincia, setProvincia] = useState('');
    const [Barrio, setBarrio] = useState('');
    const [Domicilio, setDomicilio] = useState('');
    const [Postal, setPostal] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Reppassword, setReppassword] = useState('');

    const navigate = useNavigate();
    //referenciar db
    const usuariosCollection = collection(db, "Usuarios");

    //Alerta

    const alertCreacion = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tus datos fueron guardados correctamente ',
            showConfirmButton: false,
            timer: 1500
        })

    }

    const alertIncompleto = () => {
        Swal.fire({
            icon: 'error',
            title: 'Completa todos los campos',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })

    }

    const alertPassword = () => {
        Swal.fire({
            icon: 'error',
            title: 'Password Erroneo',
            text: 'El password no coincide!',
            footer: '<a href="">Why do I have this issue?</a>'
          })

    }

     //Expresiones Regulares
     const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    //Asincronismo

    const nuevo = async (e) => {
        e.preventDefault();

        if (Nombre ==="" || Apellido ==="" || email ==="" || password ==="" || Edad ==="" || Pais ==="" || Ciudad ==="" || Domicilio ==="" || Postal ===""|| Reppassword ===""){
            alertIncompleto();
            if (password.length>0){
                if(password !== Reppassword){
                    alertPassword();  
                }
            }
        }
       
        else{
            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)
            .then((usuarioFirebase) =>{
                return usuarioFirebase;

            });
            console.log(infoUsuario.user.uid);
            //await addDoc(usuariosCollection, {Nombre: nombre, Apellido: apellido,  Email: email, Password: password, Edad: edad, Pais: pais, Ciudad: ciudad, Domicilio: domicilio, Postal: postal, Reppassword: reppassword, rol: 'user'});
            const docuRef = doc(firestore, `Usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef, { Nombre: Nombre, Apellido: Apellido,  Email: email, Password: password, Edad: Edad, Pais: Pais, Ciudad: Ciudad,Barrio:Barrio, Provincia:Provincia, Domicilio: Domicilio, Postal: Postal, Telefono:Telefono, Reppassword: Reppassword, rol: 'user' });
            alertCreacion();
            navigate("/");
    

        }

      

      
    }

    
    const [usuarioValido, cambiarUsuarioValido] = useState(false);

   

    const [mostrarError, cambiarMostrarError] = useState(false);

      const manejarBlur = (e) => {
        const mensajeError = e.target.value;
        cambiarMostrarError(mensajeError === "");
      };
      
    return (

        <div className='Container'>
            <div className='Container'>
                <form action="#" className=" h-full  relative z-2 m-2 px-10" onSubmit={nuevo}>
                    <fieldset className="formulario-contacto__contenido">
                        <legend className="formulario-contacto__contenido__titulo text-3xl text-center mb-2">Formulario de registro</legend>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='nombre' className="text-1">Nombre</label>
                                            </div>
                                            <div className="col-md-12">
                                                <input 
                                                value={Nombre} 
                                                onBlur={manejarBlur} 
                                                type="text" 
                                                className="form-control rounded-md p-1 text-black bg-gray-300 mb-2" 
                                                placeholder="Escriba su nombre" 
                                                data-input="text" 
                                                id="nombre" 
                                                onChange={(e)=>setNombre(e.target.value)}
                                                expresionRegular={expresiones.nombre}/>
                                                {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                                <span className="formulario-contacto__contenido__span"></span>
                                                
                                            </div>
                                            
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='apellido' className="text-1">Apellido</label>
                                            </div>
                                            <input value={Apellido}  
                                            type="text" 
                                            className="form-control rounded-md p-1 text-black bg-gray-300 mb-2" 
                                            placeholder="Escriba su apellido" 
                                            data-input="text" 
                                            id="apellido" 
                                            onChange={(e)=>setApellido(e.target.value)}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>
                                    </div>
                                    <div className="row my-2"> 
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='email' className="text-1">E-mail</label>
                                            </div>
                                            <input value= {email} 
                                            type="email" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su correo electrónico" 
                                            data-input="email" 
                                            id="email" 
                                            onChange={(e)=>setEmail(e.target.value)}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='edad' className="text-1">Edad</label>
                                            </div>
                                            <input value={Edad}  
                                            type="number" mode="numeric" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su edad" 
                                            data-input="number" 
                                            id="edad" 
                                            onChange={(e)=>setEdad(e.target.value)}/>
                                            {mostrarError && <div className="text-red-500 text-xs">Completa el campo</div>}
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>
                                    
                                    </div>
                                    <div className="row my-2"> 
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='pais' className="text-1">País de residencia</label>
                                            </div>
                                            <input value={Pais}  type="text" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su país" data-input="text" id="pais" onChange={(e)=>setPais(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='ciudad' className="text-1">Ciudad de residencia</label>
                                            </div>
                                            <input value={Ciudad} type="text" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su ciudad" data-input="text" id="ciudad" onChange={(e)=>setCiudad(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                    </div>
                                    <div className="row my-2"> 
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='provincia' className="text-1">Provincia</label>
                                            </div>
                                            <input value={Provincia}  
                                            type="text" 
                                            className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" 
                                            placeholder="Escriba su provincia" 
                                            data-input="text" 
                                            id="pais" 
                                            onChange={(e)=>setProvincia(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='barrio' className="text-1">Barrio</label>
                                            </div>
                                            <input value={Barrio} type="text" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su Barrio" data-input="text" id="ciudad" onChange={(e)=>setBarrio(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='domicilio' className="text-1">Domicilio</label>
                                            </div>
                                            <input value={Domicilio}  type="text" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su domicilio" data-input="text" id="domicilio" onChange={(e)=>setDomicilio(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='postal' className="text-1">Código postal</label>
                                            </div>
                                            <input value={Postal}  type="number" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su código postal" data-input="number" id="postal" onChange={(e)=>setPostal(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>                                
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='domicilio' className="text-1">Teléfono</label>
                                            </div>
                                            <input value={Telefono}  type="number" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su Teléfono" data-input="text" id="domicilio" onChange={(e)=>setTelefono(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                                                      
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='password' className="text-1">Contraseña</label>
                                            </div>
                                            <input value={password}  type="password" className="form-control rounded-md mb-2 p-1 text-black bg-gray-300" placeholder="Escriba su contraseña" data-input="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-12">
                                                <label for='password' className="text-1">Repetir contraseña</label>
                                            </div>
                                            <input value={Reppassword}  className="form-control rounded-md mb-1 p-1 text-black bg-gray-300" type="password" placeholder="Repita su contraseña" data-input="password" id="reppassword" onChange={(e)=>setReppassword(e.target.value)}/>
                                            <span className="formulario-contacto__contenido__span"></span>

                                        </div>

                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="terminos" id="terminos"/> Aceptar los términos y condiciones
                                        </label>
                                    </div>
                                    <div className='flex flex-col items-center p-2'>
                                        <button className="bg-black text-white rounded-md formulario-contacto__contenido__boton text-2 m-2 px-5" type="submit" formaction="./menu-administrador.html">REGISTRAR</button>
                                        <div className="recaptcha m-2">
                                        </div>
                                    </div>
                        </fieldset>
                </form>

            </div>
    
        
        </div>
    );
}
  
export default Registrarse;