import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import useWindowDimensions from "../utils/useWindowDimension";
import getFinalEnergyConsumptionBySource from "../../../Infrastructure/Adapter/getFinalEnergyConsumptionBySource";
import FormGroup from "@material-ui/core/FormGroup";
import AutoComplete from "../utils/AutoComplete";
import Doughnut from "../charts-types/Doughnut";
import getKeyByValue from "../../../Infrastructure/Transformer/getKeyByValue";

const EnergyConsumptionBySource = ({
                                       mode = 'lines',
                                       year = 2018
                                   }) => {
    const {width} = useWindowDimensions();

    const [totalFinalConsumptionBySourceDatasets, setTotalFinalConsumptionBySourceDatasets] = React.useState([])
    const [totalFinalConsumptionBySourceYear, setTotalFinalConsumptionBySourceYear] = React.useState(year)

    React.useEffect(() => {
        getFinalEnergyConsumptionBySource(setTotalFinalConsumptionBySourceDatasets)
    }, [])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the total final energy consumption of the World by <strong>source</strong>
                            </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    {mode === 'lines' &&
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='total final consumption by source'
                                datasets={totalFinalConsumptionBySourceDatasets}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'ktoe (Kilotonne of Oil Equivalent)',
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
                        </div>
                    </div>
                    }
                    {(mode === 'doughnut' && totalFinalConsumptionBySourceDatasets.values.length > 0) &&
                    <div className="col">
                        <div className="white-wrapper">
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