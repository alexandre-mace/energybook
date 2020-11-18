import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getEnergyConsumptionBySector from "../../../Infrastructure/Adapter/getEnergyConsumptionBySector";
import useWindowDimensions from "../utils/useWindowDimension";

const EnergyConsumptionBySector = () => {
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
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='total final energy consumption by sector'
                                datasets={totalFinalConsumptionBySectorDatasets}
                                options={{
                                    maintainAspectRatio: false,
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
                                            ticks: {},
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'ktoe (Kilotonne of Oil Equivalent)',
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