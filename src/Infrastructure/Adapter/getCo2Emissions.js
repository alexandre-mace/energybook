import totalco2EmissionsData from "../../Dataset/total_co2_emissions.csv";
import getEnerdataCsv from "../Repository/Enerdata/getEnerdataCsv";

const getCo2Emissions = (setter, indexesSetter, index) => {
    getEnerdataCsv(totalco2EmissionsData, setter, indexesSetter, index)
}
export default getCo2Emissions;