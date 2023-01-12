import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export const BarraNav = () => {
  return (
    <NavBarStyle>
    <div>
      <Navbar key="xxl" variant="dark" expand="md" className="mb-3">
        <Container fluid>
          <img className="logoimg" src={require("../../Assets/Png  logo.png")} alt=""/>
          <Navbar.Brand href="/">
            <h1>SkuadLack</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas 
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                SkuadLack
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3" >
                <Nav.Link as={Link} to="/"><p >Home Page</p></Nav.Link>
                <NavDropdown
                  title="About Us"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >

                    <NavDropdown.Item href="#action4" >
                      <Nav.Link className="dropdownlinks" as={Link} to="/">Que es SkuadLack?</Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action3">
                      <Nav.Link className="dropdownlinks" as={Link} to="/">Porque SkuadLack?</Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action2">
                      <Nav.Link className="dropdownlinks" as={Link} to="/organizacion">Crear Organizacion</Nav.Link>
                    </NavDropdown.Item>

                  <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">FAQS</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Contact Us! :)</NavDropdown.Item>
                  </NavDropdown>
              
                <Nav.Link as={Link} to="/users"><Button variant="danger">Admin Mode</Button ></Nav.Link>

                <Nav.Link as={Link} to="/user"><Button variant="success">Regístrate</Button ></Nav.Link>
               
               
                <Nav.Link as={Link} to="/login"><Button variant="primary">Log In</Button ></Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
    </NavBarStyle>
  );
}

const NavBarStyle= styled.div`


.logoimg{
  width: 3.4rem;
  height: 3.4rem;
  padding-right : .4rem;
}

.mb-3 {
  position: fixed;
  display: inline;
  width: 98%;
  background-color: #686461!important;
  border-radius: 2rem;
  padding-left: 2rem;
  padding: .1rem;
  margin: 1%;
  text-align: center;
  justify-content: baseline;
  z-index: 100;
  box-shadow: 5px 5px 5px 5px #2b2929;
}
p{
    padding-top: .4rem;
}
#offcanvasNavbarDropdown-expand-md{
    padding-top: .9rem;
}
.offcanvas-body{
  margin-top: .3rem;
}
.dropdownlinks{
  color: #686461;
  font-weight: bolder;
}
`