import AutoComplete from "../utils/AutoComplete";
import Line from "../charts-types/Line";
import React from "react";
import getEnergyConsumption from "../../../Infrastructure/Adapter/getEnergyConsumption";

const EnergyConsumption = () => {
    const [totalEnergyConsumptionIndex, setTotalEnergyConsumptionIndex] = React.useState('World')
    const [totalEnergyConsumption, setTotalEnergyConsumption] = React.useState({keys: [], values: []})
    const [totalEnergyConsumptionCountries, setTotalEnergyConsumptionCountries] = React.useState([])

    React.useEffect(() => {
        getEnergyConsumption(setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndex)
    }, [])

    React.useEffect(() => {
        getEnergyConsumption(setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndex)
    }, [totalEnergyConsumptionIndex]) // []

    return (
        <>
            <div className="container pt-3 pt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <span className={"mr-3"}>
                            Let's take a look of how much <strong>energy</strong> the
                        </span>
                        <AutoComplete
                            options={totalEnergyConsumptionCountries}
                            setIndex={setTotalEnergyConsumptionIndex}
                            index={totalEnergyConsumptionIndex}/>
                        <span className={"mx-3"}>
                            is consuming
                        </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <Line
                                name='Total energy consumption'
                                keys={totalEnergyConsumption.keys}
                                values={totalEnergyConsumption.values}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 4000
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Mtoe',
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
                            >
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnergyConsumption;