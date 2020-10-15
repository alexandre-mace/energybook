import powerData from "./PowerData";
import calculateEnergySourceSurface from "./calculateEnergySourceSurface";

const calculateSurface = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb, ) => {
    return (
        (
            calculateEnergySourceSurface(eolNb, powerData.eol.averageSurface) +
            calculateEnergySourceSurface(nucNb, powerData.nuc.averageSurface) +
            calculateEnergySourceSurface(solNb, powerData.sol.averageSurface) +
            calculateEnergySourceSurface(therCoalNb, powerData.therCoal.averageSurface) +
            calculateEnergySourceSurface(therOilNb, powerData.therOil.averageSurface) +
            calculateEnergySourceSurface(therGasNb, powerData.therGas.averageSurface) +
            calculateEnergySourceSurface(hydroNb, powerData.hydro.averageSurface)
        )
    )
}
export default calculateSurface;