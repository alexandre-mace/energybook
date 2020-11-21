import AutoComplete from "../utils/AutoComplete";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Doughnut from "../charts-types/Doughnut";
import getKeyByValue from "../../../Infrastructure/Transformer/getKeyByValue";
import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getEnergySupplySource from "../../../Infrastructure/Adapter/getEnergySupplySource";
import useWindowDimensions from "../utils/useWindowDimension";
import {FormLabel} from "@material-ui/core";
import kFormatThousands from "../utils/kFormatThousands";

const PlayableEnergyConsumptionBySource = ({animation = true}) => {
    const {width} = useWindowDimensions();

    const [energySupplySourceIndex, setEnergySupplySourceIndex] = React.useState('World')
    const [energySupplySourceDatasets, setEnergySupplySourceDatasets] = React.useState([])
    const [energySupplySourceCountries, setEnergySupplySourceCountries] = React.useState([])
    const [energySupplySourceYear, setEnergySupplySourceYear] = React.useState(2018)
    const [showRenewableCategories, setShowRenewableCategories] = React.useState(false)
    const [energySupplySourceDoughnutMode, setEnergySupplySourceDoughnutMode] = React.useState(false)
    const [energySupplySourceOnlyRenewables, setEnergySupplySourceOnlyRenewables] = React.useState(false)
    const [energySupplySourceOnlyNonRenewables, setEnergySupplySourceOnlyNonRenewables] = React.useState(false)

    React.useEffect(() => {
        getEnergySupplySource(
            setEnergySupplySourceDatasets,
            setEnergySupplySourceCountries,
            energySupplySourceIndex,
            showRenewableCategories,
            energySupplySourceOnlyRenewables,
            energySupplySourceOnlyNonRenewables
        )
    }, [
        energySupplySourceIndex,
        energySupplySourceYear,
        showRenewableCategories,
        energySupplySourceOnlyRenewables,
        energySupplySourceOnlyNonRenewables
    ])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the <strong>primary {energySupplySourceOnlyNonRenewables ? 'non renewables ' : ''}{energySupplySourceOnlyRenewables ? 'renewables ' : ''}
                                energy consumption by source</strong> of the
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
                    <div className="col px-0 px-sm-auto min-chart-height">
                        <div className="white-wrapper">
                            <FormGroup row className={"mb-2"}>
                                <FormLabel component="legend">Grouped by</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={showRenewableCategories}
                                            onChange={() => {
                                                setShowRenewableCategories(!(showRenewableCategories))
                                                setEnergySupplySourceOnlyNonRenewables(false)
                                                setEnergySupplySourceOnlyRenewables(false)
                                            }}
                                            name="showRenewableCategories"
                                            color="primary"
                                        />
                                    }
                                    label="Renewable / non renewables"
                                />
                                <FormLabel component="legend">Filters</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={energySupplySourceOnlyRenewables}
                                            onChange={() => {
                                                setEnergySupplySourceOnlyRenewables(!(energySupplySourceOnlyRenewables))
                                                setEnergySupplySourceOnlyNonRenewables(false)
                                                setShowRenewableCategories(false)
                                            }}
                                            name="showOnlyRenewableCategories"
                                            color="primary"
                                        />
                                    }
                                    label="Renewables"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={energySupplySourceOnlyNonRenewables}
                                            onChange={() => {
                                                setEnergySupplySourceOnlyNonRenewables(!(energySupplySourceOnlyNonRenewables))
                                                setEnergySupplySourceOnlyRenewables(false)
                                                setShowRenewableCategories(false)
                                            }}
                                            name="showOnlyNonRenewableCategories"
                                            color="primary"
                                        />
                                    }
                                    label="Non renewables"
                                />
                                <FormLabel component="legend">Modes</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={energySupplySourceDoughnutMode}
                                            onChange={() => setEnergySupplySourceDoughnutMode(!(energySupplySourceDoughnutMode))}
                                            name="energySupplySourceDoughnutMode"
                                            color="primary"
                                        />
                                    }
                                    label="Doughnut mode"
                                />
                                {(energySupplySourceDoughnutMode && energySupplySourceDatasets[0]) &&
                                <AutoComplete
                                    options={energySupplySourceDatasets[0].keys}
                                    setIndex={setEnergySupplySourceYear}
                                    index={energySupplySourceYear}
                                />
                                }
                            </FormGroup>
                            {energySupplySourceDoughnutMode &&
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
                                        animation: animation ? '{duration: 0}' :'',
                                        maintainAspectRatio: true,
                                        responsive: true,
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
                                                }
                                            }]
                                        },
                                        legend: {
                                            labels: {
                                                boxWidth: width > 760 ? 40 : 10,
                                            }
                                        }
                                    }}
                                >
                                </Doughnut>
                                <div className="chart-legend">Primary energy consumption by source</div>
                            </div>

                            }
                            {!energySupplySourceDoughnutMode &&
                            <>
                                <MultipleLines
                                    name='Renewables share'
                                    datasets={energySupplySourceDatasets}
                                    fill={false}
                                    options={{
                                        animation: animation ? '{duration: 0}' :'',
                                        maintainAspectRatio: false,
                                        plugins: {
                                            labels: false,
                                            datalabels: {
                                                font: {
                                                    weight: 'bold',
                                                     size: width > 760 ? '14' : '10'
                                                },
                                                formatter: function (value, context) {
                                                    if (context.dataIndex === context.dataset.data.length - 7 && value > 3000) {
                                                        return context.dataset.label
                                                    }
                                                    return null;
                                                },
                                                color: function (context) {
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
                                                },
                                                gridLines: {
                                                    drawBorder: false,
                                                },
                                            }],
                                            xAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: 'Years',
                                                    fontColor: '#666666',
                                                    fontSize: width > 760 ? '14' : '10'
                                                },
                                                gridLines : {
                                                    display : false,
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
                                >
                                </MultipleLines>
                                <div className="chart-legend">Primary energy consumption by source</div>
                            </>
                            }
                            <div className="mt-3">
                                <strong>Primary energy consumption</strong><br/>
                                Primary energy consumption measures the total energy demand of a country. It covers
                                consumption of the energy sector itself, losses during transformation (for example, from
                                oil or gas into electricity) and distribution of energy, and the final consumption by
                                end users. It excludes energy carriers used for non-energy purposes (such as petroleum
                                not used not for combustion but for producing plastics).
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default PlayableEnergyConsumptionBySource