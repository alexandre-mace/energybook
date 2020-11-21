import React from "react";
import getCo2Emissions from "../../../Infrastructure/Adapter/getCo2Emissions";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";
import MultipleLines from "../charts-types/MultipleLines";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const Co2Emissions = ({animation = true}) => {
    const {width} = useWindowDimensions();

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
                                Here is the CO₂ <strong>emissions</strong> of the
                            </span>
                        <MultitpleAutoComplete
                            options={totalCo2EmmisionsCountries}
                            setIndexes={setTotalCo2EmmisionsIndexes}
                            indexes={totalCo2EmmisionsIndexes}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Total co2 emissions'
                                datasets={totalCo2Emmisions}
                                fill={false}
                                options={{
                                    ...(!animation && {animation: '{duration: 0}'}),
                                    ...(!animation && {hover: '{animationDuration: 0}'}),
                                    tooltips: {
                                        usePointStyle: true,
                                        mode: 'index',
                                        intersect: false,
                                        backgroundColor: '#fbfbfb',
                                        titleFontColor: '#666',
                                        bodyFontColor: '#666',
                                        borderColor: 'lightgrey',
                                        borderWidth: 1
                                    },
                                    hover: {
                                        mode: 'index',
                                        intersect: false
                                    },
maintainAspectRatio: width > 760,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                userCallback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'MtCO₂',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
                                            },
                                            gridLines: {
                                                drawBorder: false,
                                            },
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
                                            },
                                            gridLines : {
                                                display : false
                                            }
                                        }],
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color={'255,0,0'}
                            >
                            </MultipleLines>
                            <div className="chart-legend">CO₂ emissions</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Co2Emissions