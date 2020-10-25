import Doughnut from "../charts-types/Doughnut";
import React from "react";
import getRenewableEnergyInvestmentPercentage
    from "../../../Infrastructure/Adapter/getRenewableEnergyInvestmentPercentage";
import useWindowDimensions from "../utils/useWindowDimension";

const RenewableEnergyInvestmentByGdp = () => {
    const { width } = useWindowDimensions();

    const [renewableEnergyInvestmentPercentageIndex] = React.useState('World')
    const [renewableEnergyInvestmentPercentageDatasets, setRenewableEnergyInvestmentPercentageDatasets] = React.useState([])
    const [renewableEnergyInvestmentPercentageCountries, setRenewableEnergyInvestmentPercentageCountries] = React.useState([])

    React.useEffect(() => {
        getRenewableEnergyInvestmentPercentage(
            setRenewableEnergyInvestmentPercentageDatasets,
            setRenewableEnergyInvestmentPercentageCountries,
            renewableEnergyInvestmentPercentageIndex
        )
    }, [renewableEnergyInvestmentPercentageIndex])

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
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
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
                                                labelString: '% of GDP',
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
                                        position: width > 760 ? 'right': 'top',
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