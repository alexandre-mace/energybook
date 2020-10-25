import energySystems from "../data/energySystems";
import calculateEnergySourceCost from "./calculateEnergySourceCost";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculateCost = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb) => {
    return (
        (
            calculateEnergySourceCost(
                calculateEnergySourcePower(eolNb, energySystems.eol.averagePower, energySystems.eol.averageChargeFactor),
                energySystems.eol.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(nucNb, energySystems.nuc.averagePower, energySystems.nuc.averageChargeFactor),
                energySystems.nuc.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(solNb, energySystems.sol.averagePower, energySystems.sol.averageChargeFactor),
                energySystems.sol.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(therCoalNb, energySystems.therCoal.averagePower, energySystems.therCoal.averageChargeFactor),
                energySystems.therCoal.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(therOilNb, energySystems.therOil.averagePower, energySystems.therOil.averageChargeFactor),
                energySystems.therOil.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(therGasNb, energySystems.therGas.averagePower, energySystems.therGas.averageChargeFactor),
                energySystems.therGas.cost
            ) +
            calculateEnergySourceCost(
                calculateEnergySourcePower(hydroNb, energySystems.hydro.averagePower, energySystems.hydro.averageChargeFactor),
                energySystems.hydro.cost
            )
        ) / 1000
    )
}
export default calculateCost;