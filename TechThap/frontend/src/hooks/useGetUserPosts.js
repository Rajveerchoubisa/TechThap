import { useState, useEffect } from 'react';
import useShowToast from './useShowToast';

const useGetUserPosts = (username) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    // console.log("pots", posts);
    useEffect(() => {
        const fetchUserPosts = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch user posts');
                }
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setPosts(data);
                console.log("data", data);
                // setIsLoading(false);
            } catch (error) {
                showToast("Error", error.message, "error");
                // setPosts([]);
                // setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUserPosts();
    }, [username]);

    return { isLoading, posts };
};

export default useGetUserPosts;
