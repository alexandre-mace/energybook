import React from "react";

const Loader = () => {
    return (
        <div className="box-loader text-center">
            <div className={'d-flex flex-column'}>
                <span className={"mb-3"}><strong>Data computing...</strong></span>
                <div className="loader-07"></div>
            </div>
        </div>
    )
}
export default Loader;