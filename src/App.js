import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import HomeScreen from "./components/Home/HomeScreen";
import SearchScreen from "./components/Search/SearchScreen";
import DetailsScreen from "./components/Details/DetailsScreen";
import LoginScreen from "./components/LogIn/LoginScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";
import OtherProfileScreen from "./components/Profile/OtherProfileScreen";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/search" element={<SearchScreen/>}/>
                <Route path="/details" element={<DetailsScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                {/*<Route path="/profile/:userId" element={<OtherProfileScreen/>}/>*/}
                {/*<Route path="/profile" element={<ProfileScreen/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
