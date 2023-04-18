import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {searchForItems} from "../../services/search-service";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";
import Navbar from "../Navbar";


const Search = () => {
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");


    const searchItems = async (val) => {
        const {albums, tracks} = await searchForItems(val);

        // clear data
        const albumsData = albums.items.map(album => {
            return {
                id: album.id,
                albumName: album.name,
                artistName: album.artists[0].name,
                albumImage: album.images && album.images[1]?.url,
                isLocal: false,
            }
        })
        setAlbums([...albumsData]);

        const tracksData = tracks.items.map(track => {
            return {
                id: track.id,
                trackName: track.name,
                albumName: track.album?.name,
                albumId: track.album?.id,
                albumImage: track.album?.images[0].url,
                artists: track.artists.map(artist => artist.name).join(', '),
                duration: (track.duration_ms / 60000).toFixed(2).replace('.', ':'),
                previewUrl: track.preview_url,
                isLocal: false,
            }
        });
        setTracks([...tracksData]);
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
                            <SearchResults albums={albums} tracks={tracks} />
                        }
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Search;