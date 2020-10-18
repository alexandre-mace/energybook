import Bubble from "../charts-types/Bubble";
import React from "react";
import getEnergyUsePerCapitaVsPoverty from "../../../Infrastructure/Adapter/getCapitaEnergyUseVsPoverty";

const CapitaEnergyUseVsPoverty = () => {
    const [energyUsePerCapitaVsPovertyIndex, setEnergyUsePerCapitaVsPovertyIndex] = React.useState('World')
    const [energyUsePerCapitaVsPovertyDatasets, setEnergyUsePerCapitaVsPovertyDatasets] = React.useState([])
    const [energyUsePerCapitaVsPovertyCountries, setEnergyUsePerCapitaVsPovertyCountries] = React.useState([])
    const [energyUsePerCapitaVsPovertyYear, setEnergyUsePerCapitaVsPovertyYear] = React.useState(2014)

    React.useEffect(() => {
        getEnergyUsePerCapitaVsPoverty(
            setEnergyUsePerCapitaVsPovertyDatasets,
            setEnergyUsePerCapitaVsPovertyCountries,
            energyUsePerCapitaVsPovertyIndex,
            energyUsePerCapitaVsPovertyYear
        )
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the energy use per capita compared to the share of population in extreme <strong>poverty</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <Bubble
                                datasets={energyUsePerCapitaVsPovertyDatasets}
                                options={{
                                    plugins: {
                                        datalabels: {
                                            anchor: function (context) {
                                                var value = context.dataset.data[context.dataIndex];
                                                return (value.x > 3000 || (value.x < 3000 && value.y > 6)) ? 'end' : 'center';
                                            },
                                            align: function (context) {
                                                var value = context.dataset.data[context.dataIndex];
                                                return (value.x > 3000 || (value.x < 3000 && value.y > 6)) ? 'end' : 'center';
                                            },
                                            color: function (context) {
                                                var value = context.dataset.data[context.dataIndex];
                                                return (value.x > 3000 || (value.x < 3000 && value.y > 6)) ? context.dataset.backgroundColor : '';
                                            },
                                            font: {
                                                weight: 'bold'
                                            },
                                            formatter: function (value, context) {
                                                return context.dataset.label;
                                            },
                                            offset: 2,
                                            padding: 0
                                        }
                                    },
                                }}
                            >
                            </Bubble>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CapitaEnergyUseVsPoverty