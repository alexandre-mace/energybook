import Bubble from "../charts-types/Bubble";
import React from "react";
import getEnergyUsePerCapitaVsPoverty from "../../../Infrastructure/Adapter/getCapitaEnergyUseVsPoverty";
import useWindowDimensions from "../utils/useWindowDimension";

const CapitaEnergyUseVsPoverty = () => {
    const { height, width } = useWindowDimensions();

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
            <div className="container mt-3 mt-md-5">
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
                        <div className="white-wrapper bubble-wrapper">
                            <Bubble
                                datasets={energyUsePerCapitaVsPovertyDatasets}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: width > 760
                                    },
                                    plugins: {
                                        datalabels: {
                                            anchor: function (context) {
                                                var value = context.dataset.data[context.dataIndex];
                                                return (value.x > 6000 || (value.x < 3000 && value.y > 6)) ? 'end' : 'end';
                                            },
                                            align: function (context) {
                                                var value = context.dataset.data[context.dataIndex];
                                                return (value.x > 6000 || (value.x < 3000 && value.y > 6)) ? 'end' : 'end';
                                            },
                                            color: function (context) {
                                                var value = context.dataset.data[context.dataIndex];
                                                return (value.x > 6000 || (value.x < 3000 && value.y > 6) || (value.x > 1500 && value.x < 6000 && value.y < 6 && context.dataset.label.length <= 6)) ? context.dataset.backgroundColor : '';
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
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Poverty - $1.90 a day (% of population)',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Energy use (kg of oil equivalent per capita)',
                                                fontColor: 'black',
                                                fontSize: '14'
                                            }
                                        }]
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