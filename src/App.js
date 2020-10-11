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
import Line from "./UI/components/Line";
import MultipleLines from "./UI/components/MultipleLines";
import Doughnut from "./UI/components/Doughnut";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function getKeyByValue(array, value) {
    return array.findIndex(arrayValue => arrayValue === value);
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
async function getIeaCsv(file, setter, countrySetter, index) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    countrySetter(Array.from(new Set(rows.map(row => row.Country))).filter(country => country !== ''));
    setter(rows.filter(row => row.Country === index).filter(row => row.Product !== 'Total').map(row => ({
        keys: Object.keys(row)
            .filter(number => (!isNaN(parseFloat(number)) && isFinite(number)))
            .map(value => parseFloat(value))
        ,
        values: Object.values(row)
            .filter(number => (!isNaN(parseFloat(number)) && isFinite(number)))
            .map(value => parseFloat(value))
        ,
        name: row.Product
    })))
}

async function getOwidJson(file, setter, countrySetter, index, showRenewableCategory) {
    countrySetter(Object.values(file.entityKey).map(entity => entity.name))
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

        const renewables = ['Other renewables', 'Hydropower', 'Solar', 'Wind', 'Biofuels'];
        return {
            name: renewables.includes(variable.display.name ?? variable.name.split(' ')[0]) ? 'Renewable' : 'Non renewable',
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
    const getEnergySupplySource = () => {
        getOwidJson(energySupplySource, setEnergySupplySourceDatasets, setEnergySupplySourceCountries, energySupplySourceIndex, showRenewableCategories)
    }
  React.useEffect(() => {
      getEnergyConsumption()
      getCo2Emissions()
      getElectricityConsumption()
      getRenewablesShare()
      getEnergySupplySource()
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
    }, [energySupplySourceIndex, showRenewableCategories]) // []

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
                        <span className={"clickable"} onClick={() => window.location.reload(false)}><strong>Book</strong></span>
                    </div>
                    <div className={"col-auto"}>
                        <span className={"disabled"}>Playground (WIP)</span>
                    </div>
                </div>
            </div>
            <div className="py-2"></div>
          <div className="container my-3 my-md-5 pt-5">
              <div className="row">
                  <div className="col">
                      <h1 className={"mb-3 pb-5 app-title color-primary"}>Energy Book</h1>
                      <h4>This book will teach you the basis about energy.</h4>
                      <p>We are consuming a lot of it, and it is growing fast..</p>
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
                    </div></div></div>
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
                  <div className="col">

                  </div>
              </div>
              <div className="row">
                  <div className="col min-chart-height">
                      <div className="white-wrapper">

                      <FormGroup row>
                          <FormControlLabel
                              control={
                                  <Switch
                                      checked={showRenewableCategories}
                                      onChange={() => setShowRenewableCategories(!(showRenewableCategories))}
                                      name="showRenewableCategories"
                                      color="primary"
                                  />
                              }
                              label="Only renewable / non renewables"
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
      </>
      }
    </>
  );
}

export default App;
