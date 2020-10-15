import React from 'react';
import ComparatorSlider from "./ComparatorSlider";
import windTurbineImg from './../../UI/wind-turbine.png';
import solarPanelImg from './../../UI/solar-panel.png';
import nuclearPowerPlantImg from './../../UI/nuclear-power-plant.png';
import therCoalImg from './../../UI/coal.png';
import therGasImg from './../../UI/gas.png';
import therOilImg from './../../UI/oil.png';
import hydroImg from './../../UI/hydro.png';

import ColorControlledDoughnut from "./ColorControlledDoughnut";

const Playground = () => {
    const [eolLeft, setEolLeft] = React.useState(0)
    const [eolRight, setEolRight] = React.useState(0)

    const [nucLeft, setNucLeft] = React.useState(0)
    const [nucRight, setNucRight] = React.useState(0)

    const [solLeft, setSolLeft] = React.useState(0)
    const [solRight, setSolRight] = React.useState(0)

    const [therCoalLeft, setTherCoalLeft] = React.useState(0)
    const [therCoalRight, setTherCoalRight] = React.useState(0)

    const [therOilLeft, setTherOilLeft] = React.useState(0)
    const [therOilRight, setTherOilRight] = React.useState(0)

    const [therGasLeft, setTherGasLeft] = React.useState(0)
    const [therGasRight, setTherGasRight] = React.useState(0)

    const [hydroLeft, setHydroLeft] = React.useState(0)
    const [hydroRight, setHydroRight] = React.useState(0)

    const calculatePower = (eol, sol, nuc, therCoal, therOil, therGas, hydro) => {
        return (
            (eol * 5000000 * 0.2) +
            (sol * 300 * 0.16) +
            (nuc * 1100000000 * 0.75) +
            (therCoal * 600000000 * 0.22) +
            (therOil * 600000000 * 0.1) +
            (therGas * 500000000 * 0.55) +
            (hydro * 250000000 * 0.28)
        ) / 100000
    }
    return (
        <>
        <div className="playground container">
            <div className="row">
                <div className="col-6">
                    {
                        [...Array(Math.ceil(nucLeft))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={nuclearPowerPlantImg} alt="nuclear power plant"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(eolLeft/10))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={windTurbineImg} alt="wind turbine"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(solLeft/100000))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={solarPanelImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(therCoalLeft))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={therCoalImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(therOilLeft))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={therOilImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(therGasLeft))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={therGasImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(hydroLeft))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={hydroImg} alt="solar panel"/>
                        )
                    }
                </div>
                <div className="col-6">
                    {
                        [...Array(Math.ceil(nucRight))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={nuclearPowerPlantImg} alt="nuclear power plant"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(eolRight/10))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={windTurbineImg} alt="wind turbine"/>
                        )
                    }
                    {
                        [...Array(0)].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={solarPanelImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(therCoalRight))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={therCoalImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(therOilRight))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={therOilImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(therGasRight))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={therGasImg} alt="solar panel"/>
                        )
                    }
                    {
                        [...Array(Math.ceil(hydroRight))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={hydroImg} alt="solar panel"/>
                        )
                    }
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-6 text-center">
                    <div className={"mb-3"}>Left power : {calculatePower(eolLeft, solLeft, nucLeft, therCoalLeft, therOilLeft, therGasLeft, hydroLeft)}</div>
                    <ColorControlledDoughnut datasets={[
                        {
                            name: 'Wind turbine',
                            value: (eolLeft * 5000000 * 0.2) / 100000,
                            color: 'lightgray'
                        },
                        {
                            name: 'Solar panel',
                            value: (solLeft * 300 * 0.16) / 100000,
                            color: 'blue'
                        },
                        {
                            name: 'Nuclear power plant',
                            value: (nucLeft * 1100000000 * 0.75) / 100000,
                            color: 'lightgreen'
                        },
                        {
                            name: 'Coal thermal power station',
                            value: (therCoalLeft * 600000000 * 0.22) / 100000,
                            color: 'black'
                        },
                        {
                            name: 'Oil thermal power station',
                            value: (therOilLeft * 600000000 * 0.1) / 100000,
                            color: 'purple'
                        },
                        {
                            name: 'Gas thermal power station',
                            value: (therGasLeft * 500000000 * 0.55) / 100000,
                            color: 'darkgray'
                        },
                        {
                            name: 'Hydroelectric power station',
                            value: (hydroLeft * 250000000 * 0.28) / 100000,
                            color: 'lightblue'
                        },
                    ]}/>
                </div>
                <div className="col-6 text-center">
                    <div className={"mb-3"}>Right power : {calculatePower(eolRight, solRight, nucRight, therCoalRight, therOilRight, therGasRight, hydroRight)}</div>
                    <ColorControlledDoughnut datasets={[
                        {
                            name: 'Wind turbine',
                            value: (eolRight * 5000000 * 0.2) / 100000,
                            color: 'lightgray'
                        },
                        {
                            name: 'Solar panel',
                            value: (solRight * 300 * 0.16) / 100000,
                            color: 'blue'
                        },
                        {
                            name: 'Nuclear power plant',
                            value: (nucRight * 1100000000 * 0.75) / 100000,
                            color: 'lightgreen'
                        },
                        {
                            name: 'Coal thermal power station',
                            value: (therCoalRight * 600000000 * 0.22) / 100000,
                            color: 'black'
                        },
                        {
                            name: 'Oil thermal power station',
                            value: (therOilRight * 600000000 * 0.1) / 100000,
                            color: 'purple'
                        },
                        {
                            name: 'Gas thermal power station',
                            value: (therGasRight * 500000000 * 0.55) / 100000,
                            color: 'darkgray'
                        },
                        {
                            name: 'Hydroelectric power station',
                            value: (hydroRight * 250000000 * 0.28) / 100000,
                            color: 'lightblue'
                        },
                    ]}/>
                </div>
            </div>
        </div>
        <div className="container sliders">
            <div className="row mt-5">
                <div className="col-6">
                    Wind turbine (nb) : <ComparatorSlider sliderValue={eolLeft} setter={setEolLeft} max={1000} step={50}/>
                </div>
                <div className="col-6">
                    Wind turbine (nb) : <ComparatorSlider sliderValue={eolRight} setter={setEolRight} max={1000} step={50}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Solar panel (nb) : <ComparatorSlider sliderValue={solLeft} setter={setSolLeft} max={30000000} step={1000000}/>
                </div>
                <div className="col-6">
                    Solar panel (nb) : <ComparatorSlider sliderValue={solRight} setter={setSolRight} max={30000000} step={1000000}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Nuclear power plant (nb) : <ComparatorSlider sliderValue={nucLeft} setter={setNucLeft} max={10} step={1}/>
                </div>
                <div className="col-6">
                    Nuclear power plant (nb) : <ComparatorSlider sliderValue={nucRight} setter={setNucRight} max={10} step={1}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Coal thermal power station (nb) : <ComparatorSlider sliderValue={therCoalLeft} setter={setTherCoalLeft} max={10} step={1}/>
                </div>
                <div className="col-6">
                    Coal thermal power station (nb) : <ComparatorSlider sliderValue={therCoalRight} setter={setTherCoalRight} max={10} step={1}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Oil thermal power station (nb) : <ComparatorSlider sliderValue={therOilLeft} setter={setTherOilLeft} max={10} step={1}/>
                </div>
                <div className="col-6">
                    Oil thermal power station (nb) : <ComparatorSlider sliderValue={therOilRight} setter={setTherOilRight} max={10} step={1}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Gas thermal power station (nb) : <ComparatorSlider sliderValue={therGasLeft} setter={setTherGasLeft} max={10} step={1}/>
                </div>
                <div className="col-6">
                    Gas thermal power station (nb) : <ComparatorSlider sliderValue={therGasRight} setter={setTherGasRight} max={10} step={1}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Hydroelectric power station (nb) : <ComparatorSlider sliderValue={hydroLeft} setter={setHydroLeft} max={10} step={1}/>
                </div>
                <div className="col-6">
                    Hydroelectric power station (nb) : <ComparatorSlider sliderValue={hydroRight} setter={setHydroRight} max={10} step={1}/>
                </div>
            </div>
            <div className="py-1"></div>
            <div className="row my-5 pt-5">
                <div className="col">
                    <p>Here is the math (eol * 5000000 * 0.2) +
                        (sol * 300 * 0.16) +
                        (nuc * 1100000000 * 0.75) +
                        (therCoal * 600000000 * 0.22) +
                        (therOil * 600000000 * 0.1) +
                        (therGas * 500000000 * 0.55) +
                        (hydro * 250000000 * 0.28) / 100000.</p>
                    <p>It goes number of thing + Power in MW + Charge factor for each, divided for the sake of readability</p>
                </div>
            </div>
        </div>
            </>
    )
}
export default Playground;