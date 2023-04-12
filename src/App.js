import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";

import HomeScreen from "./components/Home/HomeScreen";
import SearchScreen from "./components/Search/SearchScreen";
import DetailsScreen from "./components/Details/DetailsScreen";
import Navbar from "./components/Navbar";

function App() {
  return (
      <BrowserRouter>
          <div className="row wd-bg-color-black">

              <div className="d-none d-sm-none d-md-block col-2">
                  <Navbar />
              </div>

              <div className="col-12 col-md-10">
                <Routes>
                    <Route path="/" element={<HomeScreen />}/>
                    <Route path="/search" element={<SearchScreen/>}/>
                    <Route path="/details" element={<DetailsScreen/>}/>
                </Routes>

            </div>

          </div>
      </BrowserRouter>

  );
}

export default App;
