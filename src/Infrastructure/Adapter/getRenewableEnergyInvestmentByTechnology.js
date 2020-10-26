import renewableEnergyInvestmentByTechnology from "../../Domain/data/datasets/investment-in-renewable-energy-by-technology.csv";
import getOwidCsv from "../Repository/Owid/getOwidCsv";

const getRenewableEnergyInvestmentByTechnology = (setter) => {
    getOwidCsv(
        renewableEnergyInvestmentByTechnology,
        setter
    )
}
export default getRenewableEnergyInvestmentByTechnology;