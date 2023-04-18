import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import authReducer from "./reducers/auth-reducer";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";

import Home from "./components/Home";
import Search from "./components/Search";
import Details from "./components/Details";
import Login from "./components/LogIn/Login";
import Profile from "./components/Profile/Profile";
import OtherProfile from "./components/Profile/OtherProfile";
import EditProfile from "./components/Profile/EditProfile";
import Admin from "./components/Admin";
import EditOtherProfile from "./components/Profile/EditOtherProfile";
import Publisher from "./components/Publisher";
import UploadAlbum from "./components/Publisher/UploadAlbum";


const store = configureStore(
    {
        reducer: {
            user: authReducer
        }
    });


function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/details" element={<Details/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/edit-profile/:userId" element={<EditOtherProfile/>}/>
                    <Route path="/profile/:userId" element={<OtherProfile/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/publisher" element={<Publisher />}/>
                    <Route path="/upload-album" element={<UploadAlbum />}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
