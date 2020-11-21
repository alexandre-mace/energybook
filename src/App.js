import React from 'react';
import './App.css';
import Playground from "./UI/components/modes/Playground";
import Versus from "./UI/components/modes/Versus";
import Narrative from "./UI/components/modes/Narrative";
import Loader from "./UI/components/utils/Loader";
import Sources from "./UI/components/modes/Sources";
import getAllGetParameters from "./UI/components/utils/getAllGetParameters";
import Header from "./UI/components/Header";
import FullDesktopAnimation from "./UI/components/animations/FullDesktopAnimation";
import ModesIntroduction from "./UI/components/ModesIntroduction";
import FullMobileAnimation from "./UI/components/animations/FullMobileAnimation";
import Footer from "./UI/components/Footer";

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
            {loading && <Loader/>}
            {!loading &&
            <>
                <Header
                    appMode={appMode}
                    setAppMode={setAppMode}
                    setLoading={setLoading}
                    delayedCloseLoader={delayedCloseLoader}
                />
                {appMode === 'playground' && <Playground/>}
                {appMode === 'versus' && <Versus parameters={appParameters}/>}
                {appMode === 'narrative' && <Narrative/>}
                {appMode === 'sources' && <Sources/>}
                {appMode === 'home' &&
                <>
                    <div className="container my-3 my-md-5 pt-0 pt-md-5">
                        <div className="row">
                            <div className="col">
                                <div className="col p-0 d-flex">
                                    <h1 className={"mb-3 pb-3 pb-md-4 app-title color-primary"}>Energy book</h1>
                                    <FullDesktopAnimation/>
                                </div>
                                <h4>This book will teach you the basis about energy <span role={"img"}
                                                                                          aria-label={"book"}>&#128212;</span>
                                </h4>
                                <p>Energy use is one of the main theme of our time, having knowledge about it is
                                    important.</p>
                            </div>
                        </div>
                    </div>
                    <ModesIntroduction
                        setAppMode={setAppMode}
                        setLoading={setLoading}
                       delayedCloseLoader={delayedCloseLoader}
                    />

                    <FullMobileAnimation/>
                </>
                }
                <Footer setAppMode={setAppMode}/>
            </>
            }
        </>
    );
}

export default App;
