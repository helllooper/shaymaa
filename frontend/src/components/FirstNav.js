import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
const FirstNav = () => {
    return (
        <>
          <Navbar id="firstNav" className="w-100 topBar justify-content-center position-absolute">
                  <Nav>
                      <Nav.Link id="pageTitle" active>
                          <h1 className='fw-bold'>أطفالنا و السكر</h1>
                      </Nav.Link>
                  </Nav>
          </Navbar>  
        </>
    )
}

export default FirstNav
