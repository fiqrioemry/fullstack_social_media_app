// pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import PostDetail from "./pages/PostDetail";
import Notifications from "./pages/Notifications";
import PostDetailDialog from "./pages/PostDetailDialog";

import Layout from "@/components/layout/Layout";
import ProfileTags from "@/components/profile/ProfileTags";
import PageLoading from "@/components/skeleton/PageLoading";
import Followers from "@/components/profile/info/Followers";
import ProfileSaved from "@/components/profile/ProfileSaved";
import ProfilePosts from "@/components/profile/ProfilePosts";
import Followings from "@/components/profile/info/Followings";
import FollowDialog from "@/components/profile/FollowDialog";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import useAuthChecking from "./hooks/useAuthChecking";
import { AuthRoute, NonAuthRoute } from "./middleware";
import useTheme from "./hooks/useTheme";

function App() {
  useTheme();
  const { checkingAuth, location, background } = useAuthChecking();

  if (checkingAuth) return <PageLoading />;

  return (
    <>
      <Toaster />
      <Routes location={background || location}>
        <Route
          path="/signin"
          element={
            <NonAuthRoute>
              <SignIn />
            </NonAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <NonAuthRoute>
              <SignUp />
            </NonAuthRoute>
          }
        />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/"
          element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="p/:id" element={<PostDetail />} />
          <Route path=":username" element={<Profile />}>
            <Route index element={<ProfilePosts />} />
            <Route path="tags" element={<ProfileTags />} />
            <Route path="saved" element={<ProfileSaved />} />
          </Route>
          <Route path="message" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notification" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/:username" element={<FollowDialog />}>
            <Route path="followings" element={<Followings />} />
            <Route path="followers" element={<Followers />} />
          </Route>
          <Route path="p/:id" element={<PostDetailDialog />} />
        </Routes>
      )}
    </>
  );
}

export default App;
