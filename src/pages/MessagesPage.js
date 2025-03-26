import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../store/main";

const MessagesPage = () => {

    const {loggedUser} = useStore((state) => state);

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    return (
        <div className="container">
            <h1>Messages</h1>
        </div>
    );
};

export default MessagesPage;