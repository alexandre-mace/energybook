import powerData from "./PowerData";
import calculateEnergySourcePower from "./calculateEnergySourcePower";

const calculatePower = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb, ) => {
    return (
        (
            calculateEnergySourcePower(eolNb, powerData.eol.averagePower, powerData.eol.averageChargeFactor) +
            calculateEnergySourcePower(nucNb, powerData.nuc.averagePower, powerData.nuc.averageChargeFactor) +
            calculateEnergySourcePower(solNb, powerData.sol.averagePower, powerData.sol.averageChargeFactor) +
            calculateEnergySourcePower(therCoalNb, powerData.therCoal.averagePower, powerData.therCoal.averageChargeFactor) +
            calculateEnergySourcePower(therOilNb, powerData.therOil.averagePower, powerData.therOil.averageChargeFactor) +
            calculateEnergySourcePower(therGasNb, powerData.therGas.averagePower, powerData.therGas.averageChargeFactor) +
            calculateEnergySourcePower(hydroNb, powerData.hydro.averagePower, powerData.hydro.averageChargeFactor)
        ) / 1000
    )
}
export default calculatePower;