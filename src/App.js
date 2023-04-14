import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import authReducer from "./reducers/auth-reducer";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from "react-redux";

import HomeScreen from "./components/Home/HomeScreen";
import SearchScreen from "./components/Search/SearchScreen";
import DetailsScreen from "./components/Details/DetailsScreen";
import LoginScreen from "./components/LogIn/LoginScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";
import OtherProfileScreen from "./components/Profile/OtherProfileScreen";
import EditProfile from "./components/Profile/EditProfile";


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
                    <Route path="/" element={<HomeScreen/>}/>
                    <Route path="/search" element={<SearchScreen/>}/>
                    <Route path="/details" element={<DetailsScreen/>}/>
                    <Route path="/login" element={<LoginScreen/>}/>
                    <Route path="/profile" element={<ProfileScreen/>}/>
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/profile/:userId" element={<OtherProfileScreen/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
