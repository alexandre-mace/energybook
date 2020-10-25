import calculateTotalEnergyUnits from "./calculateTotalEnergyUnits";
import getKeyByValue from "../../Infrastructure/Transformer/getKeyByValue";
import energySystems from "../data/energySystems";

const chargeEnergySystem = (
    datasets,
    year,
    setEol,
    setSol,
    setNuc,
    setTherCoal,
    setTherOil,
    setTherGas,
    setHydro
) => {
        setEol(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Wind').value,
            energySystems.eol.averagePower,
            energySystems.eol.averageChargeFactor
        )))
        setSol(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Solar').value,
            energySystems.sol.averagePower,
            energySystems.sol.averageChargeFactor
        )))
        setNuc(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Nuclear').value,
            energySystems.nuc.averagePower,
            energySystems.nuc.averageChargeFactor
        )))
        setTherCoal(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Coal').value,
            energySystems.therCoal.averagePower,
            energySystems.therCoal.averageChargeFactor
        )))
        setTherOil(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Oil').value,
            energySystems.therOil.averagePower,
            energySystems.therOil.averageChargeFactor
        )))
        setTherGas(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Gas').value,
            energySystems.therGas.averagePower,
            energySystems.therGas.averageChargeFactor
        )))
        setHydro(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Hydropower').value,
            energySystems.hydro.averagePower,
            energySystems.hydro.averageChargeFactor
        )))
}

export default chargeEnergySystem