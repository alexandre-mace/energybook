import AutoComplete from "../utils/AutoComplete";
import Line from "../charts-types/Line";
import React from "react";
import getRenewablesShare from "../../../Infrastructure/Adapter/getRenewablesShare";

const RenewableShare = () => {
    const [renewablesShareIndex, setRenewablesShareIndex] = React.useState('World')
    const [renewablesShare, setRenewablesShare] = React.useState({keys: [], values: []})
    const [renewablesShareCountries, setRenewablesShareCountries] = React.useState([])

    React.useEffect(() => {
        getRenewablesShare(setRenewablesShare, setRenewablesShareCountries, renewablesShareIndex)
    }, [])

    React.useEffect(() => {
        getRenewablesShare(setRenewablesShare, setRenewablesShareCountries, renewablesShareIndex)
    }, [renewablesShareIndex])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the renewables share of the
                            </span>
                        <AutoComplete
                            options={renewablesShareCountries}
                            setIndex={setRenewablesShareIndex}
                            index={renewablesShareIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <Line
                                name='Renewables share'
                                keys={renewablesShare.keys}
                                values={renewablesShare.values}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 100
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: '% of share in energy supply',
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
                                color={'0,255,0'}
                            >
                            </Line></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableShare