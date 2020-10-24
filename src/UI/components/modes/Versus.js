import React from 'react';
import powerData from "../../../Domain/EnergySource/PowerData";
import EnergyComparator from "../EnergyComparator";

const Versus = () => {
    return (
        <>
            <div className="container pt-3 mb-3 mb-md-5">
                <div className="row">
                    <div className="col">
                        <h4>Welcome to the versus section &#129354;</h4>
                        <p>Here you can compare two energy systems together.</p>
                        <p className={"tiny-text"}>⚠️ This tool contains approximations (at large scale, by system, ..), use it for magnitude order.</p>
                    </div>
                </div>
            </div>
            <div className="playground container pt-3">
                <div className="row">
                    <div className="col-6">
                        <EnergyComparator/>
                    </div>
                    <div className="col-6">
                        <EnergyComparator/>
                    </div>
                </div>
                <div className="row my-4 my-md-5 pt-3 pt-md-5">
                    <div className="col">
                        <p>Here is the math about energy (eol * {powerData.eol.averagePower} * {powerData.eol.averageChargeFactor}) +
                            (sol * {powerData.sol.averagePower} * {powerData.sol.averageChargeFactor}) +
                            (nuc * {powerData.nuc.averagePower} * {powerData.nuc.averageChargeFactor}) +
                            (therCoal * {powerData.therCoal.averagePower} * {powerData.therCoal.averageChargeFactor}) +
                            (therOil * {powerData.therOil.averagePower} * {powerData.therOil.averageChargeFactor}) +
                            (therGas * {powerData.therGas.averagePower} * {powerData.therGas.averageChargeFactor}) +
                            (hydro * {powerData.hydro.averagePower} * {powerData.hydro.averageChargeFactor}).</p>
                        <p>It goes number of thing x Power in MW x (capacity factor || availability factor)  for each.</p>
                        <p>For renewables, we talk about capacity factor, but we say availability factor for non renewables even though it is pretty much the same concept.</p>
                        <p><strong>Charge factor</strong> : The net capacity factor is the unitless ratio of an actual electrical energy output over a given period of time to the maximum possible electrical energy output over that period.</p>
                        <p><strong>Availability factor</strong> : The availability factor of a power plant is the amount of time that it is able to produce electricity over a certain period, divided by the amount of the time in the period.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Versus;