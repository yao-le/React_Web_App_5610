import SearchForm from "./SearchForm";
import {useNavigate} from "react-router";


const SearchBar = () => {
    const navigate = useNavigate();

    const handleSearchSubmit = (query) => {
        navigate("/search?q=" + query);
    };

    return (
        <div className="container">
            <SearchForm onSubmit={handleSearchSubmit}/>
        </div>
    )
}

export default SearchBar;
