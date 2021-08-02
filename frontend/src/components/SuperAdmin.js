import React, {useEffect} from 'react';
import { Container, Nav , Button} from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import {listUsers} from "../actions/userActions"
import Loading from "./Loading";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {deleteUser} from "../actions/userActions"


const SuperAdmin = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, users} = useSelector(state => state.userList)
    const deleteUserState = useSelector(state => state.deleteUser)
    useEffect(() => {
        dispatch(listUsers());
    }
    ,[deleteUserState.loading, deleteUserState.success])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    return (
        <Container id="superAdmin" className=" pt-5 text-start position-relative">
            {!userLogin.userInfo || !userLogin.userInfo.isAdmin ? <Redirect to="/"/>:null}
            <h3>Admins:</h3>
            {loading || deleteUserState.loading ? <Loading />: users ? (
            <Nav defaultActiveKey="/home" className="flex-column">
              {users.map((user) => (
                  <div className="py-2">
                    <Nav.Link className="d-inline" key={user._id}><NavLink to={`/admin/${user._id}`}>{user.name}</NavLink></Nav.Link>
                    {!user.isAdmin ? <Button onClick={() => deleteUserHandler(user._id)} variant="danger" size="sm" >Delete</Button>:<p className="fw-bold d-inline" >Super Admin</p>}
                  </div>
                ))}
            </Nav>
            ):null}
        </Container>
    )
}

export default SuperAdmin
