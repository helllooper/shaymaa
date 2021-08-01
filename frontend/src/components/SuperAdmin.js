import React, {useEffect} from 'react';
import { Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import {listUsers} from "../actions/userActions"
import Loading from "./Loading";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom"


const SuperAdmin = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, users} = useSelector(state => state.userList)
    useEffect(() => {
        dispatch(listUsers());
    }
    ,[])
    return (
        
        <Container id="superAdmin" className=" pt-5 text-start position-relative">
            {!userLogin.userInfo || !userLogin.userInfo.isAdmin ? <Redirect to="/"/>:null}
            <h3>Admins:</h3>
            {loading ? <Loading />: users ? (
            <Nav defaultActiveKey="/home" className="flex-column">
              {users.map((user) => <Nav.Link key={user._id}><NavLink to={`/admin/${user._id}`}>{user.name}</NavLink></Nav.Link>)}
            </Nav>
            ):null}
        </Container>
    )
}

export default SuperAdmin
