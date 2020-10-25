import React from "react";
import getCo2Emissions from "../../../Infrastructure/Adapter/getCo2Emissions";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";
import MultipleLines from "../charts-types/MultipleLines";

const Co2Emissions = () => {
    const [totalCo2EmmisionsIndexes, setTotalCo2EmmisionsIndexes] = React.useState(['World'])
    const [totalCo2Emmisions, setTotalCo2Emmisions] = React.useState({keys: [], values: []})
    const [totalCo2EmmisionsCountries, setTotalCo2EmmisionsCountries] = React.useState([])

    React.useEffect(() => {
        getCo2Emissions(setTotalCo2Emmisions, setTotalCo2EmmisionsCountries, totalCo2EmmisionsIndexes)
    }, [totalCo2EmmisionsIndexes]) // []

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the co2 <strong>emissions</strong> of the
                            </span>
                        <MultitpleAutoComplete
                            options={totalCo2EmmisionsCountries}
                            setIndexes={setTotalCo2EmmisionsIndexes}
                            indexes={totalCo2EmmisionsIndexes}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Total co2 emissions'
                                datasets={totalCo2Emmisions}
                                fill={false}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'MtCO2',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color={'255,0,0'}
                            >
                            </MultipleLines>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Co2Emissions