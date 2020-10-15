import powerData from "./PowerData";
import {powerRatioDivider} from "../../UI/components/EnergyComparator";
import calculateEnergySourceEmissions from "./calculateEnergySourceEmissions";

const calculateEmissions = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb, ) => {
    return (
        (
            calculateEnergySourceEmissions(eolNb, powerData.eol.averageEmissions) +
            calculateEnergySourceEmissions(nucNb, powerData.nuc.averageEmissions) +
            calculateEnergySourceEmissions(solNb, powerData.sol.averageEmissions) +
            calculateEnergySourceEmissions(therCoalNb, powerData.therCoal.averageEmissions) +
            calculateEnergySourceEmissions(therOilNb, powerData.therOil.averageEmissions) +
            calculateEnergySourceEmissions(therGasNb, powerData.therGas.averageEmissions) +
            calculateEnergySourceEmissions(hydroNb, powerData.hydro.averageEmissions)
        )/ powerRatioDivider
    )
}
export default calculateEmissions;