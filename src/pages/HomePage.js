import React, {useEffect} from 'react';
import useStore from "../store/main";
import Post from "../components/Post";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const {posts, loggedUser} = useStore((state) => state);
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser) {
            navigate("/login")
        }
    }, []);

    return (
        <div className="container">
            <div className="d-flex flex-wrap gap-3">
                {posts.map((x, i) =>
                    <Post key={i} post={x} />
                )}
            </div>
        </div>
    );
};

export default HomePage;