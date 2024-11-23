import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
// import useUserProfileStore from "../../store/userProfileStore";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const Caption = ({ post, user }) => {
	// const userProfile = useUserProfileStore((state) => state.userProfile);
	// const userProfile = useRecoilValue(userAtom);

	return (
		<Flex gap={4}>
			<Link to={`/${user.username}`}>
				<Avatar src={user.profilePic} size={"sm"} />
			</Link>
			<Flex direction={"column"}>
				<Flex gap={2} alignItems={"center"}>
					<Link to={`/${user.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
							{user.username}
						</Text>
					</Link>
					<Text fontSize={14}>{post.text}</Text>
				</Flex>
				<Text fontSize={12} color={"gray"}>
					{timeAgo(post.createdAt)}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Caption;
