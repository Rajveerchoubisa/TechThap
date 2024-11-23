import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
// import useGetUserProfileById from "../../hooks/useGetUserProfileById";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { useEffect } from "react";

const FeedPost = ({ post, postedBy }) => {
	// console.log("postedBy", post);
	// const { userProfile, isLoading } = useGetUserProfileById(postedBy);
	// console.log("userProfile", userProfile);
	// console.log("postedBy", postedBy);
	const [user, setUser] = useState(null);
	const showToast = useShowToast();
	const location = useLocation();
    const isProfilePage = location.pathname === '/profile';
	// const currentUser = useRecoilValue(userAtom);
	// const [posts, setPosts] = useRecoilState(postsAtom);
	// const navigate = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/users/profile/${postedBy}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setUser(data);
				console.log("user", data);
			} catch (error) {
				showToast("Error", error.message, "error");
				// setUser("");
			}
		};

		getUser();
	}, [postedBy, showToast]);

	if (!user) {
		return null;
	}

	return (
		<>
			<PostHeader post={post} creatorProfile={user} />
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.img} alt={"FEED POST IMG"} />
			</Box>
			<PostFooter post={post} isProfilePage = {isProfilePage} creatorProfile={user} />
		</>
	);
};

export default FeedPost;
