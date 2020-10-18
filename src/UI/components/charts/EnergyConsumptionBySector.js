import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getEnergyConsumptionBySector from "../../../Infrastructure/Adapter/getEnergyConsumptionBySector";

const EnergyConsumptionBySector = () => {
    const [totalFinalConsumptionBySectorYear, setTotalFinalConsumptionBySectorYear] = React.useState(2018)
    const [totalFinalConsumptionBySectorDatasets, setTotalFinalConsumptionBySectorDatasets] = React.useState([])

    React.useEffect(() => {
        getEnergyConsumptionBySector(setTotalFinalConsumptionBySectorDatasets)
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the total final energy consumption of the World by <strong>sector</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='total final consumption by sector'
                                datasets={totalFinalConsumptionBySectorDatasets}
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
                            </MultipleLines>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnergyConsumptionBySector