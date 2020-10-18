import AutoComplete from "../utils/AutoComplete";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Doughnut from "../charts-types/Doughnut";
import getKeyByValue from "../../../Infrastructure/Transformer/getKeyByValue";
import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import getEnergySupplySource from "../../../Infrastructure/Adapter/getEnergySupplySource";

const EnergyConsumptionBySource = ({
   mode = 'lines',
   onlyCategories = false,
   onlyRenewables = false,
   onlyNonRenewables = false,
   year = 2018
}) => {
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
            onlyCategories,
            onlyRenewables,
            onlyNonRenewables
        )
    }, [])

    React.useEffect(() => {
        getEnergySupplySource(
            setEnergySupplySourceDatasets,
            setEnergySupplySourceCountries,
            energySupplySourceIndex,
            onlyCategories,
            onlyRenewables,
            onlyNonRenewables
        )
    }, [energySupplySourceIndex, energySupplySourceYear])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                            <span className={"mr-3"}>
                                Here is the {onlyNonRenewables ? 'non renewables' : ''}{onlyRenewables ? 'renewables' : ''} energy consumption by source of the
                            </span>
                        <AutoComplete
                            options={energySupplySourceCountries}
                            setIndex={setEnergySupplySourceIndex}
                            index={energySupplySourceIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col min-chart-height">
                        <div className="white-wrapper">
                            <FormGroup row>
                                {/*<FormControlLabel*/}
                                {/*    control={*/}
                                {/*        <Switch*/}
                                {/*            checked={showRenewableCategories}*/}
                                {/*            onChange={() => {*/}
                                {/*                setShowRenewableCategories(!(showRenewableCategories))*/}
                                {/*                setEnergySupplySourceOnlyNonRenewables(false)*/}
                                {/*                setEnergySupplySourceOnlyRenewables(false)*/}
                                {/*            }}*/}
                                {/*            name="showRenewableCategories"*/}
                                {/*            color="primary"*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    label="Only renewable / non renewables"*/}
                                {/*/>*/}
                                {/*<FormControlLabel*/}
                                {/*    control={*/}
                                {/*        <Switch*/}
                                {/*            checked={energySupplySourceOnlyRenewables}*/}
                                {/*            onChange={() => {*/}
                                {/*                setEnergySupplySourceOnlyRenewables(!(energySupplySourceOnlyRenewables))*/}
                                {/*                setEnergySupplySourceOnlyNonRenewables(false)*/}
                                {/*                setShowRenewableCategories(false)*/}
                                {/*            }}*/}
                                {/*            name="showOnlyRenewableCategories"*/}
                                {/*            color="primary"*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    label="Only renewables"*/}
                                {/*/>*/}
                                {/*<FormControlLabel*/}
                                {/*    control={*/}
                                {/*        <Switch*/}
                                {/*            checked={energySupplySourceOnlyNonRenewables}*/}
                                {/*            onChange={() => {*/}
                                {/*                setEnergySupplySourceOnlyNonRenewables(!(energySupplySourceOnlyNonRenewables))*/}
                                {/*                setEnergySupplySourceOnlyRenewables(false)*/}
                                {/*                setShowRenewableCategories(false)*/}
                                {/*            }}*/}
                                {/*            name="showOnlyNonRenewableCategories"*/}
                                {/*            color="primary"*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    label="Only non renewables"*/}
                                {/*/>*/}
                                {/*<FormControlLabel*/}
                                {/*    control={*/}
                                {/*        <Switch*/}
                                {/*            checked={energySupplySourceDoughnutMode}*/}
                                {/*            onChange={() => setEnergySupplySourceDoughnutMode(!(energySupplySourceDoughnutMode))}*/}
                                {/*            name="energySupplySourceDoughnutMode"*/}
                                {/*            color="primary"*/}
                                {/*        />*/}
                                {/*    }*/}
                                {/*    label="Doughnut mode"*/}
                                {/*/>*/}
                                {(mode === 'doughnut' && energySupplySourceDatasets[0]) &&
                                <AutoComplete
                                    options={energySupplySourceDatasets[0].keys}
                                    setIndex={setEnergySupplySourceYear}
                                    index={energySupplySourceYear}
                                />
                                }
                            </FormGroup>
                            {mode === 'doughnut' &&
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
                            }
                            {mode !== 'doughnut' &&
                            <MultipleLines
                                name='Renewables share'
                                datasets={energySupplySourceDatasets}
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnergyConsumptionBySource