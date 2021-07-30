import React, {useEffect} from 'react';
import { Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import {listUsers} from "../actions/userActions"
import Loading from "./Loading";

const SuperAdmin = () => {
    const dispatch = useDispatch()
    const {loading, users} = useSelector(state => state.userList)
    useEffect(() => {
       if(!users){
        dispatch(listUsers());
       }
    }
    ,[users])
    return (
        
        <Container id="superAdmin" className=" pt-5 text-start position-relative">
            <h3>Admins:</h3>
            {loading ? <Loading />: users ? (
            <Nav defaultActiveKey="/home" className="flex-column">
              {users.map((user) => <Nav.Link key={user._id} href="#">{user.name}</Nav.Link>)}
            </Nav>
            ):null}
        </Container>
    )
}

export default SuperAdmin
