import React from 'react';

const Header = ({appMode, setAppMode, setLoading, delayedCloseLoader}) => (
    <div className="container menu mb-3 mt-3 mt-sm-0 mb-md-4 pt-3 pt-md-5 pb-2 pb-md-5">
        <div className="row justify-content-between justify-content-sm-center header position-relative">
            <div className="col-auto d-none d-md-flex menu-home">
                <div className={"clickable"} onClick={() => {
                    setAppMode('home')
                }}>
                    {appMode === 'home' && <strong>Home</strong>}
                    {appMode !== 'home' && <strong className={"black"}>Home</strong>}
                </div>
            </div>
            <div className={"col-auto"}>
                        <div className={"clickable"} onClick={() => {
                            setAppMode('playground')
                            setLoading(true)
                            delayedCloseLoader(0)
                        }}>
                            {appMode === 'playground' && <strong>Playground</strong>}
                            {appMode !== 'playground' && <strong className={"black"}>Playground</strong>}
                        </div>
            </div>
            <div className={"col-auto"}>
                <span className={"clickable"} onClick={() => {
                    setAppMode('versus')
                    setLoading(true)
                    delayedCloseLoader(0)
                }}>
                    {appMode === 'versus' && <strong>Versus</strong>}
                    {appMode !== 'versus' && <strong className={"black"}>Versus</strong>}
                </span>
            </div>
            <div className="col-auto">
                <div className={"clickable"} onClick={() => {
                    setAppMode('narrative')
                    setLoading(true)
                    delayedCloseLoader(0)
                }}>
                    {appMode === 'narrative' && <strong>Narrative</strong>}
                    {appMode !== 'narrative' && <strong className={"black"}>Narrative</strong>}
                </div>
            </div>
        </div>
    </div>
)
export default Header;