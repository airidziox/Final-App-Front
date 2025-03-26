import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugins/https";
import Post from "../components/Post";
import useStore from "../store/main";

const SingleUserPage = () => {

    const params = useParams()

    const messageRef = useRef();
    const [singleUser, setSingleUser] = useState(null)
    const [userPosts, setUserPosts] = useState([])

    const navigate = useNavigate()
    const {loggedUser} = useStore((state) => state);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    useEffect(() => {
        http.getToken(`http://localhost:2001/singleUser/${params.username}`)
            .then(res => {
                console.log(res)
                setSingleUser(res.userExists)
                setUserPosts(res.userPosts)
            })
    }, []);

    async function sendMessage() {
        const res = await http.postToken("http://localhost:2001/sendMessage", )

        if (res.error) {
            alert(res.message)
        } else {
            console.log(res)
        }
    }

    return (
        <div className="container d-flex flex-column gap-4 border rounded-3 p-4 shadow">
            <div className="d-flex align-items-center gap-5 fs-4">
                <div className="d-flex align-items-center flex-column gap-3">
                    <img className="border border-4 border-secondary border-opacity-50 rounded-4 shadow"
                         src={singleUser?.image} alt=""/>
                    <h2>{singleUser?.username}</h2>
                </div>
                <div className="d-flex align-items-center flex-column gap-3 w-100">
                    <h2>Send message to {singleUser?.username}</h2>
                    <div className="d-flex gap-3 w-100">
                        <textarea className="p-2 rounded-3 w-100" ref={messageRef} placeholder="Your message..."/>
                        <button className="btn btn-primary px-5 fs-4 fw-bold" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>

            <div className="d-flex border-top py-3 align-items-center flex-column gap-3 w-100">
                <h2>{singleUser?.username} posts</h2>
                <div className="d-flex flex-wrap gap-3">
                    {userPosts.map((x, i) =>
                        <Post key={i} post={x}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleUserPage;