import AutoComplete from "../utils/AutoComplete";
import Line from "../charts-types/Line";
import React from "react";
import getElectricityConsumption from "../../../Infrastructure/Adapter/getElectricityConsumption";

const ElectricityConsumption = () => {
    const [totalElectricityConsumptionIndex, setTotalElectricityConsumptionIndex] = React.useState('World')
    const [totalElectricityConsumption, setTotalElectricityConsumption] = React.useState({keys: [], values: []})
    const [totalElectricityConsumptionCountries, setTotalElectricityConsumptionCountries] = React.useState([])

    React.useEffect(() => {
        getElectricityConsumption(
            setTotalElectricityConsumption,
            setTotalElectricityConsumptionCountries,
            totalElectricityConsumptionIndex
        )
    }, [])

    React.useEffect(() => {
        getElectricityConsumption(
            setTotalElectricityConsumption,
            setTotalElectricityConsumptionCountries,
            totalElectricityConsumptionIndex
        )
    }, [totalElectricityConsumptionIndex]) // []

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <span className={"mr-3"}>
                            Here is the total electricity consumption of the
                        </span>
                        <AutoComplete
                            options={totalElectricityConsumptionCountries}
                            setIndex={setTotalElectricityConsumptionIndex}
                            index={totalElectricityConsumptionIndex}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">

                            <Line
                                name='Total electricity consumption'
                                keys={totalElectricityConsumption.keys}
                                values={totalElectricityConsumption.values}
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
                                                labelString: 'TWh',
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
                                color='255, 255, 3'>
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ElectricityConsumption