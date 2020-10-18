import energySupplySource from "../../Dataset/energy_supply_source.json";
import getOwidJson from "../Repository/Owid/getOwidJson";

const getEnergySupplySource = (setter, indexesSetter, index, onlyCategories, onlyRenewable, onlyNonRenewable) => {
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