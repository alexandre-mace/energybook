import React from 'react';
import ComparatorSlider from "./ComparatorSlider";
import windTurbineImg from '../images/wind-turbine.png';
import solarPanelImg from '../images/solar-panel.png';
import nuclearPowerPlantImg from '../images/nuclear-power-plant.png';
import therCoalImg from '../images/coal.png';
import therGasImg from '../images/gas.png';
import therOilImg from '../images/oil.png';
import hydroImg from '../images/hydro.png';
import ColorControlledDoughnut from "./charts-types/ColorControlledDoughnut";
import energySystems from "../../Domain/data/energySystems";
import PictoGenerator from "./utils/PictoGenerator";
import calculatePower from "../../Domain/computing/calculatePower";
import calculateEnergySourcePower from "../../Domain/computing/calculateEnergySourcePower";
import calculateSurface from "../../Domain/computing/calculateSurface";
import formatNumber from "../../Infrastructure/Formatter/formatNumber";
import calculateEmissions from "../../Domain/computing/calculateEmissions";
import calculateCost from "../../Domain/computing/calculateCost";
import calculateMaterials from "../../Domain/computing/calculateMaterials";
import getEnergySupplySource from "../../Infrastructure/Adapter/getEnergySupplySource";
import chargeEnergySystem from "../../Domain/computing/chargeEnergySystem";
import AutoComplete from "./utils/AutoComplete";

export const powerRatioDivider = 100000;

const EnergyComparator = () => {
    const [eol, setEol] = React.useState(0)
    const [nuc, setNuc] = React.useState(0)
    const [sol, setSol] = React.useState(0)
    const [therCoal, setTherCoal] = React.useState(0)
    const [therOil, setTherOil] = React.useState(0)
    const [therGas, setTherGas] = React.useState(0)
    const [hydro, setHydro] = React.useState(0)

    const [energySupplySourceIndex, setEnergySupplySourceIndex] = React.useState('Custom')
    const [energySupplySourceDatasets, setEnergySupplySourceDatasets] = React.useState([])
    const [energySupplySourceCountries, setEnergySupplySourceCountries] = React.useState([])
    const [energySupplySourceYear] = React.useState(2018)
    const [indexHasJustChanged, setIndexHasJustChanged] = React.useState(false)

    React.useEffect(() => {
        getEnergySupplySource(
            setEnergySupplySourceDatasets,
            setEnergySupplySourceCountries,
            energySupplySourceIndex,
        )
    }, [energySupplySourceIndex])

    React.useEffect(() => {
        if (energySupplySourceDatasets.length > 0 && energySupplySourceDatasets[0].values.length > 0 && energySupplySourceIndex !== 'Custom') {
            chargeEnergySystem(
                energySupplySourceDatasets,
                energySupplySourceYear,
                setEol,
                setSol,
                setNuc,
                setTherCoal,
                setTherOil,
                setTherGas,
                setHydro
            )
        }
    }, [energySupplySourceDatasets, energySupplySourceIndex, energySupplySourceYear])

    React.useEffect(() => {
        setIndexHasJustChanged(true);
        setTimeout(function () {
            setIndexHasJustChanged(false)
        }, 300)
    }, [energySupplySourceIndex])

    React.useEffect(() => {
        if (energySupplySourceIndex !== 'Custom' && !indexHasJustChanged) {
            setEnergySupplySourceIndex('Custom')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eol, sol, nuc, therCoal, therOil, hydro])

    return (
        <>
            <div className="container">
                <div className="row position-absolute energy-pictos">
                    <div className="col">
                        <PictoGenerator name={'nuclear power plant'} img={nuclearPowerPlantImg} total={nuc > 10 ? 10 : nuc}/>
                        <PictoGenerator name={'wind turbine'} img={windTurbineImg} total={eol/10 > 100 ? 100 : eol/10}/>
                        <PictoGenerator name={'solar panel'} img={solarPanelImg} total={sol/100000 > 100 ? 100 : sol/100000}/>
                        <PictoGenerator name={'coal thermal power plant'} img={therCoalImg} total={therCoal > 10 ? 10 : therCoal}/>
                        <PictoGenerator name={'oil thermal power plant'} img={therOilImg} total={therOil > 10 ? 10 : therOil}/>
                        <PictoGenerator name={'gas thermal power plant'} img={therGasImg} total={therGas > 10 ? 10 : therGas}/>
                        <PictoGenerator name={'hydroelectric power plant'} img={hydroImg} total={hydro > 10 ? 10 : hydro}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center doughnut-wrapper versus-computings">
                        <div className={"mb-3"}>Energy MWh <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculatePower(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>Surface km² <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateSurface(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>CO2 Emissions kg/h  <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateEmissions(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>Construction Materials T <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateMaterials(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <div className={"mb-3"}>Use cost €/h  <strong style={{fontSize: '1.7rem'}}>{formatNumber(calculateCost(eol, nuc, sol, therCoal, therOil, therGas, hydro))}</strong></div>
                        <ColorControlledDoughnut datasets={[
                            {
                                name: 'Wind turbine',
                                value: calculateEnergySourcePower(eol, energySystems.eol.averagePower, energySystems.eol.averageChargeFactor),
                                color: 'lightgray'
                            },
                            {
                                name: 'Solar panel',
                                value: calculateEnergySourcePower(sol, energySystems.sol.averagePower, energySystems.sol.averageChargeFactor),
                                color: 'blue'
                            },
                            {
                                name: 'Nuclear power plant',
                                value: calculateEnergySourcePower(nuc, energySystems.nuc.averagePower, energySystems.nuc.averageChargeFactor),
                                color: 'lightgreen'
                            },
                            {
                                name: 'Coal thermal power station',
                                value: calculateEnergySourcePower(therCoal, energySystems.therCoal.averagePower, energySystems.therCoal.averageChargeFactor),
                                color: 'black'
                            },
                            {
                                name: 'Oil thermal power station',
                                value: calculateEnergySourcePower(therOil, energySystems.therOil.averagePower, energySystems.therOil.averageChargeFactor),
                                color: 'purple'
                            },
                            {
                                name: 'Gas thermal power station',
                                value: calculateEnergySourcePower(therGas, energySystems.therGas.averagePower, energySystems.therGas.averageChargeFactor),
                                color: 'darkgray'
                            },
                            {
                                name: 'Hydroelectric power station',
                                value: calculateEnergySourcePower(hydro, energySystems.hydro.averagePower, energySystems.hydro.averageChargeFactor),
                                color: 'lightblue'
                            },
                        ]}/>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <AutoComplete
                            options={['Custom'].concat(energySupplySourceCountries)}
                            setIndex={setEnergySupplySourceIndex}
                            index={energySupplySourceIndex}
                        /> {energySupplySourceYear} consumption energy presets
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