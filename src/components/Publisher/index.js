import Navbar from "../Navbar";

// publisher dashboard
const Publisher = () => {

    return (
        <div className="row wd-bg-color-black wd-container">
            <div className="d-none d-sm-none d-md-block col-2">
                <Navbar/>
            </div>

            <div className="col-12 col-md-10">
                <div className="wd-width-95">
                    <div className="wd-bg-color-black">
                        <h3 className="fw-bold text-white wd-summary-title">Publisher Dashboard</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Publisher;