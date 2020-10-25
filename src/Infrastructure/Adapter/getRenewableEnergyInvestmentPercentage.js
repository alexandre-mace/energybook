import renewableEnergyInvestmentPercentage from "../../Domain/data/datasets/renewable_energy_investment_percentage.json";
import getOwidJson2 from "../Repository/Owid/getOwidJson2";

const getRenewableEnergyInvestmentPercentage = (setter, indexesSetter, index) => {
    getOwidJson2(
        renewableEnergyInvestmentPercentage,
        setter,
        indexesSetter,
        index
    )
}
export default getRenewableEnergyInvestmentPercentage;