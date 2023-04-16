import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {searchForItems} from "../../services/search-service";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar";


const Search = () => {
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");


    const searchItems = async (val) => {
        const {albums, tracks, playlists} = await searchForItems(val);

        setAlbums([...albums.items]);
        setTracks([...tracks.items]);
        setPlaylists([...playlists.items]);
    };


    useEffect(() => {
        if (query != null && query.trim()) {
            searchItems(query);
        }
    }, [query]);


    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-95">
                    <div className="wd-bg-color-black">
                        <SearchBar/>
                        {
                            query != null &&
                            <SearchResults albums={albums} tracks={tracks} playlists={playlists}/>
                        }
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Search;