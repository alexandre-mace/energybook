import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getRenewableEnergyInvestment from "../../../Infrastructure/Adapter/getRenewableEnergyInvestment";

const RenewableEnergyInvestment = () => {
    const [renewableEnergyInvestmentIndex, setRenewableEnergyInvestmentIndex] = React.useState('World')
    const [renewableEnergyInvestmentDatasets, setRenewableEnergyInvestmentDatasets] = React.useState([])
    const [renewableEnergyInvestmentCountries, setRenewableEnergyInvestmentCountries] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestment(
            setRenewableEnergyInvestmentDatasets,
            setRenewableEnergyInvestmentCountries,
            renewableEnergyInvestmentIndex
        )
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the renewable energy <strong>investment of the continents</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Renewables share'
                                datasets={renewableEnergyInvestmentDatasets}
                                options={{
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
                                                fontSize: '14'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }]
                                    },
                                    legend: {
                                        position: 'right',
                                        reverse: true
                                    }
                                }}
                            >
                            </MultipleLines>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableEnergyInvestment