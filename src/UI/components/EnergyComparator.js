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
import powerData from "../../Domain/EnergySource/PowerData";
import PictoGenerator from "./PictoGenerator";
import calculatePower from "../../Domain/EnergySource/calculatePower";
import calculateEnergySourcePower from "../../Domain/EnergySource/calculateEnergySourcePower";
import calculateSurface from "../../Domain/EnergySource/calculateSurface";
import formatNumber from "../../Infrastructure/Formatter/formatNumber";
import calculateEmissions from "../../Domain/EnergySource/calculateEmissions";
import calculateCost from "../../Domain/EnergySource/calculateCost";
import calculateMaterials from "../../Domain/EnergySource/calculateMaterials";

export const powerRatioDivider = 100000;

const EnergyComparator = () => {
    const [eol, setEol] = React.useState(0)
    const [nuc, setNuc] = React.useState(0)
    const [sol, setSol] = React.useState(0)
    const [therCoal, setTherCoal] = React.useState(0)
    const [therOil, setTherOil] = React.useState(0)
    const [therGas, setTherGas] = React.useState(0)
    const [hydro, setHydro] = React.useState(0)

    return (
        <>
            <div className="container">
                <div className="row position-absolute energy-pictos">
                    <div className="col">
                        <PictoGenerator name={'nuclear power plant'} img={nuclearPowerPlantImg} total={nuc}/>
                        <PictoGenerator name={'wind turbine'} img={windTurbineImg} total={eol/10}/>
                        <PictoGenerator name={'solar panel'} img={solarPanelImg} total={sol/100000}/>
                        <PictoGenerator name={'coal thermal power plant'} img={therCoalImg} total={therCoal}/>
                        <PictoGenerator name={'oil thermal power plant'} img={therOilImg} total={therOil}/>
                        <PictoGenerator name={'gas thermal power plant'} img={therGasImg} total={therGas}/>
                        <PictoGenerator name={'hydroelectric power plant'} img={hydroImg} total={hydro}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center">
                        <div className={"mb-3"}>Energy MWh <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculatePower(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>Surface km² <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateSurface(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>CO2 Emissions kg  <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateEmissions(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>Materials T  <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateMaterials(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>Cost €  <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateCost(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <ColorControlledDoughnut datasets={[
                            {
                                name: 'Wind turbine',
                                value: calculateEnergySourcePower(eol, powerData.eol.averagePower, powerData.eol.averageChargeFactor),
                                color: 'lightgray'
                            },
                            {
                                name: 'Solar panel',
                                value: calculateEnergySourcePower(sol, powerData.sol.averagePower, powerData.sol.averageChargeFactor),
                                color: 'blue'
                            },
                            {
                                name: 'Nuclear power plant',
                                value: calculateEnergySourcePower(nuc, powerData.nuc.averagePower, powerData.nuc.averageChargeFactor),
                                color: 'lightgreen'
                            },
                            {
                                name: 'Coal thermal power station',
                                value: calculateEnergySourcePower(therCoal, powerData.therCoal.averagePower, powerData.therCoal.averageChargeFactor),
                                color: 'black'
                            },
                            {
                                name: 'Oil thermal power station',
                                value: calculateEnergySourcePower(therOil, powerData.therOil.averagePower, powerData.therOil.averageChargeFactor),
                                color: 'purple'
                            },
                            {
                                name: 'Gas thermal power station',
                                value: calculateEnergySourcePower(therGas, powerData.therGas.averagePower, powerData.therGas.averageChargeFactor),
                                color: 'darkgray'
                            },
                            {
                                name: 'Hydroelectric power station',
                                value: calculateEnergySourcePower(hydro, powerData.hydro.averagePower, powerData.hydro.averageChargeFactor),
                                color: 'lightblue'
                            },
                        ]}/>
                    </div>
                </div>
            </div>
            <div className="container sliders">
                <div className="row mt-5">
                    <div className="col">
                        Wind turbine (nb) : <ComparatorSlider sliderValue={eol} setter={setEol} max={1000} step={50}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        Solar panel (nb) : <ComparatorSlider sliderValue={sol} setter={setSol} max={30000000} step={1000000}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        Nuclear power plant (nb) : <ComparatorSlider sliderValue={nuc} setter={setNuc} max={10} step={1}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        Coal thermal power station (nb) : <ComparatorSlider sliderValue={therCoal} setter={setTherCoal} max={10} step={1}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        Oil thermal power station (nb) : <ComparatorSlider sliderValue={therOil} setter={setTherOil} max={10} step={1}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        Gas thermal power station (nb) : <ComparatorSlider sliderValue={therGas} setter={setTherGas} max={10} step={1}/>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        Hydroelectric power station (nb) : <ComparatorSlider sliderValue={hydro} setter={setHydro} max={10} step={1}/>
                    </div>
                </div>
                <div className="py-1"></div>
            </div>
        </>
    )
}
export default EnergyComparator;