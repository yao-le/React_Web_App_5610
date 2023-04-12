import React, {useState} from 'react';
import '../../style/searchbar.css';

const SearchForm = ({onSubmit}) => {
    const [query, setQuery] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(query);
        onSubmit(query);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="wd-searchbar">
                <i className="bi bi-search wd-searchbar-icon"></i>
                <input
                    type="text"
                    className="wd-searchbar-input"
                    placeholder="What do you want to listen to?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </form>
    );
};

export default SearchForm;