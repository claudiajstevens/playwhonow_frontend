import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && 
                setUsers(response.data);

            } catch (error) {
                console.error(error);
                navigate('/login', { state: {from: location}, replace: true});
            }
        }

        getUsers();

        // cleanup function
        // return () => {
        //     isMounted = false;
        //     controller.abort();
        // }

    },[]);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
            <button onClick={() => refresh()}>Refresh</button>
            <br />
        </article>
    );
};

export default Users;
