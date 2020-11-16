import React from 'react';
import Loader from "../utils/Loader";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Co2Emissions from "../charts/Co2Emissions";
import CapitaEnergyUseVsPoverty from "../charts/CapitaEnergyUseVsPoverty";
import PlayableEnergyInvestment from "../charts/PlayableEnergyInvestment";
import PlayableEnergyConsumption from "../charts/PlayableEnergyConsumption";

const Playground = () => {
    const [loading, setLoading] = React.useState(true)
    const [subject, setSubject] = React.useState(0);

    const delayedCloseLoader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1300);
    }

    React.useEffect(() => {
        delayedCloseLoader();
    }, [])

    return (
        <>
            {loading &&
                <Loader/>
            }
            <div className={loading ? 'hidden' : ''}>
                <div className="container mb-3 mb-md-5 pt-1">
                    <div className="row">
                        <div className="col">
                            <h4>Welcome to the playground section <span role={"img"} aria-label={"play"}>&#127918;</span></h4>
                            <p>Here you can browse and play around data.</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-auto m-auto">
                            <Paper square>
                                <Tabs
                                    value={subject}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={(event, value) => {
                                        setSubject(value);
                                    }}
                                    aria-label="tabs"
                                >
                                    <Tab label="Consumption" />
                                    <Tab label="Co2 Emissions" />
                                    <Tab label="Investment" />
                                    <Tab label="Capita energy use VS poverty" />
                                </Tabs>
                            </Paper>
                        </div>
                    </div>
                </div>
                <div className={'min-chart-wrapper-height'}>
                    {subject === 0 &&
                    <PlayableEnergyConsumption/>
                    }
                    {subject === 1 &&
                    <Co2Emissions/>
                    }
                    {subject === 2 &&
                    <PlayableEnergyInvestment/>
                    }
                    {subject === 3 &&
                    <CapitaEnergyUseVsPoverty/>
                    }
                </div>
            </div>
        </>
    )
}
export default Playground;