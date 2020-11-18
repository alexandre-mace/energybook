import React from "react";
import getRenewablesShare from "../../../Infrastructure/Adapter/getRenewablesShare";
import MultitpleAutoComplete from "../utils/MultipleAutoComplete";
import MultipleLines from "../charts-types/MultipleLines";
import useWindowDimensions from "../utils/useWindowDimension";

const RenewableShare = () => {
    const { width } = useWindowDimensions();

    const [renewablesShareIndexes, setRenewablesShareIndexes] = React.useState('World')
    const [renewablesShare, setRenewablesShare] = React.useState({keys: [], values: []})
    const [renewablesShareCountries, setRenewablesShareCountries] = React.useState([])

    React.useEffect(() => {
        getRenewablesShare(setRenewablesShare, setRenewablesShareCountries, renewablesShareIndexes)
    }, [])

    React.useEffect(() => {
        getRenewablesShare(setRenewablesShare, setRenewablesShareCountries, renewablesShareIndexes)
    }, [renewablesShareIndexes])

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col d-flex justify-content-center flex-wrap">
                            <span className={"mr-3"}>
                                Here is the renewables share of the
                            </span>
                        <MultitpleAutoComplete
                            options={renewablesShareCountries}
                            setIndexes={setRenewablesShareIndexes}
                            indexes={renewablesShareIndexes}
                        />
                    </div>
                </div>
            </div>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col">
                        <div className="white-wrapper">
                            <MultipleLines
                                name='Renewables share'
                                datasets={renewablesShare}
                                fill={false}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        labels: false,
                                        datalabels: false
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                suggestedMax: 100
                                            },
                                            scaleLabel: {
                                                display: true,
                                                labelString: '% of share in energy supply',
                                                fontColor: 'black',
                                                fontSize: width > 760 ? '14' : '10'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Years',
                                                fontColor: 'black',
                                                fontSize: width > 760 ? '14' : '10'
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: false
                                    }
                                }}
                                color={'0,255,0'}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Renewables share</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RenewableShare