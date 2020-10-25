import energySystems from "../data/energySystems";
import calculateEnergySourceSurface from "./calculateEnergySourceSurface";

const calculateSurface = (eolNb, nucNb, solNb, therCoalNb, therOilNb, therGasNb, hydroNb, ) => {
    return (
        (
            calculateEnergySourceSurface(eolNb, energySystems.eol.averageSurface) +
            calculateEnergySourceSurface(nucNb, energySystems.nuc.averageSurface) +
            calculateEnergySourceSurface(solNb, energySystems.sol.averageSurface) +
            calculateEnergySourceSurface(therCoalNb, energySystems.therCoal.averageSurface) +
            calculateEnergySourceSurface(therOilNb, energySystems.therOil.averageSurface) +
            calculateEnergySourceSurface(therGasNb, energySystems.therGas.averageSurface) +
            calculateEnergySourceSurface(hydroNb, energySystems.hydro.averageSurface)
        ) / 1000000
    )
}
export default calculateSurface;