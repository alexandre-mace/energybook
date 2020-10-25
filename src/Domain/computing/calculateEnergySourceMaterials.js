const calculateEnergySourceMaterials = (energy, materials) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return energy * Object.values(materials).reduce(reducer)
}
export default calculateEnergySourceMaterials;