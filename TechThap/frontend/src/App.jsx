import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./components/Profile/UpdateProfilePage";
import ChatPage from "./pages/ChatPage";
import { SettingsPage } from "./pages/SettingsPage";
// import './App.css'

function App() {
  const user = useRecoilValue(userAtom);
  // console.log(user);

  return (
    <>
      <PageLayout>
        <Routes>
          <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
          <Route path='/:username' element={<ProfilePage />} />
          
          {/* <Route path='/:username/post/:pid' element={<PostPage />} /> */}
					
          <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
					<Route path='/settings' element={user ? <SettingsPage /> : <Navigate to={"/auth"} />} />
        </Routes>
      </PageLayout>
    </>
  )
}

export default App
