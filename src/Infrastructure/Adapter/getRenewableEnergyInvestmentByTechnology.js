import renewableEnergyInvestmentByTechnology from "../../Dataset/investment-in-renewable-energy-by-technology.csv";
import getOwidCsv from "../Repository/Owid/getOwidCsv";

const getRenewableEnergyInvestmentByTechnology = (setter, indexesSetter, index) => {
    getOwidCsv(
        renewableEnergyInvestmentByTechnology,
        setter,
        indexesSetter,
        index
    )
}
export default getRenewableEnergyInvestmentByTechnology;