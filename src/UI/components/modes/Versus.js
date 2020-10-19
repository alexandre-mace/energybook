import React from 'react';
import powerData from "../../../Domain/EnergySource/PowerData";
import EnergyComparator from "../EnergyComparator";

const Versus = () => {
    return (
        <>
            <div className="container pt-3 mb-5">
                <div className="row">
                    <div className="col">
                        <h4>Welcome to the versus section &#129354;</h4>
                        <p>Here you can compare two energy systems together.</p>
                        <p style={{ fontSize: '1rem' }}>⚠️ This tool contains approximations (at large scale, by system, ..), use it for magnitude order.</p>
                    </div>
                </div>
            </div>
            <div className="playground container">
                <div className="row">
                    <div className="col-6">
                        <EnergyComparator/>
                    </div>
                    <div className="col-6">
                        <EnergyComparator/>
                    </div>
                </div>
                <div className="row my-5 pt-5">
                    <div className="col">
                        <p>Here is the math about energy (eol * {powerData.eol.averagePower} * {powerData.eol.averageChargeFactor}) +
                            (sol * {powerData.sol.averagePower} * {powerData.sol.averageChargeFactor}) +
                            (nuc * {powerData.nuc.averagePower} * {powerData.nuc.averageChargeFactor}) +
                            (therCoal * {powerData.therCoal.averagePower} * {powerData.therCoal.averageChargeFactor}) +
                            (therOil * {powerData.therOil.averagePower} * {powerData.therOil.averageChargeFactor}) +
                            (therGas * {powerData.therGas.averagePower} * {powerData.therGas.averageChargeFactor}) +
                            (hydro * {powerData.hydro.averagePower} * {powerData.hydro.averageChargeFactor}).</p>
                        <p>It goes number of thing x Power in MW x (charge factor || availability rate)  for each.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Versus;