import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getRenewableEnergyInvestment from "../../../Infrastructure/Adapter/getRenewableEnergyInvestment";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const RenewableEnergyInvestment = ({animation = true}) => {
    const { width } = useWindowDimensions();

    const [renewableEnergyInvestmentDatasets, setRenewableEnergyInvestmentDatasets] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestment(
            setRenewableEnergyInvestmentDatasets
        )
    }, [])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the renewable energy <strong>investment of the continents</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Renewables share'
                                datasets={renewableEnergyInvestmentDatasets}
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
                                            stacked: true,
                                            ticks: {
                                                userCallback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'billion $',
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
                                        position: width > 760 ? 'right': 'top',
                                        reverse: true
                                    }
                                }}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Renewable energy investment</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableEnergyInvestment