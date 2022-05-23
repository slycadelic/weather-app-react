// import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from "../hooks/useAuth";
import ThemeSwitch from './ThemeSwitch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faCloudSun, faUserLock, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";



const NavBar = (props) => {

    const { auth } = useAuth();
    const username = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();
    console.log(props);


    const navigate = useNavigate();

    const logout = useLogout();

    const signIn = () => {
        navigate('/login');
    }

    const signOut = async () => {
        await logout();
        navigate('/');
    }
    //<button onClick={signOut}>Sign Out </button>
    // <img
    //     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
    //     className="rounded-circle"
    //     height="22"
    //     alt={`${username}`}
    //     loading="lazy"
    // />

    return (
        <Navbar className="navbar" sticky="top">
            <Container fluid>
                {auth?.roles
                    ? (
                        <>
                            <Nav variant="tabs" activeKey={location.pathname}>
                                <Nav.Link href="/home"><FontAwesomeIcon icon={faHouseChimney} /> Home</Nav.Link>
                                <Nav.Link href="/weatherApp"><FontAwesomeIcon icon={faCloudSun} /> Weather</Nav.Link>
                                <Nav.Link href="/admin"><FontAwesomeIcon icon={faUserLock} /> Admin</Nav.Link>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <NavDropdown className='userProfile' title={
                                    <FontAwesomeIcon icon={faCircleUser} />
                                }>
                                    <NavDropdown.Item>{`${username}`}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </>
                    )
                    : (
                        <>
                            <Navbar.Brand href="/home"><FontAwesomeIcon icon={faHouseChimney} /> Home</Navbar.Brand>
                            <button type="button" className="btn btn-primary me-3" onClick={signIn}>
                                Sign In
                            </button>
                        </>
                    )
                }
            </Container>
            <ThemeSwitch preserveRasters/>
        </Navbar>
    )
}

export default NavBar;