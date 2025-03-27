import React, {useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../store/main";
import {socket} from "../socket";
import http from "../plugins/https";
import Message from "../components/Message";

const MessagesPage = () => {

    const {loggedUser, updateMessages, messages} = useStore((state) => state);
    const messageRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    useEffect(() => {
        http.getToken(`http://localhost:2001/singleUser/${loggedUser.username}`)
            .then(res => {
                updateMessages(res.userExists.messages)
                console.log(res)
            })
    }, []);

    useEffect(() => {
        socket.on("messageReceived", (data) => {
            updateMessages(data.messages)
            console.log(data)
        })
    }, [messages]);

    return (
        <div className="container d-flex flex-column gap-3">
            <h1>Messages</h1>
            <div className="d-flex flex-column align-items-center gap-3 fs-4">
                {messages?.map((x, i) =>
                    <Message message={x} key={i} />
                )}
            </div>
        </div>
    );
};

export default MessagesPage;