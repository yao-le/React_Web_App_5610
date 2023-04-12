import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import HomeScreen from "./components/Home/HomeScreen";
import SearchScreen from "./components/Search/SearchScreen";
import DetailsScreen from "./components/Details/DetailsScreen";
import LoginScreen from "./components/LogIn/LoginScreen";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/search" element={<SearchScreen/>}/>
                <Route path="/details" element={<DetailsScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
