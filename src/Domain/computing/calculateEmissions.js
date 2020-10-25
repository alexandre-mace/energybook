import energySystems from "../data/energySystems";
import calculateEnergySourceEmissions from "./calculateEnergySourceEmissions";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculateEmissions = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb) => {
    return (
        (
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(eolNb, energySystems.eol.averagePower, energySystems.eol.averageChargeFactor),
                energySystems.eol.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(nucNb, energySystems.nuc.averagePower, energySystems.nuc.averageChargeFactor),
                energySystems.nuc.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(solNb, energySystems.sol.averagePower, energySystems.sol.averageChargeFactor),
                energySystems.sol.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(therCoalNb, energySystems.therCoal.averagePower, energySystems.therCoal.averageChargeFactor),
                energySystems.therCoal.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(therOilNb, energySystems.therOil.averagePower, energySystems.therOil.averageChargeFactor),
                energySystems.therOil.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(therGasNb, energySystems.therGas.averagePower, energySystems.therGas.averageChargeFactor),
                energySystems.therGas.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(hydroNb, energySystems.hydro.averagePower, energySystems.hydro.averageChargeFactor),
                energySystems.hydro.co2
            )
        ) / 1000
    )
}
export default calculateEmissions;