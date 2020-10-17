import React from "react";

const Loader = () => {
    return (
        <div className="box-loader">
            <div className={'d-flex flex-column'}>
                <span className={"mb-3"}><strong>Heavy math computing...</strong></span>
                <div className="loader-07"></div>
            </div>
        </div>
    )
}
export default Loader;