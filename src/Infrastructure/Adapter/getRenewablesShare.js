import renewablesShareData from "../../Dataset/renewables_share.csv";
import getEnerdataCsv from "../Repository/Enerdata/getEnerdataCsv";

const getRenewablesShare = (setter, indexesSetter, index) => {
    getEnerdataCsv(renewablesShareData, setter, indexesSetter, index)
}
export default getRenewablesShare;