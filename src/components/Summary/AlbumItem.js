const AlbumItem = ({album}) => {
    return (
        <div className="wd-summary-card">
            <img
                className="wd-summary-cover"
                src={album.albumImage || "https://media.istockphoto.com/id/1153663901/vector/black-music-notes-icon-vector.jpg?s=612x612&w=0&k=20&c=9UACzmfKRu7aGtznDYPepgusXU8lqr_Xi21_E73RNhs="}
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