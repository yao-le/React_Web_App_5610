import '../../style/track-details.css';


const TrackItem = ({track}) => {

    // need to add some logic to handle the click event on the heart icon
    const handleClick = () => {
        console.log('clicked');
    }

    const {
        name,
        duration_ms,
        preview_url,
    } = track;

    const duration = (duration_ms / 60000).toFixed(2).replace('.', ':');

    return (
        <div className="wd-track-details wd-track-details-content
        d-flex flex-row align-items-center">

            <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center">
                    <h3 className="wd-track-details-title">{name}</h3>
                    <i className="bi bi-heart fs-5 ms-3" onClick={handleClick}></i>
                </div>
                <div className="wd-track-details-duration">{duration}</div>
            </div>


            <div className="ms-auto wd-me-20">
                {preview_url && (
                    <audio controls>
                        <source src={preview_url} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                )}
                {
                    !preview_url &&
                    <div className="fw-bold text-muted fs-4">Preview not available</div>
                }
            </div>

        </div>
    );
};

export default TrackItem;
