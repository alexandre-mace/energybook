import powerData from "./PowerData";
import calculateEnergySourceCost from "./calculateEnergySourceCost";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculateCost = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb) => {
    return (
        (
            calculateEnergySourceCost(
                calculateEnergySourcePower(eolNb, powerData.eol.averagePower, powerData.eol.averageChargeFactor),
                powerData.eol.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(nucNb, powerData.nuc.averagePower, powerData.nuc.averageChargeFactor),
                powerData.nuc.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(solNb, powerData.sol.averagePower, powerData.sol.averageChargeFactor),
                powerData.sol.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(therCoalNb, powerData.therCoal.averagePower, powerData.therCoal.averageChargeFactor),
                powerData.therCoal.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(therOilNb, powerData.therOil.averagePower, powerData.therOil.averageChargeFactor),
                powerData.therOil.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(therGasNb, powerData.therGas.averagePower, powerData.therGas.averageChargeFactor),
                powerData.therGas.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(hydroNb, powerData.hydro.averagePower, powerData.hydro.averageChargeFactor),
                powerData.hydro.cost
            )
        )
    )
}
export default calculateCost;