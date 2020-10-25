import MultipleBars from "../charts-types/MultipleBars";
import React from "react";
import getRenewableEnergyInvestmentByTechnology
    from "../../../Infrastructure/Adapter/getRenewableEnergyInvestmentByTechnology";

const RenewableEnergyInvestmentByTechology = () => {
    const [renewableEnergyInvestmentByTechnologyIndex, setRenewableEnergyInvestmentByTechnologyIndex] = React.useState('World')
    const [renewableEnergyInvestmentByTechnologyIndexDatasets, setRenewableEnergyInvestmentByTechnologyDatasets] = React.useState([])
    const [renewableEnergyInvestmentByTechnologyIndexCountries, setRenewableEnergyInvestmentByTechnologyCountries] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestmentByTechnology(
            setRenewableEnergyInvestmentByTechnologyDatasets,
            setRenewableEnergyInvestmentByTechnologyCountries,
            renewableEnergyInvestmentByTechnologyIndex
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
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleBars
                                datasets={renewableEnergyInvestmentByTechnologyIndexDatasets}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    legend: {},
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'billion $',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }],
                                        xAxes: [{
                                            stacked: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }]
                                    }
                                }}
                            >
                            </MultipleBars>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableEnergyInvestmentByTechology