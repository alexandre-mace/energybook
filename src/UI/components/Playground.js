import React from 'react';
import ComparatorSlider from "./ComparatorSlider";

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
                    Solar panel : <ComparatorSlider sliderValue={solLeft} setter={setSolLeft} max={10000000} step={1000}/>
                </div>
                <div className="col-6">
                    Solar panel : <ComparatorSlider sliderValue={solRight} setter={setSolRight} max={10000000} step={1000}/>
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
                    <p>It goes number of thing + Power in MW + Charge factor for each, divided for the sike of readability</p>
                </div>
            </div>
        </div>
    )
}
export default Playground;