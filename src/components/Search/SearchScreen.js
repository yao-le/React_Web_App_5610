import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {searchForItems} from "../../services/search-service";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";


const SearchScreen = () => {
    const [albums, setAlbums] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");


    const searchItems = async (val) => {
        const {albums, playlists} = await searchForItems(val);

        setAlbums([...albums.items]);
        setPlaylists([...playlists.items]);

    };


    useEffect(() => {
        if (query != null && query.trim()) {
            searchItems(query);
        }
    }, [query]);


    return (

        <div>
            <SearchBar/>
            {
                query != null &&
                <SearchResults albums={albums} playlists={playlists}/>
            }
        </div>

    );
};

export default SearchScreen;