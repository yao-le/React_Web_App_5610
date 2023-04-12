import {useSearchParams} from "react-router-dom";
import AlbumDetails from "./AlbumDetails";
import PlayListDetails from "./PlayListDetails";



const DetailsScreen = () => {
    const [searchParams] = useSearchParams();
    const albumId = searchParams.get("album");
    const playlistId = searchParams.get("playlist")


    if (albumId) {
        return <AlbumDetails albumId={albumId}/>
    } else if (playlistId) {
        return <PlayListDetails playlistId={playlistId}/>
    }

}

export default DetailsScreen;