import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import useShowToast from "../../hooks/useShowToast";
import { useRecoilState } from "recoil";
import postsAtom from "../../atoms/postsAtom";
// import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";


const FeedPosts = () => {
	// const { isLoading, posts } = useGetFeedPosts();
	// let say = "chrisdcosta777";
	// const { userProfile, isLoading } = useGetUserProfileById(say);
	// console.log("watchusay",userProfile);
    const [posts, setPosts] = useRecoilState(postsAtom);
    
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	
    useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{loading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap='2'>
							<SkeletonCircle size='10' />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height='10px' w={"200px"} />
								<Skeleton height='10px' w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!loading && posts.length > 0 && posts.map((post) => <FeedPost key={post._id} post={post} postedBy={post.postedBy}/>)}
			{!loading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						Dayuum. Looks like you don&apos;t have any friends.
					</Text>
					{/* <Text color={"red.400"}>Stop coding and go make some!!</Text> */}
				</>
			)}
		</Container>
	);
};

export default FeedPosts;
