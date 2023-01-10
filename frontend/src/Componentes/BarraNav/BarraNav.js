import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";

export const BarraNav = () => {
  return (
    <NavBarStyle>
    <div>
      <Navbar key="md" variant="dark" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#"><h1>SkuadLack</h1></Navbar.Brand>
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
                <Nav.Link href="#action1"><p>Home Page</p></Nav.Link>
                <NavDropdown
                  title="About Us"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item href="#action4">What is SkuadLack?</NavDropdown.Item>
                  <NavDropdown.Item href="#action3">Why SkuadLack?</NavDropdown.Item>
                  <NavDropdown.Item href="#action7">User/Organizations</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">FAQS</NavDropdown.Item>
                  <NavDropdown.Item href="#action5">Contact Us! :)</NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link href="#action2"><Button as="a" variant="success">Sign In</Button ></Nav.Link>
                <Nav.Link href="#action6"><Button as="a" variant="primary">Log In</Button ></Nav.Link>
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

margin: .3rem;
padding-bottom: 4.5rem;


.mb-3 {
  position: fixed;
  display: inline;
  width: 98%;
  background-color: #686461 !important;
  border-radius: 2rem;
  padding-left: 2rem;
  padding: .1rem;
  margin: .1rem;
  text-align: center;
  justify-content: baseline;

}
p{
    padding-top: .3rem;
}
#offcanvasNavbarDropdown-expand-md{
    padding-top: .8rem;
}
`