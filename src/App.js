import React from 'react';
import './App.css';
import Playground from "./UI/components/modes/Playground";
import Versus from "./UI/components/modes/Versus";
import Narrative from "./UI/components/modes/Narrative";
import Loader from "./UI/components/utils/Loader";
import Sources from "./UI/components/modes/Sources";
import LottieControl from "./UI/components/animations/LottieControl";
import * as eyeAnimationData from "./UI/components/animations/Eye.json";
import * as graphPieAnimationData from "./UI/components/animations/Graph_Pie.json";
import * as lightningAnimationData from "./UI/components/animations/Lightning.json";
import * as globeAnimationData from "./UI/components/animations/Globe.json";
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import getAllGetParameters from "./UI/components/utils/getAllGetParameters";

function App() {
    const [loading, setLoading] = React.useState(true)
    const [appMode, setAppMode] = React.useState('home')
    const [appParameters, setAppParameters] = React.useState(null)

    React.useEffect(() => {
        delayedCloseLoader();
        if (Object.entries(getAllGetParameters(window.location.href)).length > 1) {
            setAppParameters(getAllGetParameters(window.location.href));
            setAppMode('versus')
        }
        window.history.pushState(null, null, window.location.origin)

    }, [])

    const delayedCloseLoader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1300);
    }

    return (
        <>
            {loading &&
            <Loader/>
            }
            {!loading &&
            <>
                <div className="container menu mb-3 mb-md-4 pt-3 pt-md-5 pb-3 pb-md-5">
                    <div className="row justify-content-center header position-relative">
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
                {appMode === 'playground' &&
                <Playground/>
                }
                {appMode === 'versus' &&
                <Versus parameters={appParameters}/>
                }
                {appMode === 'narrative' &&
                <Narrative/>
                }
                {appMode === 'sources' &&
                <Sources/>
                }
                {appMode === 'home' &&
                <>
                    <div className="container my-3 my-md-5 pt-0 pt-md-5">
                        <div className="row">
                            <div className="col">
                                <div className="col p-0 d-flex">
                                    <h1 className={"mb-3 pb-3 pb-md-4 app-title color-primary"}>Energy book</h1>
                                    <div className={"desktop-animations"}>
                                        <div className="m-5" style={{position: "relative", height: 1, transform: 'translate(50%, -50px)'}}>
                                            <div style={{position: "absolute", top: 10, left: 130}}>
                                                <LottieControl animationData={globeAnimationData} width={70} height={70}/>
                                            </div>
                                            <div style={{position: "absolute", top: 2, left: 50}}>
                                                <LottieControl animationData={eyeAnimationData} width={200} height={200}/>
                                            </div>
                                            <div style={{position: "absolute", top: 70, left: 60}}>
                                                <LottieControl animationData={lightningAnimationData} width={50} height={50}/>
                                            </div>
                                            <div style={{position: "absolute", top: 100, left: 150}}>
                                                <LottieControl animationData={graphPieAnimationData} width={100} height={100}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4>This book will teach you the basis about energy <span role={"img"}
                                                                                          aria-label={"book"}>&#128212;</span>
                                </h4>
                                <p>Energy use is one of the main theme of our time, having knowledge about it is
                                    important.</p>
                            </div>
                        </div>
                    </div>
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
                    <div className={"mobile-animations"}>
                        <div style={{position: "relative"}}>
                            <div style={{position: "absolute", top: 30,  left: '50%', transform: 'translateX(calc(-50% -30px))'}}>
                                <LottieControl animationData={globeAnimationData} width={45} height={45}/>
                            </div>
                            <div style={{position: "absolute", top: 2, left: '50%', transform: 'translateX(-50%)'}}>
                                <LottieControl animationData={eyeAnimationData} width={150} height={150}/>
                            </div>
                            <div style={{position: "absolute", top: 70,  left: '50%', transform: 'translateX(calc(-50% - 50px))'}}>
                                <LottieControl animationData={lightningAnimationData} width={35} height={35}/>
                            </div>
                            <div style={{position: "absolute", top: 80, left: '50%', transform: 'translateX(calc(-50% -30px))'}}>
                                <LottieControl animationData={graphPieAnimationData} width={65} height={65}/>
                            </div>
                        </div>
                    </div>
                </>
                }
                <footer className="footer p-0 pb-3">
                    <div className="row align-items-center">
                        <div className="col-auto m-auto p-0 text-center">
                            <p className={'mb-0 text-center d-inline-block clickable link sources'}
                               onClick={() => setAppMode('sources')}>Sources</p>
                            <p className={'mb-0'}>Made with love and concern by <strong><a target="_blank"
                                                                                           rel="noopener noreferrer"
                                                                                           href="https://github.com/alexandre-mace">@alexandre-mace</a></strong>
                            </p>
                        </div>
                    </div>
                </footer>
            </>
            }
        </>
    );
}

export default App;
