import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox, MdOutlineLogout } from "react-icons/md";
import { getUserSession, getUserToken, removeSession } from "../../utils/localStorageUtils.js";
import { useEffect, useState } from "react";

export const BarraNav = () => {
  const navigate = useNavigate();
   

  return (
    <NavBarStyle>
      <div>
        <Navbar key="lg" variant="dark" expand="lg" className="mb-3">
          <Container fluid>
            <img
              className="logoimg"
              src={require("../../Assets/Png  logo.png")}
              alt=""
            />
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
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/">
                    <p>Home Page</p>
                  </Nav.Link>
                  <NavDropdown
                    title="About Us"
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <NavDropdown.Item href="#action4">
                      <Nav.Link
                        className="dropdownlinks"
                        as={Link}
                        to="/infoSlack"
                      >
                        Que es SkuadLack?
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action3">
                      <Nav.Link
                        className="dropdownlinks"
                        as={Link}
                        to="/infoSlack"
                      >
                        Porque SkuadLack?
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action2">
                      <Nav.Link
                        className="dropdownlinks"
                        as={Link}
                        to="/organizacion"
                      >
                        Crear Organizacion
                      </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">FAQS</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">
                      <Nav.Link
                          className="dropdownlinks"
                          as={Link}
                          to="/contactUs"
                        >
                        Contact Us!
                      </Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  {!getUserToken() && (
                    <>
                      <Nav.Link as={Link} to="/user">
                        <Button variant="success">Regístrate</Button>
                      </Nav.Link>

                      <Nav.Link as={Link} to="/login">
                        <Button variant="primary">
                          <MdAccountBox className="a" />
                          Log In
                        </Button>
                      </Nav.Link>
                    </>
                  )}

                  {getUserToken() && (
                    <>
                      <Nav.Link as={Link} to={`/LUP/${getUserSession().id}`}>
                        <Button variant="dark">Dashboard</Button>
                      </Nav.Link>
                      <Nav.Link as={Link} to="/users">
                        <Button variant="warning">Admin Mode</Button>
                      </Nav.Link>

                      <Nav.Link>
                        <Button
                          variant="danger"
                          onClick={() => {
                            removeSession();
                            navigate("/");
                          }}
                        >
                          Logout <MdOutlineLogout className="a" />
                        </Button>
                      </Nav.Link>

                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </NavBarStyle>
  );
};

const NavBarStyle = styled.div`
    font-weight: bold;
  Button{
    font-weight: bold;

  }
  .a {
    padding-bottom: 0.1rem;
    font-size: larger;
  }
  .logoimg {
    width: 3.4rem;
    height: 3.4rem;
    padding-right: 0.4rem;
  }

  .mb-3 {
    position: fixed;
    display: inline;
    width: 100vw;
    background-color: #3f485b !important;
    padding: 0;
    text-align: center;
    justify-content: baseline;
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  p {
    padding-top: 0.4rem;
  }
  #offcanvasNavbarDropdown-expand-md {
    padding-top: 0.9rem;
  }
  .offcanvas-body {
    margin-top: 0.3rem;
  }
  .dropdownlinks {
    color: #686461;
    font-weight: bolder;
  }
`;
