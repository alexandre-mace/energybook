import React from "react";
import getElectricityConsumption from "../../../Infrastructure/Adapter/getElectricityConsumption";
import MultipleLines from "../charts-types/MultipleLines";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";

const ElectricityConsumption = () => {
    const [totalElectricityConsumptionIndexes, setTotalElectricityConsumptionIndexes] = React.useState(['World'])
    const [totalElectricityConsumption, setTotalElectricityConsumption] = React.useState({keys: [], values: []})
    const [totalElectricityConsumptionCountries, setTotalElectricityConsumptionCountries] = React.useState([])

    React.useEffect(() => {
        getElectricityConsumption(
            setTotalElectricityConsumption,
            setTotalElectricityConsumptionCountries,
            totalElectricityConsumptionIndexes
        )
    }, [])

    React.useEffect(() => {
        getElectricityConsumption(
            setTotalElectricityConsumption,
            setTotalElectricityConsumptionCountries,
            totalElectricityConsumptionIndexes
        )
    }, [totalElectricityConsumptionIndexes]) // []

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <span className={"mr-3"}>
                            Here is the total electricity consumption of the
                        </span>
                        <MultitpleAutoComplete
                            options={totalElectricityConsumptionCountries}
                            setIndexes={setTotalElectricityConsumptionIndexes}
                            indexes={totalElectricityConsumptionIndexes}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Total electricity consumption'
                                fill={false}
                                datasets={totalElectricityConsumption}
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
                            </MultipleLines>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ElectricityConsumption