import AutoComplete from "../utils/AutoComplete";
import FormGroup from "@material-ui/core/FormGroup";
import Doughnut from "../charts-types/Doughnut";
import getKeyByValue from "../../../Infrastructure/Transformer/getKeyByValue";
import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getEnergySupplySource from "../../../Infrastructure/Adapter/getEnergySupplySource";
import useWindowDimensions from "../utils/useWindowDimension";
import kFormatThousands from "../utils/kFormatThousands";

const EnergyConsumptionBySource = ({
                                       mode = 'lines',
                                       onlyCategories = false,
                                       onlyRenewables = false,
                                       onlyNonRenewables = false,
                                       year = 2018,
                                       animation = true
                                   }) => {
    const {width} = useWindowDimensions();

    const [energySupplySourceIndex, setEnergySupplySourceIndex] = React.useState('World')
    const [energySupplySourceDatasets, setEnergySupplySourceDatasets] = React.useState([])
    const [energySupplySourceCountries, setEnergySupplySourceCountries] = React.useState([])
    const [energySupplySourceYear, setEnergySupplySourceYear] = React.useState(2018)

    React.useEffect(() => {
        getEnergySupplySource(
            setEnergySupplySourceDatasets,
            setEnergySupplySourceCountries,
            energySupplySourceIndex,
            onlyCategories,
            onlyRenewables,
            onlyNonRenewables
        )
    }, [energySupplySourceIndex, energySupplySourceYear, onlyCategories, onlyNonRenewables, onlyRenewables])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                        <span className={"mr-3"}>
                            Here is the <strong>primary {onlyNonRenewables ? 'non renewables ' : ''}{onlyRenewables ? 'renewables ' : ''} energy consumption by source</strong> of the
                        </span>
                        <AutoComplete
                            options={energySupplySourceCountries}
                            setIndex={setEnergySupplySourceIndex}
                            index={energySupplySourceIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    {mode !== 'doughnut' &&
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Renewables share'
                                datasets={energySupplySourceDatasets}
                                options={{
                                    ...(!animation && {animation: '{duration: 0}'}),
                                    ...(!animation && {hover: '{animationDuration: 0}'}),
                                    tooltips: {
                                        usePointStyle: true,
                                        mode: 'index',
                                        intersect: false,
                                        backgroundColor: '#fbfbfb',
                                        titleFontColor: '#666',
                                        bodyFontColor: '#666',
                                        borderColor: 'lightgrey',
                                        borderWidth: 1
                                    },
                                    hover: {
                                        mode: 'index',
                                        intersect: false
                                    },
maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: {
                                            font: {
                                                weight: 'bold',
                                                 size: width > 760 ? '14' : '10'
                                            },
                                            formatter: function(value, context) {
                                                if (context.dataIndex === context.dataset.data.length - 7 && value > 3000) {
                                                    return context.dataset.label
                                                }
                                                return null;
                                            },
                                            color: function(context) {
                                                return context.dataset.borderColor
                                            },
                                            align: 'top'
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: false,
                                            ticks: {
                                                userCallback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'TWh (Terawatt-hour)',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
                                            },
                                            gridLines : {
                                                display : false
                                            }
                                        }]
                                    },
                                    legend: {
                                        position: width > 760 ? 'right' : 'top',
                                        reverse: true,
                                        labels: {
                                            boxWidth: width > 760 ? 40 : 12,
                                            fontSize: width > 760 ? 12 : 10
                                        }
                                    }
                                }}
                                fill={false}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Primary energy consumption by source</div>
                            <div className="mt-3">
                                <strong>Primary energy consumption</strong><br/>
                                Primary energy consumption measures the total energy demand of a country. It covers consumption of the energy sector itself, losses during transformation (for example, from oil or gas into electricity) and distribution of energy, and the final consumption by end users. It excludes energy carriers used for non-energy purposes (such as petroleum not used not for combustion but for producing plastics).
                            </div>
                        </div>
                    </div>
                    }
                    {mode === 'doughnut' &&
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            <FormGroup row>
                                {(mode === 'doughnut' && energySupplySourceDatasets[0]) &&
                                <AutoComplete
                                    options={energySupplySourceDatasets[0].keys}
                                    setIndex={setEnergySupplySourceYear}
                                    index={energySupplySourceYear}
                                />
                                }
                            </FormGroup>
                            <div className="doughnut-wrapper">
                                <Doughnut
                                    name='Renewables share'
                                    datasets={energySupplySourceDatasets.map(dataset => {
                                        const index = getKeyByValue(dataset.keys, energySupplySourceYear)
                                        return {
                                            name: dataset.name,
                                            key: dataset.keys[index],
                                            value: dataset.values[index]
                                        }
                                    })}
                                    options={{
                                        ...(!animation && {animation: '{duration: 0}'}),
                                    ...(!animation && {hover: '{animationDuration: 0}'}),

maintainAspectRatio: false,
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
                                        legend: {}
                                    }}
                                >
                                </Doughnut>
                                <div className="chart-legend">Primary energy consumption by source</div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}
export default EnergyConsumptionBySource