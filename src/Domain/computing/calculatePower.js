import energySystems from "../data/energySystems";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculatePower = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb, ) => {
    return (
        (
            calculateEnergySourcePower(eolNb, energySystems.eol.averagePower, energySystems.eol.averageChargeFactor) +
            calculateEnergySourcePower(nucNb, energySystems.nuc.averagePower, energySystems.nuc.averageChargeFactor) +
            calculateEnergySourcePower(solNb, energySystems.sol.averagePower, energySystems.sol.averageChargeFactor) +
            calculateEnergySourcePower(therCoalNb, energySystems.therCoal.averagePower, energySystems.therCoal.averageChargeFactor) +
            calculateEnergySourcePower(therOilNb, energySystems.therOil.averagePower, energySystems.therOil.averageChargeFactor) +
            calculateEnergySourcePower(therGasNb, energySystems.therGas.averagePower, energySystems.therGas.averageChargeFactor) +
            calculateEnergySourcePower(hydroNb, energySystems.hydro.averagePower, energySystems.hydro.averageChargeFactor)
        ) / 1000
    )
}
export default calculatePower;