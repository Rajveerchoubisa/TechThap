import { Box, Flex, Link, Text, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
// import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import useShowToast from "../../hooks/useShowToast";
import { useState, useEffect } from "react";

const SuggestedUsers = () => {
	// const { isLoading, suggestedUsers } = useGetSuggestedUsers();

	const [loading, setLoading] = useState(true);
	const [suggestedUsers, setSuggestedUsers] = useState([]);
	const showToast = useShowToast();

	useEffect(() => {
		const getSuggestedUsers = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/users/suggested");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setSuggestedUsers(data);
				console.log(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};

		getSuggestedUsers();
	}, [showToast]);
	// optional: render loading skeleton
	// if (isLoading) return null;

	return (
		<VStack py={8} px={6} gap={4}>
			<SuggestedHeader />

			{suggestedUsers.length !== 0 ? (
				<>
					<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
						<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
							Suggested for you
						</Text>
						<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
							See All
						</Text>
					</Flex>

					{suggestedUsers.map((user, index) => (
						<SuggestedUser user={user} key={user._id || index} />
					))}
				</>
			):(
				[0, 1, 2, 3, 4].map((_, idx) => (
					<Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
						{/* avatar skeleton */}
						<Box>
							<SkeletonCircle size={"10"} />
						</Box>
						{/* username and fullname skeleton */}
						<Flex w={"full"} flexDirection={"column"} gap={2}>
							<Skeleton h={"8px"} w={"80px"} />
							<Skeleton h={"8px"} w={"90px"} />
						</Flex>
						{/* follow button skeleton */}
						<Flex>
							<Skeleton h={"20px"} w={"60px"} />
						</Flex>
					</Flex>
				))
			)}


			{/* <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
				© 2024 Built With{" "}&#x1F499; by&#160;
				<Link href='https://github.com/ChrisDc777' target='_blank' color='blue.500' fontSize={14}>
					ROXANNE
				</Link>
			</Box> */}
		</VStack>
	);
};

export default SuggestedUsers;
