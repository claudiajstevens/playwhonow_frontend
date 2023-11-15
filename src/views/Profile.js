import React from "react";
import useAuth from "../hooks/useAuth";


const Profile = () => {
    const { auth } = useAuth();

    return (
        <div>
            <h1>Hello {auth.username}, Your Profile Goes Here</h1>
        </div>
    )
}

export default Profile;
