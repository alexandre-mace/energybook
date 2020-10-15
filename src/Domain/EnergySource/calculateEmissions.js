import powerData from "./PowerData";
import {powerRatioDivider} from "../../UI/components/EnergyComparator";
import calculateEnergySourceEmissions from "./calculateEnergySourceEmissions";

const calculateEmissions = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb, ) => {
    return (
        (
            calculateEnergySourceEmissions(eolNb, powerData.eol.co2) +
            calculateEnergySourceEmissions(nucNb, powerData.nuc.co2) +
            calculateEnergySourceEmissions(solNb, powerData.sol.co2) +
            calculateEnergySourceEmissions(therCoalNb, powerData.therCoal.co2) +
            calculateEnergySourceEmissions(therOilNb, powerData.therOil.co2) +
            calculateEnergySourceEmissions(therGasNb, powerData.therGas.co2) +
            calculateEnergySourceEmissions(hydroNb, powerData.hydro.co2)
        )/ powerRatioDivider
    )
}
export default calculateEmissions;