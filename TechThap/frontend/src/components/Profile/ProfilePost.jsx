import {
	Avatar,
	Button,
	Divider,
	Flex,
	GridItem,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
// import useUserProfileStore from "../../store/userProfileStore";
// import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
// import { deleteObject, ref } from "firebase/storage";
// import { firestore, storage } from "../../firebase/firebase";
// import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
// import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import {CommentLogo, LikeLogo} from "../../assets/constants"
import { useNavigate } from "react-router-dom";

const ProfilePost = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { username } = useParams(); // Get username from URL params
	console.log("params", username);
  	const { user, loading } = useGetUserProfile();
	
	// console.log("bleh3",user);
	
	const authUser = useRecoilValue(userAtom);
	const currentPost = post
	console.log("currentPost", post);
	const showToast = useShowToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();
	
	const handleDeletePost = async () => {
		try {
			if (!window.confirm("Are you sure you want to delete this post?")) return;
			if (isDeleting) return;

			const res = await fetch(`/api/posts/${currentPost._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
			navigate(`/${user.username}`);
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"blackAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<LikeLogo/>
							{/* <AiFillHeart size={20} /> */}
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<CommentLogo/>
							{/* <FaComment size={20} /> */}
							<Text fontWeight={"bold"} ml={2}>
								{post.replies.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image src={post.img} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
			</GridItem>

			<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody bg={"black"} pb={5}>
						<Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"90vh"}
							minH={"50vh"}
						>
							<Flex
								borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Image src={post.img} alt='profile post' />
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={user.profilePic} size={"sm"} name='Oui' />
										<Text fontWeight={"bold"} fontSize={12}>
											{user.username}
										</Text>
									</Flex>
									{authUser?.user._id === user._id && (
										<Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handleDeletePost}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									)}
								</Flex>
								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
									{/* CAPTION */}
									{post.text && <Caption post={post} user={user}/>}
									{/* COMMENTS */}
									{post.replies.map((comment) => (
										<Comment key={comment.userId} comment={comment} />
									))}
								</VStack>
								<Divider my={4} bg={"gray.8000"} />

								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfilePost;
