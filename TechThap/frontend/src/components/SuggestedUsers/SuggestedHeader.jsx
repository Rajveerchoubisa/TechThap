import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
// import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

const SuggestedHeader = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	// const authUser = useAuthStore((state) => state.user);
	// const logout = useLogout();
	const authUser = useRecoilValue(userAtom);
	if (!authUser) return null;

	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
			<Flex alignItems={"center"} gap={2}>
				<Link to={`${authUser.user.username}`}>
					<Avatar size={"lg"} src={authUser.user.profilePic} />
				</Link>
				<Link to={`${authUser.user.username}`}>
					<Text fontSize={12} fontWeight={"bold"}>
						{authUser.user.username}
					</Text>
				</Link>
			</Flex>
			<Button
				size={"xs"}
				background={"transparent"}
				_hover={{ background: "transparent" }}
				fontSize={14}
				fontWeight={"medium"}
				color={"blue.400"}
				onClick={handleLogout}
				isLoading={isLoggingOut}
				cursor={"pointer"}
			>
				Log out
			</Button>
		</Flex>
	);
};

export default SuggestedHeader;
