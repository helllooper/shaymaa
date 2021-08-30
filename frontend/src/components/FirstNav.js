import React from 'react'
import { Navbar, Nav} from 'react-bootstrap';
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";
const FirstNav = () => {
    return (
        <>
          <Navbar id="firstNav" className="w-100 topBar justify-content-center position-absolute">
                  <Route render={({history}) => <SearchBox history={history}/>}/>
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
