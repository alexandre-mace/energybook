import calculateTotalEnergyUnits from "./calculateTotalEnergyUnits";
import getKeyByValue from "../../Infrastructure/Transformer/getKeyByValue";
import powerData from "./PowerData";

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
            powerData.eol.averagePower,
            powerData.eol.averageChargeFactor
        )))
        setSol(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Solar').value,
            powerData.sol.averagePower,
            powerData.sol.averageChargeFactor
        )))
        setNuc(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Nuclear').value,
            powerData.nuc.averagePower,
            powerData.nuc.averageChargeFactor
        )))
        setTherCoal(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Coal').value,
            powerData.therCoal.averagePower,
            powerData.therCoal.averageChargeFactor
        )))
        setTherOil(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Oil').value,
            powerData.therOil.averagePower,
            powerData.therOil.averageChargeFactor
        )))
        setTherGas(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Gas').value,
            powerData.therGas.averagePower,
            powerData.therGas.averageChargeFactor
        )))
        setHydro(Math.floor(calculateTotalEnergyUnits(datasets.map(dataset => {
                const index = getKeyByValue(dataset.keys, year)
                return {
                    name: dataset.name,
                    key: dataset.keys[index],
                    value: dataset.values[index]
                }
            }).find(data => data.name === 'Hydropower').value,
            powerData.hydro.averagePower,
            powerData.hydro.averageChargeFactor
        )))
}

export default chargeEnergySystem