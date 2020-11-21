import React from 'react';
import ArrowRightAltRoundedIcon from "@material-ui/icons/ArrowRightAltRounded";

const ModesIntroduction = ({setAppMode, setLoading, delayedCloseLoader}) => (
    <div className="container my-3 my-md-5 pt-3 pt-md-5">
        <div className="row">
            <div className="d-flex col-12 col-md-4 display-flex flex-column justify-content-between">
                <div><p className={"mb-0 mb-md-2 mt-3 mt-md-0"}>Explore and play around energy data.</p>
                </div>
                <div><strong className={"clickable"} onClick={() => setAppMode('playground')}><ArrowRightAltRoundedIcon/> Discover
                    playground mode</strong></div>
            </div>
            <div className="d-flex col-12 col-md-4 display-flex flex-column justify-content-between">
                <div><p className={"mb-0 mb-md-2 mt-4 mt-md-0"}>Compare energy sources together.</p>
                </div>
                <div><strong className={"clickable"} onClick={() => {
                    setLoading(true)
                    delayedCloseLoader()
                    setAppMode('versus')
                }}><ArrowRightAltRoundedIcon/> Discover versus mode</strong></div>
            </div>
            <div className="d-flex col-12 col-md-4 display-flex flex-column justify-content-between">
                <div><p className={"mb-0 mb-md-2 mt-3 mt-md-0"}>Learn things step by step from the
                    start.</p></div>
                <div><strong className={"clickable"} onClick={() => setAppMode('narrative')}><ArrowRightAltRoundedIcon/> Discover
                    narrative mode</strong></div>
            </div>
        </div>
    </div>
)
export default ModesIntroduction;