import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { logout } from "../actions/userActions"
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";

const SecondNav = ({history, match}) => {
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
                        <Nav.Item className="px-4 order-md-4"><NavLink className="nav-link" to="/">الرئيسية</NavLink></Nav.Item>
                        <Nav.Item className="px-4 order-md-3"><NavLink className="nav-link" to={`/articles/${1}`} >مقالات</NavLink></Nav.Item>
                        <Nav.Item className="px-4 order-md-2"><NavLink className="nav-link" to="/videos/1">فيديوهات</NavLink></Nav.Item>
                        <Nav.Item className="px-4 order-md-1"><NavLink className="nav-link" to="#">رؤيتنا</NavLink></Nav.Item>
                        {userLogin.userInfo ? (
                            <Nav className="d-flex">
                            <Nav.Item className="px-4 order-md-2"><NavLink className="nav-link" to="/addArticle">إضافة مقالة</NavLink></Nav.Item>
                            <Nav.Item className="px-4 order-md-1"><NavLink className="nav-link" to="/addVideo">إضافة فيديو</NavLink></Nav.Item>
                            <Nav.Item className="px-4 order-md-0"><NavLink className="nav-link" to="#" onClick ={logoutHandler}> خروج </NavLink></Nav.Item>
                            {userLogin.userInfo.isAdmin && <Nav.Item className="px-4 order-md-0 nav-link"><NavLink to="/superadmin">SuperAdmin</NavLink></Nav.Item>}
                            </Nav>
                        ):null}
                    </Nav>
                    <Route render={({history}) => <SearchBox phone history={history}/>}/>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default SecondNav
