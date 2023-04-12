const PlaylistItem = ({playlist}) => {
    return (
        <div className="wd-summary-card">
            <img
                className="wd-summary-cover"
                src={playlist.images[0].url}
                alt={playlist.name}
            />
            <div className="wd-summary-info">
                <div className="wd-summary-name">{playlist.name}</div>
                <div className="wd-summary-artist">{playlist.owner.display_name}</div>
            </div>
        </div>
    );
}

export default PlaylistItem;