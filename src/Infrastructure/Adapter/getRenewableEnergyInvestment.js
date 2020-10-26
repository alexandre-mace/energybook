import renewableEnergyInvestment from "../../Domain/data/datasets/renewable_energy_investment.json";
import getOwidJson2 from "../Repository/Owid/getOwidJson2";

const getRenewableEnergyInvestment = (setter) => {
    getOwidJson2(
        renewableEnergyInvestment,
        setter
    )
}
export default getRenewableEnergyInvestment;