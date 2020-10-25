import energySupplySource from "../../Domain/data/datasets/energy_supply_source.json";
import getOwidJson from "../Repository/Owid/getOwidJson";

const getEnergySupplySource = (setter, indexesSetter, index, onlyCategories = false, onlyRenewable = false, onlyNonRenewable = false) => {
    getOwidJson(
        energySupplySource,
        setter,
        indexesSetter,
        index,
        onlyCategories,
        onlyRenewable,
        onlyNonRenewable
    )
}
export default getEnergySupplySource;