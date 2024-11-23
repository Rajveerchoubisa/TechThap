import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useGetUserProfileById = (username) => {
    const [userProfile, setUserProfile] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                console.log("say", username);
                setIsLoading(true);
                const res = await fetch(`/api/users/profile/${username}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                if (data.isFrozen) {
                    setUserProfile("");
                    return;
                }
                setUserProfile(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            
            }
        };
        getUserProfile();
        
    }, [username, showToast]);

    return { userProfile, isLoading };
};

export default useGetUserProfileById;
