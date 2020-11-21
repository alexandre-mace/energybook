import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import useWindowDimensions from "../utils/useWindowDimension";
import getFinalEnergyConsumptionBySource from "../../../Infrastructure/Adapter/getFinalEnergyConsumptionBySource";
import FormGroup from "@material-ui/core/FormGroup";
import AutoComplete from "../utils/AutoComplete";
import Doughnut from "../charts-types/Doughnut";
import getKeyByValue from "../../../Infrastructure/Transformer/getKeyByValue";
import {FormLabel} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import kFormatThousands from "../utils/kFormatThousands";

const EnergyConsumptionBySource = ({
                                       modeOption = 'lines',
                                       year = 2018,
                                       playable = false,
                                       animation = true
                                   }) => {
    const {width} = useWindowDimensions();

    const [totalFinalConsumptionBySourceDatasets, setTotalFinalConsumptionBySourceDatasets] = React.useState([])
    const [totalFinalConsumptionBySourceYear, setTotalFinalConsumptionBySourceYear] = React.useState(year)
    const [mode, setMode] = React.useState(modeOption)

    React.useEffect(() => {
        getFinalEnergyConsumptionBySource(setTotalFinalConsumptionBySourceDatasets)
    }, [])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the total <strong>final energy consumption of the World by source</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    {mode === 'lines' &&
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            {playable &&
                            <FormGroup row className={"mb-2"}>
                                <FormLabel component="legend">Modes</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={mode === 'doughnut'}
                                            onChange={() => setMode(mode === 'doughnut' ? 'lines' : 'doughnut')}
                                            name="energySupplySourceDoughnutMode"
                                            color="primary"
                                        />
                                    }
                                    label="Doughnut mode"
                                />
                            </FormGroup>
                            }
                            <MultipleLines
                                name='total final consumption by source'
                                datasets={totalFinalConsumptionBySourceDatasets}
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
                                                if (context.dataIndex === context.dataset.data.length - 2 && value > 200000) {
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
                                            ticks: {
                                                userCallback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            stacked: false,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'ktoe (Kilotonne of Oil Equivalent)',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
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
                                    },
                                }}
                                fill={false}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Final energy consumption by source</div>
                            <div className="mt-3">
                                <strong>Final energy consumption</strong><br/>
                                Final energy consumption is the total energy consumed by end users, such as households, industry and agriculture. It is the energy which reaches the final consumer's door and excludes that which is used by the energy sector itself.
                            </div>
                        </div>
                    </div>
                    }
                    {(mode === 'doughnut' && totalFinalConsumptionBySourceDatasets.values.length > 0) &&
                    <div className="col px-0 px-sm-auto">
                        <div className="white-wrapper">
                            {playable &&
                            <FormGroup row className={"mb-2"}>
                                <FormLabel component="legend">Modes</FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={mode === 'doughnut'}
                                            onChange={() => setMode(mode === 'doughnut' ? 'lines' : 'doughnut')}
                                            name="energySupplySourceDoughnutMode"
                                            color="primary"
                                        />
                                    }
                                    label="Doughnut mode"
                                />
                            </FormGroup>
                            }
                            <FormGroup row>
                                <AutoComplete
                                    options={totalFinalConsumptionBySourceDatasets.keys}
                                    setIndex={setTotalFinalConsumptionBySourceYear}
                                    index={totalFinalConsumptionBySourceYear}
                                />
                            </FormGroup>
                            <div className="doughnut-wrapper">
                                <Doughnut
                                    name='Total final consumption by source by percentage'
                                    datasets={totalFinalConsumptionBySourceDatasets.values.map(dataset => {
                                        const index = getKeyByValue(totalFinalConsumptionBySourceDatasets.keys.map(value => parseInt(value)), parseInt(totalFinalConsumptionBySourceYear))
                                        return {
                                            name: dataset.name,
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
                                        legend: {},
                                    }}
                                >
                                </Doughnut>
                                <div className="chart-legend">Final energy consumption by source</div>
                            </div>
                            <div className="mt-3">
                                <strong>Final energy consumption</strong><br/>
                                Final energy consumption is the total energy consumed by end users, such as households, industry and agriculture. It is the energy which reaches the final consumer's door and excludes that which is used by the energy sector itself.
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