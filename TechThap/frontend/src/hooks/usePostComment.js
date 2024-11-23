import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const usePostComment = () => {
    const user = useRecoilValue(userAtom);
    const [isReplying, setIsReplying] = useState(false);
    const [reply, setReply] = useState("");
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);

    const handlePostComment = async (post, commentText) => {
        if (!user) {
            showToast("Error", "You must be logged in to reply to a post", "error");
            return;
        }
        if (isReplying) return;

        setIsReplying(true);
        try {
            const res = await fetch("/api/posts/reply/" + post._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: commentText }),
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }

            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return { ...p, replies: [...p.replies, data] };
                }
                return p;
            });
            setPosts(updatedPosts);
            showToast("Success", "Reply posted successfully", "success");
            setReply("");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsReplying(false);
        }
    };

    return { isCommenting: isReplying, handlePostComment };
};

export default usePostComment;
