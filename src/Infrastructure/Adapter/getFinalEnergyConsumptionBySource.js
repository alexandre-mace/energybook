import totalFinalConsumptionBySourceData from "../../Domain/data/datasets/total_final_consumption_by_source.csv";
import getIaeDataCsv from "../Repository/Iae/getIaeDataCsv";

const getFinalEnergyConsumptionBySource = (setter) => {
    getIaeDataCsv(totalFinalConsumptionBySourceData, setter)
}
export default getFinalEnergyConsumptionBySource;