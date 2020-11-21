import React from "react";
import getEnergyConsumption from "../../../Infrastructure/Adapter/getEnergyConsumption";
import MultipleLines from "../charts-types/MultipleLines";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const EnergyConsumption = ({animation = true}) => {
    const {width} = useWindowDimensions();

    const [totalEnergyConsumptionIndexes, setTotalEnergyConsumptionIndexes] = React.useState(['World'])
    const [totalEnergyConsumption, setTotalEnergyConsumption] = React.useState({keys: [], values: []})
    const [totalEnergyConsumptionCountries, setTotalEnergyConsumptionCountries] = React.useState([])

    React.useEffect(() => {
        getEnergyConsumption(setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndexes)
    }, [totalEnergyConsumptionIndexes])

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
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Total energy consumption'
                                fill={false}
                                datasets={totalEnergyConsumption}
                                options={{
                                    ...(!animation && {animation: '{duration: 0}'}),
                                    ...(!animation && {hover: '{animationDuration: 0}'}),
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
                                                labelString: 'Mtoe',
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
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Energy consumption</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnergyConsumption;