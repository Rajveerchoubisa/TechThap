import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
// import useGetUserPosts from "../../hooks/useGetUserPosts";
import useShowToast from "../../hooks/useShowToast";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import postsAtom from "../../atoms/postsAtom";
import { useParams } from "react-router-dom";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
	
	const { username } = useParams();
	const { isLoading, posts } = useGetUserPosts(username);
	// const { user, loading } = useGetUserProfile(username);
	
	const showToast = useShowToast();

	const noPostsFound = !isLoading && posts.length === 0;
	// console.log("posts", posts);
	// console.log("fetchingPosts", fetchingPosts);
	if (noPostsFound) return <NoPostsFound />;

	return (
		<Grid
			templateColumns={{
				sm: "repeat(1, 1fr)",
				md: "repeat(3, 1fr)",
			}}
			gap={1}
			columnGap={1}
		>
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} alignItems={"flex-start"} gap={4}>
						<Skeleton w={"full"}>
							<Box h='300px'>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{!isLoading && (
				<>
					{posts.map((post) => (
						<ProfilePost post={post} key={post._id} />
					))}
				</>
			)}
		</Grid>
	);
};

export default ProfilePosts;

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found</Text>
		</Flex>
	);
};
