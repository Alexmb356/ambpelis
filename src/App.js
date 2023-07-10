import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './componentes/auth/Login';
import Registrarse from './componentes/auth/Registrarse';
import Admin from './componentes/auth/Admin';
import Mostrar from './componentes/auth/Mostrar';
import Editar from './componentes/auth/Editar';
import Home from './componentes/Home'
import Peliculas from './componentes/Peliculas';
import Header from './componentes/Header';
import firebaseApp from "./firebaseConfig/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Footer from './componentes/Footer';
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  

  async function getRol(uid) {
    const docuRef = doc(firestore, `Usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data();
    return infoFinal;
  }

  function setUserWithFirebase(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((userfire) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        userfire,
        rol: userfire.rol,
        nombre: userfire.Nombre,
        apellido: userfire.Apellido,
        pais: userfire.Pais,
        ciudad: userfire.Ciudad,
        provincia: userfire.Provincia,
        domicilio: userfire.Domicilio,
        barrio: userfire.Barrio,
        telefono: userfire.Telefono,
        postal:userfire.Postal,

      };
      
    
      setUser(userData);
      
      console.log("userData final", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebase(usuarioFirebase);
      }
    } else {
      setUser(null);
    }

  });
  return (
    <div className="App bg-primary">
      <Header/>
      {user ? <Home user={user} /> : <Login />}
      <Routes >
          
          <Route path='/' element={<Peliculas/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Admin' element={<Admin/>}/>
          <Route path='/Mostrar' element={<Mostrar/>}/>
          <Route path='/editarusuario/:id' element={<Editar/>}/>
          <Route path='/Registrarse' element={<Registrarse/>}/>
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
