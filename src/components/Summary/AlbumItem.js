const AlbumItem = ({album}) => {
    return (
        <div className="wd-summary-card">
            <img
                className="wd-summary-cover"
                src={album.albumImage}
                alt={album.albumName}
            />
            <div className="wd-summary-info">
                <div className="wd-summary-name">{album.albumName}</div>
                <div className="wd-summary-artist">{album.artistName}</div>
            </div>
        </div>
    );
}

export default AlbumItem;