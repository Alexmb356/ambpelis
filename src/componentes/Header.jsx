import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



function NavBar() {
  
  
  // Función para cerrar el menú hamburguesa al scrollear
  const handleTogglerNav = e =>{
      
      const basicNavBar = document.getElementById("basic-navbar-nav");
      
      window.addEventListener("scroll", ()=>{
        if(basicNavBar.classList.contains("show")){
          e.target.click();
        }
      });

  }
  
  
  

return (

    //Navbar de react-boostrap
    <Navbar expand="md" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"><img
              src="../ambpelislogo-192x192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="AMBPelis Logo"
            />AMBPelis</Navbar.Brand>
        <Navbar.Toggle onClick={e => handleTogglerNav(e)} aria-controls="basic-navbar-nav" />
        
        
      </Container>
    </Navbar>
)
}

export default NavBar