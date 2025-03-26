import React, {useEffect, useRef} from 'react';
import http from "../plugins/https";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const CreatePostPage = () => {

    const navigate = useNavigate()

    const titleRef = useRef();
    const postImageRef = useRef();
    const descriptionRef = useRef();

    let {error, loggedUser, updateError, updatePosts} = useStore((state) => state);

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    async function create() {
        const post = {
            title: titleRef.current.value,
            image: postImageRef.current.value,
            description: descriptionRef.current.value,
        }

        const res = await http.postToken("http://localhost:2001/create", post)

        if (res.error) {
            console.log(res.message)
            return updateError(res.message)
        } else {
            updateError(null)
            updatePosts(res.posts)
            console.log(res)
            navigate("/home")
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center justify-content-center gap-4 fs-4 rounded-3 p-5 shadow">
                <h1>Create Post</h1>
                <input className="p-2 rounded-3" type="text" ref={titleRef} placeholder="Title"/>
                <input className="p-2 rounded-3" type="text" ref={postImageRef} placeholder="Image"/>
                <input className="p-2 rounded-3" type="text" ref={descriptionRef} placeholder="Description"/>
                {error && <h4 style={{color: "red"}}>{error}</h4>}
                <button className="btn btn-primary px-5 fs-4 fw-bold" onClick={create}>Create</button>
            </div>
        </div>
    );
};

export default CreatePostPage;