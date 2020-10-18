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
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
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
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    legend: {},
                                    scales: {
                                        xAxes: [{
                                            stacked: true
                                        }],
                                        yAxes: [{
                                            stacked: true
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