import React from 'react';
import {Link} from "react-router-dom";
import useStore from '../store/main';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {socket} from "../socket";

const Toolbar = () => {

    const {loggedUser, updateLoggedUser } = useStore((state) => state);

    function logout() {
        updateLoggedUser(null)
        socket.disconnect();
    }

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                {loggedUser ?
                    <Container>
                        <Nav className="me-auto fs-5 gap-3">
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/profile">Profile</Link>
                            <Link className="nav-link" to="/createPost">Create Post</Link>
                            <Link className="nav-link" to="/messages">Messages</Link>
                            <Link className="nav-link" to="/favorites">Favorites</Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end fs-5 gap-3">
                            <Navbar.Text>
                                Signed in as: <a href="#">{loggedUser.username}</a>
                            </Navbar.Text>
                            <Nav>
                                <Link className="logout nav-link border rounded-2" to="/login"
                                      onClick={logout}>Logout</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                    :
                    <Container>
                        <Nav className="me-auto fs-5 gap-3">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/">Register</Nav.Link>
                        </Nav>
                    </Container>
                }
            </Navbar>
        </div>
    );
};

export default Toolbar;