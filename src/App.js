import React from 'react';
import './App.css';
import {Line} from "react-chartjs-2";
import Papa from 'papaparse'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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

function App() {
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

  React.useEffect(() => {
    getEnerdataCsv('/Dataset/total_energy_consumption.csv', setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndex)
    getEnerdataCsv('/Dataset/total_co2_emissions.csv', setTotalCo2Emmisions, setTotalCo2EmmisionsCountries, totalCo2EmmisionsIndex)
    getEnerdataCsv('/Dataset/total_electricity_consumption.csv', setTotalElectricityConsumption, setTotalElectricityConsumptionCountries, totalElectricityConsumptionIndex)
    getEnerdataCsv('/Dataset/renewables_share.csv', setRenewablesShare, setRenewablesShareCountries, renewablesShareIndex)
  }, [])

  React.useEffect(() => {
    getEnerdataCsv('/Dataset/total_energy_consumption.csv', setTotalEnergyConsumption, setTotalEnergyConsumptionCountries, totalEnergyConsumptionIndex)
  }, [totalEnergyConsumptionIndex]) // []

  React.useEffect(() => {
    getEnerdataCsv('/Dataset/total_co2_emissions.csv', setTotalCo2Emmisions, setTotalCo2EmmisionsCountries, totalCo2EmmisionsIndex)
  }, [totalCo2EmmisionsIndex]) // []

    React.useEffect(() => {
        getEnerdataCsv('/Dataset/total_electricity_consumption.csv', setTotalElectricityConsumption, setTotalElectricityConsumptionCountries, totalElectricityConsumptionIndex)
    }, [totalElectricityConsumptionIndex]) // []

    React.useEffect(() => {
        getEnerdataCsv('/Dataset/renewables_share.csv', setRenewablesShare, setRenewablesShareCountries, renewablesShareIndex)
    }, [renewablesShareIndex]) // []

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

  const defaultColor = '75,192,192';

  const line = (name, keys, values, options = {}, color = defaultColor) => (
    <Line
        options={options}
        data={{
          labels: keys,
          datasets: [
            {
              label: name,
              // fill: false,
              lineTension: 0.1,
              displayColors: false,
              backgroundColor: `rgba(${color},0.6)`,
              borderColor: `rgba(${color},1)`,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: `rgba(${color},1)`,
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: `rgba(${color},1)`,
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: values
            }
          ]
        }} />
  )
  return (
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
                    {line(
                        'Total energy consumption',
                        totalEnergyConsumption.keys,
                        totalEnergyConsumption.values,
                        {
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
                        }
                    )}
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
            {line(
                'Total electricity consumption',
                totalElectricityConsumption.keys,
                totalElectricityConsumption.values,
                {
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
                },
                '255, 255, 3'
            )}
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
            {line(
                'Total co2 emissions',
                totalCo2Emmisions.keys,
                totalCo2Emmisions.values,
                {
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
                },
                '255,0,0'
            )}
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
                    {line(
                        'Renewables share',
                        renewablesShare.keys,
                        renewablesShare.values,
                        {
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
                        },
                        '0,255,0'
                    )}
                </div>
            </div>
        </div>
    </>
  );
}

export default App;
