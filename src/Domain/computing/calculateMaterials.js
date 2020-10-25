import energySystems from "../data/energySystems";
import calculateEnergySourceMaterials from "./calculateEnergySourceMaterials";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculateMaterials = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb) => {
    return (
        (
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(eolNb, energySystems.eol.averagePower, energySystems.eol.averageChargeFactor),
                energySystems.eol.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(nucNb, energySystems.nuc.averagePower, energySystems.nuc.averageChargeFactor),
                energySystems.nuc.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(solNb, energySystems.sol.averagePower, energySystems.sol.averageChargeFactor),
                energySystems.sol.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(therCoalNb, energySystems.therCoal.averagePower, energySystems.therCoal.averageChargeFactor),
                energySystems.therCoal.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(therOilNb, energySystems.therOil.averagePower, energySystems.therOil.averageChargeFactor),
                energySystems.therOil.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(therGasNb, energySystems.therGas.averagePower, energySystems.therGas.averageChargeFactor),
                energySystems.therGas.materials
            ) +
            calculateEnergySourceMaterials(
                calculateEnergySourcePower(hydroNb, energySystems.hydro.averagePower, energySystems.hydro.averageChargeFactor),
                energySystems.hydro.materials
            )
        ) / 1000
    )
}
export default calculateMaterials;