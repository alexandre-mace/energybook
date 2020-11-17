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

const PlayableEnergyConsumptionBySource = () => {
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
            <div className="container mt-3 mt-md-3">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the {energySupplySourceOnlyNonRenewables ? 'non renewables ' : ''}{energySupplySourceOnlyRenewables ? 'renewables ' : ''}
                                <strong>energy consumption by source</strong> of the
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
                    <div className="col min-chart-height">
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
                                    label="renewable / non renewables"
                                />
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
                                    label="only renewables"
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
                                    label="only non renewables"
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
                                        legend: {}
                                    }}
                                >
                                </Doughnut>
                            </div>

                            }
                            {!energySupplySourceDoughnutMode &&
                            <MultipleLines
                                name='Renewables share'
                                datasets={energySupplySourceDatasets}
                                options={{
                                    maintainAspectRatio: false,
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
                                        position: width > 760 ? 'right' : 'top',
                                        reverse: true
                                    }
                                }}
                            >
                            </MultipleLines>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlayableEnergyConsumptionBySource