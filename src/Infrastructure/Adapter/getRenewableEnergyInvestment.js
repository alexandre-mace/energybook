import renewableEnergyInvestment from "../../Dataset/renewable_energy_investment.json";
import getOwidJson2 from "../Repository/Owid/getOwidJson2";

const getRenewableEnergyInvestment = (setter, indexesSetter, index) => {
    getOwidJson2(
        renewableEnergyInvestment,
        setter,
        indexesSetter,
        index
    )
}
export default getRenewableEnergyInvestment;