import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { logout } from "../actions/userActions"

const SecondNav = ({history, match}) => {
    console.log(history);
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin);
    const logoutHandler = () => {
        dispatch(logout());
      }
    return (
        <>
            <Navbar id="secondNav" expand="md" variant="dark" className="w-100 topBar justify-content-end position-absolute">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 d-inline-flex justify-content-center">
                        <Nav.Link className="px-4 order-md-4"><NavLink to="/">الرئيسية</NavLink></Nav.Link>
                        <Nav.Link className="px-4 order-md-3"><NavLink to="/articles">مقالات</NavLink></Nav.Link>
                        <Nav.Link className="px-4 order-md-2"><NavLink to="#">فيديوهات</NavLink></Nav.Link>
                        <Nav.Link className="px-4 order-md-1"><NavLink to="#">رؤيتنا</NavLink></Nav.Link>
                        {userLogin.userInfo ? (
                            <Nav className="d-flex">
                            <Nav.Link className="px-4 order-md-2"><NavLink to="/addArticle">إضافة مقالة</NavLink></Nav.Link>
                            <Nav.Link className="px-4 order-md-1"><NavLink to="#">إضافة فيديو</NavLink></Nav.Link>
                            <Nav.Link className="px-4 order-md-0"><NavLink to="#" onClick ={logoutHandler}> خروج </NavLink></Nav.Link>
                            {userLogin.userInfo.isAdmin && <Nav.Link className="px-4 order-md-0"><NavLink to="/superadmin">SuperAdmin</NavLink></Nav.Link>}
                            </Nav>
                        ):null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default SecondNav
