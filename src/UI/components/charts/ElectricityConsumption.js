import React from "react";
import getElectricityConsumption from "../../../Infrastructure/Adapter/getElectricityConsumption";
import MultipleLines from "../charts-types/MultipleLines";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const ElectricityConsumption = ({animation = true}) => {
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
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Total electricity consumption'
                                fill={false}
                                datasets={totalElectricityConsumption}
                                options={{
                                    ...(!animation && {animation: {duration: 0}}),
                                    ...(!animation && {hover: {animationDuration: 0}}),
                                    ...(!animation && {responsiveAnimationDuration: 0}),
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
                                                labelString: 'TWh (Terawatt-hour)',
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