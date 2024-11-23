import { Box, Link, Tooltip } from "@chakra-ui/react";
import {CreatePostLogo} from "../../assets/constants"
import { Link as RouterLink } from "react-router-dom";

const Create = () => {
	return (
		<Tooltip
			hasArrow
			label={"Home"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={"/chat"}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<CreatePostLogo />
				<Box display={{ base: "none", md: "block" }}>Chat</Box>
			</Link>
		</Tooltip>
	);
};

export default Create;
