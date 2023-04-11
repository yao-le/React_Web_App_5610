import {Routes, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";

function App() {
  return (
      <BrowserRouter>
      <div className="container">
        <Routes>
            <Route path="/" element={<HomeComponent/>}/>
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
