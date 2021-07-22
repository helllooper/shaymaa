import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

const SecondNav = () => {
    return (
        <>
            <Navbar id="secondNav" bg="primary" expand="md" variant="dark" className="w-100 topBar justify-content-end position-absolute">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 d-inline-flex justify-content-center">
                        <Nav.Link className="px-4 order-md-3">الرئيسية</Nav.Link>
                        <Nav.Link className="px-4 order-md-2">مقالات</Nav.Link>
                        <Nav.Link className="px-4 order-md-1">فيديوهات</Nav.Link>
                        <Nav.Link className="px-4 order-md-0">رؤيتنا</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default SecondNav
