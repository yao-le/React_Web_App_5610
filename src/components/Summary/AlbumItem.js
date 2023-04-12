const AlbumItem = ({album}) => {
    return (
        <div className="wd-summary-card">
            <img
                className="wd-summary-cover"
                src={album.images && album.images[1]?.url}
                alt={album.name}
            />
            <div className="wd-summary-info">
                <div className="wd-summary-name">{album.name}</div>
                <div className="wd-summary-artist">{album.artists[0].name}</div>
            </div>
        </div>
    );
}

export default AlbumItem;