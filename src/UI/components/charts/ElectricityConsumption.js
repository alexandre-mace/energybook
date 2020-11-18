import React from "react";
import getElectricityConsumption from "../../../Infrastructure/Adapter/getElectricityConsumption";
import MultipleLines from "../charts-types/MultipleLines";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";
import useWindowDimensions from "../utils/useWindowDimension";

const ElectricityConsumption = () => {
    const {width} = useWindowDimensions();

    const [totalElectricityConsumptionIndexes, setTotalElectricityConsumptionIndexes] = React.useState(['World'])
    const [totalElectricityConsumption, setTotalElectricityConsumption] = React.useState({keys: [], values: []})
    const [totalElectricityConsumptionCountries, setTotalElectricityConsumptionCountries] = React.useState([])

    React.useEffect(() => {
        getElectricityConsumption(
            setTotalElectricityConsumption,
            setTotalElectricityConsumptionCountries,
            totalElectricityConsumptionIndexes
        )
    }, [totalElectricityConsumptionIndexes])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
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
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Total electricity consumption'
                                fill={false}
                                datasets={totalElectricityConsumption}
                                options={{
                                    maintainAspectRatio: width > 760,
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
                                                labelString: 'TWh (Terawatt-hour)',
                                                fontColor: 'black',
                                                fontSize: width > 760 ? '14' : '10'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: 'black',
                                                fontSize: width > 760 ? '14' : '10'
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color='255, 255, 3'>
                            </MultipleLines>
                            <div className="chart-legend">Electricity consumption</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ElectricityConsumption