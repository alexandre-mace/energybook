import React from 'react';
import './../../App.css';

import totalEnergyConsumptionData from './../../Dataset/total_energy_consumption.csv';
import totalco2EmissionsData from './../../Dataset/total_co2_emissions.csv';
import totalElectricityConsumptionData from './../../Dataset/total_electricity_consumption.csv';
import renewablesShareData from './../../Dataset/renewables_share.csv';
import energySupplySource from './../../Dataset/energy_supply_source.json';
import renewableEnergyInvestment from './../../Dataset/renewable_energy_investment.json';
import renewableEnergyInvestmentPercentage from './../../Dataset/renewable_energy_investment_percentage.json';
import renewableEnergyInvestmentByTechnology from './../../Dataset/investment-in-renewable-energy-by-technology.csv';
import energyUsePerCapitaVsPoverty from './../../Dataset/energy-use-per-capita-vs-share-of-population-in-extreme-poverty.csv';
import totalFinalConsumptionBySectorData from './../../Dataset/total_final_consumption_by_sector.csv';
import Line from "./../../UI/components/Line";
import MultipleLines from "./../../UI/components/MultipleLines";
import Doughnut from "./../../UI/components/Doughnut";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MultipleBars from "./../../UI/components/MultipleBars";
import Bubble from "./../../UI/components/Bubble";
import AutoComplete from "./AutoComplete";
import getOwidJson2 from "../../Infrastructure/Adapter/Owid/getOwidJson2";
import getOwidCsv from "../../Infrastructure/Adapter/Owid/getOwidCsv";
import getOwidJson from "../../Infrastructure/Adapter/Owid/getOwidJson";
import getOwidBubbleCsv from "../../Infrastructure/Adapter/Owid/getOwidBubbleCsv";
import getKeyByValue from "../../Infrastructure/Transformer/getKeyByValue";
import getEnerdataCsv from "../../Infrastructure/Adapter/Enerdata/getEnerdataCsv";
import getIaeDataCsv from "../../Infrastructure/Adapter/Iae/getIaeDataCsv";
import Loader from "./Loader";

function Narrative() {
    const [loading, setLoading] = React.useState(true)

    const [totalCo2EmmisionsIndex, setTotalCo2EmmisionsIndex] = React.useState('World')
    const [totalCo2Emmisions, setTotalCo2Emmisions] = React.useState({keys: [], values: []})
    const [totalCo2EmmisionsCountries, setTotalCo2EmmisionsCountries] = React.useState([])

    const [totalEnergyConsumptionIndex, setTotalEnergyConsumptionIndex] = React.useState('World')
    const [totalEnergyConsumption, setTotalEnergyConsumption] = React.useState({keys: [], values: []})
    const [totalEnergyConsumptionCountries, setTotalEnergyConsumptionCountries] = React.useState([])

    const [totalElectricityConsumptionIndex, setTotalElectricityConsumptionIndex] = React.useState('World')
    const [totalElectricityConsumption, setTotalElectricityConsumption] = React.useState({keys: [], values: []})
    const [totalElectricityConsumptionCountries, setTotalElectricityConsumptionCountries] = React.useState([])

    const [renewablesShareIndex, setRenewablesShareIndex] = React.useState('World')
    const [renewablesShare, setRenewablesShare] = React.useState({keys: [], values: []})
    const [renewablesShareCountries, setRenewablesShareCountries] = React.useState([])

    const [energySupplySourceIndex, setEnergySupplySourceIndex] = React.useState('World')
    const [energySupplySourceDatasets, setEnergySupplySourceDatasets] = React.useState([])
    const [energySupplySourceCountries, setEnergySupplySourceCountries] = React.useState([])
    const [energySupplySourceYear, setEnergySupplySourceYear] = React.useState(2018)
    const [showRenewableCategories, setShowRenewableCategories] = React.useState(false)
    const [energySupplySourceDoughnutMode, setEnergySupplySourceDoughnutMode] = React.useState(false)
    const [energySupplySourceOnlyRenewables, setEnergySupplySourceOnlyRenewables] = React.useState(false)
    const [energySupplySourceOnlyNonRenewables, setEnergySupplySourceOnlyNonRenewables] = React.useState(false)

    const [renewableEnergyInvestmentIndex, setRenewableEnergyInvestmentIndex] = React.useState('World')
    const [renewableEnergyInvestmentDatasets, setRenewableEnergyInvestmentDatasets] = React.useState([])
    const [renewableEnergyInvestmentCountries, setRenewableEnergyInvestmentCountries] = React.useState([])

    const [renewableEnergyInvestmentPercentageIndex, setRenewableEnergyInvestmentPercentageIndex] = React.useState('World')
    const [renewableEnergyInvestmentPercentageDatasets, setRenewableEnergyInvestmentPercentageDatasets] = React.useState([])
    const [renewableEnergyInvestmentPercentageCountries, setRenewableEnergyInvestmentPercentageCountries] = React.useState([])

    const [renewableEnergyInvestmentByTechnologyIndex, setRenewableEnergyInvestmentByTechnologyIndex] = React.useState('World')
    const [renewableEnergyInvestmentByTechnologyIndexDatasets, setRenewableEnergyInvestmentByTechnologyDatasets] = React.useState([])
    const [renewableEnergyInvestmentByTechnologyIndexCountries, setRenewableEnergyInvestmentByTechnologyCountries] = React.useState([])

    const [energyUsePerCapitaVsPovertyIndex, setEnergyUsePerCapitaVsPovertyIndex] = React.useState('World')
    const [energyUsePerCapitaVsPovertyDatasets, setEnergyUsePerCapitaVsPovertyDatasets] = React.useState([])
    const [energyUsePerCapitaVsPovertyCountries, setEnergyUsePerCapitaVsPovertyCountries] = React.useState([])
    const [energyUsePerCapitaVsPovertyYear, setEnergyUsePerCapitaVsPovertyYear] = React.useState(2014)

    const [totalFinalConsumptionBySectorYear, setTotalFinalConsumptionBySectorYear] = React.useState(2018)
    const [totalFinalConsumptionBySectorDatasets, setTotalFinalConsumptionBySectorDatasets] = React.useState([])

    const getEnergyConsumption = () => {
        getEnerdataCsv(totalEnergyConsumptionData, setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndex)
    }
    const getCo2Emissions = () => {
        getEnerdataCsv(totalco2EmissionsData, setTotalCo2Emmisions, setTotalCo2EmmisionsCountries, totalCo2EmmisionsIndex)
    }
    const getElectricityConsumption = () => {
        getEnerdataCsv(totalElectricityConsumptionData, setTotalElectricityConsumption, setTotalElectricityConsumptionCountries, totalElectricityConsumptionIndex)
    }
    const getRenewablesShare = () => {
        getEnerdataCsv(renewablesShareData, setRenewablesShare, setRenewablesShareCountries, renewablesShareIndex)
    }

    const getTotalFinalConsumptionBySector = () => {
        getIaeDataCsv(totalFinalConsumptionBySectorData, setTotalFinalConsumptionBySectorDatasets)
    }

    const getEnergySupplySource = () => {
        getOwidJson(
            energySupplySource,
            setEnergySupplySourceDatasets,
            setEnergySupplySourceCountries,
            energySupplySourceIndex,
            showRenewableCategories,
            energySupplySourceOnlyRenewables,
            energySupplySourceOnlyNonRenewables
        )
    }

    const getRenewableEnergyInvestment = () => {
        getOwidJson2(
            renewableEnergyInvestment,
            setRenewableEnergyInvestmentDatasets,
            setRenewableEnergyInvestmentCountries,
            renewableEnergyInvestmentIndex
        )
    }

    const getRenewableEnergyInvestmentByTechnology = () => {
        getOwidCsv(
            renewableEnergyInvestmentByTechnology,
            setRenewableEnergyInvestmentByTechnologyDatasets,
            setRenewableEnergyInvestmentByTechnologyCountries,
            renewableEnergyInvestmentByTechnologyIndex
        )
    }

    const getEnergyUsePerCapitaVsPoverty = () => {
        getOwidBubbleCsv(
            energyUsePerCapitaVsPoverty,
            setEnergyUsePerCapitaVsPovertyDatasets,
            setEnergySupplySourceCountries,
            energyUsePerCapitaVsPovertyIndex,
            energyUsePerCapitaVsPovertyYear
        )
    }

    const getRenewableEnergyInvestmentPercentage = () => {
        getOwidJson2(
            renewableEnergyInvestmentPercentage,
            setRenewableEnergyInvestmentPercentageDatasets,
            setRenewableEnergyInvestmentPercentageCountries,
            renewableEnergyInvestmentPercentageIndex
        )
    }

    const delayedCloseLoader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1300);
    }

    React.useEffect(() => {
        getEnergyConsumption()
        getCo2Emissions()
        getElectricityConsumption()
        getRenewablesShare()
        getEnergySupplySource()
        getRenewableEnergyInvestment()
        getRenewableEnergyInvestmentPercentage()
        getRenewableEnergyInvestmentByTechnology()
        getEnergyUsePerCapitaVsPoverty()
        getTotalFinalConsumptionBySector()
        delayedCloseLoader();
    }, [])

    React.useEffect(() => {
        getEnergyConsumption()
    }, [totalEnergyConsumptionIndex]) // []

    React.useEffect(() => {
        getCo2Emissions()
    }, [totalCo2EmmisionsIndex]) // []

    React.useEffect(() => {
        getElectricityConsumption()
    }, [totalElectricityConsumptionIndex]) // []

    React.useEffect(() => {
        getRenewablesShare()
    }, [renewablesShareIndex]) // []

    React.useEffect(() => {
        getEnergySupplySource()
    }, [energySupplySourceIndex, showRenewableCategories, energySupplySourceOnlyRenewables, energySupplySourceOnlyNonRenewables]) // []

    const dataComputed = () => {
        let computed = true;
        const mandatoryData = [totalElectricityConsumption, totalEnergyConsumption, totalCo2Emmisions, renewablesShare]
        mandatoryData.forEach(data => {
            if (data.values.length === 0) {
                computed = false;
            }
        })
        return computed;
    }

    return (
        <>
            {(!dataComputed() || loading) &&
                <Loader/>
            }
            {(dataComputed() && !loading) &&
            <>
                <div className="container pt-3 mb-5">
                    <div className="row">
                        <div className="col">
                            <h4>Welcome to the narrative section 📖</h4>
                            <p>Here you will be learning energy stuff from the start.</p>
                        </div>
                    </div>
                </div>
                <div className="container pt-3 pt-md-5">
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                          <span className={"mr-3"}>
                            Let's take a look of how much <strong>energy</strong> the
                          </span>
                        <AutoComplete
                            options={totalEnergyConsumptionCountries}
                            setIndex={setTotalEnergyConsumptionIndex}
                            index={totalEnergyConsumptionIndex}/>
                        <span className={"mx-3"}>
                            is consuming
                        </span>
                        </div>
                    </div>
                </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <Line
                                name='Total energy consumption'
                                keys={totalEnergyConsumption.keys}
                                values={totalEnergyConsumption.values}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 4000
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                            >
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>Thanks to energy we can produce the amazing thing that
                            is <strong>electricity</strong> &#9889;.</p>
                        <p>The power of the vast majority of tools used in our world.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the total electricity consumption of the
      </span>
                        <AutoComplete
                            options={totalElectricityConsumptionCountries}
                            setIndex={setTotalElectricityConsumptionIndex}
                            index={totalElectricityConsumptionIndex}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">

                            <Line
                                name='Total electricity consumption'
                                keys={totalElectricityConsumption.keys}
                                values={totalElectricityConsumption.values}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 4000
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color='255, 255, 3'>
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>So yes, <strong>energy</strong> is cool</p>
                        <p>But there is a big issue currently highly coupled with energy consumption, <strong>co2
                            emissions</strong>. 🏭</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the co2 emissions of the
      </span>
                        <AutoComplete
                            options={totalCo2EmmisionsCountries}
                            setIndex={setTotalCo2EmmisionsIndex}
                            index={totalCo2EmmisionsIndex}/>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">

                            <Line
                                name='Total co2 emissions'
                                keys={totalCo2Emmisions.keys}
                                values={totalCo2Emmisions.values}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 10000
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color={'255,0,0'}
                            >
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>PS : Note the weird trick, since we started looking after co2 emissions in the 90's, we took
                            co2 emissions to another planet. </p>
                        <p>How can we <i>partly</i> solve it ?</p>
                        <p>By using <strong>renewable energy</strong>.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the renewables share of the
      </span>
                        <AutoComplete
                            options={renewablesShareCountries}
                            setIndex={setRenewablesShareIndex}
                            index={renewablesShareIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">

                            <Line
                                name='Renewables share'
                                keys={renewablesShare.keys}
                                values={renewablesShare.values}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 100
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color={'0,255,0'}
                            >
                            </Line></div>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>That is definetely not a lot, lets see what is in there...</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the energy consumption by source of the
      </span>
                        <AutoComplete
                            options={energySupplySourceCountries}
                            setIndex={setEnergySupplySourceIndex}
                            index={energySupplySourceIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col min-chart-height">
                        <div className="white-wrapper">

                            <FormGroup row>
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
                                    label="Only renewable / non renewables"
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
                                    label="Only renewables"
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
                                    label="Only non renewables"
                                />
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
                                {energySupplySourceDoughnutMode &&
                                <AutoComplete
                                    options={energySupplySourceDatasets[0].keys}
                                    setIndex={setEnergySupplySourceYear}
                                    index={energySupplySourceYear}
                                />
                                }
                            </FormGroup>
                            {energySupplySourceDoughnutMode &&
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
                            {!energySupplySourceDoughnutMode &&
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
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>What are we currently doing ?</p>
                        <p>Let's see the actual <strong>investment</strong>.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the renewable energy investment of the continents
      </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Renewables share'
                                datasets={renewableEnergyInvestmentDatasets}
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
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>Of course, every continents do not have the same GDP per capita</p>
                        <p>So with a more accurate representation of <strong>proportions</strong>...</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the renewable energy investment of the continents by percentage of GDP
      </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
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
                                            ticks: {}
                                        }]
                                    },
                                    legend: {
                                        position: 'right',
                                        reverse: true
                                    }
                                }}
                            >
                            </Doughnut>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>Also, the world has changed his mind on which technology to invest deeper overtime.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the renewable energy investment of the world by <strong>technology</strong>
      </span>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleBars
                                datasets={renewableEnergyInvestmentByTechnologyIndexDatasets}
                                options={{
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    legend: {},
                                    scales: {
                                        xAxes: [{
                                            stacked: true
                                        }],
                                        yAxes: [{
                                            stacked: true
                                        }]
                                    }
                                }}
                            >
                            </MultipleBars>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>That being said, we can question ourselves, the one who invested the most in renewables
                            compared to their GDP, are they also the one who consumes the most ?</p>
                    </div>
                </div>
            </div>
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
            <div className="container my-3 my-md-5">
                <div className="row">
                    <div className="col">
                        <p>Digging deeper, which <strong>sector</strong> consumes the most ?</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-center">
      <span className={"mr-3"}>
        Here is the total final energy consumption of the World by sector
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
    }
    </>
    );
}

export default Narrative;
