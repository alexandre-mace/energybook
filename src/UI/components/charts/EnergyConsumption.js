import React from "react";
import getEnergyConsumption from "../../../Infrastructure/Adapter/getEnergyConsumption";
import MultipleLines from "../charts-types/MultipleLines";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";

const EnergyConsumption = () => {
    const [totalEnergyConsumptionIndexes, setTotalEnergyConsumptionIndexes] = React.useState(['World'])
    const [totalEnergyConsumption, setTotalEnergyConsumption] = React.useState({keys: [], values: []})
    const [totalEnergyConsumptionCountries, setTotalEnergyConsumptionCountries] = React.useState([])

    React.useEffect(() => {
        getEnergyConsumption(setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndexes)
    }, [])

    React.useEffect(() => {
        getEnergyConsumption(setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndexes)
    }, [totalEnergyConsumptionIndexes]) // []

    return (
        <>
            <div className="container pt-4 pt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                        <span className={"mr-3"}>
                            Let's take a look of how much <strong>energy</strong> the
                        </span>
                        <MultitpleAutoComplete
                            multiple={true}
                            options={totalEnergyConsumptionCountries}
                            setIndexes={setTotalEnergyConsumptionIndexes}
                            indexes={totalEnergyConsumptionIndexes}/>
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
                            <MultipleLines
                                name='Total energy consumption'
                                fill={false}
                                datasets={totalEnergyConsumption}
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
                            </MultipleLines>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnergyConsumption;