import AutoComplete from "../utils/AutoComplete";
import Line from "../charts-types/Line";
import React from "react";
import getCo2Emissions from "../../../Infrastructure/Adapter/getCo2Emissions";

const Co2Emissions = () => {
    const [totalCo2EmmisionsIndex, setTotalCo2EmmisionsIndex] = React.useState('World')
    const [totalCo2Emmisions, setTotalCo2Emmisions] = React.useState({keys: [], values: []})
    const [totalCo2EmmisionsCountries, setTotalCo2EmmisionsCountries] = React.useState([])

    React.useEffect(() => {
        getCo2Emissions(setTotalCo2Emmisions, setTotalCo2EmmisionsCountries, totalCo2EmmisionsIndex)
    }, [])

    React.useEffect(() => {
        getCo2Emissions(setTotalCo2Emmisions, setTotalCo2EmmisionsCountries, totalCo2EmmisionsIndex)
    }, [totalCo2EmmisionsIndex]) // []

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the co2 emissions of the
                            </span>
                        <AutoComplete
                            options={totalCo2EmmisionsCountries}
                            setIndex={setTotalCo2EmmisionsIndex}
                            index={totalCo2EmmisionsIndex}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <Line
                                name='Total co2 emissions'
                                keys={totalCo2Emmisions.keys}
                                values={totalCo2Emmisions.values}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 10000
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color={'255,0,0'}
                            >
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Co2Emissions