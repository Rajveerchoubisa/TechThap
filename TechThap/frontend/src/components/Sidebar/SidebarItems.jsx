import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Chat from "./Chat";
import Create from "./Create";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			<Chat/>
			<Notifications />
			<CreatePost />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;
