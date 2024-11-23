import { Button, Text, Box, Flex, Container, Spacer } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import { useColorMode } from "@chakra-ui/react";

export const SettingsPage = () => {
	const showToast = useShowToast();
	const { handleLogout, isLoggingOut } = useLogout();
	const { colorMode, toggleColorMode } = useColorMode();

	const freezeAccount = async () => {
		if (!window.confirm("Are you sure you want to freeze your account?")) return;

		try {
			const res = await fetch("/api/users/freeze", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.error) {
				return showToast("Error", data.error, "error");
			}
			if (data.success) {
				await handleLogout();
				showToast("Success", "Your account has been frozen", "success");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
		<Container maxW={"container.lg"}>
			<Text my={3} fontWeight={"bold"} fontSize={22}>
				Settings
			</Text>
			<Flex gap={20} >
				<Box flex={2} py={10}>
					<Text my={1} fontWeight={"bold"}>
						Freeze Your Account
					</Text>
					<Text my={1}>You can unfreeze your account anytime by logging in.</Text>
					<Button size={"sm"} colorScheme='red' onClick={freezeAccount}>
						Freeze
					</Button>

					<Spacer my={9} />

					<Text my={1} fontWeight={"bold"}>
						Change Theme
					</Text>
					<Text my={1}>Choose between light and dark theme</Text>
					<Button size={"sm"} colorScheme='blue' onClick={toggleColorMode}>
						Magic
					</Button>
				</Box>
			</Flex>
			</Container>
		</>
	);
};
