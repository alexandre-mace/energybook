import React from 'react';
import './App.css';
import Playground from "./UI/components/Playground";
import Versus from "./UI/components/Versus";
import Narrative from "./UI/components/Narrative";
import Loader from "./UI/components/Loader";

function App() {
    const [loading, setLoading] = React.useState(true)
    const [appMode, setAppMode] = React.useState('home')

  React.useEffect(() => {
      delayedCloseLoader();
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
            <div className="container my-3 my-md-5 pb-5">
                <div className="row justify-content-center header position-relative">
                    <div className="col-auto menu-home">
                        <span className={"clickable"} onClick={() => {
                            setAppMode('home')
                        }}>
                            {appMode === 'home' && <strong>Home</strong>}
                            {appMode !== 'home' && <strong className={"black"}>Home</strong>}
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
                    <div className={"col-auto"} onClick={() => {
                        // setLoading(true)
                        // delayedCloseLoader()
                        // setAppMode('playground')
                    }}>
                        <span className={"disabled"}>
                            {appMode === 'playground' && <strong>Playground (WIP)</strong>}
                            {appMode !== 'playground' && <strong className={"black"}>Playground (WIP)</strong>}
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
                </div>
            </div>
            {appMode === 'playground' &&
                <Playground/>
            }
            {appMode === 'versus' &&
                <Versus/>
            }
            {appMode === 'narrative' &&
                <Narrative/>
            }
            {appMode === 'home' &&
                <>
                    <div className="container my-3 my-md-5 pt-5">
                      <div className="row">
                          <div className="col">
                              <h1 className={"mb-3 pb-5 app-title color-primary"}>Energy Book</h1>
                              <h4>This book will teach you the basis about energy.</h4>
                              <p>We are consuming a lot of it, and it is increasing every day.</p>
                          </div>
                      </div>
                    </div>
                    <div className="container my-3 my-md-5 pt-5">
                        <div className="row">
                            <div className="d-flex col display-flex flex-column justify-content-between">
                                <div><p>Learn things step by step from the start.</p></div>
                                <div><strong className={"clickable"} onClick={() => setAppMode('narrative')}>Discover narrative mode</strong></div>
                            </div>
                            <div className="d-flex col display-flex flex-column justify-content-between">
                                <div><p>Explore and play around energy data.</p></div>
                                <div><strong className={"clickable"} onClick={() => setAppMode('playground')}>Discover playground mode</strong></div>
                            </div>
                            <div className="d-flex col display-flex flex-column justify-content-between">
                                <div><p>Compare energy sources together</p></div>
                                <div><strong className={"clickable"} onClick={() => setAppMode('versus')}>Discover versus mode</strong></div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
        }
    </>
  );
}

export default App;
