import React from 'react';

const Header = ({appMode, setAppMode, setLoading, delayedCloseLoader}) => (
    <div className="container menu mb-3 mt-2 mt-sm-0 mb-md-4 pt-3 pt-md-5 pb-3 pb-md-5">
        <div className="row justify-content-between justify-content-sm-center header position-relative">
            <div className="col-auto d-none d-md-flex menu-home">
                        <span className={"clickable"} onClick={() => {
                            setAppMode('home')
                        }}>
                            {appMode === 'home' && <strong>Home</strong>}
                            {appMode !== 'home' && <strong className={"black"}>Home</strong>}
                        </span>
            </div>
            <div className={"col-auto"} onClick={() => {
                setAppMode('playground')
            }}>
                        <span className={"clickable"}>
                            {appMode === 'playground' && <strong>Playground</strong>}
                            {appMode !== 'playground' && <strong className={"black"}>Playground</strong>}
                        </span>
            </div>
            <div className={"col-auto"} onClick={() => {
                setLoading(true)
                delayedCloseLoader()
                setAppMode('versus')
            }}>
                        <span className={"clickable"}>
                            {appMode === 'versus' && <strong>Versus</strong>}
                            {appMode !== 'versus' && <strong className={"black"}>Versus</strong>}
                        </span>
            </div>
            <div className="col-auto">
                        <span className={"clickable"} onClick={() => {
                            setAppMode('narrative')
                        }}>
                            {appMode === 'narrative' && <strong>Narrative</strong>}
                            {appMode !== 'narrative' && <strong className={"black"}>Narrative</strong>}
                        </span>
            </div>
        </div>
    </div>
)
export default Header;