import Doughnut from "../charts-types/Doughnut";
import React from "react";
import getRenewableEnergyInvestmentPercentage
    from "../../../Infrastructure/Adapter/getRenewableEnergyInvestmentPercentage";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const RenewableEnergyInvestmentByGdp = ({animation = true}) => {
    const { width } = useWindowDimensions();

    const [renewableEnergyInvestmentPercentageDatasets, setRenewableEnergyInvestmentPercentageDatasets] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestmentPercentage(
            setRenewableEnergyInvestmentPercentageDatasets
        )
    }, [])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the renewable energy investment of the continents by <strong>percentage of GDP</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper doughnut-wrapper">
                            <Doughnut
                                name='Renewables share'
                                datasets={renewableEnergyInvestmentPercentageDatasets.map(dataset => {
                                    return {
                                        name: dataset.name,
                                        key: dataset.keys[0],
                                        value: dataset.values[0]
                                    }
                                })}
                                options={{
                                    animation: animation ? '{duration: 0}' :'',
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            ticks: {
                                                userCallback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: '% of GDP',
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
                                            },
                                        }]
                                    },
                                    legend: {
                                        position: width > 760 ? 'right': 'top',
                                        reverse: true,
                                        labels: {
                                            boxWidth: width > 760 ? 40 : 12,
                                            fontSize: width > 760 ? 12 : 10
                                        }
                                    }
                                }}
                            >
                            </Doughnut>
                            <div className="chart-legend">Renewable energy investment by percentage of GDP</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableEnergyInvestmentByGdp