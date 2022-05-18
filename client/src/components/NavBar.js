import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useAuth from "../hooks/useAuth";
import ThemeSwitch from './ThemeSwitch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faCloudSun, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";


const NavBar = () => {

    const { auth } = useAuth();
    const username = JSON.parse(localStorage.getItem('user'));
    // console.log(auth?.roles?.[1]);

    const navigate = useNavigate();

    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    //<button onClick={signOut}>Sign Out </button>

    return (
        <Navbar className="navbar" sticky="top" variant="dark">
            <ThemeSwitch />
            <Container fluid>
                <Navbar.Brand href="/home"><FontAwesomeIcon icon={faHouseChimney} /> Home</Navbar.Brand>
                {auth?.roles
                    ? (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/weatherApp"><FontAwesomeIcon icon={faCloudSun} /> Weather</Nav.Link>
                                <Nav.Link href="/admin"><FontAwesomeIcon icon={faUserLock} /> Admin</Nav.Link> 
                                
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <NavDropdown className='userProfile' title="Profile">
                                    <NavDropdown.Item>{`${username}`}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </>
                    )
                    : (
                        <Nav.Link href="/login">Sign In</Nav.Link>
                    )
                }
            </Container>
        </Navbar>
    )
}

export default NavBar;