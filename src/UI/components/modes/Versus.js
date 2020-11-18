import React, {useRef} from 'react';
import energySystems from "../../../Domain/data/energySystems";
import EnergyComparator from "../EnergyComparator";
import insertGetParameter from "../utils/insertGetParameter";
import copyToClipboard from "../utils/copyToClipboard";
import stringToHex from "../utils/stringToHex";

const Versus = ({ parameters }) => {
    const comparator1 = useRef();
    const comparator2 = useRef();

    const [shared, setShared] = React.useState(false)

    const share = () => {
        let urlGetParameters = '';
        for (const [key, value] of Object.entries(comparator1.current.getComparatorParams())) {
           urlGetParameters += insertGetParameter(key + '1', value)
        }
        for (const [key, value] of Object.entries(comparator2.current.getComparatorParams())) {
            urlGetParameters += insertGetParameter(key + '2', value)
        }

        copyToClipboard(window.location.origin + '?' + urlGetParameters.replace('&', ''))
        setShared(true)
        delayedUnshare();
    }

    const delayedUnshare = () => {
        setTimeout(() => {
            setShared(false)
        }, 2000);
    }

    return (
        <>
            <div className="container pt-1 mb-3 mb-md-3">
                <div className="row">
                    <div className="col">
                        <h4>Welcome to the versus section <span role="img" aria-label="fight">&#129354;</span></h4>
                        <p>Here you can compare two energy systems together.</p>
                        <p className={"tiny-text"}><span role="img" aria-label="warning">⚠</span>️ This tool contains
                            approximations (at large scale, by system, ..), use it for magnitude order.</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <button onClick={() => share()}>{shared ? 'Copied' : 'Copy configuration link'}</button>
                    </div>
                </div>
            </div>
            <div className="playground container pt-2">
                <div className="row">
                    <div className="col-6">
                        <EnergyComparator id={1} ref={comparator1} parameters={parameters ? parameters : null}/>
                    </div>
                    <div className="col-6">
                        <EnergyComparator id={2} ref={comparator2} parameters={parameters ? parameters : null}/>
                    </div>
                </div>
                <div className="row my-4 my-md-5 pt-3">
                    <div className="col">
                        <p>Here is the math about energy (eol
                            * {energySystems.eol.averagePower} * {energySystems.eol.averageChargeFactor}) +
                            (sol * {energySystems.sol.averagePower} * {energySystems.sol.averageChargeFactor}) +
                            (nuc * {energySystems.nuc.averagePower} * {energySystems.nuc.averageChargeFactor}) +
                            (therCoal
                            * {energySystems.therCoal.averagePower} * {energySystems.therCoal.averageChargeFactor}) +
                            (therOil
                            * {energySystems.therOil.averagePower} * {energySystems.therOil.averageChargeFactor}) +
                            (therGas
                            * {energySystems.therGas.averagePower} * {energySystems.therGas.averageChargeFactor}) +
                            (hydro
                            * {energySystems.hydro.averagePower} * {energySystems.hydro.averageChargeFactor}).</p>
                        <p>It goes number of thing x Power in MW x (capacity factor || availability factor) for
                            each.</p>
                        <p>For renewables, we talk about capacity factor, but we say availability factor for non
                            renewables even though it is pretty much the same concept.</p>
                        <p><strong>Charge factor</strong> : The net capacity factor is the unitless ratio of an actual
                            electrical energy output over a given period of time to the maximum possible electrical
                            energy output over that period.</p>
                        <p><strong>Availability factor</strong> : The availability factor of a power plant is the amount
                            of time that it is able to produce electricity over a certain period, divided by the amount
                            of the time in the period.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Versus;