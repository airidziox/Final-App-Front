import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import useStore from "../store/main";
import http from "../plugins/https";

const SinglePostPage = () => {

    const navigate = useNavigate()
    const commentRef = useRef();
    const {loggedUser} = useStore((state) => state);
    const [singleUserPost, setSingleUserPost] = useState(null)

    const params = useParams()

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    useEffect(() => {
        http.getToken(`http://localhost:2001/singlePost/${params.id}`)
            .then(res => {
                console.log(res)
                setSingleUserPost(res)
            })
    }, []);

    async function comment() {
        const comment = {
            postId: params.id,
            commenter: loggedUser.username,
            commenterId: loggedUser.id,
            text: commentRef.current.value
        }

        const res = await http.postToken("http://localhost:2001/comment", comment)

        if (res.error) {
            return alert(res.message)
        } else {
            console.log(res)
            setSingleUserPost(res)
        }
    }

    return (
        <div className="container d-flex flex-column border rounded-3 p-4 shadow gap-4">
            <div className="d-flex gap-5">
                <img className="singleImage border border-4 border-dark rounded-4 shadow" src={singleUserPost?.image} alt=""/>
                <div className="d-flex flex-column gap-3">
                    <h1 className="fw-bold">{singleUserPost?.title}</h1>
                    <div>
                        <span className="badge rounded-pill text-bg-primary">{singleUserPost?.time}</span>
                    </div>
                    <div className="border p-2">
                        <h4>{singleUserPost?.description}</h4>
                    </div>
                    <Link to={`/user/${singleUserPost?.username}`}>
                        <div className="username p-0 fs-6">{singleUserPost?.username}</div>
                    </Link>
                </div>
            </div>

            <div className="d-flex border-top py-3 flex-column gap-3 w-100">
                <h2 className="text-center">Comments</h2>
                <div className="d-flex flex-column gap-2 fs-5">
                    {singleUserPost?.comments.map((x, i) =>
                        <div key={i}>
                            <div className="card bg-primary text-white d-inline-block p-2">
                                <b>{x.commenter}</b>: {x.text}
                            </div>
                        </div>
                    )}
                </div>
                <div className="d-flex w-100 gap-3">
                    <textarea className="p-2 rounded-3 w-100" ref={commentRef} placeholder="Your comment..."/>
                    <button className="btn btn-primary fs-4 fw-bold px-5" onClick={comment}>Comment</button>
                </div>
            </div>
        </div>
    );
};

export default SinglePostPage;