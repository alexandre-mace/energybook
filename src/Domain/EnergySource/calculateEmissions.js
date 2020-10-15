import powerData from "./PowerData";
import calculateEnergySourceEmissions from "./calculateEnergySourceEmissions";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculateEmissions = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb) => {
    return (
        (
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(eolNb, powerData.eol.averagePower, powerData.eol.averageChargeFactor),
                powerData.eol.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(nucNb, powerData.nuc.averagePower, powerData.nuc.averageChargeFactor),
                powerData.nuc.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(solNb, powerData.sol.averagePower, powerData.sol.averageChargeFactor),
                powerData.sol.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(therCoalNb, powerData.therCoal.averagePower, powerData.therCoal.averageChargeFactor),
                powerData.therCoal.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(therOilNb, powerData.therOil.averagePower, powerData.therOil.averageChargeFactor),
                powerData.therOil.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(therGasNb, powerData.therGas.averagePower, powerData.therGas.averageChargeFactor),
                powerData.therGas.co2
            ) +
            calculateEnergySourceEmissions(
                calculateEnergySourcePower(hydroNb, powerData.hydro.averagePower, powerData.hydro.averageChargeFactor),
                powerData.hydro.co2
            )
        ) / 1000
    )
}
export default calculateEmissions;