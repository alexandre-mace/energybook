import React from 'react';
import './App.css';
import Papa from 'papaparse'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import totalEnergyConsumptionData from './Dataset/total_energy_consumption.csv';
import totalco2EmissionsData from './Dataset/total_co2_emissions.csv';
import totalElectricityConsumptionData from './Dataset/total_electricity_consumption.csv';
import renewablesShareData from './Dataset/renewables_share.csv';
import Line from "./UI/components/Line";

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
const autoComplete = (options, setIndex, index) => {
    return (
        <Autocomplete
            size="small"
            options={options}
            getOptionLabel={(option) => option}
            defaultValue={'World'}
            fullWidth={false}
            onChange={
                (event, value) => setIndex(value)
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth={false}
                    className={"widthTranslate"}
                    style={{width: (100 + index.length ** 1.7)}}
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
  React.useEffect(() => {
      getEnergyConsumption()
      getCo2Emissions()
      getElectricityConsumption()
      getRenewablesShare()
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
              <span className={"mb-3"}>Heavy math computing...</span>
              <div className="loader-07"></div>
          </div>
      </div>
      }
      {(dataComputed() && !loading) &&
        <>
          <div className="container my-5">
              <div className="row">
                  <div className="col">
                      <p>Hello :), i will talk to you about <strong>Energy</strong></p>
                      <p>We is consuming a lot of it, and it is growing fast..</p>
                  </div>
              </div>
          </div>
          <div className="container mt-5">
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
          <div className="container my-5 pb-5">
              <div className="row">
                  <div className="col">
                      <Line
                          name='Total energy consumption'
                          keys={totalEnergyConsumption.keys}
                          values={totalEnergyConsumption.values}
                          options={{
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          beginAtZero: true,
                                          suggestedMax: 2000
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
          <div className="container my-5">
              <div className="row">
                  <div className="col">
                      <p>Thanks to energy we can produce the amazing thing that is <strong>electricity</strong>.</p>
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
          <div className="container my-5 pb-5">
              <div className="row">
                  <div className="col">
                  <Line
                      name='Total electricity consumption'
                      keys={totalElectricityConsumption.keys}
                      values={totalElectricityConsumption.values}
                      options={{
                          scales: {
                              yAxes: [{
                                  ticks: {
                                      beginAtZero: true
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
          <div className="container my-5">
              <div className="row">
                  <div className="col">
                      <p>So yes, <strong>energy</strong> is cool</p>
                      <p>But there is a big issue currently highly coupled with energy consumption, co2 emissions.</p>
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
          <div className="container my-5 pb-5">
              <div className="row">
                  <div className="col">
                      <Line
                          name='Total co2 emissions'
                          keys={totalCo2Emmisions.keys}
                          values={totalCo2Emmisions.values}
                          options={{
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          beginAtZero: true,
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
          <div className="container my-5">
              <div className="row">
                  <div className="col">
                      <p>How can we partly <strong>solve</strong> it ?</p>
                      <p>By using renewable energy.</p>
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
          <div className="container my-5 pb-5">
              <div className="row">
                  <div className="col">
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
                      </Line>
                  </div>
              </div>
          </div>
      </>
      }
    </>
  );
}

export default App;
