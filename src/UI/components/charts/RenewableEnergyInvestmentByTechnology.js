import MultipleBars from "../charts-types/MultipleBars";
import React from "react";
import getRenewableEnergyInvestmentByTechnology
    from "../../../Infrastructure/Adapter/getRenewableEnergyInvestmentByTechnology";
import useWindowDimensions from "../utils/useWindowDimension";

const RenewableEnergyInvestmentByTechology = () => {
    const { width } = useWindowDimensions();

    const [renewableEnergyInvestmentByTechnologyIndexDatasets, setRenewableEnergyInvestmentByTechnologyDatasets] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestmentByTechnology(
            setRenewableEnergyInvestmentByTechnologyDatasets
        )
    }, [])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the renewable energy investment of the world by <strong>technology</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleBars
                                datasets={renewableEnergyInvestmentByTechnologyIndexDatasets}
                                options={{
                                    maintainAspectRatio: width > 760,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    legend: {
                                        labels: {
                                            boxWidth: width > 760 ? 40 : 12,
                                            fontSize: width > 760 ? 12 : 10
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'billion $',
                                                fontColor: 'black',
                                                fontSize: width > 760 ? '14' : '10'
                                            }
                                        }],
                                        xAxes: [{
                                            stacked: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: 'black',
                                                fontSize: width > 760 ? '14' : '10'
                                            },
                                            gridLines : {
                                                display : false
                                            }
                                        }]
                                    }
                                }}
                            >
                            </MultipleBars>
                            <div className="chart-legend">Renewable energy investment by technology</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableEnergyInvestmentByTechology