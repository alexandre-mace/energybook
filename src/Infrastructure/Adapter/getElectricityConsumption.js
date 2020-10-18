import totalElectricityConsumptionData from "../../Dataset/total_electricity_consumption.csv";
import getEnerdataCsv from "../Repository/Enerdata/getEnerdataCsv";

const getElectricityConsumption = (setter, indexesSetter, index) => {
    getEnerdataCsv(totalElectricityConsumptionData, setter, indexesSetter, index)
}
export default getElectricityConsumption;