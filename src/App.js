import React from 'react';
import './App.css';
import Papa from 'papaparse'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import totalEnergyConsumptionData from './Dataset/total_energy_consumption.csv';
import totalco2EmissionsData from './Dataset/total_co2_emissions.csv';
import totalElectricityConsumptionData from './Dataset/total_electricity_consumption.csv';
import renewablesShareData from './Dataset/renewables_share.csv';
import energySupplySource from './Dataset/energy_supply_source.json';
import renewableEnergyInvestment from './Dataset/renewable_energy_investment.json';
import renewableEnergyInvestmentPercentage from './Dataset/renewable_energy_investment_percentage.json';
import renewableEnergyInvestmentByTechnology from './Dataset/investment-in-renewable-energy-by-technology.csv';
import energyUsePerCapitaVsPoverty from './Dataset/energy-use-per-capita-vs-share-of-population-in-extreme-poverty.csv';
import totalFinalConsumptionBySectorData from './Dataset/total_final_consumption_by_sector.csv';
import Line from "./UI/components/Line";
import MultipleLines from "./UI/components/MultipleLines";
import Doughnut from "./UI/components/Doughnut";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MultipleBars from "./UI/components/MultipleBars";
import Bubble from "./UI/components/Bubble";
import Playground from "./UI/components/Playground";

function getKeyByValue(array, value) {
    return array.findIndex(arrayValue => arrayValue === value);
}

async function getIaeDataCsv(file, setter, index) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    const values = Object.keys(rows[0]).filter(row => row !== 'year')
    setter({
        keys: rows.map(row => row.year)
        ,
        values: values.filter(value => value !== 'Units').map(value => ({
            name: value,
            values: rows.map(row => row[value])
        }))
    })
}

async function getEnerdataCsv(file, setter, countrySetter, index) {
  const response = await fetch(file)
  const reader = response.body.getReader()
  const result = await reader.read() // raw array
  const decoder = new TextDecoder('utf-8')
  const csv = decoder.decode(result.value) // the csv text
  const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
  const rows = results.data // array of objects

  countrySetter(rows.map(row => row.zone));
  setter({
    keys: Object
        .keys(rows.filter(data => data.zone === index)[0])
        .filter(data => data !== 'zone')
    ,
    values: Object
        .values(rows.filter(data => data.zone === index)[0])
        .filter(value => value !== 'World')
        .map(value => parseFloat(value))
  })
}

async function getOwidCsv(file, setter, countrySetter, index) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    let rowsData = [].concat.apply([], rows.map(row => Object.keys(row).map((dataset, index) => ({
        name: Object.keys(row)[index],
        value: parseFloat(Object.values(row)[index]),
        year: row['Year']
    })).filter(dataset => dataset.name !== 'Year')));

    const labels = Object.keys(rows[0]).map((key, index) => key).filter(label => label !== 'Year')
    setter({
        keys: rows.map(row => row.Year),
        datasets: labels.map(label => ({
            name: label,
            values: rowsData.filter(row => row.name === label).map(row => row.value)
        }))
    })
}

async function getOwidBubbleCsv(file, setter, countrySetter, index, year) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects


    const data = rows.filter(row => parseInt(row.Year) === year).filter(row => (row['Energy use (kg of oil equivalent per capita)'] !== '' && row['Poverty - $1.90 a day (% of population)'] !== ''))
    setter(data.map(data => ({
        label: data.Entity,
        data: {x: parseFloat(data['Energy use (kg of oil equivalent per capita)']), y: parseFloat(data['Poverty - $1.90 a day (% of population)'])}
    })))
}

async function getOwidJson(
    file,
    setter,
    countrySetter,
    index,
    showRenewableCategory = false,
    showOnlyRenewableCategories = false ,
    showOnlyNonRenewableCategories = false
) {
    countrySetter(Object.values(file.entityKey).map(entity => entity.name))
    const renewableCategories = ['Other renewables', 'Hydropower', 'Solar', 'Wind', 'Biofuels'];
    const data = Object.values(file.variables).map((variable) => {
        let datasets = [];
        for (let i = 0; i < variable.entities.length; i++) {
            let countryEntityKey = variable.entities[i]
            datasets.push({
                year: variable.years[i],
                value: variable.values[i],
                zone: file.entityKey[countryEntityKey].name
            })
        }

        datasets = datasets.filter(dataset => (dataset.zone === index && dataset.year > 1970))

        if (!showRenewableCategory) {
            return {
                name: variable.display.name ?? variable.name.split(' ')[0],
                keys: datasets.map(dataset => dataset.year),
                values: datasets.map(dataset => dataset.value)
                    .map(value => value * (
                        variable.display.conversionFactor
                            ? variable.display.conversionFactor
                            : variable.display.name ? 1 : 277.78)
                    )
            }
        }

        return {
            name: renewableCategories.includes(variable.display.name ?? variable.name.split(' ')[0]) ? 'Renewable' : 'Non renewable',
            keys: datasets.map(dataset => dataset.year),
            values: datasets.map(dataset => dataset.value)
                .map(value => value * (
                    variable.display.conversionFactor
                        ? variable.display.conversionFactor
                        : variable.display.name ? 1 : 277.78)
                )
        }
    })

    if (!showRenewableCategory) {
        if (showOnlyRenewableCategories) {
            setter(data.filter(data => renewableCategories.includes(data.name)))
            return;
        }
        if (showOnlyNonRenewableCategories) {
            setter(data.filter(data => !renewableCategories.includes(data.name)))
            return;
        }
        setter(data)
        return;
    }

    const renewables = data.filter(dataset => dataset.name === 'Renewable');
    const nonRenewables = data.filter(dataset => dataset.name === 'Non renewable');
    let keys = data[0].keys;

    let renewableValues = [];
    data[0].keys.forEach((value, key) => {
        renewables.forEach(dataset => {
            if (!renewableValues[key]) {
                renewableValues.push(dataset.values[key])
            } else {
                renewableValues[key] = renewableValues[key] + dataset.values[key]
            }
        })
    });

    let nonRenewableValues = [];
    data[0].keys.forEach((value, key) => {
        nonRenewables.forEach(dataset => {
            if (!nonRenewableValues[key]) {
                nonRenewableValues.push(dataset.values[key])
            } else {
                nonRenewableValues[key] = nonRenewableValues[key] + dataset.values[key]
            }
        })
    });

    setter([
        {
            name: 'Renewable',
            keys: keys,
            values: renewableValues
        },
        {
            name: 'Non renewable',
            keys: keys,
            values: nonRenewableValues
        }
    ])
}

async function getOwidJson2(
    file,
    setter,
    countrySetter,
    index
) {
    countrySetter(Object.values(file.entityKey).map(entity => entity.name))
    let data = Object.values(file.variables).map((variable) => {
        let datasets = [];
        for (let i = 0; i < variable.entities.length; i++) {
            let countryEntityKey = variable.entities[i]
            datasets.push({
                year: variable.years[i],
                value: variable.values[i],
                zone: file.entityKey[countryEntityKey].name
            })
        }

        return {
            name: datasets.map(dataset => dataset.zone),
            keys: datasets.map(dataset => dataset.year),
            values: datasets.map(dataset => dataset.value)
        }
    })

    data = data[0].name.map((key, index) => ({
        name: data[0].name[index],
        keys: data[0].keys[index],
        value: data[0].values[index]
    }))
    data = Object.values(file.entityKey).map(entity => data.filter(dataset => dataset.name === entity.name))

    setter(data.map(dataset => {
        let name = dataset[0].name
        let keys = []
        let values = []

        dataset.forEach((value, index) => {
            keys.push(value.keys)
            values.push(value.value)
        })

        return {
            name: name,
            keys: keys,
            values: values
        }
    }))
}

const autoComplete = (options, setIndex, index) => {
    return (
        <Autocomplete
            size="small"
            options={options}
            getOptionLabel={(option) => option.toString()}
            defaultValue={index}
            fullWidth={false}
            onChange={
                (event, value) => setIndex(value === null ? options[options.length - 1] : value)
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth={false}
                    className={"widthTranslate"}
                    style={{width: (100 + (!isNaN(index.length) ? (index.length ** 1.7) : 10))}}
                    label={options[index]}
                    placeholder={options[index]}
                />
            )}
        />
    )
}

function App() {
    const [loading, setLoading] = React.useState(true)
    const [appMode, setAppMode] = React.useState('book')

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

    const delayedCloseLoader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1300);
    }

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
      <div className="box-loader">
          <div className={'d-flex flex-column'}>
              <span className={"mb-3"}><strong>Heavy math computing...</strong></span>
              <div className="loader-07"></div>
          </div>
      </div>
      }
      {(dataComputed() && !loading) &&
        <>
            <div className="container my-3 my-md-5 pb-5">
                <div className="row justify-content-center header">
                    <div className="col-auto">
                        <span className={"clickable"} onClick={() => {
                            window.location.reload(false)
                            // setAppMode('book')
                        }}>
                            {appMode === 'book' && <strong>Book</strong>}
                            {appMode !== 'book' && <strong className={"black"}>Book</strong>}
                        </span>
                    </div>
                    <div className={"col-auto"} onClick={() => setAppMode('playground')}>
                        <span className={"clickable"}>
                            {appMode === 'playground' && <strong>Playground (WIP)</strong>}
                            {appMode !== 'playground' && <strong className={"black"}>Playground (WIP)</strong>}
                        </span>
                    </div>
                </div>
            </div>
            <div className="py-2"></div>
            {appMode === 'playground' &&
                <Playground/>
            }
            {appMode === 'book' &&
                <>
          <div className="container my-3 my-md-5 pt-5">
              <div className="row">
                  <div className="col">
                      <h1 className={"mb-3 pb-5 app-title color-primary"}>Energy Book</h1>
                      <h4>This book will teach you the basis about energy.</h4>
                      <p>We are consuming a lot of it, and it is increasing every day.</p>
                  </div>
              </div>
          </div>
            <div className="pt-5"></div>
          <div className="container mt-5 pt-5">
              <div className="row">
                  <div className="col d-flex justify-content-center">
              <span className={"mr-3"}>
                Let's take a look of how much <strong>energy</strong> the
              </span>
                      {autoComplete(totalEnergyConsumptionCountries, setTotalEnergyConsumptionIndex, totalEnergyConsumptionIndex)}
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
                      <p>Thanks to energy we can produce the amazing thing that is <strong>electricity</strong> &#9889;.</p>
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
                      {autoComplete(totalElectricityConsumptionCountries, setTotalElectricityConsumptionIndex, totalElectricityConsumptionIndex)}
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
                      <p>But there is a big issue currently highly coupled with energy consumption, <strong>co2 emissions</strong>. 🏭</p>
                  </div>
              </div>
          </div>
          <div className="container mt-5">
              <div className="row">
                  <div className="col d-flex justify-content-center">
              <span className={"mr-3"}>
                Here is the co2 emissions of the
              </span>
                      {autoComplete(totalCo2EmmisionsCountries, setTotalCo2EmmisionsIndex, totalCo2EmmisionsIndex)}
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
                      {autoComplete(renewablesShareCountries, setRenewablesShareIndex, renewablesShareIndex)}
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
                        {autoComplete(energySupplySourceCountries, setEnergySupplySourceIndex, energySupplySourceIndex)}
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
                          <>
                              {autoComplete(energySupplySourceDatasets[0].keys, setEnergySupplySourceYear, energySupplySourceYear)}
                          </>
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
                                          ticks: {
                                          }
                                      }]
                                  },
                                  legend: {
                                  }
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
                                      ticks: {
                                      }
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
                                            ticks: {
                                            }
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
                                            ticks: {
                                            }
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
                                    legend: {
                                    },
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
                        <p>That being said, we can question ourselves, the one who invested the most in renewables compared to their GDP, are they also the one who consumes the most ?</p>
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
                                            ticks: {
                                            }
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
      }
    </>
  );
}

export default App;
