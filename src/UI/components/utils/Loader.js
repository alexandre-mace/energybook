import React from "react";

const Loader = ({animation = true}) => {
    return (
        <div className="box-loader text-center">
            <div className={'d-flex flex-column'}>
                <span className={"mb-3"}><strong>{animation ? 'Data computing...' : 'Loading mode...'}</strong></span>
                <div className="loader-07"></div>
            </div>
        </div>
    )
}
export default Loader;