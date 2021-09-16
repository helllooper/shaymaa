import React from 'react'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
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
            <Navbar collapseOnSelect={true} id="secondNav" expand="lg" variant="dark" className="w-100 topBar justify-content-end position-absolute">
                <Navbar.Toggle children={<h6>القائمة</h6>} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100 d-inline-flex justify-content-center">
                        <Nav.Item className="px-4 order-md-4"><Nav.Link eventKey="1" as={Link} to="/">الرئيسية</Nav.Link></Nav.Item>
                        <Nav.Item className="px-4 order-md-3"><Nav.Link eventKey="2" as={Link} to={`/articles/${1}`} >مقالات</Nav.Link></Nav.Item>
                        <Nav.Item className="px-4 order-md-2"><Nav.Link eventKey="3" as={Link}  to="/videos/1">فيديوهات</Nav.Link></Nav.Item>
                        <Nav.Item className="px-4 order-md-1"><Nav.Link eventKey="4" as={Link}  to="#">رؤيتنا</Nav.Link></Nav.Item>
                        {userLogin.userInfo ? (
                            <Nav className="d-flex">
                            <Nav.Item className="px-4 order-md-2"><Nav.Link eventKey="5" as={Link}  to="/addArticle">إضافة مقالة</Nav.Link></Nav.Item>
                            <Nav.Item className="px-4 order-md-1"><Nav.Link eventKey="6" as={Link}  to="/addVideo">إضافة فيديو</Nav.Link></Nav.Item>
                            <Nav.Item className="px-4 order-md-0"><Nav.Link eventKey="7" as={Link}  to="#" onClick ={logoutHandler}> خروج </Nav.Link></Nav.Item>
                            {userLogin.userInfo.isAdmin && <Nav.Item className="px-4 order-md-0"><Nav.Link eventKey="8" as={Link} to="/superadmin">SuperAdmin</Nav.Link></Nav.Item>}
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
