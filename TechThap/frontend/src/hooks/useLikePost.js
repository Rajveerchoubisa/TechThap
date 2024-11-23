import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const useLikePost = (post) => {
    const user = useRecoilValue(userAtom);
    const [liked, setLiked] = useState(post.likes.includes(user?.user._id));
    const [isLiking, setIsLiking] = useState(false);
    const [posts, setPosts] = useRecoilState(postsAtom);
    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (!user) {
            showToast("Error", "You must be logged in to like a post", "error");
            return;
        }
        if (isLiking) return;

        setIsLiking(true);
        try {
            const res = await fetch("/api/posts/like/" + post._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return { ...p, likes: liked ? p.likes.filter((id) => id !== user.user._id) : [...p.likes, user.user._id] };
                }
                return p;
            });
            setPosts(updatedPosts);

            setLiked(!liked);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLiking(false);
        }
    };

    return { handleLikePost, isLiked: liked, likes: post.likes.length };
};

export default useLikePost;
