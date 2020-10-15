import React from 'react';
import ComparatorSlider from "./ComparatorSlider";
import windTurbineImg from './../../UI/wind-turbine.png';
import solarPanelImg from './../../UI/solar-panel.png';
import nuclearPowerPlantImg from './../../UI/nuclear-power-plant.png';

const Playground = () => {
    const [eolLeft, setEolLeft] = React.useState(0)
    const [eolRight, setEolRight] = React.useState(0)

    const [nucLeft, setNucLeft] = React.useState(0)
    const [nucRight, setNucRight] = React.useState(0)

    const [solLeft, setSolLeft] = React.useState(0)
    const [solRight, setSolRight] = React.useState(0)

    const calculatePower = (eol, sol, nuc) => {
        return ((eol * 5000000 * 0.2) + (sol * 300 * 0.16) + (nuc * 1100000000 * 0.75)) / 100000
    }
    return (
        <div className="container">
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
                        [...Array(Math.ceil(solRight/100000))].map((e, i) =>
                            <img style={{width: 20, height: 20}}  src={solarPanelImg} alt="solar panel"/>
                        )
                    }
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6 text-center">
                    Left power : {calculatePower(eolLeft, solLeft, nucLeft)}
                </div>
                <div className="col-6 text-center">
                    Right power : {calculatePower(eolRight, solRight, nucRight)}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6">
                    Wind turbine : <ComparatorSlider sliderValue={eolLeft} setter={setEolLeft} max={1000} step={50}/>
                </div>
                <div className="col-6">
                    Wind turbine : <ComparatorSlider sliderValue={eolRight} setter={setEolRight} max={1000} step={50}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Solar panel : <ComparatorSlider sliderValue={solLeft} setter={setSolLeft} max={30000000} step={1000000}/>
                </div>
                <div className="col-6">
                    Solar panel : <ComparatorSlider sliderValue={solRight} setter={setSolRight} max={30000000} step={1000000}/>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-6">
                    Nuclear power plant : <ComparatorSlider sliderValue={nucLeft} setter={setNucLeft} max={10} step={1}/>
                </div>
                <div className="col-6">
                    Nuclear power plant : <ComparatorSlider sliderValue={nucRight} setter={setNucRight} max={10} step={1}/>
                </div>
            </div>
            <div className="row my-5">
                <div className="col">
                    <p>Here is the math ((eol * 5000000 * 0.2) + (sol * 300 * 0.16) + (nuc * 1100000000 * 0.75)) / 100000.</p>
                    <p>It goes number of thing + Power in MW + Charge factor for each, divided for the sake of readability</p>
                </div>
            </div>
        </div>
    )
}
export default Playground;