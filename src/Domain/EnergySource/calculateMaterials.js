import powerData from "./PowerData";
import calculateEnergySourceMaterials from "./calculateEnergySourceMaterials";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculateMaterials = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb) => {
    return (
        (
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(eolNb, powerData.eol.averagePower, powerData.eol.averageChargeFactor),
                powerData.eol.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(nucNb, powerData.nuc.averagePower, powerData.nuc.averageChargeFactor),
                powerData.nuc.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(solNb, powerData.sol.averagePower, powerData.sol.averageChargeFactor),
                powerData.sol.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(therCoalNb, powerData.therCoal.averagePower, powerData.therCoal.averageChargeFactor),
                powerData.therCoal.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(therOilNb, powerData.therOil.averagePower, powerData.therOil.averageChargeFactor),
                powerData.therOil.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(therGasNb, powerData.therGas.averagePower, powerData.therGas.averageChargeFactor),
                powerData.therGas.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(hydroNb, powerData.hydro.averagePower, powerData.hydro.averageChargeFactor),
                powerData.hydro.materials
            )
        ) / 1000
    )
}
export default calculateMaterials;