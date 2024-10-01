import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NewsList from './components/NewsList/NewsList';
import NewsDetail from './components/NewsDetail/NewsDetail';
import CategoryList from './components/CategoryList/CategoryList';
import Header from './components/Header/Header';
import CategoryTags from './components/CategoryTags/CategoryTags';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import TagDetails from './components/TagDetails/TagDetails';
import Bookmark from './components/Bookmark/Bookmark';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import NoInternet from './components/NoInternet/NoInternet'; // Import NoInternet component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const Layout = () => (
  <div>
    <Header />
    <CategoryTags />
    <Outlet />
  </div>
);

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const setOnline = () => {
      setIsOnline(true);
      toast.success("Internet Restored", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    const setOffline = () => {
      setIsOnline(false);
      toast.error("You are offline", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    // Show offline toast immediately if app is started without an internet connection
    if (!navigator.onLine) {
      setOffline();
    }

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        {isOnline ? (
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<NewsList />} />
              <Route path="/:categorySlug/:postSlug" element={<NewsDetail />} />
              <Route path="/:categorySlug" element={<CategoryList />} />
              <Route path="/tags/:tagSlug" element={<TagDetails />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forget_password" element={<ForgotPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
          </Routes>
        ) : (
          <NoInternet />
        )}
      </div>
    </Router>
  );
}

export default App;
