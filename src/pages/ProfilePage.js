import React, {useEffect, useRef} from 'react';
import useStore from "../store/main";
import http from "../plugins/https";
import {useNavigate} from "react-router-dom";
import {socket} from "../socket";


const ProfilePage = () => {

    const imageRef = useRef();
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    let {loggedUser, updateLoggedUser, error, updateError, onlineUsers} = useStore((state) => state);

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    console.log(onlineUsers)


    async function changeImage() {
        const image = imageRef.current.value

        const res = await http.postToken("http://localhost:2001/changeImage", {image})

        if (res.error) {
            return console.log(res.message)
        } else {
            updateLoggedUser({...loggedUser, image: res.updatedUser.image})
            console.log(res)
        }
    }

    async function changeUsername() {
        const newUsername = usernameRef.current.value
        const res = await http.postToken("http://localhost:2001/changeUsername", {newUsername})

        if (res.error) {
            return alert(res.message)
        } else {
            updateLoggedUser({...loggedUser, username: res.updatedUser.username})
            updateError(null)
            console.log(res)
        }
    }

    async function changePassword() {
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return alert("Passwords do not match")
        }

        const newPassword = passwordRef.current.value
        const res = await http.postToken("http://localhost:2001/changePassword", {newPassword})

        if (res.error) {
            return alert(res.message)
        } else {
            alert(res.message)
        }
    }

    return (
        <div>
            <div className="container d-flex justify-content-between border rounded-3 align-items-center p-4 fs-4 shadow">
                <div className="d-flex align-items-center flex-column gap-3">
                    <img className="border border-4 border-secondary border-opacity-50 rounded-4 shadow"
                         src={loggedUser && loggedUser.image} alt=""/>
                    <h2>{loggedUser && loggedUser.username}</h2>
                    <div className="d-flex align-items-center flex-column border-top py-3 gap-3">
                        <input className="p-2 rounded-3" type="text" ref={imageRef} placeholder="Image URL"/>
                        <button className="btn btn-primary px-5 fs-4 fw-bold" onClick={changeImage}>Change Image
                        </button>
                    </div>
                </div>
                <div className="d-flex align-items-center flex-column gap-3">
                    <h2>Change your username</h2>
                    <input className="p-2 rounded-3" type="text" ref={usernameRef} placeholder="New username"/>
                    {error && <h4 style={{color: "red"}}>{error}</h4>}
                    <button className="btn btn-primary px-5 fs-4 fw-bold" onClick={changeUsername}>Change</button>
                </div>
                <div className="d-flex align-items-center flex-column gap-3">
                    <h2>Change your password</h2>
                    <input className="p-2 rounded-3" type="text" ref={passwordRef} placeholder="New password"/>
                    <input className="p-2 rounded-3" type="text" ref={confirmPasswordRef} placeholder="Confirm new password"/>
                    <button className="btn btn-primary px-5 fs-4 fw-bold" onClick={changePassword}>Change</button>
                </div>
            </div>
        </div>


    );
};

export default ProfilePage;