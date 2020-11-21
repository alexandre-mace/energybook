import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getEnergyConsumptionBySector from "../../../Infrastructure/Adapter/getEnergyConsumptionBySector";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const EnergyConsumptionBySector = ({animation = true}) => {
    const {width} = useWindowDimensions();

    const [totalFinalConsumptionBySectorDatasets, setTotalFinalConsumptionBySectorDatasets] = React.useState([])

    React.useEffect(() => {
        getEnergyConsumptionBySector(setTotalFinalConsumptionBySectorDatasets)
    }, [])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the total final energy consumption of the World by <strong>sector</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='total final energy consumption by sector'
                                datasets={totalFinalConsumptionBySectorDatasets}
                                options={{
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
                                    ...(!animation && {animation: {duration: 0}}),
                                    ...(!animation && {hover: {animationDuration: 0}}),
                                    ...(!animation && {responsiveAnimationDuration: 0}),
                                    maintainAspectRatio: width > 760,
                                    plugins: {
                                        labels: false,
                                        datalabels: {
                                            font: {
                                                weight: 'bold',
                                                 size: width > 760 ? '14' : '10'
                                            },
                                            formatter: function(value, context) {
                                                if (context.dataIndex === context.dataset.data.length - 3 && value > 160000) {
                                                    return context.dataset.label
                                                }
                                                return null;
                                            },
                                            color: function(context) {
                                                return context.dataset.borderColor
                                            },
                                            align: 'top'
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                userCallback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'ktoe (Kilotonne of Oil Equivalent)',
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
                                        position: width > 760 ? 'right' : 'top',
                                        reverse: true,
                                        labels: {
                                            boxWidth: width > 760 ? 40 : 12,
                                            fontSize: width > 760 ? 12 : 10
                                        }
                                    },
                                }}
                                fill={false}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Final energy consumption by sector</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnergyConsumptionBySector