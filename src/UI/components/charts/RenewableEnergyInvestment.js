import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getRenewableEnergyInvestment from "../../../Infrastructure/Adapter/getRenewableEnergyInvestment";
import useWindowDimensions from "../utils/useWindowDimension";

const RenewableEnergyInvestment = () => {
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
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Renewables share'
                                datasets={renewableEnergyInvestmentDatasets}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            ticks: {},
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'billion $',
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