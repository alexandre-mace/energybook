import Doughnut from "../charts-types/Doughnut";
import React from "react";
import getRenewableEnergyInvestmentPercentage
    from "../../../Infrastructure/Adapter/getRenewableEnergyInvestmentPercentage";

const RenewableEnergyInvestmentByGdp = () => {
    const [renewableEnergyInvestmentPercentageIndex, setRenewableEnergyInvestmentPercentageIndex] = React.useState('World')
    const [renewableEnergyInvestmentPercentageDatasets, setRenewableEnergyInvestmentPercentageDatasets] = React.useState([])
    const [renewableEnergyInvestmentPercentageCountries, setRenewableEnergyInvestmentPercentageCountries] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestmentPercentage(
            setRenewableEnergyInvestmentPercentageDatasets,
            setRenewableEnergyInvestmentPercentageCountries,
            renewableEnergyInvestmentPercentageIndex
        )
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the renewable energy investment of the continents by percentage of GDP
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
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
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            ticks: {}
                                        }]
                                    },
                                    legend: {
                                        position: 'right',
                                        reverse: true
                                    }
                                }}
                            >
                            </Doughnut>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableEnergyInvestmentByGdp