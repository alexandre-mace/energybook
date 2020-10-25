const calculateTotalEnergyUnits = (eTotal, power, chargeFactor) => {
    return (eTotal / (1 * power * chargeFactor * 24 * 365 / 1000000000))
}

export default calculateTotalEnergyUnits